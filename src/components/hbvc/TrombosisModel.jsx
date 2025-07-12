/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from './stores/stores';

const TrombosisModel = (props) => {
  const gltf = useGLTF('/models/hbvc/trombosis.glb');
  const modelRef = useRef();
  const { toggleInfo, setInfoIndex, setModelFocus, setInfoPosition } = useStore();

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
        setInfoIndex(0);         // mostrar contenido del modelo principal
        setModelFocus('main');   // enfocar cámara en el centro
        setInfoPosition([0, 1.2, 0]); 
        toggleInfo();            // mostrar/ocultar texto
      }}
    />
  );
};

export default TrombosisModel;
