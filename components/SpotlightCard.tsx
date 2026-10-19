"use client";
import type { MouseEvent, ReactNode } from "react";

/** Tarjeta con un foco de luz radial que sigue al cursor. */
export default function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article onMouseMove={onMove} className={`card spotlight ${className}`}>
      {children}
    </article>
  );
}
