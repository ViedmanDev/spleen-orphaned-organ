'use client';

import { useStore } from '../../../../components/hbvc/stores/stores';
import styles from "@styles/routes/hbvc.module.css";
import TrombosisScene from '../../../../components/hbvc/trombosisScene/TrombosisScene';

export default function HBVCPage() {
  const { nextInfo, prevInfo } = useStore();

  return (
    <main className={styles.mainContainer}>
      <section className={styles.about_section}>
        {/* Columna izquierda - Escena 3D */}
        <div className={styles.about_section_left}>
          <div className={styles.canvasContainer}>
            <TrombosisScene />
          </div>
          <div className={styles.controls}>
            <button onClick={prevInfo}>← Anterior</button>
            <button onClick={nextInfo}>Siguiente →</button>
          </div>
        </div>

        {/* Columna derecha - Información */}
        <div className={styles.about_section_right}>
          <h1 className={styles.about_section_title}>TROMBOSIS ESPLÉNICA</h1>
          <p className={styles.about_section_text}>
            La trombosis esplénica es una condición médica caracterizada por la formación de un coágulo 
            en la vena esplénica, lo que puede comprometer la función del bazo y generar complicaciones 
            sistémicas. Su diagnóstico y manejo requieren un enfoque multidisciplinario, considerando 
            sus diversas causas y manifestaciones clínicas.
          </p>
          <p className={styles.about_section_text}>
            Las principales causas incluyen trastornos de coagulación, infecciones abdominales, 
            traumatismos esplénicos y enfermedades hematológicas. Los síntomas pueden variar desde 
            dolor en el cuadrante superior izquierdo hasta fiebre sin causa aparente.
          </p>
        </div>
      </section>
    </main>
  );
}