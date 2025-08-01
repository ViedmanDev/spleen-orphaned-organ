"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import styles from '@styles/layout/OrgansSection.module.css';
import { OrgansData } from '@config/organs.config';

export default function OrgansSection() {
    return (
        <div className={styles.wrapper} aria-labelledby="organs-title">
            <h2 id="organs-title" className={styles.heading}>
                Explora la anatomía del bazo a través de modelos 3D
            </h2>
            <div className={styles.grid}>
                {OrgansData.map(({ id, Component }) => (
                    <article key={id} className={styles.card}>
                        <Canvas className={styles.viewer} camera={{ position: [0, 0, 5.5] }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                            <Component />
                            <OrbitControls enableZoom={true}
                                enableRotate={true}
                                enablePan={true}
                                minDistance={1}
                                maxDistance={2} />
                        </Canvas>
                    </article>
                ))}
            </div>
        </div>
    );
}
