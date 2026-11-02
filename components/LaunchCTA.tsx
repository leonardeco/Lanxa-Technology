import { Reveal } from "@/components/Reveal";

// Posiciones fijas para que el render del servidor y del cliente coincidan.
const STARS = [
  [8, 22, 2], [16, 70, 1.5], [27, 38, 1], [36, 82, 2], [44, 16, 1.5], [57, 64, 1], [63, 28, 2],
  [71, 78, 1.5], [79, 18, 1], [86, 56, 2], [93, 34, 1.5], [12, 48, 1], [50, 90, 1.5], [68, 50, 1],
];

const WA = "https://wa.me/573226993891?text=Hola%20Lanxa%20Technology,%20tengo%20una%20idea%20y%20quiero%20cotizarla";

export default function LaunchCTA() {
  return (
    <section className="px-5 md:px-10 py-[clamp(48px,8vw,96px)]">
      <Reveal className="max-w-[1200px] mx-auto">
        <div className="glow-border relative overflow-hidden rounded-[32px] px-6 py-16 md:px-16 md:py-20 text-center bg-[radial-gradient(70%_120%_at_50%_0%,#1b2a6b_0%,#0b1020_65%)]">
          {STARS.map(([x, y, r], i) => (
            <span key={i} className="absolute rounded-full bg-white animate-twinkle" style={{ left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2, animationDelay: `${(i % 5) * 0.6}s` }} />
          ))}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-40 w-[720px] h-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(255,200,87,.35),transparent)] pointer-events-none" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[.28em] uppercase text-[var(--plasma)]">
              ✦ Tu próximo lanzamiento
            </span>
            <h2 className="mt-5 text-[clamp(2.2rem,5.6vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.03em]" style={{ fontFamily: "var(--font-space)" }}>
              ¿Tienes una idea?
              <br />
              <span className="grad-text">Lancémosla a las estrellas.</span>
            </h2>
            <p className="mt-5 mx-auto max-w-[52ch] text-[var(--ether)] text-[1.05rem] leading-relaxed">
              Cuéntanos qué quieres construir y en menos de 24 horas te respondemos con una propuesta clara, sin compromiso.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WA} target="_blank" rel="noopener" className="btn-primary text-[1.02rem] px-8 py-4">
                Cotizar por WhatsApp
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={18} height={18}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <a href="#contacto" className="btn-ghost text-[1.02rem] px-8 py-4">Escribir un mensaje</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
