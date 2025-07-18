'use client';

import { Group } from 'three'; // Añade esta importación
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function DiagnosisModel(props: any) {
  const group = useRef<Group>(null); 
  const { scene } = useGLTF('/models/hbvc/Diagnosis.glb');

  // Rotación automática opcional
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={1} />
    </group>
  );
}