'use client';

import { useStore } from '../stores/stores';
import TrombosisModel from '../TrombosisModel';
import TextTitle3D from '../TextTitle3D';
import TrombosisInfo from '../TrombosisInfo';
import SpotLightToModel from '../SpotLightToModel';
import CameraFocusTrombosis from './CameraFocusTrombosis';
import Scene from '../scene/Scene';

import { Stars, Sky } from '@react-three/drei';

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

       {/* Configuración de cielo nocturno */}
      <Sky
        distance={450000} // Distancia grande para efecto de cielo real
        sunPosition={[0, -1, 0]} // Sol bajo el horizonte (noche)
        inclination={0}
        azimuth={0.25}
        turbidity={0.1} // Cielo muy despejado
        rayleigh={0.5} // Reducir dispersión atmosférica
        mieCoefficient={0.005} // Menos partículas en el aire
        mieDirectionalG={0.8}
      />

      {/* Campo de estrellas */}
      <Stars
        radius={100} // Radio de la esfera de estrellas
        depth={50} // Profundidad de campo
        count={5000} // Número de estrellas (aumentar para más densidad)
        factor={4} // Tamaño de las estrellas
        saturation={0} // 0 = blanco puro
        fade // Efecto de desvanecimiento
        speed={0.2} // Velocidad de rotación lenta
      />

      {/* Iluminación nocturna*/}
      <ambientLight intensity={0.05} color="#001144" />
      <directionalLight
        intensity={0.3}
        position={[-10, 10, 5]}
        color="#003366"
        castShadow
      />
      <CameraFocusTrombosis />
      <TrombosisModel position={[0, 0, 0]} scale={5} onClick={toggleTInfo} />
      <TextTitle3D />
      {tShowInfo && <TrombosisInfo />}
    </Scene>
  );
}