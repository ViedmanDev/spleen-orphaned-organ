'use client';

import { useStore } from '../stores/stores';
import TrombosisModel from '../TrombosisModel';
import TextTitle3D from '../TextTitle3D';
import TrombosisInfo from '../TrombosisInfo';
import SpotLightToModel from '../SpotLightToModel';
import CameraFocus from '../CameraFocus';
import Scene from '../scene/Scene';

export default function TrombosisScene() {
  const { tShowInfo, toggleTInfo } = useStore();

  return (
    <Scene
    lights={
        <>
          <ambientLight intensity={0.1} />
          <directionalLight castShadow position={[2, 5, 2]} />
          <SpotLightToModel />
        </>
      }
      onPointerMissed={() => tShowInfo && toggleTInfo()}
    >
      <CameraFocus />
      <TrombosisModel position={[0, 0, 0]} scale={5} onClick={toggleTInfo} />
      <TextTitle3D />
      {tShowInfo && <TrombosisInfo />}
    </Scene>
  );
}