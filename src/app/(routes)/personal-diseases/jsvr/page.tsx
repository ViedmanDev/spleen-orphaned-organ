"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "@styles/routes/jsvr.module.css"
import AbdominalTrauma from "@components/ui/DiseasesModels/jsvr/AbdominalTrauma"
import AccidenteModel from "@components/ui/DiseasesModels/jsvr/AccidenteModel"
import CirugiaModel from "@components/ui/DiseasesModels/jsvr/CirugiaModel"

export default function jsvr() {
    return (
        <>
            <section className={styles.about_section}>
                <div className={styles.about_section_left}>
                    <Canvas className={styles.viewer} camera={{ position: [0, 0, 5.5] }} shadows>
                        {/* Plano receptor de sombras */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
                            <planeGeometry args={[8, 8]} />
                            <shadowMaterial opacity={0.35} />
                        </mesh>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
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

            <section className={styles.about_section}>
                <div className={styles.about_section_left}>
                    <Canvas
                        className={styles.viewer}
                        camera={{ position: [0, 0, 5.5] }}
                        shadows
                    >
                        {/* Plano receptor de sombras */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
                            <planeGeometry args={[8, 8]} />
                            <shadowMaterial opacity={0.35} />
                        </mesh>
                        <AccidenteModel softShadows={true} />
                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={2} />
                    </Canvas>
                </div>
                <div className={styles.about_section_right}>
                    <h1 className={styles.about_section_title}>SÍNTOMAS</h1>
                    <p className={styles.about_section_text}>
                        Las lesiones por accidente en el bazo son comunes en situaciones de alta energía como accidentes automovilísticos, caídas desde altura, accidentes deportivos o traumatismos contundentes. El bazo, debido a su ubicación en el cuadrante superior izquierdo del abdomen y su naturaleza vascular, es especialmente vulnerable a lesiones traumáticas. Estas lesiones pueden ser cerradas (sin herida externa visible) o abiertas (cuando existe una herida penetrante).

                        Los accidentes que provocan lesiones esplénicas suelen involucrar fuerzas significativas que pueden causar desde contusiones menores hasta rupturas completas del órgano. Los accidentes de tráfico son una de las causas más frecuentes, especialmente cuando el impacto se produce en el lado izquierdo del cuerpo. La gravedad de la lesión depende de la intensidad del trauma y puede requerir desde observación médica hasta cirugía de emergencia para controlar el sangrado interno.
                    </p>
                </div>
            </section>

            <section className={styles.about_section}>
                <div className={styles.about_section_left}>
                    <Canvas
                        className={styles.viewer}
                        camera={{ position: [0, 0, 5.5] }}
                        shadows
                    >
                        {/* Plano receptor de sombras */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
                            <planeGeometry args={[8, 8]} />
                            <shadowMaterial opacity={0.4} />
                        </mesh>
                        <CirugiaModel softShadows={true} />
                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={2} />
                    </Canvas>
                </div>
                <div className={styles.about_section_right}>
                    <h1 className={styles.about_section_title}>TRATAMIENTO QUIRÚRGICO</h1>
                    <p className={styles.about_section_text}>
                        El tratamiento quirúrgico del bazo depende de la gravedad de la lesión y la estabilidad hemodinámica del paciente. En casos de trauma severo con sangrado activo, la esplenectomía (extirpación completa del bazo) puede ser necesaria para salvar la vida del paciente. Sin embargo, los avances en cirugía han permitido desarrollar técnicas de preservación esplénica, como la esplenorrafia (reparación del bazo) y la esplenectomía parcial.

                        La cirugía laparoscópica también se ha convertido en una opción viable para ciertos casos, ofreciendo menor invasividad, recuperación más rápida y menor riesgo de complicaciones. El objetivo principal es preservar la mayor cantidad posible de tejido esplénico funcional, ya que el bazo desempeña un papel crucial en el sistema inmunológico. Después de la cirugía, los pacientes requieren seguimiento especializado y, en algunos casos, vacunación específica para prevenir infecciones.
                    </p>
                </div>
            </section>
        </>
    );
}