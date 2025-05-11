import { Center, Text3D } from '@react-three/drei';

const TextTitle3D = () => {
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
        Trombosis Esplenica
        <meshStandardMaterial color="crimson" />
      </Text3D>
    </Center>
  );
};

export default TextTitle3D;
