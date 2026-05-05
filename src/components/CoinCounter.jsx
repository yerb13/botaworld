function CoinCounter({ coins }) {
  return (
    <div className="absolute right-4 top-4 z-30 rounded-2xl border-2 border-amber-300/80 bg-gradient-to-r from-amber-300 to-yellow-400 px-4 py-2 text-slate-900 shadow-xl md:right-8 md:top-8">
      <p className="text-xs font-black uppercase tracking-wider">Ботакоины</p>
      <p className="text-2xl font-black">{coins}</p>
    </div>
  );
}

export default CoinCounter;
