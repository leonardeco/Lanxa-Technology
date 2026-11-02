const techs = ["React", "TypeScript", "Next.js", "Node.js", "Spring Boot", "FastAPI", "Angular", "Tauri", "React Native", "PostgreSQL", "Docker", "Claude API"];

export default function Marquee() {
  return (
    <div className="relative border-y border-[var(--line)] bg-[rgba(11,16,32,.6)] overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((g) => (
          <div key={g} className="flex items-center gap-8 pr-8" aria-hidden={g === 1}>
            {techs.map((t) => (
              <span key={t} className="flex items-center gap-8 whitespace-nowrap text-[clamp(1.05rem,2vw,1.35rem)] font-semibold text-[var(--ether)] hover:text-[var(--moon)] transition-colors" style={{ fontFamily: "var(--font-space)" }}>
                {t}
                <span aria-hidden="true" className="text-[var(--plasma)] text-[0.8em]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
