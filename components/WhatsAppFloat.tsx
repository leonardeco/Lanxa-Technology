const WA = "https://wa.me/573226993891?text=Hola%20Leonardo,%20quiero%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Lanxa%20Technology";

export default function WhatsAppFloat() {
  return (
    <a href={WA} target="_blank" rel="noopener" aria-label="Escribir por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <span className="hidden sm:block opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-[rgba(11,16,32,.95)] border border-[var(--line2)] rounded-full px-4 py-2 text-[0.85rem] font-semibold text-[var(--moon)] whitespace-nowrap shadow-lg" style={{ fontFamily: "var(--font-space)" }}>
        ¿Hablamos por WhatsApp?
      </span>
      <span className="w-14 h-14 rounded-full flex items-center justify-center bg-[#25d366] shadow-[0_6px_28px_-6px_rgba(37,211,102,.7)] transition-all group-hover:scale-110 group-hover:shadow-[0_12px_36px_-8px_rgba(37,211,102,.8)]">
        <svg viewBox="0 0 24 24" width={28} height={28} fill="white" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3z"/>
        </svg>
      </span>
    </a>
  );
}
