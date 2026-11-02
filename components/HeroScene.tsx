"use client";
import { useEffect, useRef } from "react";

/*
 * Escena del hero: una persona en silueta, de pie sobre el horizonte de un planeta,
 * lanza una lanza de luz contra una estrella. Toda la animación es función del
 * tiempo (sin estado acumulado), así que con prefers-reduced-motion se pinta un
 * único fotograma estático.
 */

type P = [number, number];
const JOINTS = ["head", "neck", "hip", "elbowT", "handT", "elbowF", "handF", "kneeF", "footF", "kneeB", "footB"] as const;
type Joint = (typeof JOINTS)[number];
type Pose = Record<Joint, P>;

// Unidades: altura de la figura = 1, pies en y = 0, y negativa hacia arriba. T = brazo que lanza, F = brazo guía.
const REST: Pose = {
  head: [0, -0.93], neck: [0, -0.8], hip: [0, -0.45],
  elbowT: [-0.17, -0.74], handT: [-0.12, -0.9],
  elbowF: [0.1, -0.66], handF: [0.17, -0.56],
  kneeF: [0.08, -0.22], footF: [0.14, 0], kneeB: [-0.06, -0.22], footB: [-0.12, 0],
};
const WINDUP: Pose = {
  head: [-0.07, -0.91], neck: [-0.05, -0.79], hip: [0, -0.45],
  elbowT: [-0.25, -0.76], handT: [-0.42, -0.8],
  elbowF: [0.12, -0.82], handF: [0.27, -0.9],
  kneeF: [0.16, -0.25], footF: [0.27, 0], kneeB: [-0.1, -0.21], footB: [-0.24, 0],
};
const RELEASE: Pose = {
  head: [0.1, -0.92], neck: [0.07, -0.79], hip: [0, -0.45],
  elbowT: [0.12, -0.97], handT: [0.26, -1.08],
  elbowF: [-0.02, -0.64], handF: [-0.12, -0.54],
  kneeF: [0.17, -0.24], footF: [0.27, 0], kneeB: [-0.1, -0.2], footB: [-0.25, -0.03],
};
const FOLLOW: Pose = {
  head: [0.15, -0.88], neck: [0.11, -0.76], hip: [0.02, -0.44],
  elbowT: [0.24, -0.7], handT: [0.32, -0.56],
  elbowF: [-0.06, -0.62], handF: [-0.16, -0.6],
  kneeF: [0.18, -0.23], footF: [0.28, 0], kneeB: [-0.08, -0.22], footB: [-0.22, -0.06],
};

const CYCLE = 7.4;
const T_RELEASE = 1.95;
const FLIGHT = 1.3;
const T_IMPACT = T_RELEASE + FLIGHT;
const STATIC_T = T_IMPACT + 0.45;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeIn = (t: number) => t * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const SEGMENTS: [number, number, Pose, Pose, (t: number) => number][] = [
  [0.6, 1.7, REST, WINDUP, easeInOut],
  [1.7, 2.0, WINDUP, RELEASE, easeIn],
  [2.0, 2.5, RELEASE, FOLLOW, easeOut],
  [2.5, 4.0, FOLLOW, REST, easeInOut],
];

function poseAt(t: number): Pose {
  for (const [a, b, from, to, ease] of SEGMENTS) {
    if (t >= a && t < b) {
      const k = ease((t - a) / (b - a));
      const out = {} as Pose;
      for (const j of JOINTS) out[j] = [lerp(from[j][0], to[j][0], k), lerp(from[j][1], to[j][1], k)];
      return out;
    }
  }
  return REST;
}

type Layout = { w: number; h: number; fx: number; fy: number; scale: number; sx: number; sy: number; starR: number; mobile: boolean; planet: { cx: number; cy: number; r: number } };
type BgStar = { x: number; y: number; r: number; depth: number; phase: number; speed: number; hue: number };
type Spark = { a: number; v: number; r: number; hue: number };

