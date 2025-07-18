// components/hbvc/Scene/Scene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { ReactNode } from 'react';
import Floor from '../../../components/hbvc/Floor'

type SceneProps = {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  onPointerMissed?: () => void;
  lights?: ReactNode;
  floor?: boolean;
};

export default function Scene({
  children,
  cameraPosition = [0, 2, 5],
  fov = 60,
  onPointerMissed,
  lights,
  floor = true,
}: SceneProps) {
  const defaultLights = (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight castShadow position={[2, 5, 2]} />
    </>
  );

  return (
    <Canvas
      shadows
      camera={{ position: cameraPosition, fov }}
      onPointerMissed={onPointerMissed}
    >
      {lights || defaultLights}
      {children}
      {floor && <Floor />}
    </Canvas>
  );
}