import type { CSSProperties, ReactNode } from "react";

/*
 * Vistas animadas de cada proyecto del portafolio, dibujadas en SVG para que
 * escalen nítidas y pesen poco. Las animaciones (clases mk-*) están en globals.css.
 */

const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
const T = { fontFamily: "var(--font-mono)" } as const;
const H = { fontFamily: "var(--font-space)" } as const;

export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="mk-frame w-full h-full rounded-[14px] border border-[var(--line2)] bg-[#080c1a] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] flex flex-col">
      <div className="flex items-center gap-1.5 px-3 h-7 border-b border-[var(--line)] bg-[#0d1328] shrink-0">
        <i className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <i className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <i className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 max-w-[220px] h-4 rounded-full bg-[rgba(79,124,255,.12)] text-[0.55rem] font-mono text-[var(--ether-dim)] flex items-center px-2.5 truncate">{url}</span>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

/* ---------- TradeSync: dashboard de trading ---------- */
const CANDLES = [
  [150, 132, 160, 128], [132, 140, 145, 126], [140, 118, 146, 112], [118, 124, 130, 110],
  [124, 104, 128, 98], [104, 112, 118, 100], [112, 96, 116, 90], [96, 102, 108, 88],
  [102, 84, 106, 78], [84, 90, 96, 80], [90, 74, 94, 68], [74, 80, 86, 70],
  [80, 64, 84, 58], [64, 70, 76, 60], [70, 56, 74, 50], [56, 60, 66, 48],
]; // [open, close, low(y alto), high(y bajo)] en coordenadas SVG

export function TradeSyncMock() {
  return (
    <BrowserFrame url="app.tradesync.io/dashboard">
      <svg viewBox="0 0 480 262" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="480" height="262" fill="#080c1a" />
        {/* Barra lateral */}
        <rect width="44" height="262" fill="#0b1022" />
        {[24, 54, 84, 114].map((y, i) => <rect key={y} x="13" y={y} width="18" height="18" rx="5" fill={i === 0 ? "#4f7cff" : "#1a2340"} />)}
        {/* Cabecera */}
        <text x="60" y="30" fill="#eef2ff" fontSize="13" fontWeight="700" style={H}>EUR/USD</text>
        <text x="128" y="30" fill="#3ddc97" fontSize="11" style={T}>1.0842 ▲ 0.38%</text>
        <rect x="246" y="18" width="40" height="16" rx="8" fill="rgba(255,200,87,.14)" />
        <text x="266" y="29.5" fill="#ffc857" fontSize="8" textAnchor="middle" style={T}>H1</text>
        {/* Gráfico */}
        {[60, 100, 140, 180].map((y) => <line key={y} x1="56" x2="320" y1={y} y2={y} stroke="#1a2340" strokeDasharray="2 4" />)}
        {CANDLES.map(([o, c, lo, hi], i) => {
          const x = 66 + i * 15.5;
          const up = c < o;
          const col = up ? "#3ddc97" : "#ff6b8b";
          return (
            <g key={i} className="mk-pop" style={d(i * 0.14)}>
              <line x1={x + 4} x2={x + 4} y1={hi} y2={lo} stroke={col} strokeWidth="1" />
              <rect x={x} y={Math.min(o, c)} width="8" height={Math.max(2, Math.abs(o - c))} rx="1.5" fill={col} />
            </g>
          );
        })}
        <polyline className="mk-draw" points="60,170 90,160 120,150 150,140 180,128 210,120 240,104 270,96 300,80 318,70"
          fill="none" stroke="#8fa8ff" strokeWidth="2" strokeLinecap="round" style={{ ["--len" as string]: 300 } as CSSProperties} />
        {/* Volumen */}
        {CANDLES.map((_, i) => <rect key={i} className="mk-grow" style={d(0.4 + i * 0.08)} x={66 + i * 15.5} y={226 - ((i * 37) % 22) - 8} width="8" height={((i * 37) % 22) + 8} fill="rgba(79,124,255,.35)" rx="1" />)}
        {/* Panel de señales */}
        <rect x="332" y="14" width="136" height="234" rx="10" fill="#0d1328" stroke="#1a2340" />
        <text x="344" y="34" fill="#8a93b8" fontSize="8" style={T}>P&amp;L HOY</text>
        <text x="344" y="58" fill="#eef2ff" fontSize="20" fontWeight="700" style={H}>+12.4%</text>
        <text x="344" y="84" fill="#8a93b8" fontSize="8" style={T}>SEÑALES</text>
        {[
          ["BUY", "EUR/USD", "+38p", "#3ddc97"],
          ["SELL", "VIX75", "+21p", "#ff6b8b"],
          ["BUY", "GBP/JPY", "+14p", "#3ddc97"],
          ["HOLD", "XAU/USD", "—", "#8fa8ff"],
        ].map(([a, p, g, c], i) => (
          <g key={p} className="mk-slide" style={d(0.6 + i * 0.35)}>
            <rect x="342" y={94 + i * 36} width="116" height="28" rx="7" fill="#121a33" />
            <circle className="mk-blink" style={d(i * 0.5)} cx="353" cy={108 + i * 36} r="3" fill={c} />
            <text x="362" y={106 + i * 36} fill={c} fontSize="8" fontWeight="700" style={T}>{a}</text>
            <text x="362" y={116 + i * 36} fill="#b7c0de" fontSize="7" style={T}>{p}</text>
            <text x="450" y={112 + i * 36} fill="#eef2ff" fontSize="8" textAnchor="end" style={T}>{g}</text>
          </g>
        ))}
      </svg>
    </BrowserFrame>
  );
}

