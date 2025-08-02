import { useGLTF, Html } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useStore } from "./stores/stores";
import { useThree, ThreeEvent } from "@react-three/fiber";

type TableProps = {
  position?: THREE.Vector3 | [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  scale?: number;
  initialScale?: number;
};

const OperatingTable = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  initialScale = 1,
}: TableProps) => {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF("/organs-models/smh/operating-table.glb");
  const { activeModel, setActiveModel } = useStore();
  const { camera } = useThree();

  const [isHovered, setIsHovered] = useState(false);
  const [currentScale, setCurrentScale] = useState(initialScale);
  const [isActive, setIsActive] = useState(false);

  // Límites de escala
  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  // Controles de teclado solo cuando este modelo está activo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;

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
  }, [isActive]);

  // Sincronizar estado activo con el store
  useEffect(() => {
    setIsActive(activeModel === "operatingTable");
  }, [activeModel]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setActiveModel("operatingTable");
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
      position={position}
      rotation={rotation}
      scale={[scale * currentScale, scale * currentScale, scale * currentScale]}
    >
      <primitive
        object={gltf.scene}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <Html
          position={[1, 0.5, 0]}
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
          <h3 style={{ marginTop: 0, marginBottom: "8px", fontSize: "1rem" }}>
            ¿Sabías qué?
          </h3>
          <p style={{ margin: 0 }}>
            La duración de una operación de extracción de quistes En general, puede durar desde 30 minutos hasta varias horas, dependiendo de la complejidad del caso y la ubicación del quiste.
          </p>
        </Html>
      </primitive>

      {/* Indicador de hover */}
      {isHovered && (
        <mesh position={[0, -1, 0]}>
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

useGLTF.preload("/organs-models/smh/operating-table.glb");
export default OperatingTable;
