"use client";

import {
  useGLTF,
  Text3D,
  Center,
  PositionalAudio,
  Html,
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useStore } from "./stores/stores";
import { useThree } from "@react-three/fiber";
import { Play, Pause, Volume2 } from "lucide-react";
import smhStyles from "@styles/Smh/smh.module.css";

type UltraSoundProps = {
  position?: THREE.Vector3 | [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  scale?: number;
  initialScale?: number;
};

const UltraSound = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  initialScale = 1,
}: UltraSoundProps) => {
  const group = useRef<THREE.Group>(null);
  const audioRef = useRef<THREE.PositionalAudio>(null);
  const gltf = useGLTF("/organs-models/smh/ultra-sound-machine.glb");
  const {
    activeModel,
    setActiveModel,
    toggleInfo,
    isAudioPlaying,
    toggleAudio,
    audioVolume,
  } = useStore();
  const { camera } = useThree();

  const [showInfo, setShowInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentScale, setCurrentScale] = useState(initialScale);
  const [isActive, setIsActive] = useState(false);
  const [showAudioControls, setShowAudioControls] = useState(false);

  // Límites de escala
  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  // Controles de teclado
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

      // Barra espaciadora para play/pause
      if (e.key === " ") {
        e.preventDefault();
        toggleAudio();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, toggleAudio]);

  // Sincronizar estado activo
  useEffect(() => {
    setIsActive(activeModel === "ultrasound");
    setShowAudioControls(activeModel === "ultrasound");
  }, [activeModel]);

  // Control del audio
  useEffect(() => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      audioRef.current.setVolume(audioVolume);
    }
  }, [isAudioPlaying, audioVolume]);

  // Configurar sombras
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setActiveModel("ultrasound");
    setShowInfo(!showInfo);
    toggleInfo();
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
  };

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleAudio();
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
        onPointerEnter={(e: any) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerLeave={(e: any) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
        onClick={handleClick}
      />

      <PositionalAudio
        ref={audioRef}
        url="/organs-models/smh/Sound/TableS.mp3"
        distance={10}
        loop
        autoplay={false}
      />

      {showAudioControls && (
        <Html
          position={[0.7, 1.1, 0]}
          center
          distanceFactor={2}
          style={{ pointerEvents: "auto" }}
          className={smhStyles.audioControlsContainer}
        >
          <div className={smhStyles.audioControls}>
            <button
              onClick={handleAudioToggle}
              className={`${smhStyles.audioButton} ${
                isAudioPlaying ? smhStyles.audioButtonActive : ""
              }`}
              title={isAudioPlaying ? "Pausar audio" : "Reproducir audio"}
            >
              {isAudioPlaying ? (
                <Pause className={smhStyles.audioIcon} />
              ) : (
                <Play className={smhStyles.audioIcon} />
              )}
            </button>
            <Volume2 className={smhStyles.volumeIcon} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={audioVolume}
              onChange={(e) =>
                useStore.getState().setAudioVolume(parseFloat(e.target.value))
              }
              className={smhStyles.volumeSlider}
              title="Volumen del audio"
            />
            <span className={smhStyles.volumePercentage}>
              {Math.round(audioVolume * 100)}%
            </span>
          </div>
        </Html>
      )}

      {showInfo && (
        <group position={[0, 1.3, 0]}>
          <group
            position={[0, 0, 0]}
            onUpdate={(self: any) => self.lookAt(camera.position)}
          >
            <Center>
              <Text3D
                font="/fonts/alice.json"
                size={0.2}
                height={0.05}
                curveSegments={8}
                bevelEnabled
                bevelThickness={0.03}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
              >
                EQUIPO DE ULTRASONIDO
                <meshStandardMaterial
                  color={isActive ? "#ff0000" : "#a63247"}
                />
              </Text3D>
            </Center>
          </group>
        </group>
      )}

      {isHovered && !showInfo && (
        <mesh position={[0, 2, 0]}>
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

useGLTF.preload("/organs-models/smh/ultra-sound-machine.glb");
export default UltraSound;
