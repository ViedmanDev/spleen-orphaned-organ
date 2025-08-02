import React from 'react';
import { RigidBody } from '@react-three/rapier';

interface DropZoneProps {
  position: [number, number, number];
}

export function DropZone({ position }: DropZoneProps) {
  return (
    <RigidBody position={position} colliders="cuboid" type="fixed">
      <mesh receiveShadow>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial
          color="yellow"
          opacity={0.7}
          transparent
          emissive="#ffff00"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Bordes visuales para mayor claridad */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[3.1, 0.02, 3.1]} />
        <meshStandardMaterial color="#ff6600" />
      </mesh>
    </RigidBody>
  );
}
