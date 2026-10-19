"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#proceso", label: "Proceso" },
  { href: "#empresas", label: "Empresas" },
  { href: "#stack", label: "Stack" },
  { href: "#precios", label: "Precios" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resalta el enlace de la sección visible
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => { const el = document.querySelector(l.href); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-[var(--line)] bg-[rgba(6,6,15,0.85)] backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="#top" className="flex items-center gap-2 font-bold text-[1.1rem]" style={{ fontFamily: "var(--font-space)" }}>
            <Logo size={34} animated />
            <span>
              Lanxa{" "}
              <span className="text-[var(--ether-dim)] font-mono text-[0.55rem] tracking-widest uppercase ml-1">
                Technology
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex gap-8 text-[0.92rem] text-[var(--ether)]">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={`relative py-1 transition-colors hover:text-[var(--moon)] ${active === l.href ? "text-[var(--moon)]" : ""} after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-[var(--plasma)] after:transition-all after:duration-300 ${active === l.href ? "after:w-full" : "after:w-0"}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.92rem] font-semibold text-[var(--void)] transition-all hover:-translate-y-0.5"
            style={{ background: "var(--grad)" }}
          >
            Hablemos
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2 rounded-xl hover:bg-[rgba(124,92,255,0.1)] transition-colors"
          >
            <span className={`block h-0.5 bg-[var(--moon)] rounded transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-0.5 bg-[var(--moon)] rounded transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-[var(--moon)] rounded w-[65%] transition-all duration-300 ${open ? "!w-full -translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-[rgba(6,6,15,0.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            className="text-[1.6rem] font-bold text-[var(--ether)] hover:text-[var(--moon)] transition-colors"
            style={{ fontFamily: "var(--font-space)" }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={close}
          className="mt-4 px-8 py-3 rounded-xl font-semibold text-[var(--void)] text-lg"
          style={{ background: "var(--grad)" }}
        >
          Hablemos
        </a>
      </div>
    </>
  );
}