/* ---------- GanancIA: SaaS de rentabilidad con IA ---------- */
export function GanancIAMock() {
  const bars = [48, 62, 55, 74, 68, 88, 96];
  return (
    <BrowserFrame url="ganancia.app/panel">
      <svg viewBox="0 0 480 262" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="480" height="262" fill="#080c1a" />
        <text x="18" y="28" fill="#eef2ff" fontSize="13" fontWeight="700" style={H}>Restaurante La 70</text>
        <text x="18" y="42" fill="#8a93b8" fontSize="8" style={T}>Resumen · últimos 7 días</text>
        {[
          ["MARGEN", "32%", "#ffc857"],
          ["VENTAS", "$48.2M", "#eef2ff"],
          ["COSTO/PLATO", "−6%", "#8fa8ff"],
        ].map(([k, v, c], i) => (
          <g key={k} className="mk-slide" style={d(i * 0.2)}>
            <rect x={18 + i * 92} y="54" width="84" height="50" rx="9" fill="#121a33" stroke="#1a2340" />
            <text x={28 + i * 92} y="72" fill="#8a93b8" fontSize="7" style={T}>{k}</text>
            <text x={28 + i * 92} y="94" fill={c} fontSize="16" fontWeight="700" style={H}>{v}</text>
          </g>
        ))}
        <rect x="18" y="114" width="268" height="134" rx="10" fill="#0d1328" stroke="#1a2340" />
        <text x="30" y="132" fill="#b7c0de" fontSize="8" style={T}>Utilidad diaria</text>
        {bars.map((b, i) => (
          <rect key={i} className="mk-grow" style={d(0.3 + i * 0.12)} x={34 + i * 35} y={236 - b} width="22" height={b} rx="4"
            fill={i === bars.length - 1 ? "url(#gi-bar)" : "rgba(79,124,255,.45)"} />
        ))}
        <defs>
          <linearGradient id="gi-bar" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#4f7cff" /><stop offset="1" stopColor="#ffc857" /></linearGradient>
        </defs>
        {/* Asistente IA */}
        <rect x="298" y="14" width="168" height="234" rx="12" fill="#0d1328" stroke="#26305a" />
        <circle cx="316" cy="34" r="8" fill="url(#gi-bar)" />
        <text x="330" y="37.5" fill="#eef2ff" fontSize="9" fontWeight="700" style={H}>Asistente IA</text>
        <g className="mk-slide" style={d(0.4)}>
          <rect x="350" y="56" width="104" height="30" rx="10" fill="#4f7cff" />
          <text x="358" y="69" fill="#fff" fontSize="7" style={T}>¿Cómo subo mi</text>
          <text x="358" y="79" fill="#fff" fontSize="7" style={T}>margen este mes?</text>
        </g>
        <g className="mk-slide" style={d(1.2)}>
          <rect x="310" y="96" width="138" height="92" rx="10" fill="#142046" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} className="mk-type" style={d(1.6 + i * 0.35)} x="320" y={108 + i * 14} width={[118, 104, 112, 86, 64][i]} height="6" rx="3"
              fill={i === 0 ? "#ffc857" : "#34407a"} />
          ))}
        </g>
        <g>
          <rect x="310" y="214" width="144" height="24" rx="12" fill="#121a33" stroke="#26305a" />
          {[0, 1, 2].map((i) => <circle key={i} className="mk-blink" style={d(i * 0.2)} cx={326 + i * 9} cy="226" r="2.4" fill="#8fa8ff" />)}
        </g>
      </svg>
    </BrowserFrame>
  );
}

