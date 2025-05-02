import { Html } from '@react-three/drei';

const TrombosisInfo = () => (
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
      <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.5rem' }}>
        ¿Qué es la Trombosis Esplénica?
      </h3>
      <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.6 }}>
        Es una obstrucción de la vena esplénica causada por un coágulo de sangre. 
        Puede generar hipertensión portal segmentaria y está asociada a enfermedades 
        como pancreatitis crónica o tumores abdominales.
      </p>
    </div>
  </Html>
);

export default TrombosisInfo;
