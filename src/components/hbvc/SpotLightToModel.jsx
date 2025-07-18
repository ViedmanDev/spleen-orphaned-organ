/* eslint-disable react/no-unknown-property */
// src/components/SpotLightToModel.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
//import { useHelper } from '@react-three/drei';
import {
 // HemisphereLightHelper,
//PointLightHelper,
//SpotLightHelper,
  //DirectionalLightHelper,
  MathUtils,
} from 'three';

const SpotLightToModel = () => {
  const directionalLightRef = useRef();
  //const pointLightRef = useRef();
  const spotLightRef = useRef();
  const hemisphereLightRef = useRef();
  const spotTargetRef = useRef();

  const secondSpotRef = useRef();
  const secondTargetRef = useRef();

  // Helpers visuales (solo durante desarrollo)
//  useHelper(directionalLightRef, DirectionalLightHelper, 1, 'orange');
//  useHelper(spotLightRef, SpotLightHelper, 'red');
//  useHelper(pointLightRef, PointLightHelper, 1, 'cyan');
//  useHelper(hemisphereLightRef, HemisphereLightHelper, 1);
//  useHelper(secondSpotRef, SpotLightHelper, 'white');

  // Movimiento suave de la luz direccional
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (directionalLightRef.current) {
      directionalLightRef.current.position.x = MathUtils.lerp(-2, 2, (Math.cos(t) + 1) / 2);
      directionalLightRef.current.target.updateMatrixWorld();
    }
    if (secondSpotRef.current) {
      secondSpotRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Luz ambiente tenue para mantener atmósfera */}
      <ambientLight color="#222222" intensity={0.3} />

      {/* Luz hemisférica */}
      <hemisphereLight
        ref={hemisphereLightRef}
        args={['#222244', '#000000', 0.2]}
      />

      {/* Reflector sobre el bazo */}
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
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <object3D ref={spotTargetRef} position={[0, 0.8, 0]} />

      {/* Reflector para el segundo modelo */}
      <spotLight
        ref={secondSpotRef}
        color="#F3E6F5"
        position={[0, 3, 0]} // por encima del segundo modelo
        angle={Math.PI / 6}
        castShadow
        distance={10}
        intensity={12}
        penumbra={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        target={secondTargetRef.current}
      />
      <object3D ref={secondTargetRef} position={[2, 0.8, -2]} />
    </>
  );
};

export default SpotLightToModel;