/* ---------- ReservaYa: plano de mesas en tiempo real ---------- */
export function ReservaYaMock() {
  const tables = [
    [60, 70, "r"], [130, 70, "r"], [200, 70, "c"], [270, 70, "r"],
    [60, 150, "c"], [130, 150, "r"], [200, 150, "r"], [270, 150, "c"],
    [95, 215, "w"], [235, 215, "w"],
  ] as const;
  return (
    <BrowserFrame url="reservaya.co/salon">
      <svg viewBox="0 0 480 262" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="480" height="262" fill="#080c1a" />
        <rect x="14" y="14" width="300" height="234" rx="12" fill="#0d1328" stroke="#1a2340" />
        <text x="28" y="34" fill="#eef2ff" fontSize="11" fontWeight="700" style={H}>Salón principal</text>
        {tables.map(([x, y, kind], i) => (
          <g key={i}>
            {kind === "c" ? (
              <circle className="mk-status" style={d(i * 0.7)} cx={x} cy={y} r="20" />
            ) : kind === "w" ? (
              <rect className="mk-status" style={d(i * 0.7)} x={x - 40} y={y - 15} width="80" height="30" rx="8" />
            ) : (
              <rect className="mk-status" style={d(i * 0.7)} x={x - 20} y={y - 20} width="40" height="40" rx="8" />
            )}
            <text x={x} y={y + 3.5} fill="#070a16" fontSize="9" fontWeight="700" textAnchor="middle" style={T}>{i + 1}</text>
          </g>
        ))}
        {/* Panel de reservas */}
        <text x="330" y="34" fill="#8a93b8" fontSize="8" style={T}>HOY · 19:00 – 22:00</text>
        <rect className="mk-scan" x="324" y="44" width="144" height="32" rx="8" fill="rgba(79,124,255,.22)" stroke="#4f7cff" />
        {[
          ["19:00", "Mesa 4 · 2p", "Laura M."],
          ["19:30", "Mesa 7 · 4p", "Andrés R."],
          ["20:00", "Mesa 1 · 6p", "Cumpleaños"],
          ["20:30", "Mesa 9 · 8p", "Empresa X"],
          ["21:00", "Mesa 3 · 2p", "Camila P."],
        ].map(([h, m, n], i) => (
          <g key={h}>
            <text x="334" y={58 + i * 38} fill="#ffc857" fontSize="9" fontWeight="700" style={T}>{h}</text>
            <text x="374" y={58 + i * 38} fill="#eef2ff" fontSize="8" style={T}>{m}</text>
            <text x="374" y={69 + i * 38} fill="#8a93b8" fontSize="7" style={T}>{n}</text>
          </g>
        ))}
        {[["Libre", "#3ddc97"], ["Reservada", "#8fa8ff"], ["Ocupada", "#ffc857"]].map(([k, c], i) => (
          <g key={k}>
            <circle cx={334 + i * 50} cy="240" r="3.5" fill={c} />
            <text x={341 + i * 50} y="243" fill="#b7c0de" fontSize="7" style={T}>{k}</text>
          </g>
        ))}
      </svg>
    </BrowserFrame>
  );
}

