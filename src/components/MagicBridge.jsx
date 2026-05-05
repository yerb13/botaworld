import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const TARGET_SCORE = 50;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createExample() {
  const operation = Math.random() > 0.5 ? "+" : "-";
  let left = randomInt(0, 20);
  let right = randomInt(0, 20);

  if (operation === "-" && right > left) {
    [left, right] = [right, left];
  }

  const answer = operation === "+" ? left + right : left - right;
  const wrongA = Math.max(0, answer + randomInt(-5, 5) || answer + 2);
  const wrongB = Math.max(0, answer + randomInt(-5, 5) || answer - 3);

  const options = shuffle(
    [answer, wrongA, wrongB].filter((value, index, arr) => arr.indexOf(value) === index)
  );

  while (options.length < 3) {
    const candidate = Math.max(0, answer + randomInt(-8, 8));
    if (!options.includes(candidate)) {
      options.push(candidate);
    }
  }

  return {
    text: `${left} ${operation} ${right}`,
    answer,
    options: shuffle(options)
  };
}

function playTone(type) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    return;
  }

  const context = new AudioCtx();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(context.destination);

  if (type === "win") {
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1320, context.currentTime + 0.15);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.25);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.28);
  } else {
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(220, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(160, context.currentTime + 0.22);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.32);
  }
}

function MagicBridge({ botacoins, onEarnCoins }) {
  const [round, setRound] = useState(() => createExample());
  const [tileAnimation, setTileAnimation] = useState("");
  const [botAnimation, setBotAnimation] = useState("");
  const [message, setMessage] = useState("Помоги КамБоту выбрать правильную плитку!");
  const reachedGoal = useMemo(() => botacoins >= TARGET_SCORE, [botacoins]);

  const handleAnswer = (value) => {
    if (value === round.answer) {
      onEarnCoins(5);
      setBotAnimation("jump");
      setMessage("Отлично! КамБот прыгает дальше!");
      playTone("win");
      setTimeout(() => {
        setBotAnimation("");
        setRound(createExample());
      }, 430);
      return;
    }

    setTileAnimation("shake");
    setMessage("Почти! Попробуй еще раз, у тебя получится.");
    playTone("sad");
    setTimeout(() => setTileAnimation(""), 380);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-orange-400 via-red-500 to-rose-700 p-4 text-white md:p-8">
      <style>{`
        @keyframes magic-bridge-jump {
          0% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-46px) scale(1.06); }
          60% { transform: translateY(2px) scale(0.98); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes magic-bridge-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-7px); }
          80% { transform: translateX(6px); }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        <div className="flex w-full items-center justify-between gap-3">
          <Link
            to="/"
            className="rounded-2xl border border-white/50 bg-white/20 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/30"
          >
            ← На главную
          </Link>
        </div>

        <div className="self-end rounded-2xl border border-white/40 bg-white/20 px-4 py-2 backdrop-blur-xl shadow-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-100">Ботакоины</p>
          <p className="text-3xl font-black text-yellow-200">{botacoins}</p>
        </div>

        <h1 className="mt-4 text-center text-4xl font-black md:text-5xl">Magic Bridge</h1>
        <p className="mt-2 rounded-full bg-white/15 px-5 py-2 text-center text-sm font-semibold text-orange-50 backdrop-blur">
          Чарынский каньон: помоги КамБоту перейти мост магии!
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-8">
          <div
            className="text-7xl drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
            style={{
              animation: botAnimation ? "magic-bridge-jump 430ms ease-out" : "none"
            }}
          >
            🐫
          </div>

          <div
            className="w-full max-w-md rounded-3xl border border-white/40 bg-white/20 px-8 py-6 text-center text-4xl font-black text-yellow-100 shadow-2xl backdrop-blur-xl"
            style={{
              animation: tileAnimation ? "magic-bridge-shake 380ms ease-in-out" : "none"
            }}
          >
            {round.text} = ?
          </div>

          <div className="grid w-full max-w-xl gap-4 md:grid-cols-3">
            {round.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleAnswer(option)}
                className="rounded-3xl border-2 border-white/40 bg-gradient-to-b from-lime-300 via-emerald-300 to-cyan-300 px-4 py-6 text-4xl font-black text-slate-800 shadow-[0_10px_24px_rgba(16,185,129,0.35)] transition duration-150 hover:scale-105 active:scale-95 active:translate-y-1"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 rounded-full bg-black/20 px-5 py-2 text-center text-sm font-semibold text-orange-50">
          {message}
        </p>

        {reachedGoal && (
          <div className="mt-7 rounded-3xl border border-yellow-200/80 bg-yellow-300/25 px-6 py-5 text-center backdrop-blur-xl shadow-2xl">
            <p className="text-2xl font-black text-yellow-100">
              Ты прошел мост! Получи купон на батончик Bota!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default MagicBridge;
