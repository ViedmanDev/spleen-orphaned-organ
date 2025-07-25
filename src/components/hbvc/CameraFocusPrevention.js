'use client';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useStore } from './stores/stores';

const CameraFocusPrevention = () => {
  const { camera } = useThree();
  const positionRef = useRef(new THREE.Vector3(0, 1.5, 5));
  const { prevShowInfo } = useStore();

  useFrame(() => {
    let targetPosition = new THREE.Vector3(0, 1.5, 5);
    if (prevShowInfo) {
      targetPosition = new THREE.Vector3(0, 1, 3);
    }

    positionRef.current.lerp(targetPosition, 0.1);
    camera.position.copy(positionRef.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default CameraFocusPrevention;