/* ---------- LEOFIT: tienda de suplementos ---------- */
export function LeofitMock() {
  const products = [
    ["Whey Pro", "$189.900", "#4f7cff"],
    ["Creatina", "$89.900", "#ffc857"],
    ["Pre-Work", "$129.900", "#ff6b8b"],
  ] as const;
  return (
    <BrowserFrame url="leofit.store">
      <svg viewBox="0 0 480 262" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lf-shine" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="480" height="262" fill="#080c1a" />
        <text x="20" y="30" fill="#eef2ff" fontSize="15" fontWeight="800" letterSpacing="2" style={H}>LEOFIT</text>
        {["Proteínas", "Creatinas", "Ofertas"].map((t, i) => <text key={t} x={150 + i * 66} y="29" fill="#b7c0de" fontSize="8" style={T}>{t}</text>)}
        {/* Carrito */}
        <g transform="translate(440 14)">
          <path d="M2 4h4l3 12h11l3-9H8" fill="none" stroke="#eef2ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="20" r="1.6" fill="#eef2ff" /><circle cx="19" cy="20" r="1.6" fill="#eef2ff" />
          <g className="mk-badge">
            <circle cx="23" cy="3" r="6.5" fill="#ffc857" />
            <text x="23" y="5.8" fill="#070a16" fontSize="8" fontWeight="800" textAnchor="middle" style={T}>3</text>
          </g>
        </g>
        {/* Banner */}
        <rect x="20" y="44" width="440" height="52" rx="10" fill="url(#lf-banner)" />
        <defs><linearGradient id="lf-banner" x1="0" x2="1"><stop offset="0" stopColor="#1d2f75" /><stop offset="1" stopColor="#6b4a10" /></linearGradient></defs>
        <text x="36" y="68" fill="#eef2ff" fontSize="13" fontWeight="700" style={H}>Semana fitness · −20%</text>
        <text x="36" y="84" fill="#b7c0de" fontSize="8" style={T}>Envío gratis en compras +$150.000</text>
        {/* Productos */}
        {products.map(([n, p, c], i) => {
          const x = 20 + i * 150;
          return (
            <g key={n} className="mk-slide" style={d(0.2 + i * 0.25)}>
              <rect x={x} y="106" width="140" height="146" rx="12" fill="#0d1328" stroke="#1a2340" />
              <g className="mk-float" style={d(i * 0.6)}>
                <rect x={x + 48} y="122" width="44" height="12" rx="4" fill="#eef2ff" opacity=".9" />
                <rect x={x + 42} y="132" width="56" height="58" rx="10" fill={c} />
                <rect x={x + 50} y="150" width="40" height="18" rx="4" fill="#070a16" opacity=".35" />
              </g>
              <rect x={x + 42} y="122" width="56" height="68" fill="url(#lf-shine)" className="mk-shine" style={d(i * 0.8)} />
              <text x={x + 12} y="210" fill="#eef2ff" fontSize="10" fontWeight="700" style={H}>{n}</text>
              <text x={x + 12} y="224" fill="#ffc857" fontSize="9" style={T}>{p}</text>
              <rect x={x + 82} y="214" width="48" height="26" rx="8" fill={i === 0 ? "#4f7cff" : "#1a2340"} className={i === 0 ? "mk-press" : undefined} />
              <text x={x + 106} y="230" fill="#eef2ff" fontSize="8" textAnchor="middle" style={T}>+ Añadir</text>
            </g>
          );
        })}
        <circle className="mk-fly" cx="126" cy="226" r="4" fill="#ffc857" />
      </svg>
    </BrowserFrame>
  );
}

