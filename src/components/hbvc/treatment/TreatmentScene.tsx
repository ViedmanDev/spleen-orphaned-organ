'use client';

import { useStore } from '../stores/stores';
import TreatmentModel from './TreatmentModel';
import TreatmentTitle3D from './TreatmentTitle3D';
import TreatmentInfo from './TreatmentInfo';
import SpotLightToModel from '../SpotLightToModel';
import CameraFocus from '../CameraFocus';
import Scene from '../scene/Scene';
import { Environment, Lightformer, Sparkles } from '@react-three/drei';

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

      <Environment background blur={0.2}>
        <color attach="background" args={["#f5f7fa"]} />
        
        {/* Luz principal fría */}
        <Lightformer
          intensity={0}
          position={[5, 5, -5]}
          scale={[10, 10, 1]}
          color="#e6f2ff"
        />
        
        {/* Reflejo sutil en el piso */}
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.05}
            roughness={0.8}
          />
        </mesh>
      </Environment>

      {/* Efectos de monitor médico */}
      <Sparkles
        count={30}
        size={1.5}
        speed={0.1}
        opacity={0.6}
        color="#00aaff"
        scale={[8, 4, 8]}
        position={[0, 2, 0]}
      />
      <CameraFocus />
      <TreatmentModel onClick={toggleTrInfo} position={[0, 0, 0]} scale={1} />
      <TreatmentTitle3D />
      {trShowInfo && <TreatmentInfo />}
    </Scene>
  );
}