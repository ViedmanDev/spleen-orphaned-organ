import { useGLTF } from '@react-three/drei';
import { JSX } from 'react';

export function Cysts(props: JSX.IntrinsicElements['group']) {
  const { nodes} = useGLTF('/organs-models/smh/Spleen.glb')
  return (
    <group {...props} dispose={null}>
        {nodes.Scene?.children.map((child: any) => (
            child.name === 'Spleen' && (
                <mesh
                    key={child.uuid}
                    castShadow
                    receiveShadow
                    geometry={child.geometry}
                    material={child.material}
                />
            )
        ))}
    </group>
);
}


export default Cysts;

useGLTF.preload('/organs-models/smh/Spleen.glb')

