
import { useGLTF, Environment, Html } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AccidenteModelProps {
    softShadows?: boolean;
    [key: string]: any;
}


function AccidenteModel({ softShadows = true, ...props }: AccidenteModelProps) {
    const { nodes } = useGLTF('/organs-models/jsvr/accidente.glb');
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [fastRotate, setFastRotate] = useState(false);
    const fastRotateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const groupRef = useRef<THREE.Group>(null);
    const lightRef1 = useRef<THREE.DirectionalLight>(null);
    const lightRef2 = useRef<THREE.SpotLight>(null);

    // Evento de teclado: tecla 'r' para rotar rápido
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'r' || e.key === 'R') {
                setFastRotate(true);
                if (fastRotateTimeout.current) clearTimeout(fastRotateTimeout.current);
                fastRotateTimeout.current = setTimeout(() => setFastRotate(false), 1000);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (fastRotateTimeout.current) clearTimeout(fastRotateTimeout.current);
        };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            if (hovered) {
                groupRef.current.rotation.y += 0.01;
            }
            if (fastRotate) {
                groupRef.current.rotation.y += 0.1;
            }
            // Animación de rebote sutil cuando está clickeado
            if (clicked) {
                groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 5) * 0.05);
            } else {
                groupRef.current.scale.setScalar(1);
            }
        }

        // Movimiento dinámico de las luces
        if (lightRef1.current) {
            lightRef1.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
        }
        if (lightRef2.current) {
            lightRef2.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <>

            {/* Fondo de entorno HDRI */}
            <Environment files="/organs-models/jsvr/Scene/hospital_room_4k.hdr" background ground={{ height: 10, radius: 60, scale: 100 }} />


            {/* Luz direccional 1: sombra suave */}
            <directionalLight
                ref={lightRef1}
                position={[4, 8, 6]}
                intensity={1.7}
                color="#fffbe6"
                castShadow
                shadow-mapSize={[4096, 4096]}
                shadow-camera-far={60}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
                shadow-radius={softShadows ? 18 : 2}
                shadow-blurSamples={softShadows ? 32 : 2}
            />

            {/* Luz direccional 2: sombra dura y color frío */}
            <directionalLight
                ref={lightRef2}
                position={[-6, 6, 2]}
                intensity={1.1}
                color="#b3c6ff"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={40}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-radius={softShadows ? 10 : 1}
                shadow-blurSamples={softShadows ? 16 : 1}
            />

            {/* Luz ambiental baja */}
            <ambientLight intensity={0.18} color="#ffffff" />

            <group
                ref={groupRef}
                {...props}
                dispose={null}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setClicked(!clicked);
                    console.log('Modelo de accidente clickeado:', clicked ? 'deseleccionado' : 'seleccionado');
                }}
            >
                {/* 3D HTML element above the model */}
                <Html position={[0, 1.2, 0]} center style={{ pointerEvents: 'none' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.92)',
                        borderRadius: '8px',
                        padding: '8px 18px',
                        color: '#222',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        textAlign: 'center',
                        minWidth: 120
                    }}>
                        Accidente
                        <div style={{
                            fontWeight: 'normal',
                            fontSize: '0.95rem',
                            marginTop: 4,
                            color: '#444'
                        }}>
                        </div>
                    </div>
                </Html>
                {nodes.Scene?.children.map((child: any) => (
                    <mesh
                        key={child.uuid}
                        castShadow
                        receiveShadow
                        geometry={child.geometry}
                        material={child.material}
                    />
                ))}
            </group>
        </>
    );
}

export default AccidenteModel;

useGLTF.preload('/organs-models/jsvr/accidente.glb');
