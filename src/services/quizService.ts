import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db, isDemo } from '../lib/firebase';
import { QuizProgress, UserRanking, QuizAnswer } from '../types/quiz';

// Almacenamiento local para modo demo
const demoData = {
  progress: new Map<string, QuizProgress>(),
  rankings: new Map<string, UserRanking>()
};

export class QuizService {
  // Verificar conexión a Firestore
  static async testConnection() {
    try {
      if (isDemo) {
        console.log('🔧 Modo demo: Conexión simulada');
        return true;
      }
      
      console.log('🔍 Verificando conexión a Firestore...');
      console.log('📋 Configuración actual:', {
        projectId: db.app.options.projectId,
        authDomain: db.app.options.authDomain
      });
      
      // Intentar una operación simple de lectura
      const testRef = doc(db, 'test', 'connection');
      await getDoc(testRef);
      
      console.log('✅ Conexión a Firestore exitosa');
      return true;
    } catch (error) {
      console.error('❌ Error de conexión a Firestore:', error);
      return false;
    }
  }

  // Guardar progreso del quiz
  static async saveQuizProgress(progress: QuizProgress) {
    try {
      if (isDemo) {
        demoData.progress.set(progress.userId, progress);
        console.log('🔧 Demo: Guardando progreso localmente');
        return true;
      }

      // Verificar conexión antes de guardar
      const isConnected = await this.testConnection();
      if (!isConnected) {
        console.warn('⚠️ Sin conexión a Firestore, usando modo local');
        demoData.progress.set(progress.userId, progress);
        return true;
      }
      
      const docRef = doc(db, 'quizProgress', progress.userId);
      await setDoc(docRef, {
        ...progress,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error saving quiz progress:', error);
      return false;
    }
  }

  // Obtener progreso del usuario
  static async getQuizProgress(userId: string): Promise<QuizProgress | null> {
    try {
      if (isDemo) {
        const progress = demoData.progress.get(userId);
        console.log('🔧 Demo: Obteniendo progreso localmente');
        return progress || null;
      }
      
      const docRef = doc(db, 'quizProgress', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          startTime: data.startTime?.toDate() || new Date(),
          endTime: data.endTime?.toDate() || undefined
        } as QuizProgress;
      }
      return null;
    } catch (error) {
      console.error('Error getting quiz progress:', error);
      return null;
    }
  }

  // Completar quiz y actualizar ranking
  static async completeQuiz(userId: string, userName: string, finalScore: number) {
    try {
      if (isDemo) {
        // Actualizar progreso local
        const progress = demoData.progress.get(userId);
        if (progress) {
          progress.completed = true;
          progress.endTime = new Date();
          progress.score = finalScore;
          demoData.progress.set(userId, progress);
        }

        // Actualizar ranking local
        const currentRanking = demoData.rankings.get(userId);
        if (currentRanking) {
          const newCompletedQuizzes = currentRanking.completedQuizzes + 1;
          const newTotalScore = currentRanking.totalScore + finalScore;
          const newAverageScore = newTotalScore / newCompletedQuizzes;
          
          demoData.rankings.set(userId, {
            ...currentRanking,
            totalScore: newTotalScore,
            completedQuizzes: newCompletedQuizzes,
            averageScore: newAverageScore,
            lastQuizDate: new Date()
          });
        } else {
          demoData.rankings.set(userId, {
            userId,
            userName,
            totalScore: finalScore,
            completedQuizzes: 1,
            averageScore: finalScore,
            lastQuizDate: new Date(),
            position: 1 // Será calculado después
          });
        }
        console.log('🔧 Demo: Quiz completado localmente');
        return true;
      }

      // Actualizar progreso como completado
      await updateDoc(doc(db, 'quizProgress', userId), {
        completed: true,
        endTime: serverTimestamp(),
        score: finalScore
      });

      // Actualizar ranking del usuario
      const rankingRef = doc(db, 'rankings', userId);
      const rankingSnap = await getDoc(rankingRef);
      
      if (rankingSnap.exists()) {
        const currentData = rankingSnap.data() as UserRanking;
        const newCompletedQuizzes = currentData.completedQuizzes + 1;
        const newTotalScore = currentData.totalScore + finalScore;
        const newAverageScore = newTotalScore / newCompletedQuizzes;

        await updateDoc(rankingRef, {
          totalScore: newTotalScore,
          completedQuizzes: newCompletedQuizzes,
          averageScore: newAverageScore,
          lastQuizDate: serverTimestamp()
        });
      } else {
        // Crear nuevo registro de ranking
        await setDoc(rankingRef, {
          userId,
          userName,
          totalScore: finalScore,
          completedQuizzes: 1,
          averageScore: finalScore,
          lastQuizDate: serverTimestamp(),
          position: 0 // Se calculará después
        });
      }

      return true;
    } catch (error) {
      console.error('Error completing quiz:', error);
      return false;
    }
  }

  // Obtener ranking global
  static async getGlobalRanking(limitCount: number = 10): Promise<UserRanking[]> {
    try {
      if (isDemo) {
        // Obtener rankings locales y ordenarlos
        const rankings = Array.from(demoData.rankings.values());
        rankings.sort((a, b) => {
          if (b.averageScore !== a.averageScore) {
            return b.averageScore - a.averageScore;
          }
          return b.totalScore - a.totalScore;
        });
        
        // Asignar posiciones y limitar resultados
        const result = rankings.slice(0, limitCount).map((ranking, index) => ({
          ...ranking,
          position: index + 1
        }));
        
        console.log('🔧 Demo: Obteniendo ranking local');
        
        // Si no hay datos, crear algunos de ejemplo
        if (result.length === 0) {
          return [
            {
              userId: 'demo_1',
              userName: 'Usuario Demo',
              totalScore: 85,
              completedQuizzes: 1,
              averageScore: 85,
              lastQuizDate: new Date(),
              position: 1
            }
          ];
        }
        
        return result;
      }
      
      const q = query(
        collection(db, 'rankings'),
        orderBy('averageScore', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const rankings: UserRanking[] = [];
      
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        rankings.push({
          ...data,
          lastQuizDate: data.lastQuizDate?.toDate() || new Date()
        } as UserRanking);
      });

      // Ordenar localmente con desempate por totalScore
      rankings.sort((a, b) => {
        if (b.averageScore !== a.averageScore) {
          return b.averageScore - a.averageScore;
        }
        return b.totalScore - a.totalScore;
      });

      // Asignar posiciones después del ordenamiento
      return rankings.map((ranking, index) => ({
        ...ranking,
        position: index + 1
      }));
    } catch (error) {
      console.error('Error getting global ranking:', error);
      return [];
    }
  }

  // Guardar respuesta individual
  static async saveAnswer(userId: string, answer: QuizAnswer) {
    try {
      const progressRef = doc(db, 'quizProgress', userId);
      const progressSnap = await getDoc(progressRef);
      
      if (progressSnap.exists()) {
        const currentProgress = progressSnap.data() as QuizProgress;
        const updatedAnswers = [...currentProgress.answers, answer];
        
        await updateDoc(progressRef, {
          answers: updatedAnswers,
          currentQuestion: answer.questionId + 1,
          score: updatedAnswers.filter(a => a.isCorrect).length
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error saving answer:', error);
      return false;
    }
  }

  // Resetear progreso del usuario
  static async resetQuizProgress(userId: string) {
    try {
      const docRef = doc(db, 'quizProgress', userId);
      await setDoc(docRef, {
        userId,
        currentQuestion: 0,
        answers: [],
        score: 0,
        totalQuestions: 5,
        startTime: serverTimestamp(),
        completed: false,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error resetting quiz progress:', error);
      return false;
    }
  }
}
