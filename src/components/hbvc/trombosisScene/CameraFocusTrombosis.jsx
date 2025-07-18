'use client';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useStore } from '../stores/stores';

const CameraFocusTrombosis = () => {
  const { camera } = useThree();
  const positionRef = useRef(new THREE.Vector3(0, 1.5, 5));
  const { tShowInfo } = useStore();

  useFrame(() => {
    // Posición normal (zoom out)
    let targetPosition = new THREE.Vector3(0, 1.5, 5);
    
    // Posición cercana cuando se muestra info (zoom in)
    if (tShowInfo) {
      targetPosition = new THREE.Vector3(0, 1, 3);
    }

    // Interpolación suave
    positionRef.current.lerp(targetPosition, 0.1);
    camera.position.copy(positionRef.current);
    camera.lookAt(0, 0, 0); // Siempre mira al centro
  });

  return null;
};

export default CameraFocusTrombosis;