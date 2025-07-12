'use client';

import { Canvas } from '@react-three/fiber';
import styles from '@styles/routes/gdtm.module.css';
import Bazoinfarto from '@components/ui/DiseasesModels/gdtm/Bazoinfarto';
import Medico from '@components/ui/DiseasesModels/gdtm/Medico';

export default function GDTM() {
    return (
        <section style={{ padding: '2rem' }}>
            {/* Sección 1: ¿Qué es la enfermedad? */}
            <h2 className={styles.section_title}>¿QUÉ ES EL INFARTO ESPLÉNICO?</h2>
            <div className={styles.model_info_row}>
                <div className={styles.model_column}>
                    <div className={styles.canvas_container}>
                        <Canvas camera={{ position: [0, 0, 5.5] }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                            <Bazoinfarto />
                        </Canvas>
                        <button
                            className={styles.fixed_button}
                            onClick={() => alert('Representación de un bazo el cual sufrió un infarto esplénico.')}
                        >
                            Más info
                        </button>
                    </div>
                </div>
                <div className={styles.info_column}>
                    <p className={styles.info_text}>
                        El infarto esplénico es una condición médica en la que una parte del bazo muere debido
                        a la interrupción del flujo sanguíneo, generalmente por un bloqueo en la arteria esplénica.
                        Es común en personas con trastornos hematológicos, enfermedades autoinmunes o embolias.
                    </p>
                    <p className={styles.info_text}>
                        Los síntomas incluyen dolor en el cuadrante superior izquierdo del abdomen, fiebre, náuseas
                        y malestar general. El tratamiento varía desde manejo conservador con analgésicos hasta la
                        extirpación del bazo en casos graves.
                    </p>
                </div>
            </div>

            {/* Sección 2: Síntomas */}
            <h2 className={styles.section_title}>SÍNTOMAS</h2>
            <div className={styles.model_info_row}>
                <div className={styles.model_column}>
                    <div className={styles.canvas_container}>
                        <Canvas camera={{ position: [0, 0, 5.5] }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                            <Medico />
                        </Canvas>
                        <button
                            className={styles.fixed_button}
                            onClick={() => alert('Representación de un médico describiendo los síntomas.')}
                        >
                            Más info
                        </button>
                    </div>
                </div>
                <div className={styles.info_column}>
                    <p className={styles.info_text}>
                        El infarto esplénico puede ser asintomático en algunos casos, pero cuando se presentan síntomas,
                        estos suelen ser intensos y localizados. Los más comunes son:
                        dolor abdominal agudo en el lado izquierdo,
                        fiebre persistente, náuseas y dolor irradiado al hombro (signo de Kehr).
                    </p>
                </div>
            </div>

            {/* Sección 3: Tratamiento */}
            <h2 className={styles.section_title}>TRATAMIENTO</h2>
            <div className={styles.model_info_row}>
                <div className={styles.model_column}>
                    <div className={styles.canvas_container}>
                        <p className={styles.placeholder_text}>[ Modelo 3D del tratamiento próximamente ]</p>
                        <button
                            className={styles.fixed_button}
                            onClick={() => alert('Esta sección mostrará una simulación del tratamiento en 3D.')}
                        >
                            Más info
                        </button>
                    </div>
                </div>
                <div className={styles.info_column}>
                    <p className={styles.info_text}>
                        El tratamiento depende de la gravedad y la causa del infarto. Puede incluir reposo, hidratación,
                        analgésicos, anticoagulantes, y en casos graves, la extirpación del bazo (esplenectomía).
                    </p>
                    <p className={styles.info_text}>
                        Se recomienda seguimiento médico, control de enfermedades subyacentes y monitoreo por imágenes.
                        Este espacio representará visualmente cómo los tratamientos afectan al órgano y su recuperación.
                    </p>
                </div>
            </div>
        </section>
    );
}


