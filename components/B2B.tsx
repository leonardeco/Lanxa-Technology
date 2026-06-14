const cards = [
  { title: "Staff Augmentation",     tag: "Integración remota · full-time o part-time",  desc: "Developers y arquitectos que se integran a tu equipo interno. Mismo ritmo, mismas herramientas, mismos estándares de calidad." },
  { title: "Desarrollo por Contrato", tag: "NDA · entrega por hitos · código fuente 100%", desc: "Tomamos módulos o proyectos completos bajo contrato. Entregamos código, documentación y transferencia sin dependencias." },
  { title: "White-Label",             tag: "Marca blanca · confidencialidad garantizada",  desc: "Construimos productos bajo tu marca. Tu cliente ve tu empresa; nosotros ponemos el equipo de ingeniería detrás." },
  { title: "Consultoría Técnica",     tag: "Presencial o remoto · informe ejecutivo",      desc: "Revisión de arquitectura, code review, auditoría de seguridad y recomendaciones estratégicas para tus proyectos." },
  { title: "QA & Testing",            tag: "Cypress · Jest · Playwright · reportes",       desc: "Pruebas automatizadas y de carga. Nos encargamos de la calidad para que tu equipo se enfoque en nuevas funcionalidades." },
  { title: "Integración de IA",       tag: "LLM · RAG · automatización · APIs de IA",      desc: "Añadimos capacidades de inteligencia artificial: Claude, GPT, pipelines de datos y agentes autónomos." },
];

export default function B2B() {
  return (
    <section id="empresas" className="py-[clamp(72px,11vw,128px)] border-y border-[var(--line)] bg-[rgba(11,11,29,.4)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-xl mb-10">
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[.28em] uppercase text-[var(--plasma)] before:content-[''] before:w-[22px] before:h-px before:bg-[var(--plasma)] before:opacity-60">Empresas & Corporativo</span>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold mt-4 mb-3 tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
            Somos tu equipo de ingeniería <span className="grad-text">como subcontratistas.</span>
          </h2>
          <p className="text-[var(--ether)]">Trabajamos directamente con empresas tecnológicas que necesitan capacidad adicional: un equipo externo confiable que opera bajo sus contratos, estándares y procesos.</p>
        </div>

        {/* Banner */}
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center border border-[var(--line2)] rounded-[22px] p-8 bg-gradient-to-br from-[rgba(124,92,255,.08)] to-[rgba(31,230,205,.06)] mb-12">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[.15em] uppercase text-[var(--plasma)] border border-[rgba(31,230,205,.35)] px-3 py-1 rounded-full bg-[rgba(31,230,205,.05)] mb-3">
              Disponible para contratos corporativos
            </span>
            <h3 className="text-[1.25rem] font-bold mb-2" style={{ fontFamily: "var(--font-space)" }}>¿Tu empresa necesita desarrolladores externos?</h3>
            <p className="text-[0.92rem] text-[var(--ether)] max-w-[55ch]">Nos integramos como subcontratistas o terceros. Firmamos NDA, trabajamos bajo tus lineamientos y entregamos con los estándares que exige tu cliente final.</p>
          </div>
          <a
            href="https://wa.me/573226993891?text=Hola%20Lanxa%20Technology,%20quiero%20hablar%20sobre%20un%20contrato%20corporativo"
            target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[var(--void)] whitespace-nowrap transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}
          >
            Hablar con un asesor
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={17} height={17}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <article key={c.title} className="border border-[var(--line)] rounded-[22px] p-7 bg-gradient-to-b from-[rgba(17,17,42,.55)] to-[rgba(11,11,29,.55)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--ion)] hover:shadow-[0_28px_60px_-34px_rgba(124,92,255,.7)]">
              <h3 className="text-[1.1rem] font-semibold mb-2" style={{ fontFamily: "var(--font-space)" }}>{c.title}</h3>
              <p className="text-[0.9rem] text-[var(--ether)] leading-relaxed mb-3">{c.desc}</p>
              <span className="font-mono text-[0.7rem] text-[var(--plasma)]">{c.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
