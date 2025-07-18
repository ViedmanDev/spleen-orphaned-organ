'use client';

import DiagnosisModel from '../DiagnosisModel/DiagnosisModel';
import SpotLightToModel from '../SpotLightToModel';
import CameraFocus from '../CameraFocus';
import Scene from '../scene/Scene';

export default function DiagnosisScene() {
  return (
    <Scene>
      <CameraFocus />
      <DiagnosisModel position={[0, 0, 0]} />
      <SpotLightToModel />
    </Scene>
  );
}