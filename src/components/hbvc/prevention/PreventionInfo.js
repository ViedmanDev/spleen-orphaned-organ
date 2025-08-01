'use client';
import { Html } from '@react-three/drei';
import { useStore } from '../stores/stores';

const PreventionInfo = () => {
  const { togglePrevInfo } = useStore();

  return (
    <Html transform position={[0, 0.5, 0]} distanceFactor={2.5} zIndexRange={[100, 0]}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: '1.5rem',
        borderRadius: '12px',
        color: '#F2D8C2',
        width: '480px',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <button 
          onClick={togglePrevInfo}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            background: 'transparent',
            border: 'none',
            color: '#BF5050',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', color: '#BF5050' }}>
          Prevención y cuidados
        </h3>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li><strong>Dieta:</strong> Rica en fibra y antioxidantes.</li>
          <li><strong>Ejercicio:</strong> 30 minutos diarios.</li>
          <li><strong>Hidratación:</strong> 2L de agua al día.</li>
          <li><strong>Evita:</strong> Tabaco y alcohol excesivo.</li>
        </ul>
      </div>
    </Html>
  );
};

export default PreventionInfo;