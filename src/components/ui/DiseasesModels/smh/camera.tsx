import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Camera = () => {
  const { camera } = useThree();
  const positionRef = useRef(new THREE.Vector3(0, 2, 5)); // Posición inicial
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));   // Mira al centro

  useFrame(() => {
    // Actualiza la posición de la cámara
    camera.position.copy(positionRef.current);
    camera.lookAt(targetRef.current);
  });

  return null;
};

export default Camera;