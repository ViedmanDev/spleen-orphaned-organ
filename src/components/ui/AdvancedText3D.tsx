"use client"

import { useRef, useState } from 'react'
import { Text, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AdvancedText3DProps {
  text: string
  position?: [number, number, number]
  fontSize?: number
  color?: string
  strokeColor?: string
  strokeWidth?: number
  maxWidth?: number
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  font?: string
  animate?: boolean
  animationType?: 'float' | 'rotate' | 'pulse' | 'glow' | 'sparkle'
  onClick?: () => void
  interactive?: boolean
  hoverColor?: string
  showParticles?: boolean
}

export default function AdvancedText3D({
  text,
  position = [0, 0, 0],
  fontSize = 0.5,
  color = "#ffffff",
  strokeColor = "#000000",
  strokeWidth = 0.02,
  maxWidth = 10,
  textAlign = 'center',
  font = '/fonts/alice.json',
  animate = false,
  animationType = 'float',
  onClick,
  interactive = true,
  hoverColor = "#ffff00",
  showParticles = false
}: AdvancedText3DProps) {
  const textRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)

  useFrame((state) => {
    if (textRef.current && animate) {
      const time = state.clock.elapsedTime

      switch (animationType) {
        case 'float':
          if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1
          }
          break
        case 'rotate':
          if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.5
          }
          break
        case 'pulse':
          const scale = 1 + Math.sin(time * 3) * 0.1
          if (groupRef.current) {
            groupRef.current.scale.setScalar(scale)
          }
          break
        case 'glow':
          setGlowIntensity(0.5 + Math.sin(time * 4) * 0.5)
          break
        case 'sparkle':
          if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(time * 2) * 0.1
            const scale = 1 + Math.sin(time * 5) * 0.05
            groupRef.current.scale.setScalar(scale)
          }
          break
      }
    }
  })

  const handlePointerEnter = () => {
    if (interactive) {
      setIsHovered(true)
      document.body.style.cursor = 'pointer'
    }
  }

  const handlePointerLeave = () => {
    if (interactive) {
      setIsHovered(false)
      document.body.style.cursor = 'default'
    }
  }

  const currentColor = isHovered ? hoverColor : color
  const currentEmissive = animationType === 'glow' ? currentColor : (isHovered ? hoverColor : "#000000")
  const currentEmissiveIntensity = animationType === 'glow' ? glowIntensity : (isHovered ? 0.3 : 0)

  return (
    <group 
      ref={groupRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      {/* Texto principal */}
      <Text
        ref={textRef}
        fontSize={fontSize}
        color={currentColor}
        maxWidth={maxWidth}
        textAlign={textAlign}
        font={font}
        anchorX="center"
        anchorY="middle"
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        outlineWidth={strokeWidth * 0.5}
        outlineColor={strokeColor}
      >
        {text}
        <meshStandardMaterial 
          color={currentColor}
          emissive={currentEmissive}
          emissiveIntensity={currentEmissiveIntensity}
          transparent
          opacity={0.9}
        />
      </Text>

      {/* Efectos de partículas si están habilitados */}
      {showParticles && (
        <Sparkles
          count={20}
          scale={[2, 2, 2]}
          size={2}
          speed={0.3}
          color={currentColor}
          opacity={0.6}
        />
      )}

      {/* Halo de resplandor para efectos especiales */}
      {(animationType === 'glow' || isHovered) && (
        <mesh>
          <sphereGeometry args={[fontSize * 2, 16, 16]} />
          <meshBasicMaterial
            color={currentColor}
            transparent
            opacity={isHovered ? 0.1 : glowIntensity * 0.05}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Anillo decorativo para textos interactivos */}
      {interactive && isHovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[fontSize * 1.5, fontSize * 1.8, 32]} />
          <meshBasicMaterial
            color={hoverColor}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  )
}
