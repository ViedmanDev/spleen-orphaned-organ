import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Lights() {
  const { gl } = useThree();

  // Configurar sombras suaves
import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  HemisphereLightHelper,
  PointLightHelper,
  SpotLightHelper,
  DirectionalLightHelper,
} from "three";

type LightsProps = {
  modelType?: "cyst" | "human" | "operatingTable"; // <- Añadido nuevo tipo
  softShadows?: boolean;
  hardShadows?: boolean;
  ambientIntensity?: number;
  directionalIntensity?: number;
  leftLightIntensity?: number;
  rightLightIntensity?: number;
  showHelpers?: boolean;
  enableAnimations?: boolean;
};

export function Lights({
  modelType = "cyst",
  softShadows = false,
  ambientIntensity = 0.3,
  directionalIntensity = 1.5,
  leftLightIntensity = 0.5,
  rightLightIntensity = 0.5,
  showHelpers = false,
  enableAnimations = true,
}: LightsProps) {
  const { gl, scene } = useThree();

  // Referencias existentes (se mantienen igual)
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const leftPointLightRef = useRef<THREE.PointLight>(null);
  const rightPointLightRef = useRef<THREE.PointLight>(null);
  const newDirectionalLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const hemisphereLightRef = useRef<THREE.HemisphereLight>(null);
  const spotTargetRef = useRef<THREE.Object3D>(null);
  const secondSpotRef = useRef<THREE.SpotLight>(null);
  const secondTargetRef = useRef<THREE.Object3D>(null);

  // Nuevas referencias para la mesa de operaciones
  const tableMainLightRef = useRef<THREE.SpotLight>(null);
  const tableFillLightRef = useRef<THREE.PointLight>(null);
  const tableLightTargetRef = useRef<THREE.Object3D>(null);

  // Configuración de sombras (se mantiene igual)
  useEffect(() => {
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.shadowMap.enabled = true;
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 7]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={15}
      />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#b97a20" />
    gl.shadowMap.type = softShadows
      ? THREE.PCFSoftShadowMap
      : THREE.PCFShadowMap;

    if (directionalLightRef.current) {
      directionalLightRef.current.shadow.mapSize.width = 2048;
      directionalLightRef.current.shadow.mapSize.height = 2048;
      directionalLightRef.current.shadow.camera.near = 0.5;
      directionalLightRef.current.shadow.camera.far = 15;
      directionalLightRef.current.shadow.bias = -0.0001;
    }

    if (spotLightRef.current) {
      spotLightRef.current.shadow.mapSize.width = 1024;
      spotLightRef.current.shadow.mapSize.height = 1024;
    }
    if (secondSpotRef.current) {
      secondSpotRef.current.shadow.mapSize.width = 1024;
      secondSpotRef.current.shadow.mapSize.height = 1024;
    }

    // Nueva configuración para la mesa de operaciones
    if (tableMainLightRef.current) {
      tableMainLightRef.current.shadow.mapSize.width = 2048;
      tableMainLightRef.current.shadow.mapSize.height = 2048;
    }

    // Targets (se añade el nuevo para la mesa)
    if (modelType === "human") {
      if (!spotTargetRef.current) {
        spotTargetRef.current = new THREE.Object3D();
        spotTargetRef.current.position.set(0, 0.8, 0);
        scene.add(spotTargetRef.current);
      }
      if (!secondTargetRef.current) {
        secondTargetRef.current = new THREE.Object3D();
        secondTargetRef.current.position.set(2, 0.8, -2);
        scene.add(secondTargetRef.current);
      }
    }

    if (modelType === "operatingTable" && !tableLightTargetRef.current) {
      tableLightTargetRef.current = new THREE.Object3D();
      tableLightTargetRef.current.position.set(0, 0.5, 0);
      scene.add(tableLightTargetRef.current);
    }

    return () => {
      if (spotTargetRef.current) scene.remove(spotTargetRef.current);
      if (secondTargetRef.current) scene.remove(secondTargetRef.current);
      if (tableLightTargetRef.current)
        scene.remove(tableLightTargetRef.current);
    };
  }, [gl, scene, softShadows, modelType]);

  // Helpers visuales (se añade el nuevo para la mesa)
  useEffect(() => {
    if (!showHelpers) return;

    const helpers: THREE.Object3D[] = [];

    if (modelType === "human") {
      if (newDirectionalLightRef.current) {
        helpers.push(
          new DirectionalLightHelper(
            newDirectionalLightRef.current,
            1,
            "orange"
          )
        );
      }
      if (spotLightRef.current) {
        helpers.push(new SpotLightHelper(spotLightRef.current, "red"));
      }
      if (pointLightRef.current) {
        helpers.push(new PointLightHelper(pointLightRef.current, 1, "cyan"));
      }
      if (hemisphereLightRef.current) {
        helpers.push(new HemisphereLightHelper(hemisphereLightRef.current, 1));
      }
      if (secondSpotRef.current) {
        helpers.push(new SpotLightHelper(secondSpotRef.current, "white"));
      }
    } else if (modelType === "operatingTable" && tableMainLightRef.current) {
      helpers.push(new SpotLightHelper(tableMainLightRef.current, "white"));
    }

    helpers.forEach((helper) => scene.add(helper));

    return () => {
      helpers.forEach((helper) => {
        if (helper instanceof SpotLightHelper) {
          helper.dispose();
        }
        scene.remove(helper);
      });
    };
  }, [showHelpers, scene, modelType]);

  // Animación (se añade la nueva para la mesa)
  useFrame((state) => {
    if (!enableAnimations) return;

    const t = state.clock.getElapsedTime();

    if (modelType === "human") {
      if (newDirectionalLightRef.current) {
        newDirectionalLightRef.current.target.updateMatrixWorld();
      }
      if (secondSpotRef.current && secondTargetRef.current) {
        secondTargetRef.current.position.x = 2 + Math.sin(t * 0.5) * 0.5;
        secondSpotRef.current.target.updateMatrixWorld();
      }
    } else if (modelType === "operatingTable" && tableMainLightRef.current) {
      // Animación sutil del foco quirúrgico
      tableMainLightRef.current.intensity = 1.5 + Math.sin(t * 0.5) * 0.1;
    }
  });

  // Configuración de colores y posiciones (se mantiene igual)
  const getHumanLightSettings = () => ({
    leftColor: "#4da6ff",
    rightColor: "#ff9966",
    leftPosition: [-5, 2, 2] as [number, number, number],
    rightPosition: [5, 2, 2] as [number, number, number],
    directionalPosition: [0, 8, 4] as [number, number, number],
  });

  // Nueva configuración para la mesa de operaciones
  if (modelType === "operatingTable") {
    return (
      <>
        {/* Iluminación para mesa de operaciones */}
        <ambientLight color="#e0f0ff" intensity={0.2} />

        <spotLight
          ref={tableMainLightRef}
          color="#ffffff"
          position={[0, 2.5, 1.5]} // Bajado de Y=3 a Y=2.5 para mayor intensidad
          target={tableLightTargetRef.current ?? undefined}
          angle={Math.PI / 6}
          intensity={3.0} // Aumentado de 1.5 a 3.0
          penumbra={0.3} // Reducido para luz más concentrada
          decay={0.5} // Reducido para menos atenuación
          distance={15} // Aumentado el alcance
          castShadow
        />
        <pointLight
          ref={tableFillLightRef}
          position={[0, 1.8, -0.5]} // Más cercano a la mesa
          color="#e0f0ff"
          intensity={0.8} // Aumentado de 0.4 a 0.8
          distance={6} // Distancia reducida
          decay={1} // Decaimiento ajustado
        />

        <directionalLight
          position={[1, 2.5, -1]} // Posición ajustada
          color="#ffffff"
          intensity={0.6} // Aumentado de 0.3 a 0.6
          castShadow
        />
      </>
    );
  }

  // El resto del código se mantiene EXACTAMENTE IGUAL
  if (modelType === "human") {
    return (
      <>
         {/* Luz ambiental reducida */}
      <ambientLight color="#111122" intensity={0.1} />
      
      {/* Hemisferio con tonos fríos */}
      <hemisphereLight args={['#444477', '#000022', 0.6]} />
      
      {/* Luces principales intensas */}
      <directionalLight
        color="#ffffff"
        position={[0, 5, 0]}
        intensity={1.5}
        castShadow
      />
      <spotLight
        color="#ffffff"
        position={[0, 2.5, 1.5]}
        intensity={2.5}
        angle={Math.PI / 5}
        penumbra={0.4}
        decay={0.5}
        distance={15}
        castShadow
      />
      <spotLight
        color="#fff4e6"
        position={[0, 0, 5]}
        intensity={1.8}
        angle={Math.PI / 6}
        penumbra={0.5}
        decay={0.5}
        distance={12}
        castShadow
      />
      <pointLight
        position={[0, 1, -3]}
        color="#445588"
        intensity={1.0}
        distance={8}
      />
    </>
    );
  }

  // Configuración original para quistes
  return (
    <>
      <ambientLight color="#ffffff" intensity={ambientIntensity} />

      <directionalLight
        ref={directionalLightRef}
        color="#ffffff"
        position={[5, 10, 7]}
        intensity={directionalIntensity}
        castShadow
      />

      <pointLight
        ref={leftPointLightRef}
        color={getHumanLightSettings().leftColor}
        position={getHumanLightSettings().leftPosition}
        intensity={leftLightIntensity}
        distance={8}
        decay={2}
      />

      <pointLight
        ref={rightPointLightRef}
        color={getHumanLightSettings().rightColor}
        position={getHumanLightSettings().rightPosition}
        intensity={rightLightIntensity}
        distance={8}
        decay={2}
      /
    </>
  );
}
