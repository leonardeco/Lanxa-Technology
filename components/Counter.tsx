"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Número que cuenta desde 0 hasta `to` la primera vez que entra en pantalla. */
export default function Counter({ to, prefix = "", suffix = "", duration = 1.6 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{prefix}{reduced ? to : value}{suffix}</span>
      <span className="sr-only">{prefix}{to}{suffix}</span>
    </span>
  );
}
