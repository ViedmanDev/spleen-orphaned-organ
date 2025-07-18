import { useGLTF, Environment, Html } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CirugiaModelProps {
    softShadows?: boolean;
    [key: string]: any;
}

function CirugiaModel({ softShadows = true, ...props }: CirugiaModelProps) {
    const { nodes } = useGLTF('/organs-models/jsvr/cirugia.glb');
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [slowMotion, setSlowMotion] = useState(false);
    const slowMotionTimeout = useRef<NodeJS.Timeout | null>(null);
    const groupRef = useRef<THREE.Group>(null);
    const lightRef1 = useRef<THREE.DirectionalLight>(null);
    const lightRef2 = useRef<THREE.PointLight>(null);

    // Evento de teclado: tecla 's' para slow motion
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 's' || e.key === 'S') {
                setSlowMotion(true);
                if (slowMotionTimeout.current) clearTimeout(slowMotionTimeout.current);
                slowMotionTimeout.current = setTimeout(() => setSlowMotion(false), 2000);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (slowMotionTimeout.current) clearTimeout(slowMotionTimeout.current);
        };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Rotación lenta en hover
            if (hovered) {
                groupRef.current.rotation.z += 0.005;
            }
            // Efecto slow motion con movimiento ondulante
            if (slowMotion) {
                groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
                groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
            } else {
                groupRef.current.position.y = 0;
                groupRef.current.rotation.x = 0;
            }
            // Efecto de pulsación al hacer click
            if (clicked) {
                const pulse = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.08;
                groupRef.current.scale.setScalar(pulse);
            } else {
                groupRef.current.scale.setScalar(1);
            }
        }

        // Movimiento dinámico de las luces
        if (lightRef1.current) {
            lightRef1.current.position.y = 8 + Math.sin(state.clock.elapsedTime * 0.8) * 1;
        }
        if (lightRef2.current) {
            lightRef2.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.4;
        }
    });

    return (
        <>
            {/* Fondo de entorno HDRI - Quirófano */}
            <Environment files="/organs-models/jsvr/Scene/hospital_room_2_4k.hdr" background />

            {/* Luz direccional principal - simula luz quirúrgica */}
            <directionalLight
                ref={lightRef1}
                position={[0, 8, 4]}
                intensity={2.5}
                color="#ffffff"
                castShadow
                shadow-mapSize={[4096, 4096]}
                shadow-camera-far={50}
                shadow-camera-left={-12}
                shadow-camera-right={12}
                shadow-camera-top={12}
                shadow-camera-bottom={-12}
                shadow-radius={softShadows ? 15 : 3}
                shadow-blurSamples={softShadows ? 30 : 5}
            />

            {/* Luz puntual cálida - luz de apoyo */}
            <pointLight
                ref={lightRef2}
                position={[3, 5, -2]}
                intensity={1.2}
                color="#ffefcc"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-radius={softShadows ? 12 : 2}
                shadow-blurSamples={softShadows ? 20 : 3}
            />

            {/* Luz ambiental muy tenue */}
            <ambientLight intensity={0.15} color="#f0f8ff" />

            <group
                ref={groupRef}
                {...props}
                dispose={null}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'crosshair';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    setClicked(!clicked);
                    console.log('Modelo de cirugía doble-click:', clicked ? 'deseleccionado' : 'seleccionado');
                }}
            >
                {/* Elemento HTML 3D sobre el modelo */}
                <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none' }}>
                    <div style={{
                        background: 'rgba(0, 100, 200, 0.9)',
                        borderRadius: '10px',
                        padding: '8px 20px',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        boxShadow: '0 3px 12px rgba(0,100,200,0.3)',
                        textAlign: 'center',
                        minWidth: 140
                    }}>
                        Surgery Treatment
                        <div style={{
                            fontWeight: 'normal',
                            fontSize: '0.9rem',
                            marginTop: 4,
                            color: '#e6f3ff'
                        }}>
                            3D model of surgical intervention for spleen repair.
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
                )) || 
                // Fallback: si no hay Scene, renderizar todos los nodos directamente
                Object.values(nodes).map((node: any) => 
                    node?.geometry ? (
                        <mesh
                            key={node.uuid || Math.random()}
                            castShadow
                            receiveShadow
                            geometry={node.geometry}
                            material={node.material}
                        />
                    ) : null
                )}
            </group>
        </>
    );
}

export default CirugiaModel;

useGLTF.preload('/organs-models/jsvr/cirugia.glb');
