import HeroScene from "@/components/HeroScene";
import Counter from "@/components/Counter";

const WA_QUOTE = "https://wa.me/573226993891?text=Hola%20Lanxa%20Technology,%20quiero%20cotizar%20un%20proyecto";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden min-h-[100svh] flex items-center pt-28 pb-24 md:pt-32">
      {/* Fondo: nebulosa + escena animada */}
      <div className="absolute inset-0" style={{
        background:
          "radial-gradient(55% 50% at 78% 18%,rgba(31,230,205,.14),transparent 60%), radial-gradient(60% 60% at 30% 0%,rgba(124,92,255,.30),transparent 62%), radial-gradient(50% 40% at 60% 100%,rgba(124,92,255,.22),transparent 70%)",
      }} />
      <HeroScene />
      {/* Velo para legibilidad del texto */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(6,6,15,.55)_0%,rgba(6,6,15,.15)_45%,rgba(6,6,15,.0)_70%)] md:bg-[linear-gradient(90deg,rgba(6,6,15,.85)_0%,rgba(6,6,15,.55)_38%,rgba(6,6,15,0)_62%)]" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-[640px]">
          <div className="hero-in" style={{ ["--i" as string]: 0 }}>
            <span className="inline-flex items-center gap-2.5 text-[var(--ether)] border border-[var(--line2)] bg-[rgba(17,17,42,.65)] backdrop-blur px-4 py-1.5 rounded-full mb-7 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[var(--plasma)] animate-pulse-dot" />
              +5 años creando software a la medida
            </span>
          </div>

          <div className="hero-in" style={{ ["--i" as string]: 1 }}>
            <h1 className="text-[clamp(2.5rem,6.6vw,4.9rem)] font-bold leading-[1.02] tracking-[-0.03em]" style={{ fontFamily: "var(--font-space)" }}>
              Apuntamos alto.
              <br />
              <span className="grad-text">Entregamos software que escala.</span>
            </h1>
          </div>

          <div className="hero-in" style={{ ["--i" as string]: 2 }}>
            <p className="mt-6 text-[clamp(1.05rem,1.8vw,1.22rem)] text-[var(--ether)] max-w-[44ch] leading-relaxed">
              Diseñamos y construimos aplicaciones{" "}
              <strong className="text-[var(--moon)] font-semibold">web, móviles y de escritorio</strong> a la medida
              de tu negocio. Código sólido, arquitectura escalable y un equipo que responde.
            </p>
          </div>

          <div className="hero-in" style={{ ["--i" as string]: 3 }}>
            <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
              <a href={WA_QUOTE} target="_blank" rel="noopener" className="btn-primary">
                Iniciar un proyecto
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={17} height={17}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <a href="#portafolio" className="btn-ghost">
                Ver portafolio
              </a>
            </div>
          </div>

          <div className="hero-in" style={{ ["--i" as string]: 4 }}>
            <dl className="mt-12 grid grid-cols-3 max-w-[520px] border border-[var(--line)] rounded-2xl overflow-hidden bg-[rgba(11,11,29,.72)] backdrop-blur">
              {[
                { big: <Counter to={5} prefix="+" />, sub: "años de experiencia" },
                { big: "3", sub: "web · móvil · escritorio" },
                { big: <Counter to={100} suffix="%" />, sub: "código fuente tuyo" },
              ].map((c, i) => (
                <div key={i} className={`px-4 py-4 ${i > 0 ? "border-l border-[var(--line)]" : ""}`}>
                  <dt className="sr-only">{c.sub}</dt>
                  <dd className="text-[clamp(1.35rem,2.6vw,1.75rem)] font-bold text-[var(--moon)] leading-none" style={{ fontFamily: "var(--font-space)" }}>{c.big}</dd>
                  <dd aria-hidden="true" className="text-[0.66rem] text-[var(--ether-dim)] mt-2 font-mono leading-tight">{c.sub}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a href="#experiencia" aria-label="Seguir bajando" className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-[var(--ether-dim)] hover:text-[var(--moon)] transition-colors">
        <span className="font-mono text-[0.62rem] tracking-[.3em] uppercase">Scroll</span>
        <span className="w-[22px] h-[34px] rounded-full border border-current flex justify-center pt-1.5">
          <span className="w-1 h-1.5 rounded-full bg-current animate-scroll-dot" />
        </span>
      </a>
    </section>
  );
}
