'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import styles from '../../../../styles/routes/gdtm.module.css';

const Bazoinfarto = dynamic(() => import('../../../../components/ui/DiseasesModels/gdtm/Bazoinfarto'), { ssr: false });
const Medico = dynamic(() => import('../../../../components/ui/DiseasesModels/gdtm/Medico'), { ssr: false });
const Medicina = dynamic(() => import('../../../../components/ui/DiseasesModels/gdtm/Medicina'), { ssr: false });
// const Habitos = dynamic(() => import('../../../../components/ui/DiseasesModels/gdtm/Habitos'), { ssr: false });

export default function GdtmPage() {
  const [visibleInfo, setVisibleInfo] = useState<number | null>(null);

  const toggleInfo = (index: number) => {
    setVisibleInfo(prev => (prev === index ? null : index));
  };

  const messages = [
    'Ilustración de un Bazo humano, el cual sufrió un infarto esplénico.',
    'Ilustración de un médico explicando los síntomas.',
    'Ilustración de medicamentos.'
  ];

  return (
    <div>
      {/* Sección 1 */}
      <div className={styles.model_info_row}>
        <div className={styles.model_column}>
          <div className={styles.canvas_container}>
            <button className={styles.fixed_button} onClick={() => toggleInfo(0)}>Más info</button>
            {visibleInfo === 0 && <div className={styles.info_popup}>{messages[0]}</div>}
            <Canvas shadows>
              <Bazoinfarto />
            </Canvas>
          </div>
        </div>
        <div className={styles.info_column}>
          <h2 className={styles.info_title}>¿Qué es el infarto esplénico?</h2>
          <p className={styles.info_text}>
            El infarto esplénico ocurre cuando el suministro de sangre al bazo se ve interrumpido, causando necrosis
            tisular. Es una condición rara pero potencialmente grave, que puede resultar de embolias, trombosis o
            enfermedades hematológicas.
          </p>
        </div>
      </div>

      {/* Sección 2 */}
      <div className={`${styles.model_info_row} ${styles.row_reverse}`}>
        <div className={styles.model_column}>
          <div className={styles.canvas_container}>
            <button className={styles.fixed_button} onClick={() => toggleInfo(1)}>Más info</button>
            {visibleInfo === 1 && <div className={styles.info_popup}>{messages[1]}</div>}
            <Canvas shadows>
              <Medico />
            </Canvas>
          </div>
        </div>
        <div className={styles.info_column}>
          <h2 className={styles.info_title}>Síntomas y diagnóstico</h2>
          <p className={styles.info_text}>
            Los síntomas comunes incluyen dolor abdominal agudo en el cuadrante superior izquierdo, fiebre y náuseas.
            El diagnóstico se confirma mediante imágenes como la tomografía computarizada (TC) o ecografía del bazo.
          </p>
        </div>
      </div>

      {/* Sección 3 */}
      <div className={styles.model_info_row}>
        <div className={styles.model_column}>
          <div className={styles.canvas_container}>
            <button className={styles.fixed_button} onClick={() => toggleInfo(2)}>Más info</button>
            {visibleInfo === 2 && <div className={styles.info_popup}>{messages[2]}</div>}
            <Canvas shadows>
              <Medicina />
            </Canvas>
          </div>
        </div>
        <div className={styles.info_column}>
          <h2 className={styles.info_title}>Tratamiento y recuperación</h2>
          <p className={styles.info_text}>
            El tratamiento del infarto esplénico depende de la causa subyacente. Generalmente incluye analgésicos,
            anticoagulantes o incluso cirugía si hay complicaciones. La recuperación varía según la gravedad del caso.
          </p>
        </div>
      </div>

      {/* Sección 4 */}
      <div className={`${styles.model_info_row} ${styles.row_reverse}`}>
        <div className={styles.model_column}>
          <div className={styles.canvas_container}>
            <div className={styles.canvas_fallback}>
              <p style={{ textAlign: 'center', color: '#999' }}>
                Modelo de hábitos no disponible temporalmente.
              </p>
            </div>
            {/* <button className={styles.fixed_button} onClick={() => toggleInfo(3)}>Más info</button>
            {visibleInfo === 3 && <div className={styles.info_popup}>Mensaje del modelo hábitos</div>}
            <Canvas shadows>
              <Habitos />
            </Canvas> */}
          </div>
        </div>
        <div className={styles.info_column}>
          <h2 className={styles.info_title}>Prevención y cuidados</h2>
          <p className={styles.info_text}>
            Para prevenir el infarto esplénico es fundamental adoptar hábitos saludables como mantener una dieta
            equilibrada, evitar el sedentarismo, hacer ejercicio regular y controlar enfermedades crónicas como la
            hipertensión o trastornos hematológicos.
          </p>
        </div>
      </div>
    </div>
  );
}
