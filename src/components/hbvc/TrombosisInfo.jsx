import { Html } from '@react-three/drei';
import { useStore } from './stores/stores';
import { infoTexts } from './stores/infotext';

const TrombosisInfo = () => {
  const { infoIndex } = useStore();
  const info = infoTexts[infoIndex];

  return (
    <Html position={[0, 1.2, 0]} center distanceFactor={5} zIndexRange={[100, 0]}>
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: '1.5rem',
        borderRadius: '10px',
        color: 'white',
        width: '480px',
        height: '270px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
      }}>
        <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.5rem', color: '#BF5050' }}>
          {info.title}
        </h3>
        <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.6 }}>
          {info.content}
        </p>
      </div>
    </Html>
  );
};

export default TrombosisInfo;
