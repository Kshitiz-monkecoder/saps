// AboutSection.jsx
import * as THREE from "three";
import React, { useRef, useEffect, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import {
  shaderMaterial,
  Environment,
  Html,
  useTexture,
  OrbitControls,
  Effects,
} from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

extend({ UnrealBloomPass });

// ---------- Water shader material (unchanged) ----------
const WaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uCaustics: null,
    uSpherePos: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
    uSphereInfluence: [0, 0, 0, 0],
    uFlicker: 0,
  },
  /* vertex */ `
  varying vec2 vUv;
  varying vec3 vPos;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float t = uTime * 0.35;
    pos.z += sin((pos.x + t) * 1.7) * 0.02;
    pos.z += sin((pos.y + t * 0.8) * 2.0) * 0.015;
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  /* fragment */ `
  uniform sampler2D uCaustics;
  uniform vec3 uSpherePos[4];
  uniform float uSphereInfluence[4];
  uniform float uFlicker;
  varying vec2 vUv;
  varying vec3 vPos;

  float sphereDistInfluence(vec3 sp, float influence) {
    float d = length(vec2(vPos.x - sp.x, vPos.y - sp.y));
    float r = mix(0.02, 0.9, influence);
    float fall = smoothstep(r, 0.0, d);
    return fall * influence;
  }

  void main() {
    vec3 base = vec3(0.01, 0.01, 0.015);
    float viewFactor = pow(1.0 - abs(vUv.y - 0.5), 3.0);
    vec3 sheen = vec3(0.02, 0.02, 0.03) * viewFactor;
    vec2 cUv = vUv * 4.0 + vec2(uFlicker * 0.1);
    vec3 caust = texture2D(uCaustics, cUv).rgb * 0.08;
    float proximity = 0.0;
    for (int i = 0; i < 4; i++) {
      proximity += sphereDistInfluence(uSpherePos[i], uSphereInfluence[i]);
    }
    float ripple = sin((vUv.x + vUv.y) * 30.0 - uFlicker * 12.0) * 0.003;
    vec3 color = base + sheen + caust + vec3(ripple) + vec3(proximity * 0.18);
    float vig = smoothstep(0.9, 0.3, length(vUv - 0.5));
    color *= mix(1.0, 0.6, vig);
    gl_FragColor = vec4(color, 1.0);
  }
  `
);
extend({ WaterMaterial });

// ---------- WaterPlane: MUST BE INSIDE <Canvas/> because it uses useTexture (a R3F hook) ----------
function WaterPlane({ waterRef }) {
  // THIS HOOK MUST RUN ONLY INSIDE THE CANVAS subtree
  const caustics = useTexture("/textures/caustics-1.jpg");
  // You can update material uniforms (uTime, uSpherePos, etc.) via waterRef in a useFrame in parent if needed
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
      <planeGeometry args={[14, 8, 256, 256]} />
      <waterMaterial ref={waterRef} uCaustics={caustics} uFlicker={0.0} />
    </mesh>
  );
}

// ---------- SplashParticles (unchanged) ----------
function SplashParticles({ active }) {
  const count = 120;
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = (Math.random() - 0.2) * 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({ size: 0.02, transparent: true, opacity: 0.9 }),
    []
  );

  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.2;
    ref.current.material.opacity = active ? Math.min(1, ref.current.material.opacity + delta * 2) : Math.max(0, ref.current.material.opacity - delta * 1.5);
    ref.current.position.y += active ? delta * 0.6 : -delta * 0.3;
  });

  return <points ref={ref} geometry={geom} material={mat} />;
}

// ---------- GlassOrb (unchanged) ----------
function GlassOrb({ position = [0, -0.6, 0], color = "#ffffff", delay = 0, onRise = () => {}, index = 0 }) {
  const mesh = useRef();
  const [emerged, setEmerged] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => { setEmerged(true); onRise(index); } });
    tl.to(mesh.current.position, { y: 0.02, duration: 2.0, delay, ease: "power3.out" });
    tl.to(mesh.current.scale, { x: 1.05, y: 1.05, z: 1.05, duration: 0.6, yoyo: true, repeat: 1 }, "-=.6");
    return () => tl.kill();
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    if (emerged) mesh.current.position.y = 0.02 + Math.sin(t * 1.2) * 0.01;
  });

  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <sphereGeometry args={[0.33, 64, 64]} />
      <meshPhysicalMaterial
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0}
        roughness={0}
        transmission={0.95}
        thickness={0.6}
        envMapIntensity={1.6}
        reflectivity={0.6}
        attenuationColor={new THREE.Color(color)}
        attenuationDistance={0.8}
      />
      <Html center style={{ pointerEvents: "none", color: "#fff", fontSize: 22, fontWeight: 600 }}>
        {index === 0 ? "in" : index === 1 ? "IG" : index === 2 ? "📞" : "✉️"}
      </Html>
    </mesh>
  );
}

// ---------- CameraController (unchanged) ----------
function CameraController({ active }) {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.06;
    camera.position.x = Math.sin(t) * 0.12;
    camera.position.y = 2.2 + (active ? Math.sin(state.clock.elapsedTime * 0.12) * 0.03 : 0);
    camera.lookAt(0, 0.02, 0);
  });
  return null;
}

// ---------- Main AboutSection ----------
export default function AboutSection({ className = "luxury-contact" }) {
  const sectionRef = useRef();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-120px" });
  const waterRef = useRef();

  // sphere state (you may want to map these into the shader uniforms later)
  const sphereRefs = useRef([
    { pos: new THREE.Vector3(-2.1, -0.6, 0), influence: 0 },
    { pos: new THREE.Vector3(-0.7, -0.6, 0), influence: 0 },
    { pos: new THREE.Vector3(0.7, -0.6, 0), influence: 0 },
    { pos: new THREE.Vector3(2.1, -0.6, 0), influence: 0 },
  ]);

  // audio
  const audioRef = useRef();
  useEffect(() => {
    audioRef.current = new Audio('/bubble-rise.wav');
    audioRef.current.volume = 0.35;
  }, []);

  useEffect(() => {
    if (inView) {
      gsap.to(sectionRef.current, { opacity: 1, duration: 0.8 });
    }
  }, [inView]);

  const handleOrbRise = (i) => {
    const target = sphereRefs.current[i];
    gsap.to(target, { y: 0.0, duration: 0.1 });
    if (audioRef.current) {
      audioRef.current.currentTime = 0.05 * i;
      audioRef.current.play().catch(() => {});
    }
    gsap.fromTo(target, { influence: 1.0 }, { influence: 0, duration: 1.6, ease: "power2.out" });
  };

  // Optional: update shader uniforms from sphereRefs here using useFrame if you want real-time interaction
  // e.g. useFrame(() => { if (waterRef.current) { waterRef.current.uSpherePos = ... } });

  return (
    <div ref={ref} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }} className={className}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.12, backgroundImage: 'url(/textures/lens-dirt.png)', backgroundSize: 'cover' }} />

      <Canvas camera={{ position: [0, 2.2, 4.6], fov: 38 }} shadows>
        <color attach="background" args={[0x000000]} />
        <Suspense fallback={null}>
          <Environment preset="dawn" />
          {/* WaterPlane renders the water mesh and uses useTexture safely inside Canvas */}
          <WaterPlane waterRef={waterRef} />
        </Suspense>

        <ambientLight intensity={0.12} />
        <directionalLight position={[5, 10, 5]} intensity={1.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

        {/* Orbs */}
        <GlassOrb position={[-2.1, -0.6, 0]} color="#6DD3FF" delay={0.3} onRise={handleOrbRise} index={0} />
        <GlassOrb position={[-0.7, -0.6, 0]} color="#FF6BCA" delay={0.7} onRise={handleOrbRise} index={1} />
        <GlassOrb position={[0.7, -0.6, 0]} color="#4EFFA8" delay={1.0} onRise={handleOrbRise} index={2} />
        <GlassOrb position={[2.1, -0.6, 0]} color="#7C9BFF" delay={1.3} onRise={handleOrbRise} index={3} />

        <group position={[0, 0.02, 0]}>
          <SplashParticles active={inView} />
        </group>

        <CameraController active={inView} />

        <Effects>
          <unrealBloomPass threshold={0.35} strength={0.6} radius={0.8} />
        </Effects>

      </Canvas>

      <div style={{ position: 'absolute', left: '6%', top: '18%', color: '#fff', fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}>
        <h2 style={{ margin: 0, fontSize: 28, opacity: 0.9 }}>Contact</h2>
        <p style={{ marginTop: 10, color: '#d7d7d7', maxWidth: 420 }}>Our team is available for select partnerships. Hover or click the spheres to connect.</p>
      </div>
    </div>
  );
}
