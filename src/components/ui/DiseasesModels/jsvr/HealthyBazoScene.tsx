"use client"

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

interface HealthyBazoSceneProps {
  showParticles?: boolean
  particleCount?: number
  glowIntensity?: number
}

export default function HealthyBazoScene({
  showParticles = true,
  particleCount = 100,
  glowIntensity = 0.3
}: HealthyBazoSceneProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Rotación suave del grupo completo
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Partículas de salud flotantes */}
      {showParticles && (
        <>
          <Sparkles
            count={particleCount}
            scale={[8, 6, 8]}
            size={3}
            speed={0.2}
            color="#4fc3f7"
            opacity={0.6}
          />
          
          {/* Partículas adicionales en colores suaves */}
          <Sparkles
            count={particleCount / 2}
            scale={[6, 4, 6]}
            size={2}
            speed={0.15}
            color="#81d4fa"
            opacity={0.4}
          />
        </>
      )}

      {/* Anillos de energía positiva */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[2.5, 2.7, 32]} />
          <meshBasicMaterial
            color="#4fc3f7"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[3.5, 3.8, 32]} />
          <meshBasicMaterial
            color="#81d4fa"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>

      {/* Esferas de energía flotantes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float 
          key={i}
          speed={1 + i * 0.2} 
          rotationIntensity={0.1} 
          floatIntensity={0.5 + i * 0.1}
        >
          <mesh 
            position={[
              Math.sin(i * Math.PI / 4) * 4,
              Math.cos(i * Math.PI / 3) * 2,
              Math.cos(i * Math.PI / 4) * 3
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4fc3f7" : "#81d4fa"}
              emissive={i % 2 === 0 ? "#4fc3f7" : "#81d4fa"}
              emissiveIntensity={glowIntensity}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}

      {/* Cruz de salud sutil */}
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
        <group position={[4, 2, 1]}>
          {/* Línea vertical */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#4fc3f7"
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Línea horizontal */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#4fc3f7"
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </Float>

      {/* Escudo de protección */}
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
        <group position={[-4, 1.5, -1]}>
          <mesh>
            <cylinderGeometry args={[0.6, 0.8, 0.1, 6]} />
            <meshStandardMaterial
              color="#4fc3f7"
              emissive="#4fc3f7"
              emissiveIntensity={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <cylinderGeometry args={[0.3, 0.4, 0.05, 6]} />
            <meshStandardMaterial
              color="#81d4fa"
              emissive="#81d4fa"
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </Float>
    </group>
  )
}
