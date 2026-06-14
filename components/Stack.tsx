const rows = [
  { k: "Frontend",       v: "React · TypeScript · Next.js · Astro" },
  { k: "Escritorio",     v: "Tauri · Electron" },
  { k: "Móvil",         v: "React Native · Expo" },
  { k: "Backend",       v: "Node.js · Spring Boot · FastAPI" },
  { k: "Datos",         v: "PostgreSQL · Prisma · Redis" },
  { k: "Infraestructura", v: "Docker · CI/CD · Vercel · AWS" },
];

export default function Stack() {
  return (
    <section id="stack" className="py-[clamp(72px,11vw,128px)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[.28em] uppercase text-[var(--plasma)] before:content-[''] before:w-[22px] before:h-px before:bg-[var(--plasma)] before:opacity-60">Tecnología</span>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold mt-4 mb-3 tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
            Construido sobre un stack <span className="grad-text">moderno y probado.</span>
          </h2>
          <p className="text-[var(--ether)] mb-7">No improvisamos con tecnología de moda. Elegimos herramientas maduras que garantizan rendimiento, seguridad y mantenibilidad a largo plazo.</p>
          <div className="flex flex-col gap-3">
            {rows.map((r) => (
              <div key={r.k} className="flex justify-between items-center gap-4 border border-[var(--line)] bg-[rgba(17,17,42,.45)] rounded-xl px-4 py-3 font-mono text-[0.84rem]">
                <span className="text-[var(--ether-dim)]">{r.k}</span>
                <span className="text-[var(--moon)] text-right text-[0.8rem]">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[var(--line)] rounded-[22px] bg-gradient-to-b from-[rgba(17,17,42,.7)] to-[rgba(11,11,29,.7)] p-6 font-mono text-[0.84rem] leading-[1.85]">
          <div className="flex gap-2 mb-5">
            {[0,1,2].map((i) => <i key={i} className="w-3 h-3 rounded-full bg-[var(--line2)] not-italic" />)}
          </div>
          <pre className="whitespace-pre-wrap text-[var(--ether)]">
<span className="text-[var(--plasma)]">$</span>{" "}lanxa deploy --prod{"\n"}
<span className="text-[var(--ether-dim)]">→ build</span>{"      "}<span className="text-[var(--moon)]">ok</span>{"   2.1s\n"}
<span className="text-[var(--ether-dim)]">→ tests</span>{"      "}<span className="text-[var(--moon)]">142 passed</span>{"\n"}
<span className="text-[var(--ether-dim)]">→ lighthouse</span>{" "}<span className="text-[var(--plasma)]">98 / 100</span>{"\n"}
<span className="text-[var(--ether-dim)]">→ deploy</span>{"     "}<span className="text-[var(--moon)]">live</span>{"\n\n"}
<span className="text-[var(--ion-soft)]">✓</span>{" "}Tu producto está en producción.
          </pre>
        </div>
      </div>
    </section>
  );
}
