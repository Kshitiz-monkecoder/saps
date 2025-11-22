// SolarSystemLuxuryFINAL_GoldTheme.jsx
import React, { useRef, useState, Suspense, useMemo } from "react";
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
    name: "3D Animation",
    desc: "Cinematic product renders, motion visuals & world-class animations.",
    size: 1.2,
    distance: 10,
    speed: 0.8,
    texture: "/textures/planet1.jpg",
  },
  {
    id: "p2",
    name: "Web Development",
    desc: "Premium full-stack experiences engineered for conversions.",
    size: 1.8,
    distance: 17,
    speed: 0.5,
    texture: "/textures/planet2.jpg",
  },
  {
    id: "p3",
    name: "Video Editing",
    desc: "High-impact editing crafted for storytelling & brand elevation.",
    size: 2.0,
    distance: 25,
    speed: 0.34,
    texture: "/textures/planet3.jpg",
  },
  {
    id: "p4",
    name: "AI Solutions",
    desc: "Automation, recommendations & custom AI-driven systems.",
    size: 3.0,
    distance: 33,
    speed: 0.22,
    texture: "/textures/planet4.jpg",
  },
  {
    id: "p5",
    name: "Marketing",
    desc: "Growth systems powered by AI and strategic funnels.",
    size: 3.5,
    distance: 45,
    speed: 0.12,
    texture: "/textures/planet4.jpg",
  },
];

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

      {/* Stronger light */}
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
   AUTO CAMERA ORBIT (Slow)
--------------------------------------- */
function AutoCameraMotion() {
  const { camera } = useThree();
  const t = useRef(0);

  useFrame(() => {
    t.current += 0.002;

    const radius = 65;

    camera.position.x = Math.sin(t.current) * radius;
    camera.position.z = Math.cos(t.current) * radius;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---------------------------------------
   PLANET (Hover Effects, Rotation, Scale)
--------------------------------------- */
function Planet({ data, hoveredId, setHoveredId, onSelect }) {
  const pivot = useRef();
  const mesh = useRef();
  const orbitRing = useRef();
  const tex = useTexture(data.texture);

  const scaleRef = useRef(1);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Normal orbits
    const isHovered = hoveredId === data.id;
pivot.current.rotation.y += data.speed * (isHovered ? 0.012 : 0.035);


    // Slight bouncing
    pivot.current.rotation.x = Math.sin(t * 0.07) * 0.015;

    // Slow self-rotation
    mesh.current.rotation.y += 0.004;

    // On hover → faster rotation
    if (hoveredId === data.id) {
      mesh.current.rotation.y += 0.035;
    }

    // Ring wobble
    if (orbitRing.current)
      orbitRing.current.rotation.z = Math.sin(t * 0.05) * 0.02;

    // Hover scale animation
    scaleRef.current += hoveredId === data.id ? 0.05 : -0.05;
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
      className="w-full relative"
      style={{
        height: style?.height || "78vh",
        background: `radial-gradient(circle at 25% 10%, #141414 0%, #000 75%)`,
      }}
    >
      <Canvas camera={{ position: [0, 22, 65], fov: 54 }}
      gl={{
    antialias: false, // 🔥 +20 FPS
    powerPreference: "high-performance", // 🔥 Force GPU turbo mode
    alpha: false,
  }}
  dpr={[1, 1.4]} // 🔥 Balanced sharpness + FPS 
  >
        <Suspense fallback={null}>
          <color attach="background" args={[THEME.bg]} />

          {/* Lighting Balance */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[50, 80, 40]}
            intensity={0.85}
            color={THEME.gold}
          />

          <Stars radius={350} count={1000} depth={100} fade speed={0.15} />

          <GoldenParticles />
          <GoldenSun />

          {/* Auto cinematic camera motion */}
          <AutoCameraMotion />

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

          {/* Controlled orbiting */}
          <OrbitControls enableZoom={true} enableRotate={false} />
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

        {/* LIST */}
        <div className="p-2 rounded-xl" style={{ backdropFilter: "blur(6px)" }}>
          {PLANETS.map((p) => (
            <div key={p.id} className="flex items-center gap-3 mb-2">
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
              <div style={{ color: THEME.gold }} className="text-sm font-semibold">
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
                <a
                  href={`/services/${selected.id}`}
                  className="px-5 py-2 rounded-lg font-semibold"
                  style={{ background: THEME.gold, color: "#000" }}
                >
                  Open
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-lg border"
                  style={{ borderColor: THEME.cardBorder, color: "#fff" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
