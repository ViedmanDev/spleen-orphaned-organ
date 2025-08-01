'use client';
import { useStore } from '../stores/stores';
import PreventionModel from './PreventionModel';
import PreventionInfo from './PreventionInfo';
import CameraFocusPrevention from './CameraFocusPrevention';
import Scene from '../scene/Scene';
import SpotLightToModel from '../SpotLightToModel';
import { Sky } from '@react-three/drei';

export default function PreventionScene() {
  const { prevShowInfo, togglePrevInfo } = useStore();

  return (
    <Scene
      lights={
        <>
          <ambientLight intensity={0.3} color="#ffffff" />
          <directionalLight castShadow position={[2, 5, 2]} />
          <SpotLightToModel />
        </>
      }
      onPointerMissed={() => prevShowInfo && togglePrevInfo()}
    >
      {/* Ambiente diurno con cielo claro y nubes */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]} // Sol alto (día)
        turbidity={8}           // Aumenta la turbidez = más nubes
        rayleigh={2}            // Mayor dispersión atmosférica (luz azul)
        mieCoefficient={0.005}  // Dispersión Mie (nubes finas)
        mieDirectionalG={0.7}
        inclination={0.49}
        azimuth={0.25}
      />
      <CameraFocusPrevention />
      <PreventionModel position={[0, 0, 0]} scale={1.5} />
      {/* <TextTitle3D text="PREVENCIÓN" position={[0, 2, -2]} /> */}
      {prevShowInfo && <PreventionInfo />}
    </Scene>
  );
}
