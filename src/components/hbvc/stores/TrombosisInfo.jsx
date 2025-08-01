import { Html } from '@react-three/drei';
import { useStore } from './stores';
import { infoTexts } from './infotext';

const TrombosisInfo = () => {
  const { tInfoIndex, infoPosition } = useStore(); // Cambiado a tInfoIndex
  
  // Seleccionar el texto de info o usar el primero como fallback
  const info = infoTexts[tInfoIndex] || infoTexts[0];

  return (
    <Html
      transform
      position={infoPosition}
      distanceFactor={2.5}
      zIndexRange={[100, 0]}
    >
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: '1.5rem',
        borderRadius: '12px',
        color: '#F2D8C2',
        width: '480px',
        height: 'auto',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
      }}>
        {/* Verificación segura de la imagen */}
        {info?.image && (
          <img
            src={info.image}
            alt={info.title || 'Imagen descriptiva'}
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '2px solid #BF7E78'
            }}
          />
        )}
        <h3 style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1.4rem',
          color: '#BF5050'
        }}>{info?.title || 'Información'}</h3>
        <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.5 }}>
          {info?.content || 'Contenido no disponible'}
        </p>
      </div>
    </Html>
  );
};

export default TrombosisInfo;