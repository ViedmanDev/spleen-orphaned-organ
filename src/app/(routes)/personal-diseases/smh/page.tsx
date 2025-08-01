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
import OperatingTable from "@components/ui/DiseasesModels/smh/Table";
import UltraSound from "@components/ui/DiseasesModels/smh/UltraSound";
import { PositionalAudio } from "@react-three/drei";
import { Sky } from "@react-three/drei";
// import SpotLightToModel from "@components/hbvc/SpotLightToModel";

export default function CombinedModelsPage() {
  return (
    <>
      {/* Sección del Quiste Esplénico */}
      <section className={smhStyles.about_section}>
        <div className={smhStyles.about_section_left}>
          <Canvas
            shadows
            className={smhStyles.viewer}
            camera={{
              position: [0, 2, 5], // Posición inicial más cercana
              fov: 45, // Campo de visión más estrecho
              near: 0.1,
              far: 1000,
            }}
          >
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

      {/* Sección del Enfermo */}
      <section className={smhStyles.about_section}>
        <div className={smhStyles.about_section_left}>
          <Canvas
            shadows
            className={smhStyles.viewer}
            camera={{
              position: [0, 0, 5], // Posición inicial más cercana
              fov: 45, // Campo de visión más estrecho
              near: 0.1,
              far: 1000,
            }}
          >
            <Suspense fallback={null}>
              {/* PRIMER SISTEMA DE ILUMINACIÓN - Usando tu componente Lights modificado */}

              <Lights
                modelType="human"
                showHelpers={false}
                enableAnimations={true}
              />
              <Sky
                distance={90} // Distancia del skybox
                sunPosition={[0, 1, 2]} // Posición del sol (afecta iluminación ambiental)
                inclination={0.5} // Ángulo del sol (0 = noche, 1 = día)
                azimuth={0.25} // Rotación del sol (0-1)
                turbidity={5} // Claridad del cielo (1 = despejado, 10 = nublado)
                rayleigh={0.5} // Dispersión de luz (0-1)
                mieCoefficient={0.005} // Bruma atmosférica
                mieDirectionalG={0.8} // Suavidad de la bruma
              />
              {/* Modelo human (Enfermo) */}
              <Human
                position={[0, -1, 0]}
                scale={0.13}
                rotation={[0, -Math.PI / 4, 0]}
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
          <h1 className={smhStyles.about_section_title}>SINTOMAS</h1>
          <p className={smhStyles.about_section_text}>
            Los quistes esplénicos suelen ser asintomáticos, pero cuando
            aumentan de tamaño pueden causar dolor en el lado superior izquierdo
            del abdomen (a veces irradiado al hombro), sensación de pesadez o
            masa palpable, vomitos o digestión lenta por compresión gástrica, y,
            en casos raros, complicaciones como infección, ruptura (con dolor
            agudo y sangrado interno) o presión sobre órganos adyacentes.
          </p>
        </div>
      </section>

      <section className={smhStyles.about_section}>
        <div className={smhStyles.about_section_left}>
          <Canvas
            shadows
            className={smhStyles.viewer}
            camera={{
              position: [0, 2, 5], // Posición inicial más cercana
              fov: 45, // Campo de visión más estrecho
              near: 0.1,
              far: 1000,
            }}
          >
            <Suspense fallback={null}>
              {/* PRIMER SISTEMA DE ILUMINACIÓN - Usando tu componente Lights modificado */}

              <Lights modelType="operatingTable" showHelpers={false} />
              <Stars
                radius={100}
                depth={50}
                count={2000}
                factor={2}
                saturation={0}
                fade
                speed={0.2}
              />

              <UltraSound
                position={[0, -1, 0]}
                scale={2}
                rotation={[0, -Math.PI / 4, 0]}
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
          <h1 className={smhStyles.about_section_title}>Detecion</h1>
          <p className={smhStyles.about_section_text}>
            Los quistes esplénicos se detectan mediante ecografía abdominal
            (método inicial), tomografía computarizada (para detalles
            anatómicos), resonancia magnética (en casos complejos), análisis
            sanguíneos (para detectar infección) y evaluación clínica de
            síntomas como dolor abdominal o masa palpable..
          </p>
        </div>
      </section>

      <section className={smhStyles.about_section}>
        <div className={smhStyles.about_section_left}>
          <Canvas
            shadows
            className={smhStyles.viewer}
            camera={{
              position: [0, 2, 5], // Posición inicial más cercana
              fov: 45, // Campo de visión más estrecho
              near: 0.1,
              far: 1000,
            }}
          >
            <Suspense fallback={null}>
              {/* PRIMER SISTEMA DE ILUMINACIÓN - Usando tu componente Lights modificado */}

              <Lights modelType="operatingTable" showHelpers={false} />
              <Stars
                radius={100}
                depth={50}
                count={2000}
                factor={2}
                saturation={0}
                fade
                speed={0.2}
              />
              {/* Modelo human (Enfermo) */}

              <OperatingTable
                position={[0, -1, 0]}
                scale={2}
                rotation={[0, -Math.PI / 4, 0]}
              />
              <PositionalAudio
                url="/organs-models/smh/Sound/TableS.mp3"
                distance={10}
                loop
                autoplay
                position={[0, -1, 0]} // Igual que el modelo para que el sonido venga de la mesa
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
          <h1 className={smhStyles.about_section_title}>Tratamientos</h1>
          <p className={smhStyles.about_section_text}>
            Los quistes esplénicos pueden manejarse con observación y
            seguimiento si son pequeños y asintomáticos, pero cuando causan
            síntomas o complicaciones (como dolor, infección o ruptura), las
            opciones incluyen escleroterapia (drenaje e inyección de sustancias
            esclerosantes), drenaje percutáneo para aliviar la presión (aunque
            con riesgo de recurrencia) o cirugía (esplenectomía parcial o total
            en casos graves). En infecciones, se usan antibióticos, pero el
            tratamiento definitivo depende del tamaño, síntomas y riesgos, por
            lo que siempre debe ser evaluado por un especialista en cirugía
            digestiva o hepatobiliar.
          </p>
        </div>
      </section>
    </>
  );
}
