const reasons = [
  { title: "Sólido",      desc: "Código limpio, probado y documentado. Construido para durar, no para salir del paso." },
  { title: "Escalable",   desc: "Arquitectura pensada desde el día uno para crecer contigo, de cien a un millón de usuarios." },
  { title: "Transparente",desc: "Comunicación directa y entregas constantes. Sin cajas negras ni sorpresas." },
  { title: "Futurista",   desc: "Stack moderno e IA aplicada para darte una ventaja real frente a tu competencia." },
];

export default function WhyLanxa() {
  return (
    <section className="py-[clamp(72px,11vw,128px)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-xl mb-14">
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[.28em] uppercase text-[var(--plasma)] before:content-[''] before:w-[22px] before:h-px before:bg-[var(--plasma)] before:opacity-60">Por qué Lanxa</span>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold mt-4 tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
            Ingeniería de verdad, <span className="grad-text">no plantillas.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title}>
              <h3 className="text-[1.15rem] font-semibold mb-2 grad-text" style={{ fontFamily: "var(--font-space)" }}>{r.title}</h3>
              <p className="text-[0.9rem] text-[var(--ether)]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
