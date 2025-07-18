// app/(routes)/personal-diseases/hbvc/page.tsx
'use client';

import { useStore } from '../../../../components/hbvc/stores/stores';
import styles from "@styles/routes/hbvc.module.css";
import TrombosisScene from '../../../../components/hbvc/trombosisScene/TrombosisScene';
import DiagnosisScene from '../../../../components/hbvc/DiagnosisScene/DiagnosisScene';

export default function HBVCPage() {
  const { nextInfo, prevInfo } = useStore();

  return (
    <main className={styles.mainContainer}>
      {/* Sección 1 - Trombosis */}
      <section className={styles.about_section}>
        <div className={styles.about_section_left}>
          <div className={styles.canvasContainer}>
            <TrombosisScene />
          </div>
          <div className={styles.controls}>
            <button onClick={prevInfo}>← Anterior</button>
            <button onClick={nextInfo}>Siguiente →</button>
          </div>
        </div>

        <div className={styles.about_section_right}>
          <h1 className={styles.about_section_title}>TROMBOSIS ESPLÉNICA</h1>
           <p className={styles.about_section_text}>
            La trombosis esplénica es una condición médica caracterizada por la formación de un coágulo 
            en la vena esplénica, lo que puede comprometer la función del bazo y generar complicaciones 
            sistémicas. Su diagnóstico y manejo requieren un enfoque multidisciplinario, considerando 
            sus diversas causas y manifestaciones clínicas.
          </p>

        </div>
      </section>

      {/* Sección 2 - Diagnóstico */}
      <section className={styles.about_section}>
        <div className={styles.about_section_left}>
          <div className={styles.canvasContainer}>
            <DiagnosisScene />
          </div>
        </div>

        <div className={styles.about_section_right}>
          <h1 className={styles.about_section_title}>DIAGNÓSTICO</h1>
          <p className={styles.about_section_text}>
            El diagnóstico de trombosis esplénica requiere un enfoque multimodal:
          </p>
          <ul className={styles.infoList}>
            <li><strong>Ecografía Doppler:</strong> Primer método de elección, no invasivo</li>
            <li><strong>Tomografía Computarizada:</strong> Proporciona imágenes detalladas del coágulo</li>
            <li><strong>Resonancia Magnética:</strong> Útil para evaluar complicaciones</li>
            <li><strong>Análisis de sangre:</strong> Para evaluar función esplénica y coagulación</li>
          </ul>
          <p className={styles.about_section_text}>
            El diagnóstico temprano es crucial para prevenir complicaciones como infarto esplénico o hipertensión portal.
          </p>
        </div>
      </section>
    </main>
  );
}