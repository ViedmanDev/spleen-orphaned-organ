import React from 'react';
import { Html } from '@react-three/drei';

interface QuestionDisplayProps {
    question: string;
    questionNumber?: number;
    totalQuestions?: number;
}

export function QuestionDisplay({ question, questionNumber = 1, totalQuestions }: QuestionDisplayProps) {
    return (
        <Html center position={[-8, 3, 0]}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '20px 30px',
                borderRadius: '15px',
                border: '3px solid #2563eb',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                maxWidth: '350px',
                textAlign: 'center'
            }}>
                <div style={{
                    color: '#2563eb',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                }}>
                    Pregunta {questionNumber}{totalQuestions ? ` de ${totalQuestions}` : ''}
                </div>
                <div style={{
                    color: '#1f2937',
                    fontSize: '20px',
                    fontWeight: '600',
                    lineHeight: '1.4'
                }}>
                    {question}
                </div>
            </div>
        </Html>
    );
}
