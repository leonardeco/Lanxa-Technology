"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: { x: number; y: number; r: number; s: number; a: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.min(100, Math.floor(canvas.width / 13));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        s: Math.random() * 0.35 + 0.08,
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const st of stars) {
        st.y -= st.s;
        if (st.y < -2) { st.y = canvas.height + 2; st.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,177,216,${st.a})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-[clamp(120px,16vw,180px)] pb-[clamp(70px,10vw,120px)]">
      {/* Background */}
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(60% 55% at 50% 0%,rgba(124,92,255,.28),transparent 60%), radial-gradient(40% 40% at 85% 25%,rgba(31,230,205,.12),transparent 60%)"
      }} />
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: "linear-gradient(rgba(124,92,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(124,92,255,.07) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        WebkitMaskImage: "radial-gradient(circle at 50% 25%,#000,transparent 68%)",
        maskImage: "radial-gradient(circle at 50% 25%,#000,transparent 68%)",
      }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 grid md:grid-cols-[1.05fr_.95fr] gap-10 items-center">
        <div className="text-center md:text-left">
          {/* Status */}
          <span className="inline-flex items-center gap-2 text-[var(--ether)] border border-[var(--line)] bg-[rgba(17,17,42,.6)] px-4 py-1.5 rounded-full mb-6 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--plasma)] animate-pulse-dot" />
            Disponible para nuevos proyectos
          </span>

          <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-bold leading-tight tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
            Software que<br />
            <span className="grad-text">escala contigo.</span>
          </h1>

          <p className="mt-6 text-[clamp(1.05rem,2vw,1.25rem)] text-[var(--ether)] max-w-[33ch] mx-auto md:mx-0">
            Diseñamos y construimos aplicaciones{" "}
            <strong className="text-[var(--moon)]">web, de escritorio y móviles</strong> a la medida.
            Código sólido, arquitectura escalable.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="https://wa.me/573226993891?text=Hola%20Lanxa%20Technology,%20quiero%20cotizar%20un%20proyecto"
              target="_blank" rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-[var(--void)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(31,230,205,.6)]"
              style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}
            >
              Iniciar un proyecto
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={17} height={17}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#servicios" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-[var(--line2)] text-[var(--moon)] hover:border-[var(--ion)] hover:bg-[rgba(124,92,255,.1)] transition-all hover:-translate-y-0.5">
              Ver servicios
            </a>
          </div>

          {/* Telemetry */}
          <div className="mt-10 grid grid-cols-3 border border-[var(--line)] rounded-2xl overflow-hidden">
            {[
              { big: "Full-stack", sub: "front · back · infra" },
              { big: "Stack 2026", sub: "tecnología vigente" },
              { big: "LATAM + Global", sub: "remoto, sin fronteras" },
            ].map((c, i) => (
              <div key={i} className={`px-4 py-4 bg-[rgba(11,11,29,.7)] ${i > 0 ? "border-l border-[var(--line)]" : ""}`}>
                <div className="text-[1.1rem] font-semibold text-[var(--moon)]" style={{ fontFamily: "var(--font-space)" }}>{c.big}</div>
                <div className="text-[0.65rem] text-[var(--ether-dim)] mt-1 font-mono">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Orbital — hidden on mobile */}
        <div className="hidden md:flex items-center justify-center min-h-[340px]">
          <svg className="animate-lift w-[min(380px,80vw)] aspect-square" viewBox="0 0 360 360">
            <defs>
              <radialGradient id="glow" cx="50%" cy="42%" r="55%">
                <stop offset="0" stopColor="#7c5cff" stopOpacity="0.4" />
                <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ag2" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#7c5cff" />
                <stop offset="1" stopColor="#1fe6cd" />
              </linearGradient>
            </defs>
            <circle cx="180" cy="180" r="165" fill="url(#glow)" />
            <ellipse className="animate-spin-slow" style={{ transformOrigin: "180px 180px" }} cx="180" cy="180" rx="160" ry="62" fill="none" stroke="#7c5cff" strokeWidth="1" opacity="0.45" />
            <ellipse className="animate-spin-slower" style={{ transformOrigin: "180px 180px" }} cx="180" cy="180" rx="128" ry="158" fill="none" stroke="#1fe6cd" strokeWidth="1" opacity="0.32" />
            <circle cx="180" cy="180" r="126" fill="none" stroke="url(#ag2)" strokeWidth="1.5" opacity="0.55" />
            <path d="M150 248 L196 112 L214 112 L168 248 Z" fill="url(#ag2)" />
            <path d="M178 248 L224 112 L242 112 L196 248 Z" fill="url(#ag2)" opacity="0.55" />
            <g className="animate-orbit" style={{ transformOrigin: "180px 180px" }}>
              <circle cx="340" cy="180" r="6" fill="#1fe6cd" />
            </g>
            <g className="animate-orbit" style={{ transformOrigin: "180px 180px", animationDuration: "22s" }}>
              <circle cx="180" cy="34" r="4" fill="#9d85ff" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
