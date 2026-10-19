"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { Stagger, Item } from "@/components/Reveal";

const steps = [
  { n: "01", title: "Descubrimiento", desc: "Entendemos tu negocio, objetivos y alcance. Definimos qué construir y por qué." },
  { n: "02", title: "Diseño", desc: "Arquitectura técnica y prototipos de interfaz. Validamos antes de escribir código." },
  { n: "03", title: "Desarrollo", desc: "Construcción por módulos con entregas semanales y control de calidad continuo." },
  { n: "04", title: "Despliegue", desc: "Producción con CI/CD, dominio, monitoreo y todo listo para usuarios reales." },
  { n: "05", title: "Soporte", desc: "Mantenimiento, mejoras y evolución del producto a medida que tu negocio crece." },
];

export default function Process() {
  return (
    <section id="proceso" className="py-[clamp(72px,11vw,128px)] border-y border-[var(--line)] bg-[rgba(11,16,32,.4)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <SectionHeader
          eyebrow="Cómo trabajamos"
          title={<>Un proceso claro en <span className="grad-text">cinco fases.</span></>}
          desc="Transparente, iterativo y con entregas constantes. Sabes en todo momento dónde está tu proyecto."
        />
        <div className="relative">
          {/* Línea de progreso que se dibuja al entrar en pantalla */}
          <div className="hidden lg:block absolute top-[22px] left-[22px] right-[22px] h-px bg-[var(--line)]" />
          <motion.div
            className="hidden lg:block absolute top-[22px] left-[22px] right-[22px] h-px origin-left"
            style={{ background: "var(--grad)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5" stagger={0.18}>
            {steps.map((s) => (
              <Item key={s.n}>
                <div className="relative">
                  <span className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center font-mono text-[0.82rem] font-semibold text-[var(--plasma)] border border-[var(--line2)] bg-[var(--void)] shadow-[0_0_0_6px_var(--void)]">
                    {s.n}
                  </span>
                  <h3 className="text-[1.05rem] font-semibold mt-5 mb-2" style={{ fontFamily: "var(--font-space)" }}>{s.title}</h3>
                  <p className="text-[0.88rem] text-[var(--ether)] leading-relaxed">{s.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
