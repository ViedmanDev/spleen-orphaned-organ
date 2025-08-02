"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import styles from "@styles/routes/jsvr.module.css"
import AbdominalTrauma from "@components/ui/DiseasesModels/jsvr/AbdominalTrauma"
import AccidenteModel from "@components/ui/DiseasesModels/jsvr/AccidenteModel"
import CirugiaModel from "@components/ui/DiseasesModels/jsvr/CirugiaModel"
import BazoModel from "@components/ui/DiseasesModels/jsvr/BazoModel"
import HealthyBazoScene from "@components/ui/DiseasesModels/jsvr/HealthyBazoScene"


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

            <section className={styles.about_section}>
                <div className={styles.about_section_left}>
                    <Canvas
                        className={styles.viewer}
                        camera={{ position: [0, 0, 5.5] }}
                        shadows
                    >
                        {/* Ambiente HDR para una apariencia más profesional */}
                        <Environment files="/environments/sala.exr" background={false} />

                        {/* Iluminación suave para prevención */}
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[3, 4, 3]} intensity={0.8} castShadow />
                        <pointLight position={[-3, 2, 3]} intensity={0.4} color="#4fc3f7" />

                        {/* Plano receptor de sombras */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                            <planeGeometry args={[10, 10]} />
                            <shadowMaterial opacity={0.3} />
                        </mesh>

                        {/* Modelo del bazo sano */}
                        <BazoModel
                            position={[0, 0, 0]}
                            scale={1.2}
                            animate={true}
                            animationType="float"
                            color="#ff6b9d"
                        />

                        {/* Escena de efectos visuales para salud */}
                        <HealthyBazoScene
                            showParticles={true}
                            particleCount={80}
                            glowIntensity={0.25}
                        />

                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={3} />
                    </Canvas>

                </div>
                <div className={styles.about_section_right}>
                    <h1 className={styles.about_section_title}>PREVENCIÓN Y CUIDADOS</h1>
                    <p className={styles.about_section_text}>
                        La prevención de lesiones esplénicas se centra en adoptar medidas de seguridad y mantener un estilo de vida saludable. Es fundamental usar cinturones de seguridad en vehículos, equipos de protección adecuados en deportes de contacto, y evitar actividades de alto riesgo cuando sea posible. El mantenimiento de un peso corporal saludable y una buena condición física también contribuyen a la protección del bazo, ya que fortalecen los músculos abdominales que pueden actuar como amortiguadores naturales.

                        Los cuidados post-trauma o post-cirugía incluyen seguimiento médico regular, evitar actividades físicas intensas durante el período de recuperación, y estar atento a signos de complicaciones como dolor abdominal persistente, mareos o debilidad. La educación sobre los síntomas de alerta es crucial para buscar atención médica oportuna. Además, mantener las vacunas al día es especialmente importante para pacientes con bazo comprometido o ausente, ya que este órgano juega un papel vital en la respuesta inmunológica.
                    </p>
                </div>
            </section>
        </>
    );
}