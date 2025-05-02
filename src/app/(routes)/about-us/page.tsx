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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio laudantium, esse est dicta quisquam cum officiis voluptatem nobis eum voluptates porro cupiditate reiciendis neque laboriosam at veniam nulla modi. Doloremque.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi numquam fugiat rerum. Repudiandae in assumenda aperiam nisi ratione nostrum consequatur, esse quas nobis ad! Nisi corporis laborum quidem? Blanditiis, itaque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime temporibus iure cupiditate minus id commodi voluptatem ex! Ad quis tenetur, assumenda repellendus, necessitatibus consequuntur eligendi odio, veritatis et cum libero?
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