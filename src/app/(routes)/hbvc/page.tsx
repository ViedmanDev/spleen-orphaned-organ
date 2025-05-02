'use client';

import { Canvas } from '@react-three/fiber';
import TrombosisModel from '../../../components/hbvc/TrombosisModel';
import Floor from '../../../components/hbvc/Floor';
import TextTitle3D from '../../../components/hbvc/TextTitle3D';
import TrombosisInfo from '../../../components/hbvc/TrombosisInfo';
import { useStore } from '../../../components/hbvc/stores/stores';
import SpotLightToModel from '../../../components/hbvc/SpotLightToModel';
import CameraFocus from '../../../components/hbvc/CameraFocus';

export default function HBVCPage() {
  const { showInfo, toggleInfo } = useStore();

  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 60 }}
        onPointerMissed={() => {
          if (showInfo) toggleInfo();
        }}
      >
        <CameraFocus />
        <ambientLight intensity={0.1} />
        <directionalLight castShadow position={[2, 5, 2]} />
        <SpotLightToModel />
        <TrombosisModel position={[0, 0, 0]} scale={5} />
        <Floor />
        <TextTitle3D />
        {showInfo && <TrombosisInfo />}
      </Canvas>
    </div>
  );
}
