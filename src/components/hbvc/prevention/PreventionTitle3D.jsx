import { Center, Text3D } from '@react-three/drei';

const PreventionTitle3D = () => {
  return (
    <Center position={[0, 2, -2]}> {/* Ajusta la posición según necesidad */}
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
        Prevención
        <meshStandardMaterial color="#BF5050" /> {/* Mismo color que en Trombosis */}
      </Text3D>
    </Center>
  );
};

export default PreventionTitle3D;