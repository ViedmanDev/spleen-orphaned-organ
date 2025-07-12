"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Floor from "../../../../components/hbvc/Floor";
import { Cysts } from "@components/ui/DiseasesModels/smh/Cysts";
import Human from "@components/ui/DiseasesModels/smh/human";
import smhStyles from "@styles/Smh/smh.module.css";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import { Lights } from "@components/ui/DiseasesModels/smh/Lights";

export default function CombinedModelsPage() {
  return (
    <>
      {/* Sección del Quiste Esplénico */}
      <section className={smhStyles.about_section}>
        <div className={smhStyles.about_section_left}>
          <Canvas shadows 
            className={smhStyles.viewer}
            camera={{
              position: [0, 2, 5], // Posición inicial más cercana
              fov: 45, // Campo de visión más estrecho
              near: 0.1,
              far: 1000
            }}>

            <Suspense fallback={null}>
              {/* PRIMER SISTEMA DE ILUMINACIÓN - Usando tu componente Lights modificado */}
             
              <Lights
                modelType="cyst"
                softShadows
                ambientIntensity={0.2}
                directionalIntensity={1.5}
                leftLightIntensity={0.5}
              />
              <Stars
                radius={100}
                depth={50}
                count={2000}
                factor={2}
                saturation={0}
                fade
                speed={0.2}
              />
              {/* Modelo Cysts (bazo) */}
              <Cysts
                position={[0, -0.5, 0]}
                rotation={[0, Math.PI / 4, 0]}
                scale={5}
              />
              <Floor />
             <OrbitControls
                enableZoom={true}
                enableRotate={true}
                enablePan={true}
                minDistance={0.5}
                maxDistance={1000}
                target={[0, 0, 0]}
              />
              <EffectComposer>
                <Bloom intensity={0.3} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </div>
        <div className={smhStyles.about_section_right}>
          <h1 className={smhStyles.about_section_title}>QUISTE ESPLÉNICO</h1>
          <p className={smhStyles.about_section_text}>
            Un quiste esplénico es una lesión líquida encapsulada en el bazo,
            clasificada como verdadera (congénita, con epitelio) o falsa
            (postraumática, sin epitelio). Su crecimiento altera la estructura
            esplénica, pudiendo comprimir tejido sano, reducir la función
            inmunohematológica y, en casos graves, causar ruptura con riesgo
            hemorrágico o compresión vascular adyacente.
          </p>
        </div>
      </section>

      <section className={smhStyles.container}>
        <div className={smhStyles.textBlock}>
          <h2>SINTOMAS</h2>
          <p>
            Los quistes esplénicos suelen ser asintomáticos, pero cuando
            aumentan de tamaño pueden causar dolor en el lado superior izquierdo
            del abdomen (a veces irradiado al hombro), sensación de pesadez o
            masa palpable, náuseas o digestión lenta por compresión gástrica, y,
            en casos raros, complicaciones como infección, ruptura (con dolor
            agudo y sangrado interno) o presión sobre órganos adyacentes.
          </p>
        </div>

        <div className={smhStyles.canvasContainer}>
          <Canvas shadows>
            <Suspense fallback={null}>
              {/* SEGUNDO SISTEMA DE ILUMINACIÓN - Configuración alternativa */}
              <Lights
                modelType="human"
                softShadows
                ambientIntensity={0.2}
                directionalIntensity={1.8} // Luz principal más intensa
                leftLightIntensity={1.9} // Luz azul más intensa
                rightLightIntensity={0.9} // Luz naranja más suave
              />

              {/* Modelo Human */}
              <Human
                object={{}}
                position={[0, -1, 0]}
                scale={0.13}
                rotation={[0, -Math.PI / 4, 0]}
              />

              <Floor />
              <EffectComposer>
                <Bloom intensity={0.2} />
              </EffectComposer>
              <OrbitControls
                enableZoom={true}
                enableRotate={true}
                enablePan={true}
                minDistance={0.5}
                maxDistance={1000}
                target={[0, 0, 0]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </>
  );
}
