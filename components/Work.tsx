const projects = [
  { tag: "FinTech · Python",    title: "TradeSync",  desc: "Plataforma de trading algorítmico para Forex y VIX75: bot de señales, backtesting en MT5 y dashboard de P&L." },
  { tag: "SaaS · IA",           title: "GanancIA",   desc: "SaaS de rentabilidad para restaurantes en Latinoamérica, con un asistente de IA integrado para decisiones de negocio." },
  { tag: "Web · Angular",       title: "ReservaYa",  desc: "Sistema de reservas para restaurantes de extremo a extremo, con gestión de mesas en tiempo real." },
  { tag: "E-commerce · React",  title: "LEOFIT",     desc: "Tienda en línea de suplementos deportivos con React + Vite, catálogo y carrito completos, en producción." },
  { tag: "Social · Mobile",     title: "GymMatch",   desc: "App social-fitness para encontrar compañeros de entrenamiento, con perfiles, emparejamiento y landing de lanzamiento." },
];

export default function Work() {
  return (
    <section id="trabajo" className="py-[clamp(72px,11vw,128px)] border-y border-[var(--line)] bg-[rgba(11,11,29,.4)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-xl mb-14">
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[.28em] uppercase text-[var(--plasma)] before:content-[''] before:w-[22px] before:h-px before:bg-[var(--plasma)] before:opacity-60">Trabajo</span>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold mt-4 mb-3 tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
            Productos reales, <span className="grad-text">construidos de cero.</span>
          </h2>
          <p className="text-[var(--ether)]">Una muestra de lo que diseñamos y desarrollamos: desde plataformas de trading hasta SaaS para negocios.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <article key={p.title} className="border border-[var(--line)] rounded-[22px] p-7 bg-gradient-to-b from-[rgba(17,17,42,.55)] to-[rgba(11,11,29,.55)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--ion)] hover:shadow-[0_28px_60px_-34px_rgba(124,92,255,.7)] flex flex-col min-h-[170px]">
              <span className="font-mono text-[0.72rem] text-[var(--plasma)]">{p.tag}</span>
              <h3 className="text-[1.1rem] font-semibold mt-3 mb-2" style={{ fontFamily: "var(--font-space)" }}>{p.title}</h3>
              <p className="text-[0.9rem] text-[var(--ether)] leading-relaxed">{p.desc}</p>
            </article>
          ))}
          <article className="border border-[var(--line)] rounded-[22px] p-7 bg-gradient-to-b from-[rgba(17,17,42,.55)] to-[rgba(11,11,29,.55)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--ion)] hover:shadow-[0_28px_60px_-34px_rgba(124,92,255,.7)] flex flex-col justify-between min-h-[170px]">
            <div>
              <span className="font-mono text-[0.72rem] text-[var(--plasma)]">Tu proyecto</span>
              <h3 className="text-[1.1rem] font-semibold mt-3 mb-2" style={{ fontFamily: "var(--font-space)" }}>El siguiente eres tú</h3>
              <p className="text-[0.9rem] text-[var(--ether)]">¿Tienes una idea? La convertimos en un producto sólido y listo para escalar.</p>
            </div>
            <a href="#contacto" className="mt-4 inline-flex items-center gap-1 text-[var(--plasma)] text-[0.88rem] font-medium font-mono hover:gap-2 transition-all">
              Empecemos <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
