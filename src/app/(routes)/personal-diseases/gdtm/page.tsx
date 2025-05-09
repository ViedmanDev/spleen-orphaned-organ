"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "@styles/routes/gdtm.module.css";
import Bazoinfarto from "@components/ui/DiseasesModels/gdtm/Bazoinfarto"; // Asegúrate de que sea con B mayúscula

export default function GDTM() {
    return (
        <>
            <section className={styles.about_section}>
                <div className={styles.about_section_left}>
                    <Canvas className={styles.viewer} camera={{ position: [0, 0, 5.5] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <Bazoinfarto /> {/* Aquí se importa correctamente el componente */}
                        <OrbitControls
                            enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={2}
                        />
                    </Canvas>
                </div>
                <div className={styles.about_section_right}>
                    <h1 className={styles.about_section_title}>INFARTO ESPLÉNICO</h1>
                    <p className={styles.about_section_text}>
                        El infarto esplénico es una condición médica en la que una parte del bazo muere debido
                        a la interrupción del flujo sanguíneo, generalmente por un bloqueo en la arteria esplénica.
                        Es común en personas con trastornos hematológicos, enfermedades autoinmunes o embolias.
                    </p>
                    <p className={styles.about_section_text}>
                        Los síntomas incluyen dolor en el cuadrante superior izquierdo del abdomen, fiebre, náuseas
                        y malestar general. El tratamiento varía desde manejo conservador con analgésicos hasta la
                        extirpación del bazo en casos graves. La prevención incluye controlar enfermedades subyacentes.
                    </p>
                </div>
            </section>
        </>
    );
}
