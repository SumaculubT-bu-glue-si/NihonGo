// Database entity types
export interface User {
  id: string;
  email: string;
  display_name: string | null;
  photo_url: string | null;
  password_hash: string;
  role: 'learner' | 'admin';
  created_at: string;
  updated_at: string;
  last_active_at?: string;
  is_active?: boolean;
}

export interface Deck {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: 'Vocabulary' | 'Grammar' | 'Phrases' | 'Kanji';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  created_at: string;
  updated_at: string;
}

export interface Flashcard {
  id: string;
  deck_id: string;
  type: 'vocabulary' | 'grammar' | 'kanji';
  front: string;
  back: string;
  reading: string | null;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: number;
  user_id: string;
  topic: string;
  progress: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface GrammarLesson {
  id: string;
  user_id: string;
  title: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  explanation: string;
  examples: string; // JSON string
  read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  user_id: string;
  title: string;
  category: 'vocabulary' | 'grammar';
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string; // JSON string
  correct_answer: string;
  audio_data_uri: string | null;
  explanation: string | null;
  created_at: string;
  updated_at: string;
}

export interface QuizScore {
  id: number;
  user_id: string;
  quiz_id: string;
  highest_score: number;
  created_at: string;
  updated_at: string;
}

export interface ChallengeProgress {
  id: number;
  user_id: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  unit_id: string;
  stage_id: string;
  status: 'completed' | 'active' | 'locked';
  created_at: string;
  updated_at: string;
}

export interface UserGameStats {
  id: number;
  user_id: string;
  hearts: number;
  diamonds: number;
  current_challenge_level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  created_at: string;
  updated_at: string;
}

export interface GrammarCheckHistory {
  id: number;
  user_id: string;
  original_text: string;
  corrected_text: string;
  corrections: string; // JSON string
  created_at: string;
}

// API request/response types
export interface CreateUserRequest {
  email: string;
  display_name: string;
  password: string;
  photo_url?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  display_name?: string;
  photo_url?: string;
  password?: string;
}

export interface CreateDeckRequest {
  title: string;
  description?: string;
  category: 'Vocabulary' | 'Grammar' | 'Phrases' | 'Kanji';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CreateFlashcardRequest {
  type: 'vocabulary' | 'grammar' | 'kanji';
  front: string;
  back: string;
  reading?: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface CreateQuizRequest {
  title: string;
  category: 'vocabulary' | 'grammar';
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface CreateQuizQuestionRequest {
  question_text: string;
  options: string[];
  correct_answer: string;
  audio_data_uri?: string;
  explanation?: string;
}

export interface UpdateQuizScoreRequest {
  quiz_id: string;
  score: number;
}

export interface UpdateChallengeProgressRequest {
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  unit_id: string;
  stage_id: string;
  status: 'completed' | 'active' | 'locked';
}

export interface UpdateGameStatsRequest {
  hearts?: number;
  diamonds?: number;
  current_challenge_level?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface GrammarCheckRequest {
  text: string;
}

export interface GrammarCheckResponse {
  original_text: string;
  corrected_text: string;
  corrections: Array<{
    original: string;
    corrected: string;
    explanation: string;
  }>;
}

// JWT payload type
export interface JWTPayload {
  userId: string;
  email: string;
  role: 'learner' | 'admin';
  iat: number;
  exp: number;
} 