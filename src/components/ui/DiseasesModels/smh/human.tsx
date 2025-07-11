import { useGLTF } from "@react-three/drei";
// import { useFrame } from '@react-three/fiber';
import { JSX, useRef } from "react";
import * as THREE from "three";
import {} from "@react-three/drei";
import { useEffect } from "react";
import { useStore } from "./stores/stores";

const Human = ({ object, ...props }: JSX.IntrinsicElements["primitive"]) => {
  const gltf = useGLTF("/organs-models/smh/Human.glb");
  const modelRef = useRef<THREE.Object3D>(null);
  const { toggleInfo } = useStore();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.userData.interactive = true;
      }
    });
  }, [gltf]);

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      {...props}
      onClick={(e: import("@react-three/fiber").ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        toggleInfo();
      }}
    />
  );
};

export default Human;
