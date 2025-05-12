import { Html } from '@react-three/drei';
import { useStore } from './stores/stores';
import { infoTexts } from './stores/infotext';

const TrombosisInfo = () => {
  const { infoIndex } = useStore();
  const info = infoTexts[infoIndex];

  return (
    <Html position={[0, 1.2, 0]} center distanceFactor={5} zIndexRange={[100, 0]}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: '1.5rem',
        borderRadius: '12px',
        color: '#F2D8C2',
        width: '480px',
        maxHeight: '320px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
        justifyContent: 'flex-start',
      }}>
        {info.image && (
          <img
            src={info.image}
            alt={info.title}
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '2px solid #BF7E78',
            }}
          />
        )}
        <div>
          <h3 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.4rem',
            color: '#BF5050',
          }}>{info.title}</h3>
          <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.5 }}>
            {info.content}
          </p>
        </div>
      </div>
    </Html>
  );
};

export default TrombosisInfo;
