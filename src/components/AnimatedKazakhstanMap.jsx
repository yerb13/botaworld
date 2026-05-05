function AnimatedKazakhstanMap() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-violet-950 to-slate-950" />

      <svg
        viewBox="0 0 1000 520"
        className="absolute left-1/2 top-1/2 w-[1200px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-35 animate-map-float"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="kz-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path
          d="M112 281L161 224L219 226L267 192L321 195L377 166L455 171L501 141L580 154L631 135L694 153L731 205L807 214L838 256L815 300L853 349L825 389L743 381L691 408L626 395L569 429L492 418L448 375L379 385L335 354L269 361L237 326L172 319Z"
          fill="url(#kz-fill)"
          stroke="#e0f2fe"
          strokeWidth="10"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_30px_rgba(45,212,191,0.7)]"
        />
      </svg>

      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-fuchsia-500/35 blur-3xl animate-blob-one" />
      <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl animate-blob-two" />
      <div className="absolute bottom-0 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-orange-400/25 blur-3xl animate-blob-three" />
    </div>
  );
}

export default AnimatedKazakhstanMap;
