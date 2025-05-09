import { useGLTF } from '@react-three/drei';
import { JSX } from 'react';

function Bazoinfarto(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/organs-models/gdtm/bazoinfarto.glb');

    return (
        <group {...props} dispose={null}>
            {nodes.Scene?.children.map((child: any) => (
                child.name === 'bazoinfarto' && (
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

export default Bazoinfarto;

useGLTF.preload('/organs-models/gdtm/bazoinfarto.glb');
