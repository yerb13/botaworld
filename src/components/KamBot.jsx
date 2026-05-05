function KamBot() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute -inset-6 rounded-full bg-fuchsia-500/30 blur-2xl animate-pulse" />
      <div className="relative rounded-[2.2rem] border-4 border-cyan-200 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-500 p-8 shadow-[0_0_50px_rgba(34,211,238,0.55)]">
        <div className="text-[5rem] leading-none drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]">🤖</div>
      </div>
      <h2 className="mt-4 text-3xl font-black tracking-wide text-yellow-300">КамБот</h2>
      <p className="mt-1 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold text-cyan-100">
        Твой цифровой питомец
      </p>
    </div>
  );
}

export default KamBot;
