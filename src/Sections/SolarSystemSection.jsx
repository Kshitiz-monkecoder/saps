// SolarSystemLuxuryFINAL_GoldTheme.jsx
import React, { useRef, useState, Suspense, useMemo, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  useTexture,
  Effects,
} from "@react-three/drei";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

/* ---------------------------------------
   LUXURY THEME
--------------------------------------- */
const THEME = {
  bg: "#000000",
  gold: "#c9a959",
  silver: "#d3d3d3",
  cardBg: "rgba(255,255,255,0.03)",
  cardBorder: "rgba(201,169,89,0.25)",
};

/* ---------------------------------------
   PLANETS / SERVICES
--------------------------------------- */
const PLANETS = [
  {
    id: "p1",
    name: "Photography & Video Production",
    desc: "High-quality visuals, cinematic shots and complete production support.",
    size: 1.2,
    distance: 10,
    speed: 0.8,
    texture: "/textures/planet1.jpg",
    route: "/services/photography",
  },
  {
    id: "p2",
    name: "Web Development",
    desc: "Premium full-stack experiences engineered for conversions.",
    size: 1.8,
    distance: 17,
    speed: 0.5,
    texture: "/textures/planet2.jpg",
    route: "/services/web-design-development",
  },
  {
    id: "p3",
    name: "Branding & Creative Direction",
    desc: "High-end brand identity, visual systems & luxury-focused creative strategy.",
    size: 2.0,
    distance: 25,
    speed: 0.34,
    texture: "/textures/planet3.jpg",
    route: "/services/branding",
  },
  {
    id: "p4",
    name: "3D Animation",
    desc: "Cinematic product renders, motion visuals & world-class animations.",
    size: 2.6,
    distance: 33,
    speed: 0.22,
    texture: "/textures/planet4.jpg",
    route: "/services/3d-models",
  },
  {
    id: "p5",
    name: "Social Media Management",
    desc: "Strategic content, scheduling and growth systems across all platforms.",
    size: 3.1,
    distance: 45,
    speed: 0.15,
    texture: "/textures/planet5.jpg",
    route: "/services/social-media",
  },
];

/* ---------------------------------------
   SCROLL-LIMIT CAMERA (25% influence)
--------------------------------------- */
function useLimitedScrollCamera(maxScroll = 0.15) {
  const { camera } = useThree();
  const baseZ = 78; // main camera position (from your Canvas)
  const zoomRange = 3; // tiny, subtle zoom

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("solar-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();

      // Only active when section is visible
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      const scrollPos = Math.min(
        Math.max((window.innerHeight - rect.top) / rect.height, 0),
        1
      );

      const influence = Math.min(scrollPos, maxScroll);

      // ❗ Only small Z-movement — NO rotation, NO tilt
      camera.position.z = baseZ - influence * zoomRange;
      camera.position.y = 22; // lock Y
      camera.position.x = 0;  // lock X
      camera.lookAt(0, 0, 0); // always look center
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera]);
}


function LimitedScrollCamera() {
  useLimitedScrollCamera(0.25);
  return null;
}

/* ---------------------------------------
   SUN
--------------------------------------- */
function GoldenSun({ radius = 1.4 }) {
  const sunRef = useRef();
  const tex = useTexture("/textures/sun.jpg");

  useFrame(({ clock }) => {
    sunRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={tex}
          emissive={THEME.gold}
          emissiveIntensity={3.5}
          roughness={0.25}
        />
      </mesh>
      <pointLight color={THEME.gold} intensity={10} distance={300} />
    </group>
  );
}

/* ---------------------------------------
   GOLD PARTICLES
--------------------------------------- */
function GoldenParticles({ count = 500 }) {
  const mesh = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 130;
      const t = Math.random() * Math.PI * 2;
      const p = (Math.random() - 0.5) * Math.PI;

      arr[i * 3] = Math.cos(t) * Math.cos(p) * r;
      arr[i * 3 + 1] = Math.sin(p) * 30;
      arr[i * 3 + 2] = Math.sin(t) * Math.cos(p) * r;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.55}
        opacity={1}
        transparent
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={THEME.gold}
      />
    </points>
  );
}

