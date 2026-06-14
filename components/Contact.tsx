"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre  = (form.elements.namedItem("nombre")  as HTMLInputElement).value.trim();
    const email   = (form.elements.namedItem("email")   as HTMLInputElement).value.trim();
    const mensaje = (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value.trim();
    if (!nombre || !email || !mensaje) return alert("Completa los campos obligatorios: Nombre, Email y Mensaje.");

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls = "w-full bg-[rgba(17,17,42,.8)] border border-[var(--line)] rounded-xl text-[var(--moon)] text-[0.93rem] px-4 py-3 outline-none transition-all focus:border-[var(--ion)] focus:shadow-[0_0_0_3px_rgba(124,92,255,.15)] placeholder:text-[var(--ether-dim)]";
  const labelCls = "font-mono text-[0.7rem] tracking-[.1em] uppercase text-[var(--ether-dim)] mb-1.5 block";

  return (
    <section id="contacto" className="py-[clamp(72px,11vw,128px)] relative overflow-hidden border-t border-[var(--line)] text-center">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(55% 60% at 50% 35%,rgba(124,92,255,.22),transparent 65%)" }} />
      <div className="relative z-10 max-w-[760px] mx-auto px-5 md:px-10">
        <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[.28em] uppercase text-[var(--plasma)] before:content-[''] before:w-[22px] before:h-px before:bg-[var(--plasma)] before:opacity-60 justify-center">Contacto</span>
        <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold mt-5 mb-4 tracking-tight" style={{ fontFamily: "var(--font-space)" }}>
          ¿Listo para construir <span className="grad-text">tu próximo producto?</span>
        </h2>
        <p className="text-[var(--ether)] mb-8">Cuéntanos qué quieres construir. Te respondemos con una propuesta clara, sin compromiso.</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-8">
          <a href="https://wa.me/573226993891?text=Hola%20Lanxa%20Technology,%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noopener"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-[var(--void)] transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3z"/></svg>
            Escribir por WhatsApp
          </a>
          <a href="mailto:leonardecojt@gmail.com?subject=Quiero%20cotizar%20un%20proyecto%20con%20Lanxa%20Technology"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-[var(--line2)] text-[var(--moon)] hover:border-[var(--ion)] hover:bg-[rgba(124,92,255,.1)] transition-all hover:-translate-y-0.5">
            Enviar un correo
          </a>
        </div>

        <div className="flex flex-wrap gap-2 justify-center font-mono text-[0.84rem] text-[var(--ether)] mb-10">
          <a href="mailto:leonardecojt@gmail.com" className="hover:text-[var(--moon)] transition-colors">leonardecojt@gmail.com</a>
          <span>·</span>
          <span>Armenia, Colombia</span>
        </div>

        {/* Advisors */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {[
            { initials: "LG", name: "Leonardo Guzmán", role: "Fundador & CTO",            tel: "+573226993891", wa: "Leonardo" },
            { initials: "JR", name: "Julián Muñoz",    role: "CEO & Líder de Proyectos",  tel: "+573136817238", wa: "Juli%C3%A1n" },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-4 border border-[var(--line2)] rounded-2xl px-6 py-4 bg-[rgba(17,17,42,.6)] min-w-[260px] text-left">
              <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[var(--void)] text-[0.9rem]" style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)", fontFamily: "var(--font-space)" }}>
                {a.initials}
              </div>
              <div className="font-mono text-[0.78rem]">
                <div className="text-[var(--moon)] text-[0.88rem] font-semibold mb-0.5" style={{ fontFamily: "var(--font-space)" }}>{a.name}</div>
                <div className="text-[var(--plasma)] text-[0.65rem] tracking-[.12em] uppercase mb-1.5">{a.role}</div>
                <a href={`tel:${a.tel}`} className="text-[var(--ether)] block hover:text-[var(--moon)] transition-colors">{a.tel.replace("+57","+ 57 ").replace(/(\d{3})(\d{3})(\d{4})$/,"$1 $2 $3")}</a>
                <a href={`https://wa.me/${a.tel.replace("+","")}?text=Hola%20${a.wa},%20quiero%20información%20sobre%20los%20servicios%20de%20Lanxa%20Technology`} target="_blank" rel="noopener" className="text-[var(--ether)] hover:text-[var(--moon)] transition-colors">WhatsApp directo</a>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="text-left border border-[var(--line)] rounded-[22px] p-7 bg-[rgba(11,11,29,.6)]">
          {status === "success" ? (
            <div className="text-center py-8 font-mono text-[var(--plasma)] text-[0.95rem]">
              ✓ Mensaje enviado. Te respondemos en menos de 24 horas.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col"><label className={labelCls}>Nombre *</label><input name="nombre" className={inputCls} placeholder="Tu nombre completo" required /></div>
              <div className="flex flex-col"><label className={labelCls}>Empresa / Proyecto</label><input name="empresa" className={inputCls} placeholder="Nombre de tu empresa" /></div>
              <div className="flex flex-col"><label className={labelCls}>Email *</label><input name="email" type="email" className={inputCls} placeholder="tu@correo.com" required /></div>
              <div className="flex flex-col"><label className={labelCls}>Tipo de proyecto</label>
                <select name="tipo" className={inputCls + " cursor-pointer appearance-none"} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a78a0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "38px" }}>
                  <option value="">Selecciona una opción</option>
                  {["Aplicación web","App móvil","Aplicación de escritorio","API / Backend","Subcontratación / B2B","Consultoría técnica","Integración de IA","Otro"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col"><label className={labelCls}>Presupuesto</label>
                <select name="presupuesto" className={inputCls + " cursor-pointer appearance-none"} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a78a0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "38px" }}>
                  <option value="">Selecciona un rango</option>
                  {["Menos de $800 USD","$800 – $2,500 USD","$2,500 – $6,000 USD","Más de $6,000 USD","A definir / Lo conversamos"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col"><label className={labelCls}>Plazo estimado</label>
                <select name="plazo" className={inputCls + " cursor-pointer appearance-none"} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a78a0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "38px" }}>
                  <option value="">¿Cuándo lo necesitas?</option>
                  {["Lo antes posible","1 – 2 meses","2 – 4 meses","Más de 4 meses","Flexible"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col sm:col-span-2"><label className={labelCls}>Cuéntanos tu proyecto *</label>
                <textarea name="mensaje" className={inputCls + " resize-y min-h-[110px]"} placeholder="Describe brevemente qué quieres construir..." required />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button type="submit" disabled={status === "loading"}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-[var(--void)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: "linear-gradient(105deg,#7c5cff,#1fe6cd)" }}>
                  {status === "loading" ? "Enviando..." : <>Enviar propuesta <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={17} height={17}><path d="M5 12h14M13 6l6 6-6 6"/></svg></>}
                </button>
              </div>
              {status === "error" && <p className="sm:col-span-2 text-red-400 text-[0.85rem] font-mono">Error al enviar. Escríbenos a leonardecojt@gmail.com</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
