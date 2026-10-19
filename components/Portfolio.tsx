"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ComponentType, type MouseEvent } from "react";
import SectionHeader from "@/components/SectionHeader";
import { GanancIAMock, GymMatchMock, LeofitMock, ReservaYaMock, TradeSyncMock } from "@/components/Mockups";

type Project = {
  title: string; tag: string; desc: string; stack: string[]; cats: string[];
  Visual: ComponentType; featured?: boolean; accent: string;
};

const projects: Project[] = [
  {
    title: "TradeSync", tag: "FinTech · Python", featured: true, accent: "#3ddc97",
    desc: "Plataforma de trading algorítmico para Forex y VIX75: bot de señales, backtesting en MT5 y dashboard de P&L.",
    stack: ["Python", "MetaTrader 5", "Backtesting", "Dashboard"], cats: ["FinTech", "Web"], Visual: TradeSyncMock,
  },
  {
    title: "GanancIA", tag: "SaaS · IA", accent: "#8fa8ff",
    desc: "SaaS de rentabilidad para restaurantes en Latinoamérica, con un asistente de IA integrado para decisiones de negocio.",
    stack: ["SaaS", "Asistente IA", "Analítica"], cats: ["SaaS & IA", "Web"], Visual: GanancIAMock,
  },
  {
    title: "ReservaYa", tag: "Web · Angular", accent: "#ffc857",
    desc: "Sistema de reservas para restaurantes de extremo a extremo, con gestión de mesas en tiempo real.",
    stack: ["Angular", "Tiempo real", "Reservas"], cats: ["Web"], Visual: ReservaYaMock,
  },
  {
    title: "LEOFIT", tag: "E-commerce · React", accent: "#ff6b8b",
    desc: "Tienda en línea de suplementos deportivos con React + Vite, catálogo y carrito completos, en producción.",
    stack: ["React", "Vite", "E-commerce"], cats: ["E-commerce", "Web"], Visual: LeofitMock,
  },
  {
    title: "GymMatch", tag: "Social · Mobile", accent: "#6f93ff",
    desc: "App social-fitness para encontrar compañeros de entrenamiento, con perfiles, emparejamiento y landing de lanzamiento.",
    stack: ["App móvil", "Matching", "Landing"], cats: ["Móvil"], Visual: GymMatchMock,
  },
];

const MD_SPAN: Record<number, string> = { 1: "md:col-span-1", 2: "md:col-span-2" };
const LG_SPAN: Record<number, string> = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" };

const FILTERS = ["Todos", "Web", "Móvil", "SaaS & IA", "FinTech", "E-commerce"];

function ProjectCard({ p, big }: { p: Project; big: boolean }) {
  // Inclinación 3D + foco de luz que sigue al cursor
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    const k = big ? 0.35 : 1;
    el.style.setProperty("--rx", `${(0.5 - y) * 6 * k}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8 * k}deg`);
  };
  const onLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`project-card group relative h-full flex flex-col ${big ? "lg:grid lg:grid-cols-[1.45fr_1fr]" : ""} rounded-[24px] border border-[var(--line)] bg-gradient-to-b from-[rgba(18,26,51,.75)] to-[rgba(8,12,26,.85)] overflow-hidden`}
      style={{ ["--accent" as string]: p.accent }}
    >
      <div className={`relative aspect-[16/10] p-4 sm:p-5 overflow-hidden bg-[radial-gradient(80%_80%_at_50%_0%,rgba(79,124,255,.18),transparent_70%)]`}>
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(rgba(79,124,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(79,124,255,.07)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <p.Visual />
        </div>
      </div>
      <div className={`relative p-6 pt-5 border-t border-[var(--line)] ${big ? "lg:border-t-0 lg:border-l lg:p-10 lg:flex lg:flex-col lg:justify-center" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.72rem]" style={{ color: p.accent }}>{p.tag}</span>
          <span className="w-8 h-8 rounded-full border border-[var(--line2)] flex items-center justify-center text-[var(--ether)] transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-[var(--accent)] group-hover:text-[var(--moon)]">
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
        <h3 className={`${big ? "text-[clamp(1.35rem,2.6vw,2rem)]" : "text-[1.35rem]"} font-bold mt-2 mb-2 tracking-tight`} style={{ fontFamily: "var(--font-space)" }}>{p.title}</h3>
        <p className="text-[0.92rem] text-[var(--ether)] leading-relaxed">{p.desc}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li key={s} className="font-mono text-[0.66rem] text-[var(--ether)] border border-[var(--line2)] rounded-full px-2.5 py-1 bg-[rgba(18,26,51,.6)]">{s}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("Todos");
  const visible = projects.filter((p) => filter === "Todos" || p.cats.includes(filter));
  // La tarjeta de llamada a la acción rellena el hueco que quede en la última fila
  const regular = visible.filter((p) => !(p.featured && filter === "Todos")).length;
  const ctaSpan = `${MD_SPAN[2 - (regular % 2)]} ${LG_SPAN[3 - (regular % 3)]}`;

  return (
    <section id="portafolio" className="relative py-[clamp(72px,11vw,128px)] border-y border-[var(--line)] bg-[rgba(11,16,32,.4)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(50% 40% at 85% 10%,rgba(255,200,87,.10),transparent 70%)" }} />
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          <SectionHeader
            className="mb-0"
            eyebrow="Portafolio"
            title={<>Productos reales, <span className="grad-text">construidos de cero.</span></>}
            desc="Una muestra de lo que diseñamos y desarrollamos: plataformas de trading, SaaS con IA, reservas, e-commerce y apps móviles."
          />
          <div role="tablist" aria-label="Filtrar proyectos" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`relative px-4 py-2 rounded-full text-[0.82rem] font-medium transition-colors ${filter === f ? "text-[var(--void)]" : "text-[var(--ether)] hover:text-[var(--moon)] border border-[var(--line2)]"}`}
              >
                {filter === f && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full" style={{ background: "var(--grad)" }} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 [grid-auto-flow:dense]">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 90, damping: 18, delay: i * 0.1 }}
                className={p.featured && filter === "Todos" ? "md:col-span-2 lg:col-span-3" : ""}
              >
                <ProjectCard p={p} big={!!p.featured && filter === "Todos"} />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div
            layout
            key="cta"
            className={ctaSpan}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.5 }}
          >
            <a href="#contacto" className="group relative flex flex-col justify-between h-full min-h-[260px] rounded-[24px] border border-dashed border-[var(--line2)] p-7 overflow-hidden hover:border-[var(--plasma)] transition-colors">
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(255,200,87,.18),transparent_65%)] transition-transform duration-700 group-hover:scale-150" />
              <div className="relative">
                <span className="font-mono text-[0.72rem] text-[var(--plasma)]">Tu proyecto</span>
                <h3 className="text-[1.5rem] font-bold mt-3 mb-2 tracking-tight" style={{ fontFamily: "var(--font-space)" }}>El siguiente eres tú.</h3>
                <p className="text-[0.92rem] text-[var(--ether)] leading-relaxed">¿Tienes una idea? La convertimos en un producto sólido y listo para escalar.</p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 text-[var(--moon)] font-semibold">
                Empecemos
                <svg className="transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
