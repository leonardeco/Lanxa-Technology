import Counter from "@/components/Counter";
import { Reveal, Stagger, Item } from "@/components/Reveal";

const facts = [
  { k: "De la idea a producción", v: "Descubrimiento, diseño, desarrollo, despliegue y soporte con un solo equipo." },
  { k: "Multiplataforma", v: "Aplicaciones web, móviles (iOS y Android) y de escritorio (Windows, macOS, Linux)." },
  { k: "Respuesta en menos de 24 h", v: "Comunicación directa con quien construye tu producto, sin intermediarios." },
  { k: "Tu código, siempre", v: "Entregamos el 100% del código fuente y la documentación. Firmamos NDA." },
];

export default function Experience() {
  return (
    <section id="experiencia" className="relative py-[clamp(72px,10vw,120px)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(40% 60% at 15% 50%,rgba(124,92,255,.16),transparent 70%)" }} />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10 grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-16 items-center">
        <Reveal>
          <span className="eyebrow">Trayectoria</span>
          <div className="mt-5 flex items-end gap-4">
            <span className="grad-text text-[clamp(6rem,16vw,11rem)] font-bold leading-[.8] tracking-[-0.05em]" style={{ fontFamily: "var(--font-space)" }}>
              <Counter to={5} prefix="+" duration={1.2} />
            </span>
            <span className="pb-3 text-[clamp(1.2rem,2.4vw,1.6rem)] font-semibold leading-tight" style={{ fontFamily: "var(--font-space)" }}>
              años
              <br />
              <span className="text-[var(--ether)] font-normal">de experiencia</span>
            </span>
          </div>
          <p className="mt-6 text-[var(--ether)] text-[1.05rem] leading-relaxed max-w-[46ch]">
            Más de cinco años desarrollando <strong className="text-[var(--moon)] font-semibold">aplicaciones a la medida</strong>:
            plataformas de trading, SaaS con inteligencia artificial, sistemas de reservas, e-commerce y apps móviles en producción.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 gap-4">
          {facts.map((f, i) => (
            <Item key={f.k}>
              <div className="card h-full p-6">
                <span className="font-mono text-[0.7rem] text-[var(--plasma)]">0{i + 1}</span>
                <h3 className="mt-3 mb-2 text-[1.05rem] font-semibold" style={{ fontFamily: "var(--font-space)" }}>{f.k}</h3>
                <p className="text-[0.9rem] text-[var(--ether)] leading-relaxed">{f.v}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
