import React from 'react';
import { Html } from '@react-three/drei';

interface FeedbackProps {
  feedback: string | null;
}

export function Feedback({ feedback }: FeedbackProps) {
  if (!feedback) return null;

  return (
    <Html center position={[-8, 3, 0]}>
      <div style={{ 
        color: feedback === "¡Correcto! 🎉" ? "green" : "red", 
        fontSize: '32px', 
        background: 'white', 
        padding: '20px 30px', 
        borderRadius: '16px',
        border: `4px solid ${feedback === "¡Correcto! 🎉" ? "green" : "red"}`,
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        maxWidth: '300px'
      }}>
        {feedback}
      </div>
    </Html>
  );
}
