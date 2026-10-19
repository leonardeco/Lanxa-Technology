import SectionHeader from "@/components/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { Stagger, Item } from "@/components/Reveal";

const reasons = [
  { title: "Sólido",       icon: <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />,                       desc: "Código limpio, probado y documentado. Construido para durar, no para salir del paso." },
  { title: "Escalable",    icon: <path d="M4 19h16M7 15l4-4 3 3 5-6M15 8h4v4" />,                                      desc: "Arquitectura pensada desde el día uno para crecer contigo, de cien a un millón de usuarios." },
  { title: "Transparente", icon: <><circle cx="12" cy="12" r="3" /><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /></>, desc: "Comunicación directa y entregas constantes. Sin cajas negras ni sorpresas." },
  { title: "Futurista",    icon: <path d="M12 2.5c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7zM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6z" />, desc: "Stack moderno e IA aplicada para darte una ventaja real frente a tu competencia." },
];

export default function WhyLanxa() {
  return (
    <section className="py-[clamp(72px,11vw,128px)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <SectionHeader eyebrow="Por qué Lanxa" title={<>Ingeniería de verdad, <span className="grad-text">no plantillas.</span></>} />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r) => (
            <Item key={r.title}>
              <SpotlightCard className="h-full p-6">
                <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="var(--plasma)" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">{r.icon}</svg>
                <h3 className="text-[1.15rem] font-semibold mt-5 mb-2 grad-text" style={{ fontFamily: "var(--font-space)" }}>{r.title}</h3>
                <p className="text-[0.9rem] text-[var(--ether)] leading-relaxed">{r.desc}</p>
              </SpotlightCard>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
