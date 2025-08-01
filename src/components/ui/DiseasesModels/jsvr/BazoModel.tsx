"use client"

import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BazoModelProps {
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  animate?: boolean
  animationType?: 'rotate' | 'float' | 'pulse' | 'none'
  color?: string
}

export default function BazoModel({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  animate = true,
  animationType = 'float',
  color
}: BazoModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF('/organs-models/jsvr/bazo.glb') as any

  useFrame((state) => {
    if (groupRef.current && animate) {
      const time = state.clock.elapsedTime

      switch (animationType) {
        case 'rotate':
          groupRef.current.rotation.y = time * 0.5
          break
        case 'float':
          groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1
          break
        case 'pulse':
          const pulseFactor = 1 + Math.sin(time * 3) * 0.05
          groupRef.current.scale.setScalar(scale * pulseFactor)
          break
      }
    }
  })

  return (
    <group 
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={rotation}
      dispose={null}
    >
      {Object.entries(nodes).map(([key, node]: [string, any]) => {
        if (node.isMesh) {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={color ? 
                new THREE.MeshStandardMaterial({ 
                  color: color,
                  metalness: 0.1,
                  roughness: 0.8
                }) : 
                materials[node.material?.name] || new THREE.MeshStandardMaterial()
              }
              castShadow
              receiveShadow
            />
          )
        }
        return null
      })}
    </group>
  )
}

useGLTF.preload('/organs-models/jsvr/bazo.glb')
