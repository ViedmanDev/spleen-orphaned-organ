import { useGLTF } from '@react-three/drei';
import { JSX } from 'react';

function AbdominalTrauma(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/organs-models/jsvr/bazo-imflamado.glb');

    return (
        <group {...props} dispose={null}>
            {nodes.Scene?.children.map((child: any) => (
                child.name === 'BazoImflamado' && (
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

export default AbdominalTrauma;

useGLTF.preload('/organs-models/jsvr/bazo-imflamado.glb');
