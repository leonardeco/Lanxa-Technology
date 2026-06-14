"use client";
import { useState } from "react";

const advisors = [
  { initials: "LG", name: "Leonardo Guzmán", role: "Fundador & CTO",           wa: "573226993891", msg: "Hola%20Leonardo,%20quiero%20información%20sobre%20los%20servicios%20de%20Lanxa%20Technology" },
  { initials: "JR", name: "Julián Muñoz",    role: "CEO & Líder de Proyectos", wa: "573136817238", msg: "Hola%20Juli%C3%A1n,%20quiero%20información%20sobre%20los%20servicios%20de%20Lanxa%20Technology" },
];

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Menu */}
      <div className={`flex flex-col gap-2 items-end transition-all duration-300 ${open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-3"}`}>
        {advisors.map((a) => (
          <a key={a.name} href={`https://wa.me/${a.wa}?text=${a.msg}`} target="_blank" rel="noopener"
            className="flex items-center gap-3 bg-[rgba(11,11,29,.95)] border border-[var(--line2)] rounded-full px-4 py-2 text-[var(--moon)] whitespace-nowrap shadow-lg transition-all hover:border-[#25d366] hover:bg-[rgba(37,211,102,.08)] hover:-translate-x-1"
            style={{ fontFamily: "var(--font-space)" }}>
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[0.68rem] font-bold text-[var(--void)]" style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}>
              {a.initials}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.85rem] font-semibold">{a.name}</span>
              <span className="text-[0.62rem] text-[var(--ether-dim)] font-mono">{a.role}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Button */}
      <button onClick={() => setOpen(!open)} aria-label="Contactar por WhatsApp" aria-expanded={open}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_6px_28px_-6px_rgba(37,211,102,.7)] transition-all hover:scale-110 hover:shadow-[0_12px_36px_-8px_rgba(37,211,102,.8)]"
        style={{ background: open ? "#128c5e" : "#25d366" }}>
        <svg viewBox="0 0 24 24" width={28} height={28} fill="white" className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3z"/>
        </svg>
      </button>
    </div>
  );
}
