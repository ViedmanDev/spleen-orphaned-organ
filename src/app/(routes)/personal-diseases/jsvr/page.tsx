"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "@styles/routes/jsvr.module.css"
import AbdominalTrauma from "@components/ui/DiseasesModels/jsvr/AbdominalTrauma"

export default function jsvr() {
    return (
        <>
            <section className={styles.about_section}>
                <div className={styles.about_section_left}>
                    <Canvas className={styles.viewer} camera={{ position: [0, 0, 5.5] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <AbdominalTrauma />
                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={2} />
                    </Canvas>
                </div>
                <div className={styles.about_section_right}>
                    <h1 className={styles.about_section_title}>TRAUMA ABDOMINAL</h1>
                    <p className={styles.about_section_text}>
                        El trauma abdominal en el bazo se refiere a cualquier lesión o daño sufrido por el bazo, un órgano ubicado en la parte superior izquierda del abdomen. Este órgano tiene funciones clave como la filtración de la sangre y el almacenamiento de plaquetas. Las lesiones pueden ser provocadas por golpes directos, accidentes de tráfico, caídas o lesiones deportivas, y pueden ser cerradas (sin ruptura de la piel) o abiertas (cuando hay una herida externa). Las lesiones más graves pueden incluir laceraciones o rupturas completas del bazo, que pueden causar hemorragias internas peligrosas.

                        El daño en el bazo puede variar en gravedad. En casos leves, como contusiones o moretones, el bazo se daña pero no se rompe, mientras que las laceraciones o desgarramientos son más serias, causando sangrados internos. La ruptura completa del bazo es la forma más grave de trauma, y puede provocar un sangrado masivo, lo cual requiere atención médica urgente.
                    </p>
                </div>
            </section>
        </>
    );
}