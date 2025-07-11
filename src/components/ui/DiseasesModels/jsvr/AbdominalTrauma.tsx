
import { useGLTF, Environment } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AbdominalTraumaProps {
    [key: string]: any;
}

function AbdominalTrauma(props: AbdominalTraumaProps) {
    const { nodes } = useGLTF('/organs-models/jsvr/bazo-imflamado.glb');
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [fastRotate, setFastRotate] = useState(false);
    const fastRotateTimeout = useRef<NodeJS.Timeout | null>(null);
    const groupRef = useRef<THREE.Group>(null);

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

    useFrame(() => {
        if (groupRef.current) {
            if (hovered) {
                groupRef.current.rotation.y += 0.01;
            }
            if (fastRotate) {
                groupRef.current.rotation.y += 0.1;
            }
            if (clicked) {
                groupRef.current.scale.setScalar(1.05);
            } else {
                groupRef.current.scale.setScalar(1);
            }
        }
    });

    // Luces y sombras diferentes a AccidenteModel
    // Luz direccional azulada, sombras duras
    // Luz puntual cálida, sin sombras
    // Luz ambiental blanca
    return (
        <>
            {/* Fondo de entorno HDRI */}
            <Environment files="/organs-models/jsvr/Scene/hospital_room_4k.hdr" background />
            {/* Luz direccional azulada con sombras duras */}
            <directionalLight
                position={[3, 6, 4]}
                intensity={1.1}
                color="#4a90e2"
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-far={30}
                shadow-camera-left={-8}
                shadow-camera-right={8}
                shadow-camera-top={8}
                shadow-camera-bottom={-8}
                shadow-radius={1}
                shadow-blurSamples={3}
            />
            {/* Luz puntual cálida, sin sombras */}
            <pointLight
                position={[-2, 4, 2]}
                intensity={0.7}
                color="#ffb347"
                castShadow={false}
            />
            {/* Luz ambiental blanca */}
            <ambientLight intensity={0.4} color="#ffffff" />

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
                    console.log('Modelo de trauma abdominal clickeado:', clicked ? 'deseleccionado' : 'seleccionado');
                }}
            >
                {nodes.Scene?.children.map((child: any) => (
                    child.name === 'BazoImflamado' && (
                        <mesh
                            key={child.uuid}
                            castShadow
                            receiveShadow
                            geometry={child.geometry}
                            material={child.material}
                        />
                    )
                ))}
            </group>
        </>
    );
}

export default AbdominalTrauma;

useGLTF.preload('/organs-models/jsvr/bazo-imflamado.glb');
