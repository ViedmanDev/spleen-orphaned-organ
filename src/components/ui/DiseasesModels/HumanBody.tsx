import { useGLTF } from '@react-three/drei'
import { JSX } from 'react'

function HumanBody(props: JSX.IntrinsicElements['group']) {
    const { nodes } = useGLTF('/organs-models/HumanBody.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes as any).mesh_0.geometry}
                material={(nodes as any).mesh_0.material}
            />
        </group>
    )
}

export default HumanBody

useGLTF.preload('/organs-models/HumanBody.glb')