'use client';

import { Center, Text3D } from '@react-three/drei';

const TreatmentTitle3D = () => {
  return (
    <Center position={[0, 2, 0]}>
      <Text3D
        font="/fonts/alice.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        Tratamientos
        <meshStandardMaterial color="#A63247" />
      </Text3D>
    </Center>
  );
};

export default TreatmentTitle3D;