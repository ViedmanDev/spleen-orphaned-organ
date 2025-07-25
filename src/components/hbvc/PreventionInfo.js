'use client';

import { Html } from '@react-three/drei';
import { useStore } from './stores/stores';

const PreventionInfo = () => {
  const { togglePrevInfo } = useStore();

  return (
    <Html transform position={[0, 1.5, 0]} distanceFactor={2.5} zIndexRange={[100, 0]}>
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
        <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.5 }}>
          Adopta hábitos saludables como una alimentación balanceada, ejercicio regular e hidratación adecuada.
          Evita sustancias tóxicas y consulta periódicamente a tu médico.
        </p>
      </div>
    </Html>
  );
};

export default PreventionInfo;
