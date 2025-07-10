'use client';

import { useGLTF, Html, Environment, OrbitControls } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { JSX } from 'react';
import { Group, Vector3 } from 'three';

function Bazoinfarto(props: JSX.IntrinsicElements['group']) {
    const group = useRef<Group>(null);
    const { nodes } = useGLTF('/organs-models/gdtm/bazoinfarto.glb');
    const { camera } = useThree();
    const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 1, 5));

    const handleKeyDown = (event: KeyboardEvent) => {
        const step = 0.1; // Definir el paso de movimiento de la cámara
        let newPosition = cameraPosition.clone();

        switch (event.key) {
            case 'w': // Adelante
                newPosition.z -= step;
                break;
            case 's': // Atrás
                newPosition.z += step;
                break;
            case 'a': // Izquierda
                newPosition.x -= step;
                break;
            case 'd': // Derecha
                newPosition.x += step;
                break;
            default:
                break;
        }

        setCameraPosition(newPosition);
    };

    // Escuchar eventos de teclado
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [cameraPosition]);

    // Actualizar la posición de la cámara
    useEffect(() => {
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    }, [cameraPosition, camera]);

    return (
        <>
            {/* Iluminación */}
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            {/* Fondo tipo quirófano o laboratorio */}
            <Environment
                background
                preset="studio" // Este preset es más adecuado para un ambiente clínico
            />

            <group ref={group} {...props} dispose={null}>
                {nodes.Scene?.children.map((child: any) => (
                    child.name === 'bazoinfarto' && (
                        <mesh
                            key={child.uuid}
                            castShadow
                            receiveShadow
                            geometry={child.geometry}
                            material={child.material}
                            onPointerOver={() => {
                                document.body.style.cursor = 'pointer';
                            }}
                            onPointerOut={() => {
                                document.body.style.cursor = 'default';
                            }}
                            onClick={() => alert('¡Este es el bazo con infarto esplénico!')}
                        >
                            {/* Botón HTML 3D */}
                            <Html position={[0, 1, 0]}>
                                <button style={{ padding: '6px 12px', borderRadius: '8px', background: '#800020', color: 'white' }}>
                                    Más info
                                </button>
                            </Html>
                        </mesh>
                    )
                ))}
            </group>

            {/* Controles de órbita (si necesitas interacción con el mouse) */}
            <OrbitControls />
        </>
    );
}

export default Bazoinfarto;

useGLTF.preload('/organs-models/gdtm/bazoinfarto.glb');
