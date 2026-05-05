import { Link } from "react-router-dom";

const games = [
  { name: "Nomad Rhythm", to: null },
  { name: "Bota-Search", to: null },
  { name: "Magic Bridge", to: "/magic-bridge" }
];

function GameNav() {
  return (
    <nav className="mt-10 grid w-full max-w-3xl gap-4 md:grid-cols-3">
      {games.map((game) => (
        game.to ? (
          <Link
            key={game.name}
            to={game.to}
            className="group rounded-2xl border-2 border-white/40 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 px-5 py-4 text-left text-slate-900 shadow-[0_8px_24px_rgba(244,114,182,0.35)] transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(14,165,233,0.45)] active:scale-95"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-800/80">игра</p>
            <p className="mt-1 text-lg font-black">{game.name}</p>
            <p className="mt-1 text-xs font-semibold text-slate-800/80 group-hover:text-slate-900">
              Перейти
            </p>
          </Link>
        ) : (
          <button
            key={game.name}
            type="button"
            className="cursor-not-allowed rounded-2xl border-2 border-white/30 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 px-5 py-4 text-left text-slate-700 opacity-75"
            disabled
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-800/70">игра</p>
            <p className="mt-1 text-lg font-black">{game.name}</p>
            <p className="mt-1 text-xs font-semibold text-slate-800/70">Скоро</p>
          </button>
        )
      ))}
    </nav>
  );
}

export default GameNav;
