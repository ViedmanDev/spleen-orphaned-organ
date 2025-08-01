"use client"

import { useRef, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { PositionalAudio } from '@react-three/drei'
import * as THREE from 'three'

interface AudioPlayer3DProps {
  audioUrl: string
  position?: [number, number, number]
  volume?: number
  distance?: number
  autoplay?: boolean
  loop?: boolean
  color?: string
}

export default function AudioPlayer3D({
  audioUrl,
  position = [0, 0, 0],
  volume = 0.5,
  distance = 10,
  autoplay = false,
  loop = true,
  color = "#4fc3f7"
}: AudioPlayer3DProps) {
  const audioRef = useRef<THREE.PositionalAudio>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { camera } = useThree()

  useEffect(() => {
    // Agregar AudioListener a la cámara
    const listener = new THREE.AudioListener()
    camera.add(listener)

    return () => {
      camera.remove(listener)
    }
  }, [camera])

  const handlePlay = () => {
    if (audioRef.current && isLoaded) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleAudioReady = (audio: THREE.PositionalAudio) => {
    audioRef.current = audio
    
    // Configurar propiedades del audio 3D
    audio.setRefDistance(1)
    audio.setRolloffFactor(1)
    audio.setDistanceModel('inverse')
    audio.setMaxDistance(distance)
    audio.setVolume(volume)
    audio.setLoop(loop)
    
    // Agregar event listeners
    if (audio.source) {
      audio.source.addEventListener('canplaythrough', () => {
        setIsLoaded(true)
        if (autoplay) {
          audio.play()
          setIsPlaying(true)
        }
      })

      audio.source.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    }
  }

  return (
    <group ref={groupRef} position={position}>
      <PositionalAudio
        ref={handleAudioReady}
        url={audioUrl}
        distance={distance}
      />
      
      {/* Control visual interactivo */}
      <mesh onClick={handlePlay}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color={isLoaded ? (isPlaying ? color : "#666666") : "#333333"} 
          emissive={isLoaded ? (isPlaying ? color : "#000000") : "#000000"} 
          emissiveIntensity={isPlaying ? 0.4 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Indicador de carga */}
      {!isLoaded && (
        <mesh>
          <ringGeometry args={[0.25, 0.3, 8]} />
          <meshBasicMaterial color="#888888" transparent opacity={0.5} />
        </mesh>
      )}
      
      {/* Visualización del rango de sonido */}
      {isPlaying && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[distance - 0.2, distance, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Ondas de sonido animadas */}
      {isPlaying && (
        <>
          {[1, 2, 3].map((ring, index) => (
            <mesh 
              key={ring}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[
                1 + Math.sin(Date.now() * 0.005 + index) * 0.1,
                1 + Math.sin(Date.now() * 0.005 + index) * 0.1,
                1
              ]}
            >
              <ringGeometry args={[ring * 0.8, ring * 0.8 + 0.1, 16]} />
              <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={0.3 - index * 0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}
