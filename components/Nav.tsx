"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#empresas", label: "Empresas" },
  { href: "#proceso", label: "Proceso" },
  { href: "#stack", label: "Stack" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#precios", label: "Precios" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
            <svg viewBox="0 0 40 40" width={30} height={30} aria-hidden="true">
              <defs>
                <linearGradient id="ag" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#7c5cff" />
                  <stop offset="1" stopColor="#1fe6cd" />
                </linearGradient>
              </defs>
              <path d="M9 31 L21 7 L26 7 L14 31 Z" fill="url(#ag)" />
              <path d="M18 31 L30 7 L35 7 L23 31 Z" fill="url(#ag)" opacity="0.55" />
            </svg>
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
              <a key={l.href} href={l.href} className="hover:text-[var(--moon)] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.92rem] font-semibold text-[var(--void)] transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}
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
          style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}
        >
          Hablemos
        </a>
      </div>
    </>
  );
}
