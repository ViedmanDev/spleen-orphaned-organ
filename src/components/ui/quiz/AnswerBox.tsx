import React, { useRef, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Html } from '@react-three/drei';

interface AnswerBoxProps {
  position: [number, number, number];
  answer: string;
  isCorrect: boolean;
  onDrop: (isCorrect: boolean, selectedAnswer: string) => void;
}

export function AnswerBox({ position, answer, isCorrect, onDrop }: AnswerBoxProps) {
  const ref = useRef<any>(null);
  const [currentPos, setCurrentPos] = useState(position);
  const [isOverDropZone, setIsOverDropZone] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);

  // Drop zone simple - centro en [0, 0.65, 0]
  const isInDropZone = (pos: [number, number, number]) => {
    const [x, y, z] = pos;
    return (
      Math.abs(x - 0) < 2 &&
      Math.abs(y - 0.65) < 1 &&
      Math.abs(z - 0) < 2
    );
  };

  const handleClick = () => {
    if (!isDraggable || !ref.current) return;

    // Si está en la drop zone, hacer drop
    if (isInDropZone(currentPos)) {
      setIsDraggable(false);
      ref.current.setTranslation({ x: 0, y: 0.65, z: 0 }, true);
      ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      setTimeout(() => onDrop(isCorrect, answer), 100);
      return;
    }

    // Alternar entre posición original y drop zone
    const newPos: [number, number, number] =
      currentPos[0] === position[0] && currentPos[1] === position[1] && currentPos[2] === position[2]
        ? [0, 0.65, 0] // Mover a drop zone
        : position; // Volver a posición original

    setCurrentPos(newPos);
    setIsOverDropZone(isInDropZone(newPos));

    if (ref.current) {
      ref.current.setTranslation({ x: newPos[0], y: newPos[1], z: newPos[2] }, true);
      ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      ref.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  return (
    <RigidBody
      ref={ref}
      position={currentPos}
      colliders="cuboid"
      type="dynamic"
      restitution={0.1}
      friction={0.7}
      linearDamping={0.5}
      angularDamping={0.5}
      canSleep={false}
    >
      {/* Caja visual */}
      <mesh
        castShadow
        onClick={handleClick}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color={
            !isDraggable ? "gray" :
              isOverDropZone ? "#00ff00" :
                "#3b82f6"
          }
          opacity={isDraggable ? 1 : 0.7}
          transparent={!isDraggable}
          emissive={isOverDropZone ? "#004400" : "#000000"}
          emissiveIntensity={isOverDropZone ? 0.3 : 0}
        />
      </mesh>

      {/* Texto de la respuesta */}
      <Html position={[0, 0, 0.8]} center>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            maxWidth: '120px',
            wordWrap: 'break-word',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            userSelect: 'none',
            pointerEvents: 'auto'
          }}
        >
          {answer}
        </div>
      </Html>
    </RigidBody>
  );
}
