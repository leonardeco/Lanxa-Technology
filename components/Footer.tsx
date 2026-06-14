export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--void)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 font-bold" style={{ fontFamily: "var(--font-space)" }}>
          <svg viewBox="0 0 40 40" width={24} height={24} aria-hidden="true">
            <defs>
              <linearGradient id="ag-f" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#7c5cff" /><stop offset="1" stopColor="#1fe6cd" />
              </linearGradient>
            </defs>
            <path d="M9 31 L21 7 L26 7 L14 31 Z" fill="url(#ag-f)" />
            <path d="M18 31 L30 7 L35 7 L23 31 Z" fill="url(#ag-f)" opacity="0.55" />
          </svg>
          Lanxa Technology
        </div>
        <p className="font-mono text-[0.72rem] text-[var(--ether-dim)]">
          © 2026 Lanxa Technology · Ingeniería de software · Armenia, Colombia
        </p>
      </div>
    </footer>
  );
}
