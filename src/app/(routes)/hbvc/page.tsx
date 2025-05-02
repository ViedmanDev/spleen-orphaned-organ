'use client';

import { Canvas } from '@react-three/fiber';
import TrombosisModel from '../../../components/hbvc/TrombosisModel';
import Floor from '../../../components/hbvc/Floor';
import TextTitle3D from '../../../components/hbvc/TextTitle3D';
import TrombosisInfo from '../../../components/hbvc/TrombosisInfo';
import { useStore } from '../../../components/hbvc/stores/stores';
import SpotLightToModel from '../../../components/hbvc/SpotLightToModel';
import CameraFocus from '../../../components/hbvc/CameraFocus';
import styles from '../../../styles/hbvc/HBVC.module.css'; // <- Importa estilos CSS

export default function HBVCPage() {
  const { showInfo, toggleInfo } = useStore();

  return (
    <section className={styles.container}>
      {/* Canvas */}
      <div className={styles.canvas}>
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

      {/* Texto */}
      <div className={styles.text}>
        <h2>Trombosis Esplénica</h2>
        <p>
          La trombosis esplénica es una obstrucción de la vena esplénica causada por un coágulo de sangre.
          Puede generar hipertensión portal segmentaria y está asociada a enfermedades como pancreatitis crónica o tumores abdominales.
        </p>
      </div>
    </section>
  );
}
