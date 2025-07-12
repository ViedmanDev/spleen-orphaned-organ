/* eslint-disable react/no-unknown-property */
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";

const Floor = () => {
  const PATH = useMemo(() => "/textures/hbvc/floor/rectangle-polished-tile_", []);

  const floorTexture = useTexture({
    map: `${PATH}albedo.png`,
    normalMap: `${PATH}normal-ogl.png`,
    roughnessMap: `${PATH}roughness.png`,
    //displacementMap: `${PATH}height.png`,
    aoMap: `${PATH}ao.png`,
    metalnessMap: `${PATH}metallic.png`,
  });

  return (
    // eslint-disable-next-line react/no-unknown-property
    <mesh rotation-x={-Math.PI / 2} position-y={-1}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial {...floorTexture} />
    </mesh>
  );
};

export default Floor;
