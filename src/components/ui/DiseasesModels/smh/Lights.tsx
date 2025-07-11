import { useRef, useEffect } from 'react';
import {useThree } from '@react-three/fiber';
import * as THREE from 'three';

type LightsProps = {
  modelType?: 'cyst' | 'human';
  softShadows?: boolean;
  hardShadows?: boolean;
  ambientIntensity?: number;
  directionalIntensity?: number;
  leftLightIntensity?: number;
  rightLightIntensity?: number;
};

export function Lights({
  modelType = 'cyst',
  softShadows = false,
  ambientIntensity = 0.3,
  directionalIntensity = 1.5,
  leftLightIntensity = 0.5,
  rightLightIntensity = 0.5
}: LightsProps) {
  const { gl } = useThree();
  
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const leftPointLightRef = useRef<THREE.PointLight>(null);
  const rightPointLightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = softShadows ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;

    if (directionalLightRef.current) {
      directionalLightRef.current.shadow.mapSize.width = 2048;
      directionalLightRef.current.shadow.mapSize.height = 2048;
      directionalLightRef.current.shadow.camera.near = 0.5;
      directionalLightRef.current.shadow.camera.far = 15;
      directionalLightRef.current.shadow.bias = -0.0001;
    }
  }, [gl, softShadows]);

  // Configuración específica para humanos
  const getHumanLightSettings = () => ({
    leftColor: '#4da6ff',  // Azul suave
    rightColor: '#ff9966', // Naranja suave
    leftPosition: [-5, 2, 2] as [number, number, number],
    rightPosition: [5, 2, 2] as [number, number, number],
    directionalPosition: [0, 8, 4] as [number, number, number] // Diagonal arriba-frente
  });

  return (
    <>
      {/* Luz ambiente base */}
      <ambientLight color="#ffffff" intensity={ambientIntensity} />

      {/* Configuración especial solo para humanos */}
      {modelType === 'human' ? (
        <>
          {/* Luz principal blanca desde arriba-delante */}
          <directionalLight
            ref={directionalLightRef}
            color="#ffffff"
            position={getHumanLightSettings().directionalPosition}
            intensity={directionalIntensity}
            castShadow
          />

          {/* Luz lateral izquierda (azul) */}
          <pointLight
            ref={leftPointLightRef}
            color={getHumanLightSettings().leftColor}
            position={getHumanLightSettings().leftPosition}
            intensity={leftLightIntensity}
            distance={8}
            decay={2}
          />

          {/* Luz lateral derecha (naranja) */}
          <pointLight
            ref={rightPointLightRef}
            color={getHumanLightSettings().rightColor}
            position={getHumanLightSettings().rightPosition}
            intensity={rightLightIntensity}
            distance={8}
            decay={2}
          />
        </>
      ) : (
        // Configuración original para quistes
        <directionalLight
          ref={directionalLightRef}
          color="#ffffff"
          position={[5, 10, 7]}
          intensity={directionalIntensity}
          castShadow
        />
      )}
    </>
  );
}