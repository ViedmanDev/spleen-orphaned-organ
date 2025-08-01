import React, { useState, useEffect } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { DropZone } from './DropZone';
import { AnswerBox } from './AnswerBox';
import { Feedback } from './Feedback';
import { QuestionDisplay } from './QuestionDisplay';
import { Medallero3D } from './Medallero3D';
import { useQuiz } from '../../../hooks/useQuiz';

// Definir las preguntas del quiz
const quizQuestions = [
  {
    id: 1,
    question: "¿Cuál es la función principal del bazo?",
    answers: [
      { text: "Producir insulina", isCorrect: false },
      { text: "Filtrar la sangre", isCorrect: true },
      { text: "Digerir alimentos", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "¿Dónde se encuentra ubicado el bazo en el cuerpo humano?",
    answers: [
      { text: "Lado derecho del abdomen", isCorrect: false },
      { text: "Lado izquierdo del abdomen", isCorrect: true },
      { text: "Centro del pecho", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "¿Qué células sanguíneas produce principalmente el bazo?",
    answers: [
      { text: "Glóbulos rojos", isCorrect: false },
      { text: "Linfocitos", isCorrect: true },
      { text: "Plaquetas", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "¿Cuál es una función inmunológica del bazo?",
    answers: [
      { text: "Producir anticuerpos", isCorrect: true },
      { text: "Almacenar oxígeno", isCorrect: false },
      { text: "Regular la temperatura", isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "¿Qué puede causar el agrandamiento del bazo (esplenomegalia)?",
    answers: [
      { text: "Ejercicio excesivo", isCorrect: false },
      { text: "Infecciones o enfermedades de la sangre", isCorrect: true },
      { text: "Consumo de agua", isCorrect: false }
    ]
  }
];

interface Quiz3DSceneProps {
  userId?: string;
  userName?: string;
  userEmail?: string;
}

export function Quiz3DScene({ userId: propUserId, userName: propUserName }: Quiz3DSceneProps = {}) {
  const userId = propUserId || "user123"; // Fallback para compatibilidad
  const userName = propUserName || "Usuario Demo"; // Fallback para compatibilidad
  
  const { progress, rankings, loading, submitAnswer, resetQuiz } = useQuiz(userId, userName);
  
  const [feedback, setFeedback] = useState<string | null>(null);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [showMedallero, setShowMedallero] = useState(false);

  // Activar medallero cuando el quiz se complete
  useEffect(() => {
    if (progress?.completed) {
      setShowMedallero(true);
    } else {
      setShowMedallero(false);
    }
  }, [progress?.completed]);

  // Posiciones iniciales de las cajas
  const initialPositions = {
    box1: [8, 4, 0] as [number, number, number],
    box2: [15, 4, 0] as [number, number, number],
    box3: [10, 6, 0] as [number, number, number]
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ color: 'white', fontSize: '20px' }}>Cargando quiz...</div>
      </div>
    );
  }

  if (!progress) return null;

  const currentQuestion = progress.currentQuestion < quizQuestions.length ? 
    quizQuestions[progress.currentQuestion] : null;
  const startTime = Date.now();

  const handleDrop = async (isCorrect: boolean, selectedAnswer: string) => {
    const timeSpent = Date.now() - startTime;
    
    setQuestionVisible(false);
    setFeedback(isCorrect ? "¡Correcto! 🎉" : "Incorrecto 😔");

    // Guardar respuesta en Firebase
    await submitAnswer(
      progress.currentQuestion, 
      selectedAnswer,
      isCorrect, 
      timeSpent
    );

    setTimeout(() => {
      setFeedback(null);
      if (progress.currentQuestion < quizQuestions.length - 1) {
        setTimeout(() => {
          setQuestionVisible(true);
          setResetKey(prev => prev + 1);
        }, 300);
      } else {
        // Quiz completado, mostrar medallero
        setShowMedallero(true);
      }
    }, 2500);
  };

  if (progress.completed || showMedallero) {
    return (
      <Canvas camera={{ position: [0, 8, 12], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        
        <Physics gravity={[0, -9.81, 0]}>
          <Medallero3D rankings={rankings} currentUserId={userId} />
          
          {/* Suelo */}
          <RigidBody position={[0, -2, 0]} colliders="cuboid" type="fixed">
            <mesh receiveShadow>
              <boxGeometry args={[40, 1, 20]} />
              <meshStandardMaterial color="#e2e8f0" />
            </mesh>
          </RigidBody>
        </Physics>

        {/* Resultados finales */}
        {progress.completed && (
          <Html position={[0, 10, 0]} center>
            <div style={{
              background: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center',
              maxWidth: '400px'
            }}>
              <h2>🎉 ¡Quiz Completado! 🎉</h2>
              <p style={{ fontSize: '20px', margin: '16px 0' }}>
                Puntuación: {progress.score}/{progress.totalQuestions}
              </p>
              <p style={{ fontSize: '16px', color: '#ccc' }}>
                {progress.score === progress.totalQuestions ? '¡Perfecto!' : 
                 progress.score >= progress.totalQuestions * 0.8 ? '¡Excelente!' :
                 progress.score >= progress.totalQuestions * 0.6 ? '¡Bien hecho!' : '¡Sigue practicando!'}
              </p>
              <button 
                onClick={async () => {
                  await resetQuiz();
                  setShowMedallero(false);
                  setQuestionVisible(true);
                  setResetKey(prev => prev + 1);
                }}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '16px'
                }}
              >
                Reintentar Quiz
              </button>
              <button 
                onClick={() => setShowMedallero(false)}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '16px',
                  marginLeft: '12px'
                }}
              >
                Volver al Quiz
              </button>
            </div>
          </Html>
        )}
      </Canvas>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 8, 15], fov: 60 }}
      shadows
      style={{ height: '100vh', width: '100vw' }}
    >

      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 15, 10]} intensity={1} castShadow />

      {/* Pregunta - solo visible cuando no hay feedback */}
      {questionVisible && !feedback && currentQuestion && (
        <QuestionDisplay
          question={currentQuestion.question}
          questionNumber={progress.currentQuestion + 1}
          totalQuestions={quizQuestions.length}
        />
      )}

      <Physics gravity={[0, -9.81, 0]}>
        {/* Suelo invisible más amplio */}
        <RigidBody position={[0, -5, 0]} colliders="cuboid" type="fixed">
          <mesh>
            <boxGeometry args={[40, 1, 20]} />
            <meshStandardMaterial color="transparent" opacity={0} transparent />
          </mesh>
        </RigidBody>

        <DropZone position={[0, 0, 0]} />
        
        {/* Renderizar las respuestas de la pregunta actual */}
        {currentQuestion && currentQuestion.answers.map((answer, index) => (
          <AnswerBox
            key={`box${index + 1}-${resetKey}-${progress.currentQuestion}`}
            position={Object.values(initialPositions)[index] as [number, number, number]}
            answer={answer.text}
            isCorrect={answer.isCorrect}
            onDrop={handleDrop}
          />
        ))}
      </Physics>
      <Feedback feedback={feedback} />
    </Canvas>
  );
}
