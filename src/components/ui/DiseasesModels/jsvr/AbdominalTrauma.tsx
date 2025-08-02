import { useGLTF } from '@react-three/drei';
import { JSX, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AbdominalTrauma(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/organs-models/jsvr/bazo-imflamado.glb');
    const groupRef = useRef<THREE.Group>(null);
    const [expanded, setExpanded] = useState(false);
    const [doubleClicked, setDoubleClicked] = useState(false);
    const expandTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'e' || e.key === 'E') {
                setExpanded(true);
                console.log('Trauma abdominal expandido con tecla E');
                if (expandTimeout.current) clearTimeout(expandTimeout.current);
                expandTimeout.current = setTimeout(() => setExpanded(false), 2000);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (expandTimeout.current) clearTimeout(expandTimeout.current);
        };
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            if (expanded) {
                const targetScale = 1.5;
                groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
            } else {
                groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
            
            if (doubleClicked) {
                groupRef.current.rotation.x += 0.05;
                groupRef.current.rotation.z += 0.03;
            }
        }
    });

    return (
        <group 
            {...props} 
            ref={groupRef}
            dispose={null}
            onDoubleClick={(e) => {
                e.stopPropagation();
                setDoubleClicked(!doubleClicked);
                console.log('Trauma abdominal doble click:', doubleClicked ? 'parado' : 'rotando');
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
    );
}

export default AbdominalTrauma;

useGLTF.preload('/organs-models/jsvr/bazo-imflamado.glb');
