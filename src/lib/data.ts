export interface Flashcard {
  id: string;
  type: 'vocabulary' | 'grammar';
  front: string; // Japanese
  back: string; // English
  reading?: string; // Furigana/reading
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  category: 'Vocabulary' | 'Grammar' | 'Phrases';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  cards: Flashcard[];
}

export const decks: Deck[] = [
  {
    id: 'n5-vocabulary',
    title: 'JLPT N5 Vocabulary',
    description: 'Master the essential vocabulary for the JLPT N5 exam.',
    category: 'Vocabulary',
    level: 'Beginner',
    cards: [
      { id: 'n5-1', type: 'vocabulary', front: '私', back: 'I, me', reading: 'わたし', level: 'N5' },
      { id: 'n5-2', type: 'vocabulary', front: '学校', back: 'School', reading: 'がっこう', level: 'N5' },
      { id: 'n5-3', type: 'vocabulary', front: '食べる', back: 'To eat', reading: 'たべる', level: 'N5' },
      { id: 'n5-4', type: 'vocabulary', front: '飲む', back: 'To drink', reading: 'のむ', level: 'N5' },
      { id: 'n5-5', type: 'vocabulary', front: '大きい', back: 'Big', reading: 'おおきい', level: 'N5' },
    ],
  },
  {
    id: 'common-phrases',
    title: 'Common Daily Phrases',
    description: 'Useful phrases for everyday conversations in Japan.',
    category: 'Phrases',
    level: 'Beginner',
    cards: [
      { id: 'cp-1', type: 'vocabulary', front: 'おはようございます', back: 'Good morning', reading: 'ohayou gozaimasu', level: 'N5' },
      { id: 'cp-2', type: 'vocabulary', front: 'ありがとうございます', back: 'Thank you', reading: 'arigatou gozaimasu', level: 'N5' },
      { id: 'cp-3', type: 'vocabulary', front: 'すみません', back: 'Excuse me / Sorry', reading: 'sumimasen', level: 'N5' },
    ],
  },
  {
    id: 'n4-grammar',
    title: 'JLPT N4 Grammar',
    description: 'Key grammar points for the JLPT N4 level.',
    category: 'Grammar',
    level: 'Intermediate',
    cards: [
      { id: 'n4-g-1', type: 'grammar', front: '～ことができる', back: 'Can do ~, to be able to do ~', level: 'N4' },
      { id: 'n4-g-2', type: 'grammar', front: '～前に', back: 'Before doing ~', reading: '～まえに', level: 'N4' },
      { id: 'n4-g-3', type: 'grammar', front: '～なければならない', back: 'Must do ~, have to do ~', level: 'N4' },
    ],
  },
  {
    id: 'restaurant-japanese',
    title: 'Restaurant Japanese',
    description: 'Essential vocabulary and phrases for dining out.',
    category: 'Phrases',
    level: 'Intermediate',
    cards: [
        { id: 'rj-1', type: 'vocabulary', front: '予約', back: 'Reservation', reading: 'よやく', level: 'N4' },
        { id: 'rj-2', type: 'vocabulary', front: '注文', back: 'Order', reading: 'ちゅうもん', level: 'N4' },
        { id: 'rj-3', type: 'vocabulary', front: 'お会計', back: 'Bill / Check', reading: 'おかいけい', level: 'N4' },
    ]
  },
];

export interface StatsData {
  topic: string;
  progress: number;
  total: number;
}

export const userStats: StatsData[] = [
    { topic: 'N5 Vocabulary', progress: 4, total: 5 },
    { topic: 'Daily Phrases', progress: 2, total: 3 },
    { topic: 'N4 Grammar', progress: 1, total: 3 },
    { topic: 'Restaurant Japanese', progress: 0, total: 3 },
    { topic: 'Katakana', progress: 46, total: 46 },
    { topic: 'Hiragana', progress: 46, total: 46 },
];
