"use client";
import dynamic from "next/dynamic";
import { useCallback, useState, useSyncExternalStore } from "react";
import HeroScene from "@/components/HeroScene";

// Three.js y el modelo solo se descargan en escritorio con WebGL; en el celular se queda la escena 2D, que es liviana.
const HeroScene3D = dynamic(() => import("@/components/HeroScene3D"), { ssr: false });

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

function puedeVer3D(): boolean {
  try {
    if (!window.matchMedia("(min-width: 900px)").matches) return false;
    const nav = navigator as Nav;
    if ((nav.deviceMemory ?? 8) < 4 || nav.connection?.saveData === true) return false;
    const c = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && c.getContext("webgl2"));
  } catch {
    return false;
  }
}

const sinSuscripcion = () => () => {};

export default function HeroStage() {
  // En el servidor siempre devuelve false: el primer pintado es la escena 2D y luego, si el equipo puede, pasa a 3D.
  const capaz = useSyncExternalStore(sinSuscripcion, puedeVer3D, () => false);
  const [fallo, setFallo] = useState(false);
  const volver2d = useCallback(() => setFallo(true), []);

  return capaz && !fallo ? <HeroScene3D onFail={volver2d} /> : <HeroScene />;
}
