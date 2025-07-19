import { useGLTF, Text3D, Center } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useStore } from "./stores/stores";
import { useThree, ThreeEvent } from "@react-three/fiber";

type HumanProps = {
  position?: THREE.Vector3 | [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  scale?: number;
  initialScale?: number;
};

const Human = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  initialScale = 1,
}: HumanProps) => {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF("/organs-models/smh/human.glb");
  const { toggleInfo } = useStore();
  const { camera } = useThree();

  const [showInfo, setShowInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentScale, setCurrentScale] = useState(initialScale);

  // Límites de escala
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 1;

  // Controles de teclado (MANTENIDO COMO ESTABA)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "+", "-"].includes(e.key)) {
        e.preventDefault();
        setCurrentScale((s) => {
          if (e.key === "ArrowUp" || e.key === "+")
            return Math.min(s + 0.1, MAX_SCALE);
          if (e.key === "ArrowDown" || e.key === "-")
            return Math.max(s - 0.1, MIN_SCALE);
          return s;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      scale={[scale * currentScale, scale * currentScale, scale * currentScale]}
    >
      <primitive
        object={gltf.scene}
        onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerLeave={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
        onClick={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setShowInfo(!showInfo);
          toggleInfo();
          camera.position.set(0, 0, 5);
          camera.lookAt(0, 0, 0);
        }}
      />

      {/* TEXTO 3D EXACTO COMO EL EJEMPLO QUE PROPORCIONASTE */}
      {showInfo && (
        <group position={[0, 15, 0]}>
          {/* Usamos billboarding para que el texto siempre mire a la cámara */}
          <group
            position={[0, 0, 0]}
            onUpdate={(self) => self.lookAt(camera.position)}
          >
            <Center>
              <Text3D
                font="/fonts/alice.json"
                size={3}
                height={0.1}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.03}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
              >
                VOMITO
                <meshStandardMaterial color="#a63247" />
              </Text3D>
            </Center>
          </group>
        </group>
      )}

      {/* Indicador de hover (MANTENIDO COMO ESTABA) */}
      {isHovered && !showInfo && (
        <mesh position={[0, 7, 0]}>
          <ringGeometry args={[0.8, 0.85, 32]} />
          <meshStandardMaterial
            color="#a63372"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

useGLTF.preload("/organs-models/smh/human.glb");
export default Human;
