'use client';

import { Html } from '@react-three/drei';
import { useStore } from '../stores/stores';

const TreatmentInfo = () => {
  const { infoIndex } = useStore();
  
  const treatmentTexts = [
    {
      title: "Anticoagulación",
      content: "Tratamiento inicial con heparina seguida de anticoagulantes orales durante 3-6 meses para prevenir la extensión del coágulo.",
      image: "/images/hbvc/anticoagulacion.jpg"
    },
    {
      title: "Control Radiológico",
      content: "Ecografía Doppler periódica para monitorizar la resolución del trombo y evaluar complicaciones como hipertensión portal.",
      image: "/images/hbvc/ecografia.jpg"
    },
    {
      title: "Manejo de Complicaciones",
      content: "En casos de infarto esplénico o abscesos, puede requerirse drenaje percutáneo o intervención quirúrgica.",
      image: "/images/hbvc/cirugia.jpg"
    },
    {
      title: "Esplenectomía",
      content: "Reservada para casos graves con ruptura esplénica, hemorragia incontrolable o fallo del tratamiento médico.",
      image: "/images/hbvc/esplenectomia.jpg"
    }
  ];

  const info = treatmentTexts[infoIndex] || treatmentTexts[0];

  return (
    <Html
      transform
      position={[0, 1.5, 0]}
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
              border: '2px solid #BF7E78'
            }}
          />
        )}
        <h3 style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1.4rem',
          color: '#BF5050'
        }}>{info.title}</h3>
        <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.5 }}>
          {info.content}
        </p>
      </div>
    </Html>
  );
};

export default TreatmentInfo;