const steps = [
  { n: "01", title: "Descubrimiento", desc: "Entendemos tu negocio, objetivos y alcance. Definimos qué construir y por qué." },
  { n: "02", title: "Diseño", desc: "Arquitectura técnica y prototipos de interfaz. Validamos antes de escribir código." },
  { n: "03", title: "Desarrollo", desc: "Construcción por módulos con entregas semanales y control de calidad continuo." },
  { n: "04", title: "Despliegue", desc: "Producción con CI/CD, dominio, monitoreo y todo listo para usuarios reales." },
  { n: "05", title: "Soporte", desc: "Mantenimiento, mejoras y evolución del producto a medida que tu negocio crece." },
];

export default function Process() {
  return (
    <section id="proceso" className="py-[clamp(72px,11vw,128px)] border-y border-[var(--line)] bg-[rgba(11,11,29,.4)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-xl mb-14">
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[.28em] uppercase text-[var(--plasma)] before:content-[''] before:w-[22px] before:h-px before:bg-[var(--plasma)] before:opacity-60">Cómo trabajamos</span>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold mt-4 mb-3 tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
            Un proceso claro en <span className="grad-text">cinco fases.</span>
          </h2>
          <p className="text-[var(--ether)]">Transparente, iterativo y con entregas constantes. Sabes en todo momento dónde está tu proyecto.</p>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 border border-[var(--line)] rounded-[22px] overflow-hidden list-none">
          {steps.map((s, i) => (
            <li key={s.n} className={`p-6 bg-[rgba(6,6,15,.6)] border-b border-[var(--line)] ${i < steps.length - 1 ? "lg:border-r" : ""}`}>
              <span className="font-mono text-[var(--plasma)] text-[0.88rem] font-medium">{s.n}</span>
              <h3 className="text-[1rem] font-semibold mt-3 mb-2" style={{ fontFamily: "var(--font-space)" }}>{s.title}</h3>
              <p className="text-[0.86rem] text-[var(--ether)]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
