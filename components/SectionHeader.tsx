import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export default function SectionHeader({
  eyebrow, title, desc, center = false, className = "mb-14",
}: { eyebrow: string; title: ReactNode; desc?: ReactNode; center?: boolean; className?: string }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      <span className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-bold mt-4 mb-3 tracking-tight leading-[1.1]" style={{ fontFamily: "var(--font-space)" }}>
        {title}
      </h2>
      {desc && <p className="text-[var(--ether)] text-[1.02rem] leading-relaxed">{desc}</p>}
    </Reveal>
  );
}
