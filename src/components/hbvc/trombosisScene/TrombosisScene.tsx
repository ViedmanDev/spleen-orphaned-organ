// components/hbvc/TrombosisScene/TrombosisScene.tsx
'use client';

import { useStore } from '../stores/stores';
import TrombosisModel from '../TrombosisModel';
import TextTitle3D from '../TextTitle3D';
import TrombosisInfo from '../TrombosisInfo';
import SpotLightToModel from '../SpotLightToModel';
import CameraFocus from '../CameraFocus';
import SecondModel from '../SecondModel';
import Scene from '../scene/Scene';

export default function TrombosisScene() {
  const { showInfo } = useStore();

  return (
    <Scene
      lights={
        <>
          <ambientLight intensity={0.1} />
          <directionalLight castShadow position={[2, 5, 2]} />
          <SpotLightToModel />
        </>
      }
    >
      <CameraFocus />
      <TrombosisModel position={[0, 0, 0]} scale={5} />
      <SecondModel position={[3, 0, -3]} />
      <TextTitle3D />
      {showInfo && <TrombosisInfo />}
    </Scene>
  );
}