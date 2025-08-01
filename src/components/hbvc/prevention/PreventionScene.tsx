'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import CameraFocusPrevention from './CameraFocusPrevention';
import PreventionInfo from './PreventionInfo';
import { useStore } from '../stores/stores';

function PreventionModel() {
  const { togglePrevInfo } = useStore();
  const gltf = useGLTF('/models/hbvc/Prevention.glb');
  return (
    <primitive
      object={gltf.scene}
      scale={1.2}
      position={[0, 0, 0]}
      onClick={togglePrevInfo}
    />
  );
}

export default function PreventionScene() {
  const { prevShowInfo } = useStore();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} />
        <Suspense fallback={null}>
          <PreventionModel />
          <Environment files="/textures/hbvc/hdri/hospital_room_2_4k.exr" background />
        </Suspense>
        <CameraFocusPrevention />
        <OrbitControls enableZoom={true} />
        {prevShowInfo && <PreventionInfo />}
      </Canvas>
    </div>
  );
}
