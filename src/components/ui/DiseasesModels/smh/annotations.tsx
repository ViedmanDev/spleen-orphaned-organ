import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export function CystAnnotation() {
  const { camera } = useThree();
  return (
    <Html
      position={[0.2, 0.4, 0]} // Ajustar según el modelo
      distanceFactor={Math.min(camera.zoom, 2)}
      style={{ pointerEvents: 'none' }}
      
    >
      <div className="annotation">
        <p>Área de acumulación de líquido</p>
      </div>
    </Html>
  );
}