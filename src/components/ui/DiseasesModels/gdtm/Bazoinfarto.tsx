'use client';

import { useGLTF, Environment } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { JSX } from 'react';
import { Group, Vector3 } from 'three';

function Bazoinfarto(props: JSX.IntrinsicElements['group']) {
    const group = useRef<Group>(null);
    const { nodes } = useGLTF('/organs-models/gdtm/bazoinfarto.glb');
    const { camera } = useThree();
    const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 1, 5));
    const [rotationY, setRotationY] = useState(0);
    const [rotationX, setRotationX] = useState(0);

    useFrame(({ mouse }) => {
        if (group.current) {
            group.current.rotation.y = mouse.x * Math.PI + rotationY;
            group.current.rotation.x = mouse.y * Math.PI * 0.2 + rotationX;
        }
    });

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

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            const isOverCanvas = (event.target as HTMLElement).closest('canvas');
            if (isOverCanvas) {
                event.preventDefault();
                const delta = event.deltaY * 0.01;
                const newZ = cameraPosition.z + delta;
                const clampedZ = Math.min(Math.max(newZ, 2), 10);
                setCameraPosition(new Vector3(cameraPosition.x, cameraPosition.y, clampedZ));
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [cameraPosition]);

    useEffect(() => {
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.lookAt(0, 0, 0);
    }, [cameraPosition, camera]);

    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <Environment background preset="studio" />
            <group ref={group} {...props} dispose={null}>
                {nodes.Scene?.children.map((child: any) =>
                    child.name === 'bazoinfarto' ? (
                        <mesh
                            key={child.uuid}
                            castShadow
                            receiveShadow
                            geometry={child.geometry}
                            material={child.material}
                            onPointerOver={() => (document.body.style.cursor = 'pointer')}
                            onPointerOut={() => (document.body.style.cursor = 'default')}
                        />
                    ) : null
                )}
            </group>
        </>
    );
}

export default Bazoinfarto;
useGLTF.preload('/organs-models/gdtm/bazoinfarto.glb');



