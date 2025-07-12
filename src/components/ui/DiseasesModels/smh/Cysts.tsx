import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { JSX, useRef } from 'react';
import * as THREE from 'three';

export function Cysts(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF('/organs-models/smh/Spleen.glb');

  // Animación con useFrame (rotación suave)
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3; // Velocidad controlada
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {nodes.Scene?.children
        .filter((child): child is THREE.Mesh => child instanceof THREE.Mesh && child.name === 'Spleen')
        .map((child) => (
          <mesh
            key={child.uuid}
            castShadow
            receiveShadow
            geometry={child.geometry}
            material={child.material} // Usa el material original del GLB
          />
        ))}
    </group>
  );
}

useGLTF.preload('/organs-models/smh/Spleen.glb');