function bezier(p0: P, p1: P, p2: P, u: number): P {
  const m = 1 - u;
  return [m * m * p0[0] + 2 * m * u * p1[0] + u * u * p2[0], m * m * p0[1] + 2 * m * u * p1[1] + u * u * p2[1]];
}
function bezierTangent(p0: P, p1: P, p2: P, u: number): P {
  const dx = 2 * (1 - u) * (p1[0] - p0[0]) + 2 * u * (p2[0] - p1[0]);
  const dy = 2 * (1 - u) * (p1[1] - p0[1]) + 2 * u * (p2[1] - p1[1]);
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-space").trim() || "sans-serif";
    const WORD = "Technology";
    let L: Layout;
    let stars: BgStar[] = [];
    const sparks: Spark[] = Array.from({ length: 46 }, () => ({
      a: Math.random() * Math.PI * 2,
      v: 40 + Math.random() * 120,
      r: 0.8 + Math.random() * 1.8,
      hue: Math.random() < 0.5 ? 42 : 225,
    }));
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    let nextShooting = 2.5;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = w < 768;
      const r = Math.max(w, h) * 1.7;
      const planet = { cx: w * 0.62, cy: h + r - h * (mobile ? 0.1 : 0.13), r };
      const fx = w * (mobile ? 0.84 : w >= 1100 ? 0.66 : 0.76);
      const fy = planet.cy - Math.sqrt(Math.max(0, r * r - (fx - planet.cx) ** 2));
      const scale = mobile ? Math.min(h * 0.24, w * 0.4) : Math.min(h * 0.36, 320);
      L = {
        w, h, fx, fy, scale, mobile, planet,
        sx: w * (mobile ? 0.9 : 0.88),
        sy: mobile ? 72 : h * 0.2,
        starR: mobile ? 9 : 13,
      };

      const count = Math.min(220, Math.floor((w * h) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.3 + 0.25,
        depth: Math.random(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.8,
        hue: Math.random() < 0.18 ? 42 : Math.random() < 0.4 ? 225 : 228,
      }));
    };

    const toWorld = (p: P): P => [L.fx + p[0] * L.scale, L.fy + p[1] * L.scale];

    // Lanza sostenida: empuñada en la mano, apuntando a la estrella con algo de elevación.
    const heldLance = (pose: Pose) => {
      const hand = toWorld(pose.handT);
      const ang = Math.atan2(L.sy - hand[1], L.sx - hand[0]) - 0.22;
      const d: P = [Math.cos(ang), Math.sin(ang)];
      const len = L.scale * 0.85;
      return {
        tip: [hand[0] + d[0] * len * 0.66, hand[1] + d[1] * len * 0.66] as P,
        d, len,
      };
    };

    const flightPath = () => {
      const { tip } = heldLance(poseAt(T_RELEASE));
      const p2: P = [L.sx, L.sy];
      const dist = Math.hypot(p2[0] - tip[0], p2[1] - tip[1]);
      const p1: P = [(tip[0] + p2[0]) / 2 - dist * 0.05, (tip[1] + p2[1]) / 2 - dist * 0.28];
      return [tip, p1, p2] as const;
    };

    const drawLance = (tip: P, d: P, len: number, alpha: number) => {
      if (alpha <= 0.01) return;
      const tail: P = [tip[0] - d[0] * len, tip[1] - d[1] * len];
      const n: P = [-d[1], d[0]];
      const hl = Math.max(9, len * 0.13);
      const hw = hl * 0.32;
      ctx.save();
      ctx.globalAlpha = alpha;
      const g = ctx.createLinearGradient(tail[0], tail[1], tip[0], tip[1]);
      g.addColorStop(0, "rgba(91,134,255,0.05)");
      g.addColorStop(0.6, "rgba(143,168,255,0.95)");
      g.addColorStop(1, "rgba(255,200,87,1)");
      ctx.strokeStyle = g;
      ctx.lineWidth = Math.max(1.6, L.scale * 0.012);
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(255,200,87,0.9)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(tail[0], tail[1]);
      ctx.lineTo(tip[0] - d[0] * hl * 0.8, tip[1] - d[1] * hl * 0.8);
      ctx.stroke();
      ctx.fillStyle = "#fff6dc";
      ctx.beginPath();
      ctx.moveTo(tip[0], tip[1]);
      ctx.lineTo(tip[0] - d[0] * hl + n[0] * hw, tip[1] - d[1] * hl + n[1] * hw);
      ctx.lineTo(tip[0] - d[0] * hl * 0.72, tip[1] - d[1] * hl * 0.72);
      ctx.lineTo(tip[0] - d[0] * hl - n[0] * hw, tip[1] - d[1] * hl - n[1] * hw);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawPlanet = () => {
      const { cx, cy, r } = L.planet;
      ctx.save();
      const fill = ctx.createLinearGradient(0, cy - r, 0, cy - r + L.h * 0.25);
      fill.addColorStop(0, "rgba(24,36,90,0.95)");
      fill.addColorStop(1, "rgba(8,11,26,1)");
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      // Borde iluminado del horizonte
      const rim = ctx.createLinearGradient(0, 0, L.w, 0);
      rim.addColorStop(0, "rgba(91,134,255,0)");
      rim.addColorStop(0.45, "rgba(91,134,255,0.75)");
      rim.addColorStop(0.75, "rgba(255,200,87,0.9)");
      rim.addColorStop(1, "rgba(255,200,87,0.15)");
      ctx.strokeStyle = rim;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "rgba(255,200,87,0.8)";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.restore();
    };

    /*
     * Figura humana en silueta, iluminada a contraluz por la estrella: extremidades
     * ahusadas (más gruesas en hombro/cadera), torso con pecho, cintura y cadera,
     * cabeza de perfil con mandíbula, manos y pies. Las extremidades del lado lejano
     * (brazo que lanza y pierna de atrás) se pintan más oscuras para dar profundidad.
     */
    const drawFigure = (pose: Pose, alpha: number) => {
      const S = L.scale;
      const W = toWorld;
      const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
      const mix = (a: P, b: P, k: number): P => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];

      const neckBase = add(pose.neck, [0, 0.02]);
      const shT = add(pose.neck, [-0.014, 0.032]);
      const shF = add(pose.neck, [0.014, 0.032]);
      const wristT = mix(pose.elbowT, pose.handT, 0.84);
      const wristF = mix(pose.elbowF, pose.handF, 0.84);
      const ankle = (f: P): P => add(f, [-0.005, -0.036]);
      const heel = (f: P): P => add(f, [-0.024, -0.016]);
      const toe = (f: P): P => add(f, [0.072, -0.007]);

      // Segmento ahusado: semicírculo de radio ra en a, semicírculo de radio rb en b.
      const capsule = (a: P, b: P, ra: number, rb: number) => {
        const A = W(a), B = W(b);
        const rA = ra * S, rB = rb * S;
        const ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
        ctx.moveTo(A[0] + Math.cos(ang + Math.PI / 2) * rA, A[1] + Math.sin(ang + Math.PI / 2) * rA);
        ctx.arc(A[0], A[1], rA, ang + Math.PI / 2, ang + (Math.PI * 3) / 2);
        ctx.arc(B[0], B[1], rB, ang - Math.PI / 2, ang + Math.PI / 2);
        ctx.closePath();
      };

      const arm = (sh: P, elbow: P, wrist: P, hand: P) => {
        capsule(sh, elbow, 0.037, 0.028);
        capsule(elbow, wrist, 0.029, 0.019);
        capsule(wrist, hand, 0.021, 0.019);
      };
      const leg = (hip: P, knee: P, foot: P) => {
        capsule(hip, knee, 0.062, 0.041);
        capsule(knee, ankle(foot), 0.041, 0.022);
        capsule(heel(foot), toe(foot), 0.025, 0.013);
      };

      // Torso: perfil delantero (pecho) y trasero (espalda/glúteo) a lo largo de la columna.
      const torso = () => {
        const a = neckBase, b = pose.hip;
        const dx = b[0] - a[0], dy = b[1] - a[1];
        const len = Math.hypot(dx, dy) || 1;
        let n: P = [-dy / len, dx / len];
        if (n[0] < 0) n = [-n[0], -n[1]]; // n apunta hacia el frente (la estrella)
        const ks = [0, 0.26, 0.66, 1];
        const front = [0.05, 0.078, 0.05, 0.058];
        const back = [0.052, 0.066, 0.047, 0.066];
        const pts: P[] = [];
        ks.forEach((k, i) => { const c = mix(a, b, k); pts.push(W([c[0] + n[0] * front[i], c[1] + n[1] * front[i]])); });
        [...ks].reverse().forEach((k, j) => { const i = ks.length - 1 - j; const c = mix(a, b, k); pts.push(W([c[0] - n[0] * back[i], c[1] - n[1] * back[i]])); });
        const mid = (p: P, q: P): P => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
        const start = mid(pts[pts.length - 1], pts[0]);
        ctx.moveTo(start[0], start[1]);
        pts.forEach((p, i) => { const m = mid(p, pts[(i + 1) % pts.length]); ctx.quadraticCurveTo(p[0], p[1], m[0], m[1]); });
        ctx.closePath();
      };

      const head = () => {
        const h = pose.head;
        const tilt = Math.atan2(h[1] - pose.neck[1], h[0] - pose.neck[0]) + Math.PI / 2;
        const C = W(h);
        const rx = 0.056 * S, ry = 0.068 * S;
        ctx.moveTo(C[0] + Math.cos(tilt) * rx, C[1] + Math.sin(tilt) * rx);
        ctx.ellipse(C[0], C[1], rx, ry, tilt, 0, Math.PI * 2);
        // Cara de perfil: mandíbula y mentón hacia adelante
        const rot = (v: P): P => [v[0] * Math.cos(tilt) - v[1] * Math.sin(tilt), v[0] * Math.sin(tilt) + v[1] * Math.cos(tilt)];
        const J = W(add(h, rot([0.03, 0.026])));
        ctx.moveTo(J[0] + 0.03 * S, J[1]);
        ctx.ellipse(J[0], J[1], 0.03 * S, 0.033 * S, tilt, 0, Math.PI * 2);
        capsule(neckBase, add(h, [0, 0.03]), 0.027, 0.025);
      };

      const far = () => { arm(shT, pose.elbowT, wristT, pose.handT); leg(add(pose.hip, [-0.012, 0]), pose.kneeB, pose.footB); };
      const near = () => { leg(add(pose.hip, [0.012, 0]), pose.kneeF, pose.footF); torso(); head(); arm(shF, pose.elbowF, wristF, pose.handF); };
      const all = () => { far(); near(); };

      const fillWith = (shape: () => void, style: string | CanvasGradient, off: P = [0, 0], blur = 0, shadow = "transparent") => {
        ctx.save();
        ctx.translate(off[0], off[1]);
        ctx.fillStyle = style;
        ctx.shadowBlur = blur;
        ctx.shadowColor = shadow;
        ctx.beginPath();
        shape();
        ctx.fill();
        ctx.restore();
      };

      // Dirección de la luz: desde el cuerpo hacia la estrella
      const center = W([0, -0.6]);
      const lx = L.sx - center[0], ly = L.sy - center[1];
      const ll = Math.hypot(lx, ly) || 1;
      const rim = Math.max(1.6, S * 0.01);
      const toStar: P = [(lx / ll) * rim, (ly / ll) * rim];
      const away: P = [-toStar[0] * 0.75, -toStar[1] * 0.75];

      const top = W([0, -1.02]), feet = W([0, 0]);
      const body = ctx.createLinearGradient(top[0], top[1], feet[0], feet[1]);
      body.addColorStop(0, "#1c2754");
      body.addColorStop(0.55, "#121a3c");
      body.addColorStop(1, "#0b1129");

      ctx.save();
      ctx.globalAlpha = alpha;
      fillWith(all, "rgba(91,134,255,0.22)", [0, 0], 40, "rgba(91,134,255,0.85)"); // halo
      fillWith(all, "#ffd98a", toStar, 14, "rgba(255,200,87,0.95)");               // borde dorado (luz de la estrella)
      fillWith(all, "rgba(143,168,255,0.85)", away, 6, "rgba(143,168,255,0.8)");  // rebote azul del planeta
      fillWith(far, "#080c1f");
      fillWith(near, body);
      // Contorno tenue del brazo delantero para separarlo del torso
      ctx.save();
      ctx.strokeStyle = "rgba(255,217,138,0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      arm(shF, pose.elbowF, wristF, pose.handF);
      ctx.stroke();
      ctx.restore();
      ctx.restore();
    };

    const drawSparkle = (x: number, y: number, r: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 4.5);
      glow.addColorStop(0, "rgba(255,240,190,0.55)");
      glow.addColorStop(0.35, "rgba(255,200,87,0.18)");
      glow.addColorStop(1, "rgba(255,200,87,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, r * 4.5, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 1.6);
      body.addColorStop(0, "#ffffff");
      body.addColorStop(0.5, "#ffe9a8");
      body.addColorStop(1, "#ffc857");
      ctx.fillStyle = body;
      ctx.shadowColor = "rgba(255,233,168,0.9)";
      ctx.shadowBlur = 24;
      const k = r * 0.16;
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.6);
      ctx.bezierCurveTo(k, -k, k, -k, r * 1.6, 0);
      ctx.bezierCurveTo(k, k, k, k, 0, r * 1.6);
      ctx.bezierCurveTo(-k, k, -k, k, -r * 1.6, 0);
      ctx.bezierCurveTo(-k, -k, -k, -k, 0, -r * 1.6);
      ctx.fill();
      ctx.restore();
    };

    const nameAlpha = (t: number) => {
      if (t < T_IMPACT) return 0;
      const fadeIn = clamp01((t - T_IMPACT) / 0.32);
      const fadeOut = t < 6.45 ? 1 : clamp01((7.15 - t) / 0.55);
      return fadeIn * fadeOut;
    };

    const drawName = (alpha: number, twinkle: number, spin: number) => {
      if (alpha <= 0.01) return;
      const size = L.mobile ? 16 : Math.min(48, Math.max(26, L.w * 0.036));
      ctx.save();
      ctx.font = `600 ${size}px ${fontFamily}`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      const x = Math.min(L.sx + L.starR * 0.2, L.w - (L.mobile ? 14 : 28));
      const y = L.mobile ? L.sy + size * 0.95 : L.sy + L.starR * 2.4 + size * 0.72;
      const width = ctx.measureText(WORD).width;
      const cx = x - width / 2;
      const halo = ctx.createRadialGradient(cx, y, 0, cx, y, Math.max(width, size) * 0.72);
      halo.addColorStop(0, `rgba(255,240,190,${0.5 * alpha})`);
      halo.addColorStop(0.38, `rgba(255,200,87,${0.16 * alpha})`);
      halo.addColorStop(1, "rgba(255,200,87,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.ellipse(cx, y, width * 0.62, size * 1.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha * (0.92 + (twinkle - 1) * 1.4);
      ctx.shadowColor = "rgba(255,233,168,0.95)";
      ctx.shadowBlur = 22;
      const g = ctx.createLinearGradient(x - width, y - size * 0.6, x, y + size * 0.6);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.48, "#ffe9a8");
      g.addColorStop(1, "#ffc857");
      ctx.fillStyle = g;
      ctx.fillText(WORD, x, y);
      ctx.restore();
      drawSparkle(x - width + size * 0.15, y - size * 0.42, size * 0.22 * twinkle, spin, alpha);
    };

    const frame = (now: number) => {
      const elapsed = (now - t0) / 1000;
      const t = reduced ? STATIC_T : elapsed % CYCLE;
      const { w, h } = L;
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      // Estrellas de fondo con paralaje
      for (const s of stars) {
        const tw = reduced ? 0.7 : 0.55 + 0.45 * Math.sin(elapsed * s.speed + s.phase);
        const x = s.x * w + pointer.x * (4 + s.depth * 18);
        const y = s.y * h + pointer.y * (4 + s.depth * 18);
        ctx.fillStyle = `hsla(${s.hue},80%,${s.hue === 228 ? 92 : 78}%,${0.25 + tw * 0.6 * (0.4 + s.depth * 0.6)})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r * (0.6 + s.depth * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }

      // Estrella fugaz ocasional
      if (!reduced) {
        if (!shooting && elapsed > nextShooting) {
          shooting = { x: Math.random() * w * 0.6, y: Math.random() * h * 0.3, vx: 520 + Math.random() * 260, vy: 160 + Math.random() * 120, life: 0 };
          nextShooting = elapsed + 5 + Math.random() * 6;
        }
        if (shooting) {
          shooting.life += 1 / 60;
          const sx = shooting.x + shooting.vx * shooting.life;
          const sy = shooting.y + shooting.vy * shooting.life;
          const a = Math.max(0, 1 - shooting.life / 0.9);
          const g = ctx.createLinearGradient(sx - shooting.vx * 0.12, sy - shooting.vy * 0.12, sx, sy);
          g.addColorStop(0, "rgba(255,255,255,0)");
          g.addColorStop(1, `rgba(255,255,255,${a * 0.85})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(sx - shooting.vx * 0.12, sy - shooting.vy * 0.12);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          if (a <= 0) shooting = null;
        }
      }

      drawPlanet();

      const [p0, p1, p2] = flightPath();
      const flare = t >= T_IMPACT ? Math.exp(-(t - T_IMPACT) * 1.5) : 0;

      // Trayectoria de puntería mientras se prepara el lanzamiento
      const aim = t < T_RELEASE ? clamp01((t - 0.6) / 1.1) : clamp01(1 - (t - T_RELEASE) / 0.6);
      if (aim > 0.01) {
        ctx.save();
        ctx.setLineDash([2, 9]);
        ctx.strokeStyle = `rgba(143,168,255,${0.35 * aim})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const q = bezier(p0, p1, p2, i / 40);
          if (i === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Estrella objetivo
      const approach = t >= T_RELEASE && t < T_IMPACT ? clamp01((t - T_RELEASE) / FLIGHT) : 0;
      const twinkle = reduced ? 1 : 1 + Math.sin(elapsed * 2.2) * 0.06;
      drawSparkle(L.sx, L.sy, L.starR * (twinkle + approach * 0.25 + flare * 1.4), elapsed * 0.15, 1);

      // Impacto: anillos de onda, chispas y destello
      if (flare > 0.01) {
        const dt = t - T_IMPACT;
        ctx.save();
        for (let i = 0; i < 3; i++) {
          const rr = (dt - i * 0.18) * 220;
          if (rr <= 0) continue;
          ctx.strokeStyle = i === 1 ? `rgba(91,134,255,${0.6 * flare})` : `rgba(255,200,87,${0.7 * flare})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(L.sx, L.sy, rr, 0, Math.PI * 2);
          ctx.stroke();
        }
        for (const s of sparks) {
          const dist = s.v * (1 - Math.exp(-dt * 2.6));
          ctx.fillStyle = `hsla(${s.hue},90%,75%,${flare})`;
          ctx.beginPath();
          ctx.arc(L.sx + Math.cos(s.a) * dist, L.sy + Math.sin(s.a) * dist, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
        const flash = ctx.createRadialGradient(L.sx, L.sy, 0, L.sx, L.sy, Math.max(w, h) * 0.6);
        flash.addColorStop(0, `rgba(255,200,87,${0.16 * flare})`);
        flash.addColorStop(1, "rgba(255,200,87,0)");
        ctx.fillStyle = flash;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      // Figura
      const pose = poseAt(t);
      drawFigure(pose, L.mobile ? 0.88 : 1);

      // Lanza en la mano
      const held = t < T_RELEASE ? 1 : clamp01((t - 5.6) / 0.6);
      if (held > 0) {
        const hl = heldLance(pose);
        drawLance(hl.tip, hl.d, hl.len, held);
      }

      // Lanza en vuelo con estela
      if (t >= T_RELEASE && t < T_IMPACT) {
        const u = (t - T_RELEASE) / FLIGHT;
        const tip = bezier(p0, p1, p2, u);
        const d = bezierTangent(p0, p1, p2, u);
        const len = heldLance(poseAt(T_RELEASE)).len * lerp(1, 0.45, u);
        ctx.save();
        ctx.lineCap = "round";
        const steps = 18;
        for (let i = 0; i < steps; i++) {
          const ua = Math.max(0, u - 0.32 * (1 - i / steps));
          const ub = Math.max(0, u - 0.32 * (1 - (i + 1) / steps));
          const a = bezier(p0, p1, p2, ua);
          const b = bezier(p0, p1, p2, ub);
          const k = i / steps;
          ctx.strokeStyle = `rgba(255,200,87,${0.5 * k})`;
          ctx.lineWidth = 0.5 + k * 3;
          ctx.beginPath();
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
          ctx.stroke();
        }
        ctx.restore();
        drawLance(tip, d, len, 1);
      }

      const shown = nameAlpha(t);
      if (shown > 0.01) drawName(shown, twinkle, elapsed * 0.15);

      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const onResize = () => { layout(); if (reduced) frame(performance.now()); };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(frame);
    });

    layout();
    raf = requestAnimationFrame(frame);
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />;
}
