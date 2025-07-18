// app/(routes)/personal-diseases/hbvc/page.tsx
'use client';

import { useStore } from '../../../../components/hbvc/stores/stores';
import styles from "@styles/routes/hbvc.module.css";
import TrombosisScene from '../../../../components/hbvc/trombosisScene/TrombosisScene';
import DiagnosisScene from '../../../../components/hbvc/DiagnosisScene/DiagnosisScene';
import TreatmentScene from '../../../../components/hbvc/TreatmentScene/TreatmentScene';


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
      <section className={styles.about_section}>
        <div className={styles.about_section_left}>
          <div className={styles.canvasContainer}>
            <TreatmentScene />
          </div>
        </div>

        <div className={styles.about_section_right}>
          <h1 className={styles.about_section_title}>TRATAMIENTOS</h1>
          <p className={styles.about_section_text}>
            El manejo de la trombosis esplénica depende de la causa subyacente y la gravedad:
          </p>
          
          <h2 className={styles.subtitle}>Tratamientos médicos</h2>
          <ul className={styles.infoList}>
            <li><strong>Anticoagulantes:</strong> Heparina seguida de warfarina o DOACs por 3-6 meses</li>
            <li><strong>Antibióticos:</strong> Si hay infección subyacente</li>
            <li><strong>Analgesia:</strong> Para el manejo del dolor</li>
          </ul>
          
          <h2 className={styles.subtitle}>Intervenciones</h2>
          <ul className={styles.infoList}>
            <li><strong>Trombólisis:</strong> En casos seleccionados</li>
            <li><strong>Angioplastia:</strong> Para trombosis extensas</li>
          </ul>
          
          <h2 className={styles.subtitle}>Tratamiento quirúrgico</h2>
          <ul className={styles.infoList}>
            <li><strong>Esplenectomía:</strong> En casos de infarto masivo o ruptura</li>
            <li><strong>Derivación esplenorrenal:</strong> Para hipertensión portal</li>
          </ul>
        </div>
      </section>
    </main>
  );
}