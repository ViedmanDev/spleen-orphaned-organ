"use client"

import { useRef, useState, useEffect } from 'react'
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
  const [glowing, setGlowing] = useState(false)
  const [rightClicked, setRightClicked] = useState(false)
  const glowTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' || e.key === 'G') {
        setGlowing(true);
        console.log('Bazo brillando con tecla G');
        if (glowTimeout.current) clearTimeout(glowTimeout.current);
        glowTimeout.current = setTimeout(() => setGlowing(false), 3000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (glowTimeout.current) clearTimeout(glowTimeout.current);
    };
  }, []);

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

      // Efecto de brillo con tecla G
      if (glowing) {
        const glowScale = 1 + Math.sin(time * 8) * 0.1
        groupRef.current.scale.setScalar(scale * glowScale)
      }

      // Efecto de rotación con click derecho
      if (rightClicked) {
        groupRef.current.rotation.y += 0.02
        groupRef.current.rotation.x += 0.01
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
      onContextMenu={(e) => {
        e.stopPropagation();
        setRightClicked(!rightClicked);
        console.log('Bazo click derecho:', rightClicked ? 'parado' : 'rotando');
      }}
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
                  roughness: 0.8,
                  emissive: glowing ? new THREE.Color(color).multiplyScalar(0.3) : new THREE.Color(0x000000)
                }) : 
                materials[node.material?.name] || new THREE.MeshStandardMaterial({
                  emissive: glowing ? new THREE.Color(0x444444) : new THREE.Color(0x000000)
                })
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
