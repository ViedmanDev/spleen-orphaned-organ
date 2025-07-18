'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

type TreatmentModelProps = {
  position?: [number, number, number];
  scale?: number;
  onClick?: () => void;
};

export default function TreatmentModel(props: TreatmentModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/hbvc/Treatment.glb');

  // Rotación automática similar a los otros modelos
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={props.scale || 1} />
    </group>
  );
}