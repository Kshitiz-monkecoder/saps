// SolarSystemLuxuryFinal.jsx
import React, { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture, Effects } from "@react-three/drei";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

/* === Theme & Data === */
const THEME = {
  bg: "#050006",
  gold: "#D4AF37",
  cardBg: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(212,175,55,0.16)",
  accent: "#d4af37",
};

const PLANETS = [
  { id: "p1", name: "3D Animation", desc: "High-end animated scenes & product cinematics.", size: 1.2, distance: 10, speed: 0.8, texture: "/textures/planet1.jpg" },
  { id: "p2", name: "Web Development", desc: "Product-grade full-stack experiences.", size: 1.8, distance: 17, speed: 0.5, texture: "/textures/planet2.jpg" },
  { id: "p3", name: "Video Editing", desc: "Cinematic ads & short-format storytelling.", size: 2.0, distance: 25, speed: 0.34, texture: "/textures/planet3.jpg" },
  { id: "p4", name: "AI Solutions", desc: "Automation, recommendation & ML engineering.", size: 3.0, distance: 33, speed: 0.22, texture: "/textures/planet4.jpg" },
];

/* =========================
   Utility: simple shader for heat shimmer
   (UV-based sine distortion — subtle, performant)
   ========================= */
const HeatShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#ffdf9b") },
    uIntensity: { value: 0.45 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uIntensity;
    varying vec2 vUv;
    varying vec3 vPos;
    // basic periodic noise (not perfect, but cheap)
    float noise(vec2 p){
      return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
    }
    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      for(int i=0;i<4;i++){
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }
    void main() {
      // create a vertical shimmer using uv and time
      float shimmer = sin((vUv.y * 10.0) + uTime * 3.5) * 0.5 + 0.5;
      float n = fbm(vUv * 5.0 + uTime * 0.7);
      float intensity = smoothstep(0.2, 1.0, shimmer * n) * uIntensity;
      vec3 col = uColor * (0.6 + intensity * 0.9);
      gl_FragColor = vec4(col, intensity * 0.9);
    }
  `,
};

/* =========================
   Sun (reduced size, corona + heat layer)
   ========================= */
function RealisticSun({ radius = 2 }) {
  const sunRef = useRef();
  const texture = useTexture("/textures/sun.jpg");

  useFrame(({ clock }) => {
    if (sunRef.current) sunRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <group>
      {/* Main sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={"#ffcc55"}
          emissiveIntensity={2.8}   // more glow
          roughness={0.3}
        />
      </mesh>

      {/* Glow light */}
      <pointLight color={"#ffd37a"} intensity={7} distance={260} />
    </group>
  );
}

/* =========================
   Golden particle field (depth)
   ========================= */
function GoldenParticles({ count = 350 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 160;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      arr[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
      arr[i * 3 + 1] = Math.sin(phi) * 20 + (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) mesh.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={mesh} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.6} sizeAttenuation={true} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} color={THEME.gold} />
    </points>
  );
}

/* =========================
   Planet component (wobble + orbit evolution)
   ========================= */
function Planet({ data, hoveredId, setHoveredId, onSelect }) {
  const pivot = useRef();
  const mesh = useRef();
  const orbitRef = useRef();
  const texture = useTexture(data.texture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const isHovered = hoveredId === data.id;
    const speedFactor = isHovered ? 0.08 : 1;
    // main orbit
    pivot.current.rotation.y += data.speed * 0.03 * speedFactor;
    // add a slow precession/wobble to make orbits evolve
    pivot.current.rotation.x = Math.sin(t * 0.07) * 0.02;
    // mesh self rotation
    mesh.current.rotation.y += 0.0035 + (isHovered ? 0.002 : 0);

    // rotate orbit ring slowly for subtle evolution (if present)
    if (orbitRef.current) orbitRef.current.rotation.z = Math.sin(t * 0.05) * 0.02;
  });

  const onPointerOver = (e) => {
    e.stopPropagation();
    setHoveredId(data.id);
  };
  const onPointerOut = (e) => {
    e.stopPropagation();
    setHoveredId(null);
  };
  const onClick = (e) => {
    e.stopPropagation();
    onSelect(data);
  };

  return (
    <group ref={pivot}>
      <group position={[data.distance, 0, 0]}>
        <mesh ref={mesh} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick} castShadow>
          <sphereGeometry args={[data.size, 64, 64]} />
          <meshPhysicalMaterial map={texture} metalness={0.12} roughness={0.45} clearcoat={0.2} clearcoatRoughness={0.08} />
        </mesh>

        {/* subtle gold halo around planet (tiny) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[data.size * 1.04, 32, 32]} />
          <meshBasicMaterial color={THEME.gold} transparent opacity={hoveredId === data.id ? 0.12 : 0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* orbit ring that also rotates slightly for evolving motion */}
      <mesh ref={orbitRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.02, data.distance + 0.02, 512]} />
        <meshBasicMaterial color={hoveredId === data.id ? THEME.gold : "#ffffff"} transparent opacity={hoveredId === data.id ? 0.22 : 0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* =========================
   Post processing (bloom)
   ========================= */
function PostFX() {
  // declarative use via extended pass element - placed inside Canvas below
  return (
    <>
      {/* We add a small screen-sized mesh or keep this placeholder — the pass is added as element in Canvas */}
    </>
  );
}

/* =========================
   The main exported component
   ========================= */
export default function SolarSystemLuxuryFinal({ style = { height: "78vh" } }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full relative" style={{ height: style.height, background: `linear-gradient(180deg, ${THEME.bg} 0%, #070018 100%)`, overflow: "hidden" }}>
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 6, 40], fov: 42 }} shadows>
        <Suspense fallback={null}>
          <color attach="background" args={[THEME.bg]} />

          {/* Lighting */}
          <ambientLight intensity={0.25} />
          <directionalLight position={[20, 30, 10]} intensity={0.6} castShadow />

          {/* stars & particles */}
          <Stars radius={350} depth={80} count={900} factor={6} fade speed={0.2} />
          <GoldenParticles />

          {/* Sun (smaller now) */}
          <RealisticSun radius={1.2} />

          {/* Planets */}
          {PLANETS.map((p) => (
            <Planet key={p.id} data={p} hoveredId={hoveredId} setHoveredId={setHoveredId} onSelect={(d) => setSelected(d)} />
          ))}

          {/* Bloom - added declaratively as an object */}
          <Effects>
  <unrealBloomPass threshold={0.12} strength={1.8} radius={1.0} />
