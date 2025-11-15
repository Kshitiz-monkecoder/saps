import React from "react";
import { Html } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export function FloatingBall({ x, delay, color, icon }) {
  const ball = useRef();
  const ripple = useRef();

  useEffect(() => {
    gsap.fromTo(
      ball.current.position,
      { y: -1 },
      {
        y: 0.8,     // ⬅️ Correct floating height
        duration: 2,
        ease: "power3.out",
        delay,
      }
    );

    gsap.to(ball.current.position, {
      y: "+=0.06",
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <group position={[x, 0, 0]}>
      {/* Floating Glowing Ball */}
      <mesh ref={ball}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.2}   // 🔥 brighter glow
          metalness={0.6}
          roughness={0.1}
          reflectivity={1}
        />
      </mesh>

      {/* Icon */}
      <Html center position={[0, 0, 0.62]}>
        <div style={{ fontSize: 40, color: "white" }}>{icon}</div>
      </Html>

      {/* Ripple */}
      <mesh
        ref={ripple}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.6, 0]}
      >
        <ringGeometry args={[0.55, 0.85, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
