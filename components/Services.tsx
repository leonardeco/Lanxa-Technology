import { ReactNode } from "react";
import SectionHeader from "@/components/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { Stagger, Item } from "@/components/Reveal";

const services = [
  {
    icon: <><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8"/></>,
    title: "Aplicaciones web",
    desc: "Plataformas, dashboards y SaaS a la medida con React, TypeScript y Next.js. Rápidas, seguras y optimizadas para SEO.",
  },
  {
    icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    title: "Aplicaciones de escritorio",
    desc: "Apps nativas multiplataforma (Windows, macOS, Linux) con Tauri y Electron. Ligeras, veloces y con instalador propio.",
  },
  {
    icon: <><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></>,
    title: "Apps móviles",
    desc: "Una sola base de código para iOS y Android con React Native y Expo. Experiencias fluidas y publicación en tiendas.",
  },
  {
    icon: <path d="M4 7h16M4 12h16M4 17h10"/>,
    title: "APIs & Backend",
    desc: "Servicios robustos con Node.js, Spring Boot (Java) y FastAPI (Python). Arquitectura escalable y bases de datos bien diseñadas.",
  },
  {
    icon: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    title: "Integraciones",
    desc: "Pasarelas de pago (Wompi, Stripe), CRMs, facturación electrónica y servicios de terceros conectados sin fricción.",
  },
  {
    icon: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></>,
    title: "Consultoría & IA",
    desc: "Arquitectura de software, modernización de sistemas e integración de inteligencia artificial en tus productos.",
  },
];

function Card({ icon, title, desc, i }: { icon: ReactNode; title: string; desc: string; i: number }) {
  return (
    <SpotlightCard className="group h-full p-7">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-[13px] flex items-center justify-center text-[var(--void)] shadow-[0_8px_22px_-10px_rgba(31,230,205,.6)] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" style={{ background: "var(--grad)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} width={22} height={22}>{icon}</svg>
        </div>
        <span className="font-mono text-[0.7rem] text-[var(--ether-dim)]">0{i + 1}</span>
      </div>
      <h3 className="text-[1.15rem] font-semibold mb-2" style={{ fontFamily: "var(--font-space)" }}>{title}</h3>
      <p className="text-[0.92rem] text-[var(--ether)] leading-relaxed">{desc}</p>
    </SpotlightCard>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="py-[clamp(72px,11vw,128px)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <SectionHeader
          eyebrow="Servicios"
          title={<>Todo lo que tu producto necesita para <span className="grad-text">crecer.</span></>}
          desc="Desde la idea hasta producción. Un solo equipo de ingeniería, responsable de extremo a extremo."
        />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => <Item key={s.title}><Card {...s} i={i} /></Item>)}
        </Stagger>
      </div>
    </section>
  );
}
