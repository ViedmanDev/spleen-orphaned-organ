"use client"

import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { PositionalAudio } from '@react-three/drei'
import * as THREE from 'three'

interface Sound3DProps {
    url: string
    position?: [number, number, number]
    distance?: number
    volume?: number
    loop?: boolean
    autoplay?: boolean
    refDistance?: number
    rolloffFactor?: number
}

export default function Sound3D({
    url,
    position = [0, 0, 0],
    distance = 10,
    volume = 0.5,
    loop = true,
    autoplay = false,
    refDistance = 1,
    rolloffFactor = 1
}: Sound3DProps) {
    const sound = useRef<THREE.PositionalAudio>(null)
    const { camera } = useThree()

    useEffect(() => {
        if (sound.current) {
            // Configurar el listener de audio en la cámara
            const listener = new THREE.AudioListener()
            camera.add(listener)

            return () => {
                camera.remove(listener)
            }
        }
    }, [camera])

    const handleAudioLoad = (audio: THREE.PositionalAudio) => {
        sound.current = audio

        // Configurar propiedades del audio 3D
        audio.setRefDistance(refDistance)
        audio.setRolloffFactor(rolloffFactor)
        audio.setDistanceModel('inverse')
        audio.setMaxDistance(distance)
        audio.setVolume(volume)
        audio.setLoop(loop)

        if (autoplay) {
            // Reproducir automáticamente con una pequeña demora
            setTimeout(() => {
                audio.play()
            }, 100)
        }
    }

    const togglePlay = () => {
        if (sound.current) {
            if (sound.current.isPlaying) {
                sound.current.pause()
            } else {
                sound.current.play()
            }
        }
    }

    return (
        <group position={position}>
            <PositionalAudio
                ref={handleAudioLoad}
                url={url}
                distance={distance}
            />

            {/* Indicador visual del sonido (opcional) */}
            <mesh onClick={togglePlay}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                    color="#ff6b6b"
                    emissive="#ff6b6b"
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Anillo que indica el rango del sonido */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[distance - 0.1, distance, 32]} />
                <meshBasicMaterial
                    color="#ff6b6b"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}
