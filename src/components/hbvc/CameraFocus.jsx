import { useThree, useFrame } from '@react-three/fiber';
import { useStore } from './stores/stores';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const CameraFocus = () => {
  const { camera } = useThree();
  const positionRef = useRef(new THREE.Vector3(0, 1, 5));
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const angleRef = useRef(0); // Ángulo actual de la cámara
  const targetAngleRef = useRef(0); // Ángulo objetivo

  const { showInfo, modelFocus } = useStore();

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        targetAngleRef.current -= Math.PI / 2; // 90 grados a la izquierda
      } else if (e.key === 'ArrowRight') {
        targetAngleRef.current += Math.PI / 2; // 90 grados a la derecha
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame(() => {
    // Interpolación suave del ángulo
    angleRef.current += (targetAngleRef.current - angleRef.current) * 0.1;

    // Calcular posición orbital
    const radius = 5;
    const x = Math.sin(angleRef.current) * radius;
    const z = Math.cos(angleRef.current) * radius;

    let desiredPosition, desiredTarget;

    if (showInfo && modelFocus === 'main') {
      desiredPosition = new THREE.Vector3(x, 1, z);
      desiredTarget = new THREE.Vector3(0, 0, 0);
    } else if (showInfo && modelFocus === 'second') {
      desiredPosition = new THREE.Vector3(3, 1, 2);
      desiredTarget = new THREE.Vector3(3, 0, -2);
    } else {
      desiredPosition = new THREE.Vector3(x, 1, z);
      desiredTarget = new THREE.Vector3(0, 0, 0);
    }

    // Interpolación suave de posición
    positionRef.current.lerp(desiredPosition, 0.05);
    targetRef.current.lerp(desiredTarget, 0.05);

    camera.position.copy(positionRef.current);
    camera.lookAt(targetRef.current);
  });

  return null;
};

export default CameraFocus;