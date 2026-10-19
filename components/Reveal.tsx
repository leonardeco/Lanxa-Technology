"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/*
 * Animaciones de entrada en cascada. `Stagger` revela a sus hijos `Item` uno tras
 * otro cuando entran en pantalla; `Reveal` anima un bloque suelto.
 * framer-motion respeta prefers-reduced-motion vía MotionConfig en el layout.
 */

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const cascadeItem: Variants = {
  hidden: { opacity: 0, y: 46, scale: 0.96, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 90, damping: 18, mass: 0.9 },
  },
};

export function Stagger({
  children, className, stagger = 0.11, delay = 0,
}: { children: ReactNode; className?: string; stagger?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={cascadeItem}>
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
