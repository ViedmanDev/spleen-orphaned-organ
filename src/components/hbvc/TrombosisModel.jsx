/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from './stores/stores';

const TrombosisModel = (props) => {
  const gltf = useGLTF('/models/hbvc/trombosis.glb');
  const modelRef = useRef();
  const { toggleInfo } = useStore();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.userData.interactive = true;
      }
    });
  }, [gltf]);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        toggleInfo();
      }}
    />
  );
};

export default TrombosisModel;
