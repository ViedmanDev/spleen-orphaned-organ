/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../stores/stores';

const PreventionModel = (props) => {
  const gltf = useGLTF('/models/hbvc/Prevention.glb');
  const modelRef = useRef();
  const { togglePrevInfo } = useStore();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.userData.interactive = true; // Para futuros hotspots
      }
    });
  }, [gltf]);

  useFrame((_, delta) => {
    modelRef.current.rotation.y += delta * 0.3; // Rotación automática
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        togglePrevInfo();
      }}
    />
  );
};

export default PreventionModel;