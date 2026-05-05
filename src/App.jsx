import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import AnimatedKazakhstanMap from "./components/AnimatedKazakhstanMap";
import CoinCounter from "./components/CoinCounter";
import GameNav from "./components/GameNav";
import KamBot from "./components/KamBot";
import MagicBridge from "./components/MagicBridge";

function App() {
  const [botacoins, setBotacoins] = useState(120);

  const addCoins = (amount) => {
    setBotacoins((prev) => prev + amount);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="relative min-h-screen overflow-hidden text-white">
            <AnimatedKazakhstanMap />
            <CoinCounter coins={botacoins} />

            <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-4 py-10 text-center">
              <h1 className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-5xl font-black uppercase tracking-wider text-transparent md:text-7xl">
                BotaWorld
              </h1>
              <p className="mt-4 max-w-2xl rounded-full bg-white/10 px-6 py-2 text-sm font-semibold text-cyan-100 backdrop-blur md:text-base">
                Яркий мир приключений, ритма и головоломок в сердце Казахстана
              </p>

              <div className="mt-10 animate-float-up">
                <KamBot />
              </div>

              <GameNav />
            </div>
          </main>
        }
      />
      <Route
        path="/magic-bridge"
        element={<MagicBridge botacoins={botacoins} onEarnCoins={addCoins} />}
      />
    </Routes>
  );
}

export default App;