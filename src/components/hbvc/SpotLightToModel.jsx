/* eslint-disable react/no-unknown-property */
// src/components/SpotLightToModel.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';

import {
  HemisphereLightHelper,
  PointLightHelper,
  SpotLightHelper,
  DirectionalLightHelper,
  MathUtils,
} from 'three';

const SpotLightToModel = () => {
  const directionalLightRef = useRef();
  const pointLightRef = useRef();
  const spotLightRef = useRef();
  const hemisphereLightRef = useRef();
  const spotTargetRef = useRef();

  // Helpers visuales para desarrollo
  /*useHelper(directionalLightRef, DirectionalLightHelper, 1, 'orange');
  useHelper(spotLightRef, SpotLightHelper, 'red');
  useHelper(pointLightRef, PointLightHelper, 1, 'cyan');
  useHelper(hemisphereLightRef, HemisphereLightHelper, 1);*/

  // Movimiento suave de luz direccional
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (directionalLightRef.current) {
      directionalLightRef.current.position.x = MathUtils.lerp(-2, 2, (Math.cos(t) + 1) / 2);
      directionalLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Luz ambiente tenue para mantener el ambiente oscuro */}
      <ambientLight color="#222222" intensity={0.3} />

      {/* Luz hemisférica opcional para leve ambientación */}
      <hemisphereLight
        ref={hemisphereLightRef}
        args={['#222244', '#000000', 0.2]} // skyColor, groundColor, intensity
      />

      {/* Luz direccional muy suave */}
      <directionalLight
        ref={directionalLightRef}
        color="white"
        position={[0, 5, 5]}
        intensity={0.3}
        castShadow
      />

      {/* Luz puntual decorativa (opcional, tenue) */}
      <pointLight
        ref={pointLightRef}
        color="cyan"
        position={[1, 2, -2]}
        intensity={0.3}
      />

      {/* Reflector fuerte sobre el bazo */}
      <spotLight
        ref={spotLightRef}
        color="#F3E6F5"
        position={[0, 2, 0]}
        target={spotTargetRef.current}
        angle={Math.PI / 6}
        distance={10}
        intensity={12}
        penumbra={0.5}
        castShadow
      />
      {/* Punto invisible hacia donde apunta el reflector */}
      <object3D ref={spotTargetRef} position={[0, 0.8, 0]} />
    </>
  );
};

export default SpotLightToModel;
