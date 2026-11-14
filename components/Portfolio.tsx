"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, type ComponentType, type MouseEvent } from "react";
import SectionHeader from "@/components/SectionHeader";
import { BrowserFrame, GanancIAMock, GymMatchMock, LeofitMock, ReservaYaMock } from "@/components/Mockups";

type Status = "En línea" | "Beta" | "En desarrollo" | "Completado" | "Cliente";

type Project = {
  title: string; tag: string; desc: string; stack: string[]; cats: string[]; accent: string;
  status: Status;
  /** Captura real (1440×900) en /public/projects; si no hay, se usa la vista animada `Visual`. */
  image?: string; url?: string; Visual?: ComponentType;
  demo?: string; featured?: boolean; highlights?: string[];
  /** Texto del botón; por defecto "Ver demo en vivo". Los sitios ya en producción usan otro. */
  cta?: string;
};

const projects: Project[] = [
  {
    title: "Guía de Estudio Magisterio", tag: "EdTech · Plataforma de pago", status: "En línea", featured: true, accent: "#7fb0ff",
    image: "/projects/guia-magisterio.png", url: "magisterioguiaestudio.com", demo: "https://www.magisterioguiaestudio.com", cta: "Visitar el sitio",
    desc: "Plataforma para preparar el concurso docente en Colombia: cuentas, pase anual con pago en línea y todo el material del curso protegido. Primaria en línea; secundaria y media en creación.",
    highlights: ["Pagos reales con Wompi: PSE, Nequi y tarjeta", "184 clases, 129 documentos y 197 preguntas con fuente", "Material protegido con enlaces que vencen", "Panel de administración y 122 pruebas automatizadas"],
    stack: ["Astro 5", "TypeScript", "React 19", "Neon", "Wompi"], cats: ["Educación", "SaaS", "Web"],
  },
  {
    title: "MenuFlow", tag: "SaaS · Restaurantes", status: "Beta", featured: true, accent: "#ff7aa8",
    image: "/projects/menuflow.png", url: "menu-flow-navy.vercel.app", demo: "https://menu-flow-navy.vercel.app",
    desc: "SaaS multi-restaurante: pedidos web, QR de mesa y cocina en tiempo real, con registro, prueba gratuita de 14 días y suscripción.",
    highlights: ["265 pruebas automatizadas", "API documentada con OpenAPI", "Datos aislados por restaurante", "Cobro con Wompi o WhatsApp"],
    stack: ["Next.js 15", "TypeScript", "Prisma", "Neon", "Tailwind"], cats: ["SaaS", "Web"],
  },
  {
    title: "Pulso Entrenadores", tag: "SaaS · Fitness", status: "Beta", accent: "#ff9f5a",
    image: "/projects/pulso.png", url: "pulso-seven-tau.vercel.app", demo: "https://pulso-seven-tau.vercel.app",
    desc: "La app del entrenador personal: agenda, clientes, rutinas, alimentación y el cobro de cada mes. Cada cliente entra y consulta solo lo suyo.",
    stack: ["Angular 21", "TypeScript", "Neon", "Vitest", "Playwright"], cats: ["SaaS", "Web", "Móvil"],
  },
  {
    title: "Guía Interactiva del Quindío", tag: "Turismo · App web", status: "En línea", accent: "#3ddc97",
    image: "/projects/quindio.png", url: "guia-interactivo-quindio.vercel.app", demo: "https://guia-interactivo-quindio.vercel.app",
    desc: "El departamento en el celular: mapa de los doce municipios, seis guías temáticos, rutas cortas y pasaporte de sellos, en 25 idiomas y lista para instalar.",
    stack: ["TypeScript", "PWA", "Mapas", "25 idiomas"], cats: ["Web", "Móvil"],
  },
  {
    title: "NEXA Sports Nutrition", tag: "E-commerce · IA", status: "Beta", accent: "#3ddc97",
    image: "/projects/nexa.png", url: "nexa-sports-nutrition-web.vercel.app", demo: "https://nexa-sports-nutrition-web.vercel.app",
    desc: "Tienda de suplementos con pagos en línea (PSE, Nequi y tarjeta vía Wompi) y un asistente de ventas que consulta el catálogo real.",
    stack: ["Next.js 15", "Prisma", "pgvector", "Wompi"], cats: ["E-commerce", "IA", "Web"],
  },
  {
    title: "BarberAD", tag: "SaaS · Barberías", status: "En desarrollo", accent: "#ffc857",
    desc: "La caja de una barbería en el celular: carta de servicios, equipo, cobro de cada corte con propina aparte y cierre del día. Cada barbero ve solo sus cortes y su comisión.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"], cats: ["SaaS", "Web", "Móvil"],
  },
  {
    title: "MT5 Señales", tag: "FinTech · Python", status: "Beta", accent: "#ffc857",
    image: "/projects/mt5-signals.png", url: "mt5-signals.vercel.app", demo: "https://mt5-signals.vercel.app",
    desc: "Radar de señales para MetaTrader 5 con gestión de riesgo en el servidor, kill switch diario y backtest con spread y comisión.",
    stack: ["Python", "FastAPI", "WebSockets", "MetaTrader 5"], cats: ["FinTech", "Web"],
  },
  {
    title: "Altaira Group", tag: "Web · Cliente", status: "Cliente", accent: "#8fa8ff",
    image: "/projects/altaira.png", url: "altaira-group",
    desc: "Sitio para una consultora de ingeniería geográfica y ambiental: ocho servicios, SEO con datos estructurados y contacto directo por WhatsApp.",
    stack: ["Next.js 16", "React 19", "TypeScript"], cats: ["Web"],
  },
  {
    title: "NightTable CO", tag: "Marketplace · SaaS", status: "En desarrollo", accent: "#c08bff",
    desc: "Marketplace de food & nightlife en Colombia: descubrir y reservar restaurantes, bares y discotecas, con un SaaS multi-sede para los locales.",
    stack: ["Next.js 15", "Fastify 5", "PostgreSQL 16", "TypeScript"], cats: ["SaaS", "Web"],
  },
  {
    title: "GanancIA", tag: "SaaS · IA", status: "En desarrollo", accent: "#8fa8ff", Visual: GanancIAMock,
    desc: "Convierte los datos de un restaurante en decisiones: KPIs, ingeniería de menú, alertas de fugas y un asistente IA que responde en lenguaje natural.",
    stack: ["Next.js", "Fastify", "PostgreSQL", "Claude API"], cats: ["SaaS", "IA"],
  },
  {
    title: "BioFit", tag: "Salud · IA", status: "Completado", accent: "#3ddc97",
    desc: "Dashboard para entrenadores y nutricionistas: registra bioimpedancia, calcula IMC y metabolismo basal, y genera planes de entrenamiento y nutrición con IA.",
    stack: ["Next.js 16", "TypeScript", "Tailwind 4", "Claude API"], cats: ["IA", "Web"],
  },
  {
    title: "OptiAgenda", tag: "API · Java", status: "Completado", accent: "#ff7aa8",
    desc: "API REST de agendamiento de citas con autenticación JWT, roles de administrador, profesional y cliente, validación de conflictos de horario y Swagger.",
    stack: ["Java 17", "Spring Boot 3", "JWT", "MySQL", "Swagger"], cats: ["Backend"],
  },
  {
    title: "ReservaYa", tag: "Web · Angular", status: "Completado", accent: "#ffc857", Visual: ReservaYaMock,
    desc: "Búsqueda de restaurantes, reserva con confirmación y panel administrativo. Desarrollado en equipo.",
    stack: ["Angular", "Signals", "Tailwind", "Vitest"], cats: ["Web"],
  },
  {
    title: "Luma", tag: "E-commerce · Next.js", status: "Completado", accent: "#ffb3d1",
    desc: "Tienda de un solo producto, un serum de vitamina C, con precios en pesos y pedido armado directo a WhatsApp.",
    stack: ["Next.js", "TypeScript"], cats: ["E-commerce", "Web"],
  },
  {
    title: "LEOFIT", tag: "E-commerce · React", status: "Completado", accent: "#ff6b8b", Visual: LeofitMock,
    url: "sports-store-ruby.vercel.app", demo: "https://sports-store-ruby.vercel.app",
    desc: "E-commerce con más de 127 productos, filtros, carrito persistente y pedido automático por WhatsApp. Base de lo que hoy es NEXA.",
    stack: ["React", "Vite", "Tailwind"], cats: ["E-commerce", "Web"],
  },
  {
    title: "GymMatch", tag: "Social · Mobile", status: "Completado", accent: "#6f93ff", Visual: GymMatchMock,
    desc: "App social-fitness para encontrar compañeros de entrenamiento, con perfiles, emparejamiento y landing de lanzamiento.",
    stack: ["App móvil", "Matching", "Landing"], cats: ["Móvil"],
  },
];

