"use client"

import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Text3DProps {
  text: string
  position?: [number, number, number]
  fontSize?: number
  color?: string
  maxWidth?: number
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  font?: string
  animate?: boolean
  animationType?: 'float' | 'rotate' | 'pulse' | 'none'
  onClick?: () => void
}

export default function Text3D({
  text,
  position = [0, 0, 0],
  fontSize = 0.5,
  color = "#ffffff",
  maxWidth = 10,
  textAlign = 'center',
  font = '/fonts/alice.json',
  animate = false,
  animationType = 'float',
  onClick
}: Text3DProps) {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current && animate) {
      const time = state.clock.elapsedTime

      switch (animationType) {
        case 'float':
          textRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1
          break
        case 'rotate':
          textRef.current.rotation.y = time * 0.5
          break
        case 'pulse':
          const scale = 1 + Math.sin(time * 3) * 0.1
          textRef.current.scale.setScalar(scale)
          break
      }
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      color={color}
      maxWidth={maxWidth}
      textAlign={textAlign}
      font={font}
      onClick={onClick}
      anchorX="center"
      anchorY="middle"
    >
      {text}
      <meshStandardMaterial color={color} />
    </Text>
  )
}
