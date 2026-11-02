import { ImageResponse } from "next/og";

export const alt = "Lanxa Technology — Software a la medida con más de 2 años de experiencia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tarjeta que se ve al compartir el enlace en WhatsApp, LinkedIn, X, etc.
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "radial-gradient(60% 70% at 85% 15%, #1a2a66 0%, #070a16 60%)", color: "#eef2ff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 48 48">
            <path d="M6.5 43.5 L29.2 20.8" stroke="#4f7cff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M33.6 16.4 L26.2 19.6 L28.4 21.6 L30.4 23.8 Z" fill="#e3e9ff" />
            <path d="M37 2.5 C37.7 8 39.9 10.3 45.5 11 C39.9 11.7 37.7 14 37 19.5 C36.3 14 34.1 11.7 28.5 11 C34.1 10.3 36.3 8 37 2.5 Z" fill="#ffc857" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>Lanxa Technology</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Apuntamos alto.</div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#ffc857" }}>Software que escala.</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#b7c0de" }}>
            Aplicaciones web, móviles y de escritorio a la medida · +2 años de experiencia
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8a93b8" }}>Armenia, Colombia · LATAM y global</div>
      </div>
    ),
    size,
  );
}
