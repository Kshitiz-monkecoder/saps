import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF('/models/SAPS.glb')
  const modelRef = useRef()

  // smooth rotation target
  const targetRot = useRef(new THREE.Euler())

  useEffect(() => {
    if (modelRef.current) {
      // Initial rotation
      modelRef.current.rotation.set(
        1.5078347778320313,
        12.125333709716797,
        0
      )
    }
  }, [])

  useFrame(() => {
    if (modelRef.current) {
      // smooth rotate around its own axis
      targetRot.current.z += 0.01

      // smooth interpolation
      modelRef.current.rotation.z = THREE.MathUtils.lerp(
        modelRef.current.rotation.z,
        targetRot.current.z,
        0.1
      )
    }
  })

  return <primitive ref={modelRef} object={scene} scale={1} />
}

function CustomSmoothZoom() {
  const { camera } = useThree()
  const targetZoom = useRef(camera.position.z)

  useEffect(() => {
    const handleWheel = (e) => {
      targetZoom.current -= e.deltaY * 0.01
      targetZoom.current = Math.min(Math.max(targetZoom.current, 1), 20)
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  useFrame(() => {
    // Smooth zoom interpolation
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetZoom.current,
      0.08
    )
  })

  return null
}

export default function ModelViewer() {
  return (
    <div className="w-screen h-screen m-0 p-0 overflow-hidden relative">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #2e2e2e 0%, #0f0f0f 100%)',
        }}
      ></div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Environment preset="studio" />

        <Model />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          rotateSpeed={0.3}     // smooth rotate
          dampingFactor={0.1}   // smooth motion
          enableDamping={true}
        />

        <CustomSmoothZoom />
      </Canvas>
    </div>
  )
}
