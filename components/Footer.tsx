import Logo from "@/components/Logo";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#proceso", label: "Proceso" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--void)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12 grid gap-8 md:grid-cols-[1.2fr_1fr] items-start">
        <div>
          <div className="flex items-center gap-2.5 font-bold text-[1.1rem]" style={{ fontFamily: "var(--font-space)" }}>
            <Logo size={30} />
            Lanxa Technology
          </div>
          <p className="mt-4 text-[0.9rem] text-[var(--ether)] max-w-[42ch] leading-relaxed">
            Más de 5 años desarrollando aplicaciones web, móviles y de escritorio a la medida. Apuntamos a las estrellas, entregamos en tierra firme.
          </p>
        </div>
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end text-[0.9rem] text-[var(--ether)]">
          {links.map((l) => <a key={l.href} href={l.href} className="hover:text-[var(--moon)] transition-colors">{l.label}</a>)}
        </nav>
      </div>
      <div className="border-t border-[var(--line)]">
        <p className="max-w-[1200px] mx-auto px-5 md:px-10 py-5 font-mono text-[0.72rem] text-[var(--ether-dim)]">
          © {new Date().getFullYear()} Lanxa Technology · Ingeniería de software · Armenia, Colombia
        </p>
      </div>
    </footer>
  );
}
