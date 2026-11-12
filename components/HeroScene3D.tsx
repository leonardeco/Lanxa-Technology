"use client";
import { useEffect, useRef } from "react";

/*
 * Escena 3D del hero: un muñeco de proporciones humanas, de pie sobre el horizonte de un planeta,
 * lanza una lanza de luz contra una estrella. Three.js se carga bajo demanda (import dinámico),
 * así que no pesa en la primera pintura. El modelo es CC0 (Grab3D) y se anima con huesos propios.
 *
 * Si algo falla (sin WebGL, modelo que no carga) llama a `onFail` y el padre muestra la escena 2D.
 */

type Props = { onFail: () => void };

const CYCLE = 7.4;
const T_REL = 1.95;
const FLIGHT = 1.3;
const T_IMP = T_REL + FLIGHT;
const WORD = "Technology";

export default function HeroScene3D({ onFail }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const THREE = await import("three");
        const { EffectComposer } = await import("three/examples/jsm/postprocessing/EffectComposer.js");
        const { RenderPass } = await import("three/examples/jsm/postprocessing/RenderPass.js");
        const { UnrealBloomPass } = await import("three/examples/jsm/postprocessing/UnrealBloomPass.js");
        const { OutputPass } = await import("three/examples/jsm/postprocessing/OutputPass.js");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
        if (disposed) return;

        const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-space").trim() || "sans-serif";
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 400);
        const camBase = new THREE.Vector3(-3.0, 1.0, 6.4);
        const target = new THREE.Vector3(-1.2, 1.05, 0);

        // ---------- Estrella ----------
        const STAR = new THREE.Vector3(4.6, 3.9, -3.8);
        const glowTex = (() => {
          const c = document.createElement("canvas");
          c.width = c.height = 256;
          const g = c.getContext("2d")!;
          const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
          r.addColorStop(0, "rgba(255,255,240,1)");
          r.addColorStop(0.12, "rgba(255,226,150,0.9)");
          r.addColorStop(0.35, "rgba(255,200,87,0.25)");
          r.addColorStop(1, "rgba(255,200,87,0)");
          g.fillStyle = r;
          g.fillRect(0, 0, 256, 256);
          return new THREE.CanvasTexture(c);
        })();
        const additive = (map: THREE.Texture, color: number, opacity = 1) =>
          new THREE.SpriteMaterial({ map, color, opacity, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });

        const starGlow = new THREE.Sprite(additive(glowTex, 0xffe3a0));
        starGlow.position.copy(STAR);
        scene.add(starGlow);
        const starCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), new THREE.MeshBasicMaterial({ color: 0xfff4d6 }));
        starCore.position.copy(STAR);
        starCore.scale.set(1, 2.4, 1);
        const starCore2 = starCore.clone();
        starCore2.scale.set(2.4, 1, 1);
        scene.add(starCore, starCore2);

        // La palabra aparece junto a la estrella en el impacto, como en la escena 2D
        const word = (() => {
          const c = document.createElement("canvas");
          c.width = 1024;
          c.height = 256;
          const g = c.getContext("2d")!;
          g.font = `600 150px ${fontFamily}`;
          g.textAlign = "center";
          g.textBaseline = "middle";
          g.shadowColor = "rgba(255,233,168,0.95)";
          g.shadowBlur = 36;
          const gr = g.createLinearGradient(160, 60, 860, 200);
          gr.addColorStop(0, "#ffffff");
          gr.addColorStop(0.5, "#ffe9a8");
          gr.addColorStop(1, "#ffc857");
          g.fillStyle = gr;
          g.fillText(WORD, 512, 130);
          const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, opacity: 0 }));
          s.scale.set(2.8, 0.7, 1);
          s.position.set(STAR.x - 1.4, STAR.y - 0.85, STAR.z + 0.2);
          scene.add(s);
          return s;
        })();

        // ---------- Luces ----------
        scene.add(new THREE.HemisphereLight(0x3d5ad8, 0x05070f, 0.55));
        const key = new THREE.DirectionalLight(0xffc870, 4.4);
        key.position.copy(STAR);
        key.target.position.set(0, 1, 0);
        key.castShadow = true;
        key.shadow.mapSize.set(2048, 2048);
        Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
        key.shadow.bias = -0.0004;
        key.shadow.radius = 6;
        scene.add(key, key.target);
        const fill = new THREE.DirectionalLight(0x8fa8ff, 1.1);
        fill.position.set(-5, 2.5, 6);
        scene.add(fill);
        const bounce = new THREE.PointLight(0x5b86ff, 6, 6, 2);
        bounce.position.set(0, -0.3, 1.2);
        scene.add(bounce);

        // ---------- Planeta, horizonte y luna ----------
        const R = 46;
        const planet = new THREE.Mesh(new THREE.SphereGeometry(R, 128, 96), new THREE.MeshStandardMaterial({ color: 0x0f1636, roughness: 1, metalness: 0 }));
        planet.position.set(0, -R, 0);
        planet.receiveShadow = true;
        scene.add(planet);
        const horizon = new THREE.Sprite(additive(glowTex, 0x5b86ff, 0.22));
        horizon.scale.set(80, 5, 1);
        horizon.position.set(4, -1.6, -26);
        const horizonGold = new THREE.Sprite(additive(glowTex, 0xffc857, 0.18));
        horizonGold.scale.set(26, 4, 1);
        horizonGold.position.set(8, -0.3, -22);
        scene.add(horizon, horizonGold);
        const moon = new THREE.Mesh(new THREE.SphereGeometry(0.55, 64, 48), new THREE.MeshStandardMaterial({ color: 0xc9d0ee, roughness: 0.95 }));
        moon.position.set(0.6, 5.2, -11);
        scene.add(moon);

        // ---------- Estrellas de fondo ----------
        const N = 1600;
        const pos = new Float32Array(N * 3);
        const col = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
          const u = Math.random() * 2 - 1;
          const a = Math.random() * Math.PI * 2;
          const rr = 120;
          pos.set([Math.sqrt(1 - u * u) * Math.cos(a) * rr, Math.abs(u) * rr * 0.8 + 2, Math.sqrt(1 - u * u) * Math.sin(a) * rr - 30], i * 3);
          const c = new THREE.Color().setHSL(Math.random() < 0.2 ? 0.11 : 0.63, 0.7, 0.75 + Math.random() * 0.2);
          col.set([c.r, c.g, c.b], i * 3);
        }
        const sg = new THREE.BufferGeometry();
        sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        sg.setAttribute("color", new THREE.BufferAttribute(col, 3));
        scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.28, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false })));

        // ---------- Muñeco (modelo CC0) ----------
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        const gltf = await loader.loadAsync("/models/hombre-hero.glb");
        if (disposed) return;
        const model = gltf.scene;
        const dollMat = new THREE.MeshPhysicalMaterial({
          color: 0x1d2755, roughness: 0.34, metalness: 0.12,
          clearcoat: 0.9, clearcoatRoughness: 0.22,
          sheen: 1, sheenColor: new THREE.Color(0xffd27a), sheenRoughness: 0.3,
        });
        model.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh) {
            m.castShadow = true;
            m.receiveShadow = true;
            m.frustumCulled = false;
            m.material = dollMat;
          }
        });
        model.updateMatrixWorld(true);
        const hb: Record<string, THREE.Object3D> = {};
        model.traverse((o) => { if ((o as THREE.Bone).isBone) hb[o.name] = o; });
        const wy = (n: string) => hb[n].getWorldPosition(new THREE.Vector3()).y;
        const footY = Math.min(wy("LeftToeBase"), wy("RightToeBase"), wy("LeftFoot"), wy("RightFoot")) - 0.02;
        const k = 1.78 / (wy("head_end") - footY);
        model.scale.setScalar(k);
        model.position.y = -footY * k;
        const root = new THREE.Group();
        root.add(model);
        root.rotation.y = Math.PI / 2 - 0.3; // de perfil, mirando hacia la estrella
        scene.add(root);
        const bones = hb;
        const rest = Object.fromEntries(Object.entries(bones).map(([n, b]) => [n, b.quaternion.clone()]));

        const _a = new THREE.Vector3(), _b = new THREE.Vector3();
        const _q = new THREE.Quaternion(), _qw = new THREE.Quaternion(), _qp = new THREE.Quaternion(), _id = new THREE.Quaternion();
        // Gira un hueso para que su hijo apunte hacia `dirFig` (x izquierda, y arriba, z adelante de la figura)
        const aim = (name: string, childName: string, dirFig: THREE.Vector3, weight = 1) => {
          const bone = bones[name], child = bones[childName];
          if (!bone || !child) return;
          bone.updateMatrixWorld(true);
          bone.getWorldPosition(_a);
          child.getWorldPosition(_b);
          const cur = _b.sub(_a).normalize();
          const want = dirFig.clone().normalize().applyQuaternion(root.quaternion);
          _q.setFromUnitVectors(cur, want);
          if (weight < 1) _q.slerp(_id, 1 - weight);
          bone.getWorldQuaternion(_qw);
          bone.parent!.getWorldQuaternion(_qp);
          bone.quaternion.copy(_qp.invert().multiply(_q).multiply(_qw));
          bone.updateMatrixWorld(true);
        };
        const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
        type Pose = { lean: THREE.Vector3; rU: THREE.Vector3; rL: THREE.Vector3; lU: THREE.Vector3; lL: THREE.Vector3; rT: THREE.Vector3; rS: THREE.Vector3; lT: THREE.Vector3; lS: THREE.Vector3; look: THREE.Vector3 };
        const REST: Pose = { lean: V(0, 1, 0), rU: V(-0.14, -1, 0), rL: V(-0.08, -1, 0.12), lU: V(0.14, -1, 0), lL: V(0.08, -1, 0.12), rT: V(-0.03, -1, -0.1), rS: V(-0.02, -1, -0.08), lT: V(0.03, -1, 0.12), lS: V(0.02, -1, 0.08), look: V(0, 0.15, 1) };
        const WIND: Pose = { lean: V(0, 1, -0.22), rU: V(-0.18, 0.12, -0.97), rL: V(-0.16, 0.22, -0.96), lU: V(0.22, 0.5, 0.84), lL: V(0.2, 0.55, 0.81), rT: V(-0.04, -0.95, -0.31), rS: V(-0.03, -0.92, -0.38), lT: V(0.05, -0.96, 0.28), lS: V(0.03, -1, 0.08), look: V(0, 0.55, 1) };
        const RELEASE: Pose = { lean: V(0, 1, 0.2), rU: V(-0.1, 0.86, 0.5), rL: V(-0.08, 0.8, 0.6), lU: V(0.55, -0.45, 0.05), lL: V(0.3, -0.6, 0.72), rT: V(-0.04, -0.92, -0.38), rS: V(-0.03, -0.75, -0.66), lT: V(0.05, -0.92, 0.38), lS: V(0.03, -1, 0.1), look: V(0, 0.55, 1) };
        const FOLLOW: Pose = { lean: V(0, 1, 0.3), rU: V(-0.14, -0.25, 0.96), rL: V(-0.1, -0.55, 0.83), lU: V(0.45, -0.85, -0.25), lL: V(0.25, -0.95, 0.15), rT: V(-0.04, -0.93, -0.36), rS: V(-0.03, -0.8, -0.6), lT: V(0.05, -0.94, 0.34), lS: V(0.03, -1, 0.1), look: V(0, 0.4, 1) };
        const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        const SEG: [number, number, Pose, Pose, (t: number) => number][] = [
          [0.6, 1.7, REST, WIND, ease],
          [1.7, 2.0, WIND, RELEASE, (t) => t * t],
          [2.0, 2.5, RELEASE, FOLLOW, (t) => 1 - Math.pow(1 - t, 3)],
          [2.5, 4.0, FOLLOW, REST, ease],
        ];
        const keys = Object.keys(REST) as (keyof Pose)[];
        const mixPose = (a: Pose, b: Pose, f: number): Pose => Object.fromEntries(keys.map((n) => [n, a[n].clone().lerp(b[n], f)])) as Pose;
        const poseAt = (t: number): Pose => {
          for (const [a, b, f, g, e] of SEG) if (t >= a && t < b) return mixPose(f, g, e((t - a) / (b - a)));
          return REST;
        };
        const applyPose = (p: Pose) => {
          for (const [n, q] of Object.entries(rest)) bones[n].quaternion.copy(q);
          model.updateMatrixWorld(true);
          aim("Spine", "Spine01", p.lean, 0.8);
          aim("Spine01", "Spine02", p.lean, 0.8);
          aim("Spine02", "neck", p.lean, 0.8);
          aim("RightArm", "RightForeArm", p.rU);
          aim("RightForeArm", "RightHand", p.rL);
          aim("LeftArm", "LeftForeArm", p.lU);
          aim("LeftForeArm", "LeftHand", p.lL);
          aim("RightUpLeg", "RightLeg", p.rT);
          aim("RightLeg", "RightFoot", p.rS);
          aim("LeftUpLeg", "LeftLeg", p.lT);
          aim("LeftLeg", "LeftFoot", p.lS);
          aim("neck", "Head", V(0, 1, 0), 0.7);
          aim("Head", "head_end", V(0, 1, 0.04 - 0.3 * p.look.y), 0.8);
        };

        // ---------- Lanza de luz ----------
        const spear = new THREE.Group();
        spear.add(new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 1.5, 12), new THREE.MeshBasicMaterial({ color: 0x9fb4ff })));
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.16, 16), new THREE.MeshBasicMaterial({ color: 0xfff1c4 }));
        tip.position.y = 0.82;
        const tipGlow = new THREE.Sprite(additive(glowTex, 0xffd27a));
        tipGlow.scale.setScalar(0.6);
        tipGlow.position.y = 0.8;
        spear.add(tip, tipGlow);
        scene.add(spear);

        // ---------- Postproceso ----------
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0.5, 0.72);
        composer.addPass(bloom);
        composer.addPass(new OutputPass());

        const resize = () => {
          const w = host.clientWidth || 1;
          const h = host.clientHeight || 1;
          renderer.setSize(w, h, false);
          composer.setSize(w, h);
          camera.aspect = w / h;
          // En pantallas medianas el muñeco se corre a la derecha para no pisar el texto
          camera.clearViewOffset();
          if (w < 1100) camera.setViewOffset(w, h, -w * 0.1, 0, w, h);
          camera.updateProjectionMatrix();
        };
        resize();

        const mouse = new THREE.Vector2();
        const onPointer = (e: PointerEvent) => mouse.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("resize", resize);

        const up = new THREE.Vector3(0, 1, 0);
        const bez = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, u: number) =>
          a.clone().multiplyScalar((1 - u) ** 2).add(b.clone().multiplyScalar(2 * (1 - u) * u)).add(c.clone().multiplyScalar(u * u));
        const handBone = bones["RightHand"];
        const handPos = (t: number) => {
          applyPose(poseAt(t));
          root.updateMatrixWorld(true);
          return handBone.getWorldPosition(new THREE.Vector3());
        };
        const launchFrom = handPos(T_REL - 0.001).addScaledVector(STAR.clone().sub(handPos(T_REL - 0.001)).normalize(), 0.35);
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const t0 = performance.now();
        let visible = true;
        let raf = 0;

        const frame = (now: number) => {
          const el = (now - t0) / 1000;
          const t = reduced ? T_IMP + 0.5 : el % CYCLE;
          applyPose(poseAt(t));
          root.updateMatrixWorld(true);

          if (t < T_REL || t > 5.6) {
            spear.visible = t < T_REL || t > 5.9;
            const hand = handBone.getWorldPosition(new THREE.Vector3());
            const dir = STAR.clone().sub(hand).normalize();
            spear.position.copy(hand).addScaledVector(dir, 0.35);
            spear.quaternion.setFromUnitVectors(up, dir);
            spear.scale.setScalar(1);
          } else if (t < T_IMP) {
            spear.visible = true;
            const u = (t - T_REL) / FLIGHT;
            const ctrl = launchFrom.clone().lerp(STAR, 0.5).add(V(0, 2.2, 0));
            const p1 = bez(launchFrom, ctrl, STAR, u);
            const p2 = bez(launchFrom, ctrl, STAR, Math.min(1, u + 0.02));
            spear.position.copy(p1);
            spear.quaternion.setFromUnitVectors(up, p2.sub(p1).normalize());
            spear.scale.setScalar(1 - u * 0.5);
          } else spear.visible = false;

          // Impacto: la estrella crece, destella y aparece la palabra
          const flare = t >= T_IMP ? Math.exp(-(t - T_IMP) * 1.6) : 0;
          const tw = 1 + Math.sin(el * 2.2) * 0.05;
          starGlow.scale.setScalar(1.6 * tw + flare * 4);
          starCore.rotation.z = starCore2.rotation.z = el * 0.2;
          key.intensity = 4.4 + flare * 4;
          const wa = t < T_IMP ? 0 : Math.min(1, (t - T_IMP) / 0.32) * (t < 6.45 ? 1 : Math.max(0, (7.15 - t) / 0.55));
          (word.material as THREE.SpriteMaterial).opacity = wa;

          camera.position.set(camBase.x + mouse.x * 0.5, camBase.y - mouse.y * 0.25, camBase.z);
          camera.lookAt(target);
          composer.render();
          if (!reduced && visible && !disposed) raf = requestAnimationFrame(frame);
        };

        const io = new IntersectionObserver(([entry]) => {
          const was = visible;
          visible = entry.isIntersecting;
          if (visible && !was && !reduced) raf = requestAnimationFrame(frame);
        });
        io.observe(host);
        raf = requestAnimationFrame(frame);

        cleanup = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          window.removeEventListener("pointermove", onPointer);
          window.removeEventListener("resize", resize);
          scene.traverse((o) => {
            const m = o as THREE.Mesh;
            if (m.geometry) m.geometry.dispose();
          });
          composer.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (err) {
        console.warn("Escena 3D no disponible, se usa la 2D", err);
        if (!disposed) onFail();
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [onFail]);

  return <div ref={hostRef} aria-hidden="true" className="absolute inset-0" />;
}
