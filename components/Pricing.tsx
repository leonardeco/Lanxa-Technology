const plans = [
  {
    name: "Puntual",
    desc: "Un módulo, una función o una mejora específica.",
    amount: "A convenir",
    note: "según alcance · pago por entrega",
    featured: false,
    items: ["Landing page, módulo o componente","Alcance definido en conjunto","Entrega rápida y concreta","Código fuente incluido","Ajustes hasta que quede perfecto"],
    cta: "Cotizar",
    wa: "Hola,%20necesito%20algo%20puntual%20y%20quiero%20cotizarlo%20con%20Lanxa%20Technology",
  },
  {
    name: "Producto completo",
    desc: "Aplicación web, móvil o de escritorio de principio a fin.",
    amount: "A la medida",
    note: "pago por hitos · sin sorpresas",
    featured: true,
    badge: "Más solicitado",
    items: ["App web, móvil o escritorio","Backend + base de datos","Autenticación e integraciones","CI/CD y despliegue incluido","Soporte post-lanzamiento","Presupuesto ajustado a ti"],
    cta: "Hablar de mi proyecto",
    wa: "Hola,%20quiero%20construir%20un%20producto%20con%20Lanxa%20Technology%20y%20conocer%20los%20costos",
  },
  {
    name: "Corporativo / B2B",
    desc: "Subcontratación, staff augmentation o contratos empresariales.",
    amount: "Negociable",
    note: "tarifa mensual o por proyecto",
    featured: false,
    items: ["Equipo dedicado a tu empresa","NDA y contrato formal","White-label disponible","Nos adaptamos a tus procesos","Tarifa según volumen y duración"],
    cta: "Hablar con asesor",
    wa: "Hola,%20quiero%20hablar%20sobre%20un%20contrato%20corporativo%20con%20Lanxa%20Technology",
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="py-[clamp(72px,11vw,128px)] border-y border-[var(--line)] bg-[rgba(11,11,29,.4)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-xl mb-10">
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[.28em] uppercase text-[var(--plasma)] before:content-[''] before:w-[22px] before:h-px before:bg-[var(--plasma)] before:opacity-60">Inversión</span>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold mt-4 mb-3 tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
            Costos <span className="grad-text">según tu necesidad.</span>
          </h2>
          <p className="text-[var(--ether)]">Cada proyecto es diferente. Nos adaptamos a tu presupuesto, alcance y tiempos — sin paquetes rígidos.</p>
        </div>

        {/* Flex banner */}
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center border border-[var(--line2)] rounded-[22px] p-8 bg-gradient-to-br from-[rgba(124,92,255,.08)] to-[rgba(31,230,205,.06)] mb-12">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[.15em] uppercase text-[var(--plasma)] border border-[rgba(31,230,205,.35)] px-3 py-1 rounded-full bg-[rgba(31,230,205,.05)] mb-3">
              Precios 100% flexibles
            </span>
            <h3 className="text-[1.25rem] font-bold mb-2" style={{ fontFamily: "var(--font-space)" }}>Nos ajustamos a lo que puedes invertir</h3>
            <p className="text-[0.92rem] text-[var(--ether)] max-w-[55ch]">No tenemos tarifas fijas. Trabajamos contigo para encontrar el alcance correcto según tu presupuesto. Lo importante es que el resultado valga cada peso invertido.</p>
          </div>
          <a
            href="https://wa.me/573226993891?text=Hola%20Lanxa%20Technology,%20quiero%20conocer%20los%20costos%20según%20mi%20necesidad"
            target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[var(--void)] whitespace-nowrap transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}
          >
            Solicitar cotización
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={17} height={17}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col gap-0 border rounded-[22px] p-7 ${p.featured ? "border-[var(--ion)] bg-gradient-to-b from-[rgba(124,92,255,.12)] to-[rgba(11,11,29,.7)] shadow-[0_0_0_1px_rgba(124,92,255,.3),0_28px_60px_-30px_rgba(124,92,255,.5)]" : "border-[var(--line)] bg-gradient-to-b from-[rgba(17,17,42,.7)] to-[rgba(11,11,29,.7)]"}`}>
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[var(--void)] font-mono text-[0.68rem] font-bold tracking-widest uppercase px-4 py-1 rounded-full whitespace-nowrap" style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}>
                  {p.badge}
                </div>
              )}
              <div className="text-[1.05rem] font-semibold mb-1" style={{ fontFamily: "var(--font-space)" }}>{p.name}</div>
              <div className="text-[0.88rem] text-[var(--ether)] mb-5">{p.desc}</div>
              <div className="text-[2rem] font-bold text-[var(--moon)] mb-1" style={{ fontFamily: "var(--font-space)" }}>{p.amount}</div>
              <div className="font-mono text-[0.7rem] text-[var(--plasma)] mb-6">{p.note}</div>
              <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.88rem] text-[var(--ether)]">
                    <span className="text-[var(--plasma)] font-bold mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/573226993891?text=${p.wa}`}
                target="_blank" rel="noopener"
                className={`w-full text-center py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5 ${p.featured ? "text-[var(--void)]" : "border border-[var(--line2)] text-[var(--moon)] hover:border-[var(--ion)] hover:bg-[rgba(124,92,255,.1)]"}`}
                style={p.featured ? { background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" } : {}}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
