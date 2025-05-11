'use client';

import { Canvas } from '@react-three/fiber';
import TrombosisModel from '../../../components/hbvc/TrombosisModel';
import Floor from '../../../components/hbvc/Floor';
import TextTitle3D from '../../../components/hbvc/TextTitle3D';
import TrombosisInfo from '../../../components/hbvc/TrombosisInfo';
import SpotLightToModel from '../../../components/hbvc/SpotLightToModel';
import CameraFocus from '../../../components/hbvc/CameraFocus';
import { useStore  } from '../../../components/hbvc/stores/stores';
import styles from '../../../styles/hbvc/HBVC.module.css';

export default function HBVCPage() {
  const { showInfo, toggleInfo , nextInfo, prevInfo  } = useStore();

  return (
    <section className={styles.container}>
      <div className={styles.textBlock}>
        <h2>Trombosis Esplénica</h2>
        <p>
        La trombosis esplénica es una condición médica caracterizada por la formación de un coágulo en la vena esplénica, lo que puede comprometer la función del bazo y generar complicaciones sistémicas. Su diagnóstico y manejo requieren un enfoque multidisciplinario, considerando sus diversas causas y manifestaciones clínicas. A continuación, exploraremos sus aspectos clave, desde la fisiopatología hasta las opciones terapéuticas. Para avanzar, presiona las flechas de tu teclado o pantalla.
        </p>
      </div>

      <div className={styles.canvasContainer}>
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
        {/* Botones de navegación */}
        <div className={styles.controls}>
          <button onClick={prevInfo}>←</button>
          <button onClick={nextInfo}>→</button>
        </div>
      </div>
    </section>
  );
}
