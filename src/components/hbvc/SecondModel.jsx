/* eslint-disable react/no-unknown-property */
'use client';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useStore } from './stores/stores';

// eslint-disable-next-line react/prop-types
const SecondModel = ({ position = [2, 0, -2], scale = 1 }) => {
  const { toggleInfo, setInfoIndex, setModelFocus, setInfoPosition } = useStore();
  const gltf = useLoader(GLTFLoader, '/models/hbvc/SecondModel.glb');

  return (
    <mesh
      position={position}
      scale={scale}
      onClick={() => {
        setInfoIndex(1);
        setModelFocus('second');
        setInfoPosition([2.8, 1 , -3]);
        toggleInfo();
      }}
      castShadow
      receiveShadow
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
};

export default SecondModel;
