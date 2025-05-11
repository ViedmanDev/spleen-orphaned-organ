'use client';

import { useGLTF, Html, Environment } from '@react-three/drei';
import { useRef } from 'react';
import { JSX } from 'react';
import { Group, Mesh } from 'three';

function Bazoinfarto(props: JSX.IntrinsicElements['group']) {
    const group = useRef<Group>(null);
    const { nodes } = useGLTF('/organs-models/gdtm/bazoinfarto.glb');

    return (
        <>
            {/* Puesta en escena */}
            <Environment preset="sunset" background />

            {/* Iluminación */}
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
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
        </>
    );
}

export default Bazoinfarto;

useGLTF.preload('/organs-models/gdtm/bazoinfarto.glb');
