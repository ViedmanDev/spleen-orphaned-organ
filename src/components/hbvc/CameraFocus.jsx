import { useThree, useFrame } from '@react-three/fiber';
import { useStore } from '../hbvc/stores/stores';
import { useRef } from 'react';
import * as THREE from 'three';

const CameraFocus = () => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const { showInfo } = useStore();

  useFrame(() => {
    const destination = showInfo
      ? new THREE.Vector3(0, 1.2, 3.5) // más cerca del texto
      : new THREE.Vector3(0, 2, 5); // posición original

    targetPosition.current.lerp(destination, 0.05);
    camera.position.copy(targetPosition.current);
    camera.lookAt(0, 1.2, 0); // enfocar el centro del texto
  });

  return null;
};

export default CameraFocus;
