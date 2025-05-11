import { useThree, useFrame } from '@react-three/fiber';
import { useStore } from './stores/stores';
import { useRef } from 'react';
import * as THREE from 'three';
import { cameraPositions } from './data/CameraPositions';

const CameraFocus = () => {
  const { camera } = useThree();
  const positionRef = useRef(new THREE.Vector3());
  const targetRef = useRef(new THREE.Vector3());

  const { showInfo, cameraIndex } = useStore();

  useFrame(() => {
    const desiredPosition = showInfo
      ? new THREE.Vector3(0, 1.2, 3.5)
      : new THREE.Vector3(0, 2, 5);

    const desiredTarget = showInfo
      ? new THREE.Vector3(0, 1.2, 0)
      : new THREE.Vector3(...cameraPositions[cameraIndex].target);

    positionRef.current.lerp(desiredPosition, 0.05);
    targetRef.current.lerp(desiredTarget, 0.05);

    camera.position.copy(positionRef.current);
    camera.lookAt(targetRef.current);
  });

  return null;
};

export default CameraFocus;
