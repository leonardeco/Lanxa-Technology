import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { Stagger, Item } from "@/components/Reveal";

type Member = {
  name: string; role: string; bio: string; photo?: string; initials: string;
  links: { label: string; href: string }[];
};

const team: Member[] = [
  {
    name: "Leonardo Guzmán", role: "Fundador & CTO", initials: "LG", photo: "/team/leonardo.png",
    bio: "Desarrollador full stack: React, Next.js y Angular en el frontend; Node.js, FastAPI y Spring Boot en el backend. Diseña la arquitectura, modela los datos y lleva cada producto a producción.",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/leonardo-guzman-t" },
      { label: "GitHub", href: "https://github.com/leonardeco" },
      { label: "WhatsApp", href: "https://wa.me/573226993891?text=Hola%20Leonardo,%20quiero%20informaci%C3%B3n%20sobre%20Lanxa%20Technology" },
    ],
  },
];

export default function Team() {
  return (
    <section id="equipo" className="relative py-[clamp(72px,11vw,128px)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(45% 55% at 80% 40%,rgba(255,200,87,.09),transparent 70%)" }} />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10">
        <SectionHeader
          eyebrow="Equipo"
          title={<>Hablas directo con <span className="grad-text">quien lo construye.</span></>}
          desc="Sin intermediarios ni cuentas que pasan de mano en mano: el mismo equipo te acompaña de la idea a producción."
        />
        <Stagger className="max-w-3xl" stagger={0.15}>
          {team.map((m) => (
            <Item key={m.name}>
              <article className="card glow-border h-full p-7 flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1.5 rounded-full animate-spin-slow" style={{ background: "conic-gradient(from 0deg,#4f7cff,#ffc857,#4f7cff)" }} />
                  {m.photo ? (
                    <Image src={m.photo} alt={m.name} width={112} height={112} className="relative w-28 h-28 rounded-full object-cover border-4 border-[var(--deep)]" />
                  ) : (
                    <div className="relative w-28 h-28 rounded-full border-4 border-[var(--deep)] flex items-center justify-center text-[1.8rem] font-bold text-[var(--void)]" style={{ background: "var(--grad)", fontFamily: "var(--font-space)" }}>
                      {m.initials}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-[1.3rem] font-bold tracking-tight" style={{ fontFamily: "var(--font-space)" }}>{m.name}</h3>
                  <p className="font-mono text-[0.72rem] tracking-[.12em] uppercase text-[var(--plasma)] mt-1">{m.role}</p>
                  <p className="mt-3 text-[0.92rem] text-[var(--ether)] leading-relaxed">{m.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener"
                        className="text-[0.8rem] font-medium px-3 py-1.5 rounded-full border border-[var(--line2)] text-[var(--moon)] hover:border-[var(--plasma)] hover:text-[var(--plasma)] transition-colors">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