/* ---------- GymMatch: app móvil social-fitness ---------- */
export function GymMatchMock() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-[70%] aspect-square rounded-full border border-[rgba(79,124,255,.25)] animate-spin-slow" />
      <div className="absolute w-[50%] aspect-square rounded-full border border-dashed border-[rgba(255,200,87,.25)] animate-spin-slower" />
      <div className="mk-frame relative h-[92%] aspect-[9/18] rounded-[26px] border-[5px] border-[#1c2440] bg-[#080c1a] overflow-hidden shadow-[0_30px_80px_-24px_rgba(79,124,255,.6)]">
        <svg viewBox="0 0 180 360" className="w-full h-full">
          <defs>
            <linearGradient id="gm-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4f7cff" /><stop offset="1" stopColor="#1d2f75" /></linearGradient>
            <linearGradient id="gm-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffc857" /><stop offset="1" stopColor="#6b4a10" /></linearGradient>
          </defs>
          <rect width="180" height="360" fill="#080c1a" />
          <rect x="66" y="8" width="48" height="10" rx="5" fill="#000" />
          <text x="90" y="42" fill="#eef2ff" fontSize="13" fontWeight="800" textAnchor="middle" style={H}>GymMatch</text>
          {/* Tarjeta de fondo */}
          <g>
            <rect x="22" y="62" width="136" height="200" rx="16" fill="url(#gm-b)" />
            <circle cx="90" cy="135" r="30" fill="rgba(7,10,22,.35)" />
            <text x="34" y="236" fill="#070a16" fontSize="12" fontWeight="800" style={H}>Sofía, 27</text>
            <text x="34" y="250" fill="#070a16" fontSize="8" style={T}>Crossfit · 1.2 km</text>
          </g>
          {/* Tarjeta que se desliza */}
          <g className="mk-swipe">
            <rect x="22" y="62" width="136" height="200" rx="16" fill="url(#gm-a)" />
            <circle cx="90" cy="135" r="30" fill="rgba(255,255,255,.18)" />
            <circle cx="90" cy="126" r="11" fill="rgba(255,255,255,.55)" />
            <path d="M68 160 q22 -22 44 0" fill="rgba(255,255,255,.55)" />
            <text x="34" y="236" fill="#fff" fontSize="12" fontWeight="800" style={H}>Mateo, 29</text>
            <text x="34" y="250" fill="#e3e9ff" fontSize="8" style={T}>Pesas · 800 m</text>
            <g className="mk-like"><rect x="98" y="76" width="48" height="20" rx="5" fill="none" stroke="#ffc857" strokeWidth="2" /><text x="122" y="90" fill="#ffc857" fontSize="10" fontWeight="800" textAnchor="middle" style={H}>LIKE</text></g>
          </g>
          {/* Match */}
          <g className="mk-match">
            <path d="M90 196 C70 180 62 168 70 158 C76 150 86 152 90 160 C94 152 104 150 110 158 C118 168 110 180 90 196 Z" fill="#ff6b8b" />
          </g>
          {/* Botones */}
          <circle cx="58" cy="298" r="18" fill="#121a33" stroke="#26305a" />
          <path d="M52 292l12 12M64 292l-12 12" stroke="#ff6b8b" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="122" cy="298" r="18" fill="#121a33" stroke="#26305a" />
          <path d="M122 306c-6-4.5-9-8-9-11a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 3-3 6.5-9 11z" fill="#ffc857" />
          <rect x="62" y="340" width="56" height="4" rx="2" fill="#26305a" />
        </svg>
      </div>
    </div>
  );
}
