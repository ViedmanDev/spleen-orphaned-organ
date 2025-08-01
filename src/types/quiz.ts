export interface QuizProgress {
    userId: string;
    userName: string;
    currentQuestion: number;
    answers: QuizAnswer[];
    score: number;
    totalQuestions: number;
    startTime: Date;
    endTime?: Date;
    completed: boolean;
}

export interface QuizAnswer {
    questionId: number;
    selectedAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
}

export interface UserRanking {
    userId: string;
    userName: string;
    totalScore: number;
    completedQuizzes: number;
    averageScore: number;
    lastQuizDate: Date;
    position: number;
}

export interface Medal {
    type: 'gold' | 'silver' | 'bronze';
    position: number;
    score: number;
}

export interface QuizQuestion {
    id: number;
    question: string;
    answers: {
        text: string;
        isCorrect: boolean;
    }[];
}
