'use client';

import DiagnosisModel from '../DiagnosisModel/DiagnosisModel';
import SpotLightToModel from '../SpotLightToModel';
import CameraFocus from '../CameraFocus';
import Scene from '../scene/Scene'

import { Environment ,Lightformer} from '@react-three/drei';

export default function DiagnosisScene() {
  return (
    <Scene>
      <Environment
        files="/textures/hbvc/hdri/hospital_room_2_4k.exr"
        background // Activa el fondo
        blur={0.5} // Desenfoque del fondo (0-1)
        ground={{
          height: 1, // Altura del plano reflectante
          radius: 60, // Tamaño del área reflectante
          scale: 50 // Escala del reflejo
        }}
      >

        {/* Luces adicionales para contrarrestar zonas oscuras */}
        <Lightformer
          intensity={0.5}
          position={[0, 5, 0]}
          scale={[10, 10, 1]}
          color="#ffffff"
          form="ring"
        />
      </Environment>
      <CameraFocus />
      <DiagnosisModel position={[0, 0, 0]} />
      <SpotLightToModel />
    </Scene>
  );
}