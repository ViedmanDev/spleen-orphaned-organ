import { useGLTF } from '@react-three/drei';
import { JSX } from 'react';

function HomeSpleen(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/organs-models/HomeSpleen.glb');
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes as any).mesh_0.geometry}
                material={(nodes as any).mesh_0.material}
            />
        </group>
    );
}

export default HomeSpleen;

useGLTF.preload('/organs-models/HomeSpleen.glb');
