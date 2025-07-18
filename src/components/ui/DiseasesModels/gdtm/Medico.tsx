'use client';

import { useGLTF, Environment } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { JSX } from 'react';
import { Group, Vector3 } from 'three';

function Medico(props: JSX.IntrinsicElements['group']) {
    const group = useRef<Group>(null);
    const { scene } = useGLTF('/organs-models/gdtm/medico.glb');
    const { camera } = useThree();
    const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 1, 3));
    const [rotationY, setRotationY] = useState(0);
    const [rotationX, setRotationX] = useState(0);

    // Movimiento con mouse
    useFrame(({ mouse }) => {
        if (group.current) {
            group.current.rotation.y = mouse.x * Math.PI + rotationY;
            group.current.rotation.x = mouse.y * Math.PI * 0.2 + rotationX;
        }
    });

    // Rotación con teclado
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const step = 0.1;
            switch (event.key) {
                case 'w':
                    setRotationX((prev) => prev - step);
                    break;
                case 's':
                    setRotationX((prev) => prev + step);
                    break;
                case 'a':
                    setRotationY((prev) => prev - step);
                    break;
                case 'd':
                    setRotationY((prev) => prev + step);
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Zoom con rueda del mouse
    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            const isOverCanvas = (event.target as HTMLElement).closest('canvas');
            if (isOverCanvas) {
                event.preventDefault();
                const delta = event.deltaY * 0.01;
                const newZ = cameraPosition.z + delta;
                const clampedZ = Math.min(Math.max(newZ, 1), 10);
                setCameraPosition(new Vector3(cameraPosition.x, cameraPosition.y, clampedZ));
            }
        };
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [cameraPosition]);

    // Aplicar posición de la cámara
    useEffect(() => {
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.lookAt(0, 0, 0);
    }, [cameraPosition, camera]);

    return (
        <>
            {/* Iluminación */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

            {/* HDRI tipo sala moderna */}
            <Environment background preset="apartment" />

            {/* Modelo */}
            <group
                ref={group}
                {...props}
                dispose={null}
                position={[0, -1.5, 0]}
                scale={1.5}
            >
                <primitive object={scene} />
            </group>
        </>
    );
}

export default Medico;
useGLTF.preload('/organs-models/gdtm/medico.glb');
