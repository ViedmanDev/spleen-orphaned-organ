import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useStore } from "./stores/stores";
import { ThreeEvent } from "@react-three/fiber";

type CystsProps = {
  rotationSpeed?: number;
  position?: THREE.Vector3 | [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  scale?: number;
  initialScale?: number;
};

export function Cysts({
  rotationSpeed = 0.3,
  scale = 1,
  initialScale = 1,
  ...props
}: CystsProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF("/organs-models/smh/Spleen.glb") as GLTF & {
    nodes: {
      Spleen?: THREE.Mesh;
    };
  };
  const { activeModel, setActiveModel } = useStore();
  const { camera } = useThree();

  const [isHovered, setIsHovered] = useState(false);
  const [currentScale, setCurrentScale] = useState(initialScale);
  const [isActive, setIsActive] = useState(false);

  // Controles de teclado solo cuando este modelo está activo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;

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
  }, [isActive]);

  // Sincronizar estado activo con el store
  useEffect(() => {
    setIsActive(activeModel === "cysts");
  }, [activeModel]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * rotationSpeed * (isHovered ? 2 : 1);
      group.current.scale.set(
        scale * currentScale,
        scale * currentScale,
        scale * currentScale
      );
    }
  });

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setActiveModel("cysts");
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
  };

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  return (
    <group
      ref={group}
      {...props}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {nodes.Spleen && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Spleen.geometry}
          material={nodes.Spleen.material}
        >
          <Html
            position={[0, 0.4, 0]}
            center
            distanceFactor={8}
            style={{
              background: isActive
                ? "rgba(255, 200, 200, 0.9)"
                : "rgba(242, 216, 194, 0.85)",
              color: "#a63372",
              padding: "2px",
              borderRadius: "2px",
              pointerEvents: "none",
              opacity: isHovered ? 1 : 0,
              transition: "all 0.5s ease",
              width: "200px",
              textAlign: "center",
              fontFamily: '"Arial", sans-serif',
              fontSize: "0.4rem",
              lineHeight: "1.5",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(5px)",
            }}
          >
            <h3
              style={{ marginTop: 0, marginBottom: "2px", fontSize: "0.5rem" }}
            >
              ¿Sabías qué?
            </h3>
            <p style={{ margin: 0 }}>
              Los quistes esplénicos pequeños suelen ser asintomáticos y se
              descubren accidentalmente en estudios de imagen.
            </p>
          </Html>
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/organs-models/smh/Spleen.glb");
