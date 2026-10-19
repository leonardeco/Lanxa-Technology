import { useId } from "react";

/**
 * Marca Lanxa: una lanza en diagonal que apunta a una estrella de cuatro puntas.
 * `animated` añade el destello de la estrella y el brillo que recorre la lanza.
 */
export default function Logo({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  const id = useId().replace(/:/g, "");
  const g = `lx-g-${id}`;
  const s = `lx-s-${id}`;
  const glow = `lx-glow-${id}`;

  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" className={animated ? "lx-logo-animated" : undefined}>
      <defs>
        <linearGradient id={g} x1="6" y1="42" x2="34" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4f7cff" stopOpacity="0.15" />
          <stop offset="0.55" stopColor="#4f7cff" />
          <stop offset="1" stopColor="#c9d4ff" />
        </linearGradient>
        <radialGradient id={s} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#ffe9a8" />
          <stop offset="1" stopColor="#ffc857" />
        </radialGradient>
        <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffc857" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffc857" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo de la estrella */}
      <circle className="lx-halo" cx="37" cy="11" r="10" fill={`url(#${glow})`} />

      {/* Asta de la lanza */}
      <path d="M6.5 43.5 L29.2 20.8" stroke={`url(#${g})`} strokeWidth="3.2" strokeLinecap="round" />
      {/* Punta de la lanza */}
      <path d="M33.6 16.4 L26.2 19.6 L28.4 21.6 L30.4 23.8 Z" fill="#e3e9ff" />
      {/* Plumas / contrapeso */}
      <path d="M9.6 40.4 L5 39.6 M7.6 42.4 L8.4 47" stroke="#8fa8ff" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />

      {/* Estrella de cuatro puntas */}
      <path
        className="lx-star"
        d="M37 2.5 C37.7 8 39.9 10.3 45.5 11 C39.9 11.7 37.7 14 37 19.5 C36.3 14 34.1 11.7 28.5 11 C34.1 10.3 36.3 8 37 2.5 Z"
        fill={`url(#${s})`}
      />
    </svg>
  );
}
