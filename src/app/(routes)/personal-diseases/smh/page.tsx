"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "@styles/routes/smh.module.css";
import Cysts from "@components/ui/DiseasesModels/smh/Cysts";

export default function smh() {
  return (
    <>
      <section className={styles.about_section}>
        <div className={styles.about_section_left}>
          <Canvas className={styles.viewer} camera={{ position: [2, 1, 1] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Cysts />
            <OrbitControls
              enableZoom={true}
              enableRotate={true}
              enablePan={true}
              minDistance={0.5} // Distancia mínima de acercamiento
              maxDistance={0.7} // Distancia máxima de alejamiento
              target={[0, 0, 0]} // Punto central de rotación
            />
          </Canvas>
        </div>
        <div className={styles.about_section_right}>
          <h1 className={styles.about_section_title}>QUISTE ESPLENICO</h1>
          <p className={styles.about_section_text}>
            Un quiste esplénico es una lesión encapsulada que se forma dentro
            del bazo, caracterizada por la acumulación de líquido en su
            interior. Estos quistes pueden clasificarse en verdaderos
            (revestidos por epitelio, generalmente congénitos) o falsos (sin
            revestimiento epitelial, frecuentemente postraumáticos o
            degenerativos). Su presencia altera la arquitectura normal del bazo,
            modificando su estructura y, en casos significativos, comprometiendo
            su función inmunológica y hematológica. Los efectos adversos en el
            organismo dependen de su tamaño y localización: los quistes grandes
            distorsionan la morfología esplénica, generando tensiones mecánicas
            que pueden derivar en ruptura espontánea, con consecuencias
            hemorrágicas potencialmente graves. Además, su crecimiento
            progresivo puede inducir atrofia del tejido esplénico sano,
            reduciendo su capacidad para filtrar sangre y participar en la
            respuesta inmune. En casos excepcionales, la compresión crónica de
            vasos sanguíneos adyacentes puede afectar la vascularización de
            órganos vecinos.
          </p>
        </div>
      </section>
    </>
  );
}
