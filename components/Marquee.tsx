const techs = ["React","TypeScript","Next.js","Node.js","Spring Boot","FastAPI","Tauri","React Native","PostgreSQL","Docker"];

export default function Marquee() {
  return (
    <div className="border-y border-[var(--line)] bg-[rgba(11,11,29,.5)] overflow-hidden py-4">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0,1].map((g) => (
          <div key={g} className="flex items-center gap-10 pr-10 font-mono text-[0.9rem] text-[var(--ether)]" aria-hidden={g === 1}>
            <span className="text-[var(--plasma)]">Construimos con:</span>
            {techs.map((t) => <span key={t} className="whitespace-nowrap">{t}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
