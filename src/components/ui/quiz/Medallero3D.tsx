import React from 'react';
import { Html } from '@react-three/drei';
import { UserRanking } from '../../../types/quiz';

interface Medallero3DProps {
  rankings: UserRanking[];
  currentUserId: string;
}

export function Medallero3D({ rankings, currentUserId }: Medallero3DProps) {
  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return '#FFD700'; // Oro
      case 2: return '#C0C0C0'; // Plata
      case 3: return '#CD7F32'; // Bronce
      default: return '#4A5568'; // Gris
    }
  };

  const getMedalHeight = (position: number) => {
    switch (position) {
      case 1: return 3;
      case 2: return 2.5;
      case 3: return 2;
      default: return 1.5;
    }
  };

  return (
    <group position={[0, 0, -5]}>
      {rankings.slice(0, 10).map((user, index) => {
        const position = index + 1;
        const angle = (index * Math.PI * 2) / Math.min(rankings.length, 8);
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = getMedalHeight(position);
        const isCurrentUser = user.userId === currentUserId;

        return (
          <group key={user.userId} position={[x, height / 2, z]}>
            {/* Podio */}
            <mesh>
              <cylinderGeometry args={[0.8, 0.8, height, 8]} />
              <meshStandardMaterial 
                color={getMedalColor(position)}
                emissive={isCurrentUser ? "#222" : "#000"}
                emissiveIntensity={isCurrentUser ? 0.3 : 0}
              />
            </mesh>
            
            {/* Medalla */}
            <mesh position={[0, height / 2 + 0.5, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
              <meshStandardMaterial 
                color={getMedalColor(position)}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Información del usuario */}
            <Html position={[0, height + 1, 0]} center>
              <div style={{
                background: isCurrentUser ? 'rgba(0, 255, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                padding: '8px 12px',
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '120px',
                border: isCurrentUser ? '2px solid #00ff00' : 'none'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  #{position}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {user.userName}
                </div>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  {user.averageScore.toFixed(1)} pts
                </div>
                <div style={{ fontSize: '10px', color: '#aaa' }}>
                  {user.completedQuizzes} quizzes
                </div>
              </div>
            </Html>
          </group>
        );
      })}
      
      {/* Título del medallero */}
      <Html position={[0, 6, 0]} center>
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          🏆 Medallero Global 🏆
        </div>
      </Html>
    </group>
  );
}
