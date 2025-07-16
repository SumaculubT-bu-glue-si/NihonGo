
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
