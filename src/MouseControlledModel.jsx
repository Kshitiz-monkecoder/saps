// DirectModelMouseControl.jsx
import React, { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

function Model() {
  const { scene } = useGLTF("/models/SAPS.glb")
  const ref = useRef()

  const [isDragging, setIsDragging] = useState(false)
  const [prevMouse, setPrevMouse] = useState([0, 0])

  const handlePointerDown = (e) => {
    setIsDragging(true)
    setPrevMouse([e.clientX, e.clientY])
  }

  const handlePointerUp = () => setIsDragging(false)

  const handlePointerMove = (e) => {
    if (!isDragging || !ref.current) return

    const deltaX = e.clientX - prevMouse[0]
    const deltaY = e.clientY - prevMouse[1]

    // Rotate model
    ref.current.rotation.y += deltaX * 0.01
    ref.current.rotation.x += deltaY * 0.01

    setPrevMouse([e.clientX, e.clientY])
  }

  const handleWheel = (e) => {
    if (!ref.current) return
    const s = 1 - e.deltaY * 0.001
    ref.current.scale.multiplyScalar(s)
  }

  useFrame(() => {
    if (ref.current) {
      console.log("position:", ref.current.position)
      console.log("rotation:", ref.current.rotation)
      console.log("scale:", ref.current.scale)
    }
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
    />
  )
}

export default function DirectModelMouseControl() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <Model />
    </Canvas>
  )
}
