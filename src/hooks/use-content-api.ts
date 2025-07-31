import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context-sqlite';

export interface GrammarLesson {
  id: string;
  title: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  explanation: string;
  examples: string[];
  user_read?: boolean;
  completed_at?: string | null;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'vocabulary' | 'grammar';
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  questions?: QuizQuestion[];
  user_highest_score?: number;
  attempts?: number;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  audioDataUri?: string;
  explanation: string;
}

export interface ChallengeItem {
  id: number;
  level: string;
  unit_id: string;
  stage_id: string;
  item_order: number;
  grammar_point: string;
  english_sentence: string;
  correct_japanese: string;
  word_bank: string[];
  hint: string;
  distractors: string[];
}

export interface ChallengeProgress {
  [level: string]: {
    [unitId: string]: {
      [stageId: string]: 'completed' | 'active' | 'locked';
    };
  };
}

export function useContentApi() {
  const { user } = useAuth();
  const [grammarLessons, setGrammarLessons] = useState<GrammarLesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch grammar lessons
  const fetchGrammarLessons = async () => {
    try {
      const response = await apiService.getGrammarLessons();
      if (response.data) {
        setGrammarLessons(response.data.lessons);
      } else {
        setError(response.error || 'Failed to fetch grammar lessons');
      }
    } catch (err) {
      setError('Failed to fetch grammar lessons');
      console.error('Error fetching grammar lessons:', err);
    }
  };

  // Fetch quizzes
  const fetchQuizzes = async () => {
    try {
      const response = await apiService.getQuizzes();
      if (response.data) {
        setQuizzes(response.data.quizzes);
      } else {
        setError(response.error || 'Failed to fetch quizzes');
      }
    } catch (err) {
      setError('Failed to fetch quizzes');
      console.error('Error fetching quizzes:', err);
    }
  };

  // Fetch challenge progress
  const fetchChallengeProgress = async () => {
    try {
      const response = await apiService.getChallengeProgress();
      if (response.data) {
        setChallengeProgress(response.data.progress);
      } else {
        setError(response.error || 'Failed to fetch challenge progress');
      }
    } catch (err) {
      setError('Failed to fetch challenge progress');
      console.error('Error fetching challenge progress:', err);
    }
  };

  // Mark grammar lesson as read
  const markGrammarLessonAsRead = async (lessonId: string) => {
    try {
      const response = await apiService.markGrammarLessonAsRead(lessonId);
      if (response.data) {
        // Update local state
        setGrammarLessons(prev => 
          prev.map(lesson => 
            lesson.id === lessonId 
              ? { ...lesson, user_read: true, completed_at: new Date().toISOString() }
              : lesson
          )
        );
        return true;
      } else {
        setError(response.error || 'Failed to mark lesson as read');
        return false;
      }
    } catch (err) {
      setError('Failed to mark lesson as read');
      console.error('Error marking lesson as read:', err);
      return false;
    }
  };

  // Submit quiz score
  const submitQuizScore = async (quizId: string, score: number) => {
    try {
      const response = await apiService.submitQuizScore(quizId, score);
      if (response.data) {
        // Update local state
        setQuizzes(prev => 
          prev.map(quiz => 
            quiz.id === quizId 
              ? { 
                  ...quiz, 
                  user_highest_score: Math.max(quiz.user_highest_score || 0, score),
                  attempts: (quiz.attempts || 0) + 1
                }
              : quiz
          )
        );
        return true;
      } else {
        setError(response.error || 'Failed to submit quiz score');
        return false;
      }
    } catch (err) {
      setError('Failed to submit quiz score');
      console.error('Error submitting quiz score:', err);
      return false;
    }
  };

  // Update challenge progress
  const updateChallengeProgress = async (
    level: string, 
    unitId: string, 
    stageId: string, 
    status: 'completed' | 'active' | 'locked'
  ) => {
    try {
      const response = await apiService.updateChallengeProgress(level, unitId, stageId, status);
      if (response.data) {
        // Update local state
        setChallengeProgress(prev => ({
          ...prev,
          [level]: {
            ...prev[level],
            [unitId]: {
              ...prev[level]?.[unitId],
              [stageId]: status
            }
          }
        }));
        return true;
      } else {
        setError(response.error || 'Failed to update challenge progress');
        return false;
      }
    } catch (err) {
      setError('Failed to update challenge progress');
      console.error('Error updating challenge progress:', err);
      return false;
    }
  };

  // Get specific quiz with questions
  const getQuizWithQuestions = async (quizId: string): Promise<Quiz | null> => {
    try {
      const response = await apiService.getQuiz(quizId);
      if (response.data) {
        return response.data.quiz;
      } else {
        setError(response.error || 'Failed to fetch quiz');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch quiz');
      console.error('Error fetching quiz:', err);
      return null;
    }
  };

  // Get specific grammar lesson
  const getGrammarLesson = async (lessonId: string): Promise<GrammarLesson | null> => {
    try {
      const response = await apiService.getGrammarLesson(lessonId);
      if (response.data) {
        return response.data.lesson;
      } else {
        setError(response.error || 'Failed to fetch grammar lesson');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch grammar lesson');
      console.error('Error fetching grammar lesson:', err);
      return null;
    }
  };

  // Get challenge items for a specific stage
  const getChallengeItems = async (
    level: string, 
    unitId: string, 
    stageId: string
  ): Promise<ChallengeItem[] | null> => {
    try {
      const response = await apiService.getChallengeItems(level, unitId, stageId);
      if (response.data) {
        return response.data.items;
      } else {
        setError(response.error || 'Failed to fetch challenge items');
        return null;
      }
    } catch (err) {
      setError('Failed to fetch challenge items');
      console.error('Error fetching challenge items:', err);
      return null;
    }
  };

  // Load all content on mount
  useEffect(() => {
    if (user) {
      setLoading(true);
      setError(null);
      
      Promise.all([
        fetchGrammarLessons(),
        fetchQuizzes(),
        fetchChallengeProgress()
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  return {
    grammarLessons,
    quizzes,
    challengeProgress,
    loading,
    error,
    markGrammarLessonAsRead,
    submitQuizScore,
    updateChallengeProgress,
    getQuizWithQuestions,
    getGrammarLesson,
    getChallengeItems,
    refetch: () => {
      setLoading(true);
      Promise.all([
        fetchGrammarLessons(),
        fetchQuizzes(),
        fetchChallengeProgress()
      ]).finally(() => {
        setLoading(false);
      });
    }
  };
} 