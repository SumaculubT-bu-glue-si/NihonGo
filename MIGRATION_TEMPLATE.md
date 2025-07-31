# Migration Template

## Grammar Lessons
Replace the sample data in `src/server/migrations/migrate-content.ts`:

```typescript
const grammarLessons: GrammarLesson[] = [
  // Copy your data from src/lib/grammar-lessons-data.ts here
  {
    id: uuidv4(),
    title: "Your Lesson Title",
    level: "N5",
    explanation: "Your explanation",
    examples: ["Example 1", "Example 2", "Example 3"]
  }
];
```

## Quizzes
Replace the sample data:

```typescript
const quizzes: Quiz[] = [
  // Copy your data from src/lib/quiz-data.ts here
  {
    id: uuidv4(),
    title: "Your Quiz Title",
    category: "grammar",
    level: "N5",
    questions: [
      {
        id: uuidv4(),
        questionText: "Your question",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: "Option 1",
        explanation: "Your explanation"
      }
    ]
  }
];
```

## Challenge Items
Replace the sample data:

```typescript
const challengeItems: ChallengeItem[] = [
  // Copy your data from src/lib/challenge-items-data.ts here
  {
    id: 1,
    grammar_point: "Your grammar point",
    english_sentence: "English sentence",
    correct_japanese: "Correct Japanese",
    word_bank: ["Word1", "Word2", "Word3"],
    hint: "Your hint",
    distractors: ["Wrong1", "Wrong2", "Wrong3"]
  }
];
```

## Next Steps
1. Replace the sample data with your actual data
2. Run: `node scripts/migrate-content.js`
3. Test the migration
4. Update your frontend components to use the new API endpoints
