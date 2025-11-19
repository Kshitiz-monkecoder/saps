import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

// 👉 CONFIG — change these anytime
const MODEL_CONFIG = {
  rotationSpeed: 0.019,      // increase/decrease rotation speed
  scale: 3.0,               // model size ↑ (increase), ↓ (decrease)
  initialTilt: [1.5, 12.12, 0], // initial rotation
}

function Model() {
  const { scene } = useGLTF('/models/SAPS.glb')
  const modelRef = useRef()

  const targetRot = useRef(new THREE.Euler())

  // --- INITIAL ROTATION ---
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.set(
        MODEL_CONFIG.initialTilt[0],
        MODEL_CONFIG.initialTilt[1],
        MODEL_CONFIG.initialTilt[2]
      )
    }
  }, [])

  // --- ROTATION ANIMATION ---
  useFrame(() => {
    if (!modelRef.current) return

    // update target rotation
    targetRot.current.z += MODEL_CONFIG.rotationSpeed

    // smooth rotation
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      targetRot.current.z,
      0.1
    )
  })

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={MODEL_CONFIG.scale} // 🎯 easy control
    />
  )
}

export default function ModelViewer() {
  return (
    <div className="w-screen h-screen m-0 p-0 overflow-hidden">
      <div
        className="absolute w-screen h-screen inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #2e2e2e 0%, #0f0f0f 100%)',
        }}
      ></div>

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Environment preset="studio" />
        <Model />
      </Canvas>
    </div>
  )
}