const STATUS_STYLE: Record<Status, string> = {
  "En línea": "text-[#3ddc97] border-[rgba(61,220,151,.4)] bg-[rgba(61,220,151,.08)]",
  Beta: "text-[#3ddc97] border-[rgba(61,220,151,.4)] bg-[rgba(61,220,151,.08)]",
  Cliente: "text-[var(--plasma)] border-[rgba(255,200,87,.4)] bg-[rgba(255,200,87,.08)]",
  "En desarrollo": "text-[var(--ion-soft)] border-[rgba(143,168,255,.4)] bg-[rgba(143,168,255,.08)]",
  Completado: "text-[var(--ether)] border-[var(--line2)] bg-[rgba(20,28,58,.6)]",
};

const MD_SPAN: Record<number, string> = { 1: "md:col-span-1", 2: "md:col-span-2" };
const LG_SPAN: Record<number, string> = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" };

const FILTERS = ["Todos", "Educación", "Web", "SaaS", "IA", "E-commerce", "FinTech", "Móvil", "Backend"];

function Screenshot({ p, big }: { p: Project; big: boolean }) {
  return (
    <BrowserFrame url={p.url ?? ""}>
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={p.image!}
          alt={`Captura de ${p.title}`}
          fill
          sizes={big ? "(min-width:1024px) 680px, 100vw" : "(min-width:1024px) 380px, (min-width:768px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
        />
      </div>
    </BrowserFrame>
  );
}

/** Portada para proyectos sin captura pública: el nombre sobre el color del proyecto. */
function Portada({ p }: { p: Project }) {
  return (
    <BrowserFrame url={p.url ?? p.title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="relative grid h-full w-full place-items-center overflow-hidden" style={{ background: `radial-gradient(70% 70% at 50% 40%, color-mix(in srgb, ${p.accent} 35%, transparent), transparent 75%)` }}>
        <div className="text-center">
          <p className="text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-tight text-[var(--moon)]" style={{ fontFamily: "var(--font-space)" }}>{p.title}</p>
          <p className="mt-2 font-mono text-[0.7rem] text-[var(--ether)]">{p.stack.slice(0, 3).join(" · ")}</p>
        </div>
      </div>
    </BrowserFrame>
  );
}

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
      className={`project-card group relative h-full flex flex-col ${big ? "lg:grid lg:grid-cols-[1.45fr_1fr]" : ""} rounded-[24px] border border-[var(--line)] bg-gradient-to-b from-[rgba(20,28,58,.75)] to-[rgba(8,12,26,.85)] overflow-hidden`}
      style={{ ["--accent" as string]: p.accent }}
    >
      <div className="relative aspect-[16/10] p-4 sm:p-5 overflow-hidden" style={{ background: `radial-gradient(80% 80% at 50% 0%, color-mix(in srgb, ${p.accent} 22%, transparent), transparent 70%)` }}>
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(rgba(91,134,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(91,134,255,.07)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          {p.image ? <Screenshot p={p} big={big} /> : p.Visual ? <p.Visual /> : <Portada p={p} />}
        </div>
      </div>
      <div className={`relative flex-1 flex flex-col p-6 pt-5 border-t border-[var(--line)] ${big ? "lg:border-t-0 lg:border-l lg:p-10 lg:justify-center" : ""}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.72rem]" style={{ color: p.accent }}>{p.tag}</span>
          <span className={`font-mono text-[0.62rem] uppercase tracking-[.12em] border rounded-full px-2.5 py-1 whitespace-nowrap ${STATUS_STYLE[p.status]}`}>
            {(p.status === "Beta" || p.status === "En línea") && <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 align-middle animate-pulse" />}
            {p.status}
          </span>
        </div>
        <h3 className={`${big ? "text-[clamp(1.5rem,2.8vw,2.2rem)]" : "text-[1.35rem]"} font-bold mt-2 mb-2 tracking-tight`} style={{ fontFamily: "var(--font-space)" }}>{p.title}</h3>
        <p className="text-[0.92rem] text-[var(--ether)] leading-relaxed">{p.desc}</p>
        {big && p.highlights && (
          <ul className="mt-5 grid sm:grid-cols-2 gap-x-4 gap-y-2 text-[0.84rem] text-[var(--moon)]">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2"><span className="text-[var(--plasma)]">✦</span>{h}</li>
            ))}
          </ul>
        )}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <li key={s} className="font-mono text-[0.66rem] text-[var(--ether)] border border-[var(--line2)] rounded-full px-2.5 py-1 bg-[rgba(20,28,58,.6)]">{s}</li>
          ))}
        </ul>
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noopener" className={`mt-5 self-start text-[0.9rem] ${big ? "btn-primary" : "inline-flex items-center gap-2 font-semibold text-[var(--moon)] hover:text-[var(--plasma)] transition-colors"}`}>
            {p.cta ?? "Ver demo en vivo"}
            <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M7 17L17 7M9 7h8v8" /></svg>
          </a>
        )}
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
            desc="Productos propios y trabajo para clientes, con capturas reales y demos que puedes probar ahora mismo."
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
