

export interface Flashcard {
  id: string;
  type: 'vocabulary' | 'grammar' | 'kanji';
  front: string; // Japanese
  back: string; // English
  reading?: string; // Furigana/reading
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  category: 'Vocabulary' | 'Grammar' | 'Phrases' | 'Kanji';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  cards: Flashcard[];
}

export interface StatsData {
  topic: string;
  progress: number; // Number of mastered cards
  total: number;
}

export interface GrammarLesson {
    id: string;
    title: string;
    level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
    explanation: string;
    examples: string[];
    read: boolean;
}

export interface QuizQuestion {
  id:string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  audioDataUri?: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'vocabulary' | 'grammar';
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  questions: QuizQuestion[];
}

export interface QuizScore {
  quizId: string;
  highestScore: number; // Stored as a percentage (0-100)
}

// New Challenge Data Structure
export interface ChallengeItem {
  id: number;
  grammar_point: string;
  english_sentence: string;
  correct_japanese: string;
  word_bank: string[];
  hint: string;
  distractors: string[];
}

export interface Stage {
    // This can be expanded with stage-specific metadata if needed
}

export interface Unit {
    [stageId: string]: Stage[];
}

export interface ChallengeData {
    [level: string]: {
        [unitId: string]: Unit;
    }
}


export interface ChallengeProgress {
  [level: string]: {
    [unitId: string]: {
      [stageId: string]: 'completed' | 'active' | 'locked';
    }
  }
}
