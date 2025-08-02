"use client"

import { useRef, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface AmbientSound3DProps {
  position?: [number, number, number]
  frequency?: number
  volume?: number
  distance?: number
  color?: string
  autoplay?: boolean
  audioFile?: string // Nueva propiedad para archivos de audio
}

export default function AmbientSound3D({
  position = [0, 0, 0],
  frequency = 440,
  volume = 0.3,
  distance = 5,
  color = "#4fc3f7",
  autoplay = true,
  audioFile // Nueva propiedad
}: AmbientSound3DProps) {
  const soundRef = useRef<THREE.PositionalAudio>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined

    // Crear AudioContext y configurar audio 3D
    const initAudio = async () => {
      try {
        // Crear listener para audio 3D
        const listener = new THREE.AudioListener()
        camera.add(listener)

        // Crear audio posicional
        const sound = new THREE.PositionalAudio(listener)
        
        // Función para configurar propiedades 3D
        const setup3DAudio = () => {
          sound.setRefDistance(1)
          sound.setRolloffFactor(1)
          sound.setDistanceModel('inverse')
          sound.setMaxDistance(distance)
          
          // Conectar el audio al objeto 3D
          if (groupRef.current) {
            groupRef.current.add(sound)
          }
          
          soundRef.current = sound
        }

        if (audioFile) {
          // Usar archivo de audio
          const loader = new THREE.AudioLoader()
          
          loader.load(
            audioFile, 
            (buffer) => {
              sound.setBuffer(buffer)
              sound.setLoop(true)
              sound.setVolume(volume)
              
              setup3DAudio()

              if (autoplay) {
                // Reproducir cuando el usuario interactúe
                const playOnClick = () => {
                  sound.play()
                  setIsPlaying(true)
                  document.removeEventListener('click', playOnClick)
                }
                document.addEventListener('click', playOnClick, { once: true })
              }
            }, 
            undefined, 
            (error) => {
              console.warn('Error al cargar archivo de audio:', error)
              // Fallback a sonido sintético si falla la carga
              initSyntheticSound()
            }
          )
        } else {
          initSyntheticSound()
        }

        function initSyntheticSound() {
          // Crear el audio context
          const context = new (window.AudioContext || (window as any).webkitAudioContext)()
          setAudioContext(context)
          
          // Crear un oscilador para generar sonido sintético
          const oscillator = context.createOscillator()
          const gainNode = context.createGain()
          
          oscillator.type = 'sine'
          oscillator.frequency.value = frequency
          
          // Configurar volumen suave
          gainNode.gain.setValueAtTime(0, context.currentTime)
          gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.5)
          
          // Conectar nodos
          oscillator.connect(gainNode)
          gainNode.connect(context.destination)
          
          setup3DAudio()

          if (autoplay && context.state === 'suspended') {
            // Chrome requiere interacción del usuario para reproducir audio
            document.addEventListener('click', () => {
              context.resume()
            }, { once: true })
          }

          if (autoplay) {
            oscillator.start()
            setIsPlaying(true)
          }
        }

        cleanup = () => {
          camera.remove(listener)
          if (audioContext && audioContext.state !== 'closed') {
            audioContext.close()
          }
        }

      } catch (error) {
        console.warn('Error al inicializar audio 3D:', error)
      }
    }

    initAudio()

    return cleanup
  }, [camera, frequency, volume, distance, autoplay, audioFile])

  const toggleSound = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause()
        setIsPlaying(false)
      } else {
        soundRef.current.play()
        setIsPlaying(true)
      }
    } else if (audioContext) {
      // Fallback para sonido sintético
      if (isPlaying) {
        audioContext.suspend()
        setIsPlaying(false)
      } else {
        audioContext.resume()
        setIsPlaying(true)
      }
    }
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Indicador visual interactivo */}
      <mesh onClick={toggleSound}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={isPlaying ? color : "#666666"} 
          emissive={isPlaying ? color : "#000000"} 
          emissiveIntensity={isPlaying ? 0.3 : 0}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Anillos que pulsan cuando está reproduciendo */}
      {isPlaying && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[distance * 0.5, distance * 0.5 + 0.1, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[distance - 0.1, distance, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
      
      {/* Partículas flotantes para efecto visual */}
      {isPlaying && Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.sin(i * Math.PI / 4) * 2,
            Math.sin(Date.now() * 0.001 + i) * 0.5,
            Math.cos(i * Math.PI / 4) * 2
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}