</Effects>
          <PostFX />

          <OrbitControls enablePan enableRotate enableZoom minDistance={12} maxDistance={120} />
        </Suspense>
      </Canvas>

      {/* Left top title */}
      <div className="absolute left-6 top-6 text-white" style={{ pointerEvents: "none" }}>
        <div className="text-xs tracking-wider opacity-70">OUR SERVICES</div>
        <div className="text-2xl font-extrabold mt-1">Premium digital experiences</div>
      </div>

      {/* Right fixed Service Panel */}
      <div className="absolute right-6 top-6 flex flex-col gap-4 items-end" style={{ pointerEvents: "auto" }}>
        {/* Legend compact */}
        <div className="bg-transparent p-2 rounded-xl" style={{ backdropFilter: "blur(6px)" }}>
          {PLANETS.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 mb-2 text-right cursor-default" style={{ color: "rgba(255,255,255,0.9)" }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: i === 0 ? "#ffcc66" : i === 1 ? "#ff9a66" : i === 2 ? "#ffd94a" : "#6ea0ff", boxShadow: `0 0 12px ${THEME.gold}` }} />
              <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
            </div>
          ))}
        </div>

        {/* Fixed Panel showing hovered service details */}
        <div className="w-80 max-w-xs p-4 rounded-2xl" style={{ background: THEME.cardBg, border: `1px solid ${THEME.cardBorder}`, boxShadow: "0 10px 40px rgba(0,0,0,0.6)" }}>
          {hoveredId ? (
            (() => {
              const data = PLANETS.find(x => x.id === hoveredId);
              return (
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold" style={{ color: THEME.gold }}>{data.name}</div>
                      <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>{data.desc}</div>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid rgba(212,175,55,0.08)` }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: THEME.gold, boxShadow: `0 0 10px ${THEME.gold}` }} />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a href={`/services/${data.id}`} className="flex-1 text-center py-2 rounded-lg font-semibold" style={{ background: THEME.gold, color: "#060006" }}>View</a>
                    <a href="/contact" className="flex-1 text-center py-2 rounded-lg" style={{ border: `1px solid ${THEME.cardBorder}`, color: "#fff" }}>Contact</a>
                  </div>
                </div>
              );
            })()
          ) : (
            <div style={{ color: "rgba(255,255,255,0.8)" }}>
              <div className="text-sm font-semibold" style={{ color: THEME.gold }}>Hover a planet</div>
              <div className="text-xs mt-2">Hover any planet to reveal that service. Click to open details.</div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom selected preview (modal-ish) */}
      {selected && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[min(880px,92%)] p-6 rounded-3xl" style={{ background: "linear-gradient(180deg, rgba(4,4,4,0.7), rgba(10,8,12,0.45))", border: `1px solid rgba(212,175,55,0.12)`, boxShadow: "0 30px 60px rgba(0,0,0,0.6)" }}>
          <div className="flex items-start gap-6">
            <div style={{ width: 88, height: 88, borderRadius: 14, overflow: "hidden", border: `1px solid rgba(212,175,55,0.06)` }}>
              <img src={selected.texture} alt={selected.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-extrabold" style={{ color: "#fff" }}>{selected.name}</div>
                  <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.82)" }}>{selected.desc}</div>
                </div>
                <div className="flex gap-3">
                  <a href={`/services/${selected.id}`} className="px-4 py-2 rounded-lg font-semibold" style={{ background: THEME.gold, color: "#060006" }}>Open</a>
                  <button onClick={() => setSelected(null)} className="px-3 py-2 rounded-lg border" style={{ border: `1px solid ${THEME.cardBorder}`, color: "#fff" }}>Close</button>
                </div>
              </div>
              <div className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                A concise blurb about the service and how our agency delivers premium results — craft messaging here for the chosen service.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* decorative gold blur */}
      <div style={{ position: "absolute", left: 18, top: 18, width: 72, height: 72, borderRadius: 14, background: "linear-gradient(135deg, rgba(212,175,55,0.16), rgba(212,175,55,0.04))", filter: "blur(18px)", pointerEvents: "none" }} />
    </div>
  );
}