/* ---------------------------------------
   PLANET (Updated: 50% slower)
--------------------------------------- */
function Planet({ data, hoveredId, setHoveredId, onSelect }) {
  const pivot = useRef();
  const mesh = useRef();
  const orbitRing = useRef();
  const tex = useTexture(data.texture);

  const scaleRef = useRef(1);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const isHovered = hoveredId === data.id;

    // 50% slower rotation
    pivot.current.rotation.y += data.speed * 0.5 * (isHovered ? 0.012 : 0.035);

    pivot.current.rotation.x = Math.sin(t * 0.07) * 0.015;

    mesh.current.rotation.y += 0.002; // slower

    if (isHovered) mesh.current.rotation.y += 0.018; // slow-hover spin

    if (orbitRing.current)
      orbitRing.current.rotation.z = Math.sin(t * 0.05) * 0.02;

    scaleRef.current += isHovered ? 0.05 : -0.05;
    scaleRef.current = THREE.MathUtils.clamp(scaleRef.current, 1, 1.25);
    mesh.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
  });

  return (
    <group ref={pivot}>
      <group position={[data.distance, 0, 0]}>
        <mesh
          ref={mesh}
          onPointerOver={() => setHoveredId(data.id)}
          onPointerOut={() => setHoveredId(null)}
          onClick={() => onSelect(data)}
        >
          <sphereGeometry args={[data.size, 64, 64]} />
          <meshPhysicalMaterial
            map={tex}
            metalness={0.35}
            roughness={0.45}
            clearcoat={0.4}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Hover Glow */}
        <mesh>
          <sphereGeometry args={[data.size * 1.07, 32, 32]} />
          <meshBasicMaterial
            color={THEME.gold}
            transparent
            opacity={hoveredId === data.id ? 0.55 : 0.08}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Orbit Ring */}
      <mesh ref={orbitRing} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 256]} />
        <meshBasicMaterial
          side={THREE.DoubleSide}
          transparent
          opacity={hoveredId === data.id ? 0.35 : 0.15}
          color={THEME.silver}
        />
      </mesh>
    </group>
  );
}

