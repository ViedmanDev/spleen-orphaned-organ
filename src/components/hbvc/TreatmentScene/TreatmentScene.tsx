'use client';

import { useStore } from '../stores/stores';
import TreatmentModel from '../TreatmentModel/TreatmentModel';
import TreatmentTitle3D from '../TreatmentTitle3D/TreatmentTitle3D';
import TreatmentInfo from '../TreatmentInfo/TreatmentInfo';
import SpotLightToModel from '../SpotLightToModel';
import CameraFocus from '../CameraFocus';
import Scene from '../scene/Scene';

export default function TreatmentScene() {
  const { trShowInfo, toggleTrInfo } = useStore();

  return (
    <Scene
      lights={
        <>
          <ambientLight intensity={0.1} />
          <directionalLight 
            castShadow 
            position={[2, 5, 2]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <SpotLightToModel />
        </>
      }
      onPointerMissed={() => trShowInfo && toggleTrInfo()}
    >
      <CameraFocus />
      <TreatmentModel onClick={toggleTrInfo} position={[0, 0, 0]} scale={1} />
      <TreatmentTitle3D />
      {trShowInfo && <TreatmentInfo />}
    </Scene>
  );
}