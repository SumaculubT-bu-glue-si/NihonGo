
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

export const decks: Deck[] = [
  {
    id: 'n5-vocabulary',
    title: 'JLPT N5 Vocabulary',
    description: 'Master the 50 most essential vocabulary words for the JLPT N5 exam.',
    category: 'Vocabulary',
    level: 'Beginner',
    cards: [
      { id: 'n5-v-1', type: 'vocabulary', front: '私', back: 'I, me', reading: 'わたし', level: 'N5' },
      { id: 'n5-v-2', type: 'vocabulary', front: '学校', back: 'School', reading: 'がっこう', level: 'N5' },
      { id: 'n5-v-3', type: 'vocabulary', front: '食べる', back: 'To eat', reading: 'たべる', level: 'N5' },
      { id: 'n5-v-4', type: 'vocabulary', front: '飲む', back: 'To drink', reading: 'のむ', level: 'N5' },
      { id: 'n5-v-5', type: 'vocabulary', front: '大きい', back: 'Big', reading: 'おおきい', level: 'N5' },
      { id: 'n5-v-6', type: 'vocabulary', front: '小さい', back: 'Small', reading: 'ちいさい', level: 'N5' },
      { id: 'n5-v-7', type: 'vocabulary', front: '日本', back: 'Japan', reading: 'にほん', level: 'N5' },
      { id: 'n5-v-8', type: 'vocabulary', front: '学生', back: 'Student', reading: 'がくせい', level: 'N5' },
      { id: 'n5-v-9', type: 'vocabulary', front: '先生', back: 'Teacher', reading: 'せんせい', level: 'N5' },
      { id: 'n5-v-10', type: 'vocabulary', front: '何', back: 'What', reading: 'なに', level: 'N5' },
      ...Array.from({ length: 40 }, (_, i) => ({ id: `n5-v-p-${i + 1}`, type: 'vocabulary', front: `単語 ${i + 11}`, back: `Word ${i + 11}`, reading: `たんご ${i + 11}`, level: 'N5' as 'N5' })),
    ],
  },
  {
    id: 'n5-grammar',
    title: 'N5 Grammar',
    description: 'Key grammar points for the JLPT N5 level.',
    category: 'Grammar',
    level: 'Beginner',
    cards: [
        { id: 'n5-g-1', type: 'grammar', front: '～は～です', back: 'A is B', level: 'N5' },
        { id: 'n5-g-2', type: 'grammar', front: '～も', back: 'also, too', level: 'N5' },
        { id: 'n5-g-3', type: 'grammar', front: '～の', back: 'possessive particle', level: 'N5' },
        { id: 'n5-g-4', type: 'grammar', front: '～か', back: 'question particle', level: 'N5' },
        { id: 'n5-g-5', type: 'grammar', front: 'これ・それ・あれ', back: 'this/that/that over there', level: 'N5' },
        ...Array.from({ length: 45 }, (_, i) => ({ id: `n5-g-p-${i + 1}`, type: 'grammar', front: `文法 ${i + 6}`, back: `Grammar point ${i + 6}`, level: 'N5' as 'N5' })),
    ]
  },
  {
    id: 'n5-kanji',
    title: 'N5 Kanji List',
    description: 'The first 50 essential kanji for beginners.',
    category: 'Kanji',
    level: 'Beginner',
    cards: [
        { id: 'n5-k-1', type: 'kanji', front: '一', back: 'One', reading: 'いち', level: 'N5' },
        { id: 'n5-k-2', type: 'kanji', front: '二', back: 'Two', reading: 'に', level: 'N5' },
        { id: 'n5-k-3', type: 'kanji', front: '三', back: 'Three', reading: 'さん', level: 'N5' },
        { id: 'n5-k-4', type: 'kanji', front: '四', back: 'Four', reading: 'よん/し', level: 'N5' },
        { id: 'n5-k-5', type: 'kanji', front: '五', back: 'Five', reading: 'ご', level: 'N5' },
        { id: 'n5-k-6', type: 'kanji', front: '六', back: 'Six', reading: 'ろく', level: 'N5' },
        { id: 'n5-k-7', type: 'kanji', front: '七', back: 'Seven', reading: 'なな/しち', level: 'N5' },
        { id: 'n5-k-8', type: 'kanji', front: '八', back: 'Eight', reading: 'はち', level: 'N5' },
        { id: 'n5-k-9', type: 'kanji', front: '九', back: 'Nine', reading: 'きゅう/く', level: 'N5' },
        { id: 'n5-k-10', type: 'kanji', front: '十', back: 'Ten', reading: 'じゅう', level: 'N5' },
        ...Array.from({ length: 40 }, (_, i) => ({ id: `n5-k-p-${i + 1}`, type: 'kanji', front: `漢字 ${i + 11}`, back: `Kanji ${i + 11}`, reading: `かんじ ${i + 11}`, level: 'N5' as 'N5' })),
    ]
  },
  {
    id: 'common-phrases',
    title: 'Common Daily Phrases',
    description: '50 useful phrases for everyday conversations in Japan.',
    category: 'Phrases',
    level: 'Beginner',
    cards: [
      { id: 'cp-1', type: 'vocabulary', front: 'おはようございます', back: 'Good morning', reading: 'ohayou gozaimasu', level: 'N5' },
      { id: 'cp-2', type: 'vocabulary', front: 'ありがとうございます', back: 'Thank you', reading: 'arigatou gozaimasu', level: 'N5' },
      { id: 'cp-3', type: 'vocabulary', front: 'すみません', back: 'Excuse me / Sorry', reading: 'sumimasen', level: 'N5' },
      { id: 'cp-4', type: 'vocabulary', front: 'こんにちは', back: 'Hello / Good afternoon', reading: 'konnichiwa', level: 'N5' },
      { id: 'cp-5', type: 'vocabulary', front: 'こんばんは', back: 'Good evening', reading: 'konbanwa', level: 'N5' },
      ...Array.from({ length: 45 }, (_, i) => ({ id: `cp-p-${i + 1}`, type: 'vocabulary', front: `フレーズ ${i + 6}`, back: `Phrase ${i + 6}`, reading: `fureezu ${i + 6}`, level: 'N5' as 'N5' })),
    ],
  },
];

export interface StatsData {
  topic: string;
  progress: number;
  total: number;
}

export const userStats: StatsData[] = [
    { topic: 'N5 Vocabulary', progress: 0, total: 50 },
    { topic: 'N5 Grammar', progress: 0, total: 50 },
    { topic: 'N5 Kanji', progress: 0, total: 50 },
    { topic: 'Daily Phrases', progress: 0, total: 50 },
];
