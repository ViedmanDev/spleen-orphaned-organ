import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { JSX, useRef } from 'react';
import * as THREE from 'three';

export function Cysts(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);

  const { nodes } = useGLTF('/organs-models/smh/Spleen.glb');
  const { nodes } = useGLTF("/organs-models/smh/Spleen.glb") as GLTF & {
    nodes: {
      Spleen?: THREE.Mesh;
    };
  };

  const [isHovered, setIsHovered] = useState(false);
  const [currentScale, setCurrentScale] = useState(initialScale);
  const { camera } = useThree();

  // Keyboard control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "+", "-"].includes(e.key)) {
        e.preventDefault();

        setCurrentScale((s) => {
          if (e.key === "ArrowUp" || e.key === "+") return Math.min(s + 0.1, 1);
          if (e.key === "ArrowDown" || e.key === "-")
            return Math.max(s - 0.1, 0.5);
          return s;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animación con useFrame (rotación suave)
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3; // Velocidad controlada
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {nodes.Scene?.children
        .filter((child): child is THREE.Mesh => child instanceof THREE.Mesh && child.name === 'Spleen')
        .map((child) => (
          <mesh
            key={child.uuid}
            castShadow
            receiveShadow
            geometry={child.geometry}
            material={child.material} // Usa el material original del GLB
          />
        ))}
    </group>
  );
}

useGLTF.preload('/organs-models/smh/Spleen.glb');
