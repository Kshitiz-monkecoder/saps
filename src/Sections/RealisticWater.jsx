import React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RealisticWater() {
  const planeRef = useRef();

  useFrame(() => {
    // Slight dynamic glossy highlight movement (tiny)
    planeRef.current.material.envMapIntensity = 1.5;
  });

  return (
    <mesh
      ref={planeRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.2, 0]} // ⬅️  Water pushed down
    >
      <planeGeometry args={[40, 40]} />
      <meshPhysicalMaterial
        color="#020202"
        roughness={0.15}
        metalness={1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        reflectivity={1}
      />
    </mesh>
  );
}