/* ---------------------------------------
   MAIN COMPONENT
--------------------------------------- */
export default function SolarSystemLuxuryFinal({ style }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <div
      id="services"
      className="w-full relative"
      style={{
        height: style?.height || "85vh",
        background: `radial-gradient(circle at 25% 10%, #141414 0%, #000 75%)`,
      }}
    >
      <Canvas
        camera={{ position: [0, 22, 78], fov: 54 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
        }}
        dpr={[1, 1.4]}
      >
        <Suspense fallback={null}>
          <LimitedScrollCamera />

          <color attach="background" args={[THEME.bg]} />
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[50, 80, 40]}
            intensity={0.85}
            color={THEME.gold}
          />

          <Stars radius={350} count={1000} depth={100} fade speed={0.15} />

          <GoldenParticles />
          <GoldenSun />

          {PLANETS.map((p) => (
            <Planet
              key={p.id}
              data={p}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              onSelect={setSelected}
            />
          ))}

          {/* Cinematic Bloom */}
          <Effects>
            <unrealBloomPass threshold={0.12} strength={1.9} radius={1.0} />
          </Effects>

          {/* Disable zoom completely */}
          <OrbitControls enableZoom={false} enableRotate={false} />
        </Suspense>
      </Canvas>

      {/* HEADER TOP LEFT */}
      <div className="absolute left-6 top-6 text-white" style={{ pointerEvents: "none" }}>
        <div className="text-xs tracking-wider opacity-60">OUR SERVICES</div>
        <div className="text-2xl font-semibold mt-1" style={{ color: THEME.silver }}>
          Premium Digital Systems
        </div>
      </div>

      {/* RIGHT PANEL */}
       <div className="absolute right-6 top-6 flex flex-col gap-4 items-end">
        <div className="p-2 rounded-xl" style={{ backdropFilter: "blur(6px)" }}>
          {PLANETS.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}  // make right panel clickable
              className="flex items-center gap-3 mb-2 cursor-pointer hover:opacity-80 transition"
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  background: THEME.gold,
                  boxShadow: `0 0 12px ${THEME.gold}`,
                }}
              />
              <div className="text-sm" style={{ color: THEME.silver }}>
                {p.name}
              </div>
            </div>
          ))}
        </div>

        {/* HOVER PANEL */}
        <div
          className="w-80 max-w-xs p-4 rounded-2xl"
          style={{
            background: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            backdropFilter: "blur(10px)",
          }}
        >
          {!hoveredId ? (
            <div style={{ color: THEME.silver }}>
              <div className="text-sm font-semibold" style={{ color: THEME.gold }}>
                Hover a planet
              </div>
              <div className="text-xs mt-2 opacity-80">
                Move your cursor to explore each service.
              </div>
            </div>
          ) : (
            (() => {
              const d = PLANETS.find((x) => x.id === hoveredId);
              return (
                <div>
                  <div className="text-sm" style={{ color: THEME.gold }}>
                    {d.name}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {d.desc}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>

      {/* SELECTED MODAL */}
      {selected && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[min(880px,92%)] p-6 rounded-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(10,10,10,0.9), rgba(0,0,0,0.6))",
            border: `1px solid rgba(201,169,89,0.22)`,
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="flex items-start gap-6">
            <img
              src={selected.texture}
              className="w-24 h-24 rounded-xl border"
              style={{ borderColor: THEME.cardBorder }}
            />

            <div className="flex-1 text-white">
              <div className="text-xl font-semibold">{selected.name}</div>
              <div className="text-sm opacity-80 mt-1">{selected.desc}</div>

              <div className="mt-4 flex gap-3">
  {/* ✨ OPEN BUTTON — Gold Glass Luxury */}
 <a
  href={selected.route}
  target="_blank"
  rel="noopener noreferrer"
  className="
    relative px-7 py-3 rounded-xl font-semibold tracking-wide
    overflow-hidden group cursor-pointer transition-all duration-500
    shadow-[0_0_15px_rgba(255,220,140,0.3)]
  "
  style={{
    background:
      "linear-gradient(135deg, #F8E8B0 0%, #D6B979 45%, #B9984F 100%)",
    color: "#000",
  }}
>
  {/* 🔥 Outer glow on hover */}
  <span
    className="
      absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
      transition-all duration-500
      shadow-[0_0_35px_10px_rgba(255,220,140,0.55)]
    "
  />

  {/* ✨ Gold Shine Swipe */}
  <span
    className="
      absolute left-[-130%] top-0 h-full w-[180%]
      bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.8),transparent)]
      opacity-20 group-hover:opacity-70
      transition-all duration-[900ms] ease-out
      group-hover:left-[150%]
    "
  />

  {/* 💥 Golden Pulse on Click */}
  <span
    className="
      absolute inset-0 rounded-xl pointer-events-none
      scale-0 group-active:scale-100 opacity-0 group-active:opacity-40
      transition-all duration-300
      bg-[radial-gradient(circle,rgba(255,230,150,0.65),transparent_70%)]
    "
  />

  <span className="relative z-10 flex items-center gap-2">
    Open <span className="text-yellow-700">→</span>
  </span>
</a>


  {/* ✨ CLOSE BUTTON — Black-Gold Minimal Elite */}
  <button
    onClick={() => setSelected(null)}
    className="
      relative px-5 py-2.5 rounded-xl font-medium tracking-wide 
      overflow-hidden border backdrop-blur-xl group
      transition-all duration-500 cursor-pointer
    "
    style={{
      border: "1px solid rgba(200,180,120,0.35)",
      color: "#E9D9A0",
      background: "rgba(20,20,20,0.4)",
      boxShadow: "inset 0 0 30px rgba(255,255,255,0.05)",
    }}
  >
    {/* hover glow */}
    <span
      className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-[linear-gradient(135deg,rgba(255,215,150,0.15),rgba(0,0,0,0))]
        transition-opacity duration-500
      "
    />

    {/* subtle stroke animation */}
    <span
      className="
        absolute bottom-0 left-0 w-0 group-hover:w-full
        h-[1.5px] bg-gradient-to-r from-yellow-300 to-yellow-600
        transition-all duration-500
      "
    />

    <span className="relative z-10">Close</span>
  </button>
</div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
