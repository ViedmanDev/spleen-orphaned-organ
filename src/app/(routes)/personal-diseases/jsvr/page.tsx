"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import styles from "@styles/routes/jsvr.module.css"
import AbdominalTrauma from "@components/ui/DiseasesModels/jsvr/AbdominalTrauma"
import AccidenteModel from "@components/ui/DiseasesModels/jsvr/AccidenteModel"
import CirugiaModel from "@components/ui/DiseasesModels/jsvr/CirugiaModel"
import BazoModel from "@components/ui/DiseasesModels/jsvr/BazoModel"
import HealthyBazoScene from "@components/ui/DiseasesModels/jsvr/HealthyBazoScene"
import AmbientSound3D from "@components/audio/AmbientSound3D"
import Text3D from "@components/ui/Text3D"
import TextOverlay2D from "@components/ui/TextOverlay2D"


export default function jsvr() {
    return (
        <>
            <section className={styles.about_section}>
                <div className={styles.about_section_left}>
                    <Canvas className={styles.viewer} camera={{ position: [0, 0, 5.5] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <AbdominalTrauma />

                        {/* Textos 3D para Trauma Abdominal */}
                        <Text3D
                            text="LESIÓN ESPLÉNICA"
                            position={[3, 2, 0]}
                            fontSize={0.3}
                            color="#ff4444"
                            animate={true}
                            animationType="float"
                        />
                        <Text3D
                            text="URGENCIA MÉDICA"
                            position={[-3, -1.5, 0]}
                            fontSize={0.25}
                            color="#ff8888"
                            animate={true}
                            animationType="pulse"
                        />

                        {/* Sonido 3D para trauma abdominal - frecuencia baja, alarma médica */}
                        <AmbientSound3D
                            position={[2, 0, 0]}
                            frequency={220}
                            volume={0.2}
                            distance={3}
                            color="#ff4444"
                            autoplay={false}
                        />
                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={2} />
                    </Canvas>

                    {/* Textos 2D superpuestos */}
                    <TextOverlay2D
                        text="⚠️ Trauma de Alto Impacto"
                        position="top-left"
                        backgroundColor="rgba(255, 68, 68, 0.9)"
                        animated={true}
                        animationType="slide"
                    />
                    <TextOverlay2D
                        text="Hemorragia Interna Posible"
                        position="bottom-right"
                        backgroundColor="rgba(139, 0, 0, 0.8)"
                        animated={true}
                        animationType="fade"
                    />
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

                        {/* Textos 3D para Síntomas */}
                        <Text3D
                            text="DOLOR ABDOMINAL"
                            position={[2.5, 1.5, 1]}
                            fontSize={0.28}
                            color="#ff8800"
                            animate={true}
                            animationType="float"
                        />
                        <Text3D
                            text="EMERGENCIA 911"
                            position={[-2.8, -0.5, -1]}
                            fontSize={0.22}
                            color="#ffaa44"
                            animate={true}
                            animationType="rotate"
                        />

                        {/* Sonido 3D para accidente - sonido de sirena/emergencia */}
                        <AmbientSound3D
                            position={[-2, 1, 0]}
                            frequency={880}
                            volume={0.15}
                            distance={4}
                            color="#ff8800"
                            autoplay={false}
                        />
                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={2} />
                    </Canvas>

                    {/* Textos 2D superpuestos */}
                    <TextOverlay2D
                        text="🚨 Signos de Alerta"
                        position="top-right"
                        backgroundColor="rgba(255, 136, 0, 0.9)"
                        animated={true}
                        animationType="bounce"
                    />
                    <TextOverlay2D
                        text="Monitoreo Constante Requerido"
                        position="bottom-left"
                        backgroundColor="rgba(204, 85, 0, 0.8)"
                        animated={true}
                        animationType="slide"
                    />
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

                        {/* Textos 3D para Tratamiento Quirúrgico */}
                        <Text3D
                            text="CIRUGÍA ESPLÉNICA"
                            position={[2, 2.2, 0.5]}
                            fontSize={0.32}
                            color="#00cc88"
                            animate={true}
                            animationType="pulse"
                        />
                        <Text3D
                            text="PROCEDIMIENTO EXITOSO"
                            position={[-3, -1.8, -0.5]}
                            fontSize={0.24}
                            color="#44dd99"
                            animate={true}
                            animationType="float"
                        />

                        {/* Sonido 3D para cirugía - sonido más suave, ambiente quirúrgico */}
                        <AmbientSound3D
                            position={[0, 2, 1]}
                            frequency={440}
                            volume={0.1}
                            distance={3}
                            color="#00cc88"
                            autoplay={false}
                        />
                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={2} />
                    </Canvas>

                    {/* Textos 2D superpuestos */}
                    <TextOverlay2D
                        text="✅ Intervención Quirúrgica"
                        position="top-left"
                        backgroundColor="rgba(0, 204, 136, 0.9)"
                        animated={true}
                        animationType="fade"
                    />
                    <TextOverlay2D
                        text="Recuperación Supervisada"
                        position="bottom-right"
                        backgroundColor="rgba(0, 153, 102, 0.8)"
                        animated={true}
                        animationType="bounce"
                    />
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
                        
                        {/* Textos 3D para Prevención y Cuidados */}
                        <Text3D
                            text="PREVENCIÓN ACTIVA"
                            position={[3, 2.5, 0]}
                            fontSize={0.35}
                            color="#4fc3f7"
                            animate={true}
                            animationType="pulse"
                        />
                        <Text3D
                            text="CUIDADOS ESENCIALES"
                            position={[-3.2, -1.2, 0]}
                            fontSize={0.28}
                            color="#81d4fa"
                            animate={true}
                            animationType="float"
                        />
                        
                        {/* Sonido 3D para prevención - sonido relajante y positivo */}
                        <AmbientSound3D
                            position={[0, 1.5, 2]}
                            frequency={528}
                            volume={0.12}
                            distance={4}
                            color="#4fc3f7"
                            autoplay={false}
                        />
                        
                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={3} />
                    </Canvas>

                    {/* Textos 2D superpuestos */}
                    <TextOverlay2D
                        text="💙 Estilo de Vida Saludable"
                        position="top-left"
                        backgroundColor="rgba(79, 195, 247, 0.9)"
                        animated={true}
                        animationType="fade"
                    />
                    <TextOverlay2D
                        text="Protección Integral del Bazo"
                        position="bottom-right"
                        backgroundColor="rgba(129, 212, 250, 0.8)"
                        animated={true}
                        animationType="slide"
                    />
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