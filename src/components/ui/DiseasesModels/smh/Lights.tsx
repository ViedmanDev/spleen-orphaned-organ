import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Lights() {
  const { gl } = useThree();

  // Configurar sombras suaves
  useEffect(() => {
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.shadowMap.enabled = true;
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 7]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={15}
      />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#b97a20" />
    </>
  );
}