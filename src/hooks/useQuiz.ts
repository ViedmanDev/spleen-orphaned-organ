import { useState, useEffect, useCallback } from 'react';
import { QuizService } from '../services/quizService';
import { QuizProgress, UserRanking } from '../types/quiz';

export function useQuiz(userId: string, userName: string) {
  const [progress, setProgress] = useState<QuizProgress | null>(null);
  const [rankings, setRankings] = useState<UserRanking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQuizData = useCallback(async () => {
    setLoading(true);
    try {
      // Cargar progreso existente
      const existingProgress = await QuizService.getQuizProgress(userId);
      
      if (existingProgress) {
        // Cargar progreso existente (completado o no)
        setProgress(existingProgress);
      } else {
        // Iniciar nuevo quiz solo si no hay progreso existente
        const newProgress: QuizProgress = {
          userId,
          userName,
          currentQuestion: 0,
          answers: [],
          score: 0,
          totalQuestions: 5,
          startTime: new Date(),
          completed: false
        };
        setProgress(newProgress);
        await QuizService.saveQuizProgress(newProgress);
      }

      // Cargar rankings
      const currentRankings = await QuizService.getGlobalRanking(10);
      setRankings(currentRankings);
    } catch (error) {
      console.error('Error loading quiz data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, userName]);

  useEffect(() => {
    loadQuizData();
  }, [loadQuizData]);

  const submitAnswer = async (questionId: number, selectedAnswer: string, isCorrect: boolean, timeSpent: number) => {
    if (!progress) return;

    const answer = {
      questionId,
      selectedAnswer,
      isCorrect,
      timeSpent
    };

    await QuizService.saveAnswer(userId, answer);
    
    // Actualizar estado local
    const updatedAnswers = [...progress.answers, answer];
    const newScore = updatedAnswers.filter(a => a.isCorrect).length;
    const isLastQuestion = questionId === progress.totalQuestions - 1;
    
    if (isLastQuestion) {
      // Si es la última pregunta, completar quiz en una sola actualización
      await QuizService.completeQuiz(userId, userName, newScore);
      setProgress(prev => prev ? {
        ...prev,
        answers: updatedAnswers,
        currentQuestion: questionId + 1,
        score: newScore,
        completed: true,
        endTime: new Date()
      } : null);
      
      // Recargar rankings
      const updatedRankings = await QuizService.getGlobalRanking(10);
      setRankings(updatedRankings);
    } else {
      // Pregunta normal, continuar
      setProgress(prev => prev ? {
        ...prev,
        answers: updatedAnswers,
        currentQuestion: questionId + 1,
        score: newScore
      } : null);
    }
  };

  const resetQuiz = async () => {
    const newProgress: QuizProgress = {
      userId,
      userName,
      currentQuestion: 0,
      answers: [],
      score: 0,
      totalQuestions: 5,
      startTime: new Date(),
      completed: false
    };
    
    setProgress(newProgress);
    await QuizService.saveQuizProgress(newProgress);
  };

  return {
    progress,
    rankings,
    loading,
    submitAnswer,
    resetQuiz
  };
}
