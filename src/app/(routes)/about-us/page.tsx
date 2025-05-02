"use client"

import { Canvas } from "@react-three/fiber";
import styles from "@styles/routes/about-us.module.css"
import HomeSpleen from "@components/ui/DiseasesModels/HomeSpleen";
import { OrbitControls } from "@react-three/drei";
import TeamBlock from "@components/ui/TeamBlock/TeamBlock";

export default function AboutUs() {
    return (
        <>
            <section className={styles.about_section}>
                <div className={styles.about_section_left}>
                    <Canvas className={styles.viewer} camera={{ position: [0, 0, 5.5] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <HomeSpleen />
                        <OrbitControls enableZoom={true}
                            enableRotate={true}
                            enablePan={true}
                            minDistance={1}
                            maxDistance={2} />
                    </Canvas>
                </div>
                <div className={styles.about_section_right}>
                    <h1 className={styles.about_section_title}>¿QUIÉNES SOMOS?</h1>
                    <p className={styles.about_section_text}>
                        Somos un grupo de estudiantes de la Universidad del Valle apasionados por la ciencia y la tecnología. En Science Gateway, nuestra misión es hacer que el conocimiento científico sea accesible, comprensible y emocionante para todos. A través de nuestras investigaciones, proyectos y recursos educativos, buscamos inspirar curiosidad y fomentar la comprensión de los temas científicos que nos rodean. Creemos en el poder de la educación para transformar el mundo y estamos comprometidos con el aprendizaje continuo y el intercambio de ideas.
                    </p>
                </div>
            </section>
            <section className={styles.team_section}>
                <div className={styles.team_section_container}>
                    <TeamBlock name="Sebastian Hurtado" image="" />
                    <TeamBlock name="Brandon Vargas" image="" />
                    <TeamBlock name="Gary Díaz" image="" />
                    <TeamBlock name="Juan Viedman" image="/assets/viedman-photo.jpg" />
                </div>
            </section>
        </>
    );
}