import { useThree, useFrame } from '@react-three/fiber';
import { useStore } from './stores/stores';
import { useRef } from 'react';
import * as THREE from 'three';

const CameraFocus = () => {
  const { camera } = useThree();
  const positionRef = useRef(new THREE.Vector3());
  const targetRef = useRef(new THREE.Vector3());

  const { showInfo, modelFocus } = useStore();

  useFrame(() => {
    let desiredPosition;
    let desiredTarget;

    if (showInfo && modelFocus === 'main') {
      desiredPosition = new THREE.Vector3(0, 1 , 5);
      desiredTarget = new THREE.Vector3(0, 0, 0);
    } else if (showInfo && modelFocus === 'second') {
      // Posición general hacia el centro
      desiredPosition = new THREE.Vector3(3, 1, 2);
      desiredTarget = new THREE.Vector3(3, 0, -2); 
    } else {
      desiredPosition = new THREE.Vector3(0, 1 , 5);
      desiredTarget = new THREE.Vector3(0, 0, 0)
    }

    positionRef.current.lerp(desiredPosition, 0.05);
    targetRef.current.lerp(desiredTarget, 0.05);

    camera.position.copy(positionRef.current);
    camera.lookAt(targetRef.current);
  });

  return null;
};

export default CameraFocus;
