# Content Migration Guide

This guide will help you migrate your hardcoded content from `src/lib` files to the database, enabling user progress tracking across devices.

## 🎯 What This Migration Achieves

### Before Migration

- ❌ Content hardcoded in `src/lib` files
- ❌ User progress stored locally (cookies/localStorage)
- ❌ Progress lost when switching devices
- ❌ No admin visibility into user progress
- ❌ No cross-device synchronization

### After Migration

- ✅ Content stored in database (shared across all users)
- ✅ User progress tracked per user in database
- ✅ Progress synced across all devices
- ✅ Admin dashboard to view user progress
- ✅ Real-time progress tracking

## 📋 Migration Steps

### 1. Update Database Schema

The database schema has been updated to support:

- **System-level content tables** (grammar lessons, quizzes, challenges)
- **User progress tracking tables** (user_grammar_lessons, user_quiz_scores, challenge_progress)
- **Admin analytics tables** (user_game_stats, grammar_check_history)

### 2. Run Content Migration

```bash
# Run the migration script
node scripts/migrate-content.js
```

This will:

- Migrate sample grammar lessons to the database
- Migrate sample quizzes to the database
- Migrate sample challenge items to the database

### 3. Update Your Hardcoded Data

Replace the sample data in `src/server/migrations/migrate-content.ts` with your actual data:

#### For Grammar Lessons

```typescript
const grammarLessons: GrammarLesson[] = [
  // Replace with your actual grammar lessons from src/lib/grammar-lessons-data.ts
  {
    id: uuidv4(),
    title: "Your Lesson Title",
    level: "N5",
    explanation: "Your explanation",
    examples: ["Example 1", "Example 2", "Example 3"],
  },
];
```

#### For Quizzes

```typescript
const quizzes: Quiz[] = [
  // Replace with your actual quizzes from src/lib/quiz-data.ts
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
        explanation: "Your explanation",
      },
    ],
  },
];
```

#### For Challenge Items

```typescript
const challengeItems: ChallengeItem[] = [
  // Replace with your actual challenge items from src/lib/challenge-items-data.ts
  {
    id: 1,
    grammar_point: "Your grammar point",
    english_sentence: "English sentence",
    correct_japanese: "Correct Japanese",
    word_bank: ["Word1", "Word2", "Word3"],
    hint: "Your hint",
    distractors: ["Wrong1", "Wrong2", "Wrong3"],
  },
];
```

### 4. Update Frontend Components

Replace hardcoded data imports with API calls:

#### Before (Hardcoded)

```typescript
import { grammarLessonsData } from "@/lib/grammar-lessons-data";
import { quizData } from "@/lib/quiz-data";
import { challengeItemsData } from "@/lib/challenge-items-data";
```

#### After (API-based)

```typescript
import { apiService } from "@/lib/api";

// In your component
const [lessons, setLessons] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadLessons = async () => {
    try {
      const response = await apiService.getGrammarLessons();
      if (response.data) {
        setLessons(response.data.lessons);
      }
    } catch (error) {
      console.error("Failed to load lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  loadLessons();
}, []);
```

### 5. Update Progress Tracking

#### Grammar Lessons

```typescript
// Mark lesson as read
await apiService.markGrammarLessonAsRead(lessonId);
```

#### Quizzes

```typescript
// Submit quiz score
await apiService.submitQuizScore(quizId, score);
```

#### Challenges

```typescript
// Update challenge progress
await apiService.updateChallengeProgress(level, unitId, stageId, "completed");
```

## 🔧 New API Endpoints

### Content Endpoints

- `GET /api/content/grammar-lessons` - Get all grammar lessons with user progress
- `GET /api/content/grammar-lessons/:id` - Get specific lesson with progress
- `POST /api/content/grammar-lessons/:id/read` - Mark lesson as read
- `GET /api/content/quizzes` - Get all quizzes with user scores
- `GET /api/content/quizzes/:id` - Get specific quiz with questions
- `POST /api/content/quizzes/:id/score` - Submit quiz score
- `GET /api/content/challenges/progress` - Get user challenge progress
- `POST /api/content/challenges/progress` - Update challenge progress

### Admin Endpoints

- `GET /api/content/admin/user-progress/:userId` - Get detailed user progress
- `GET /api/content/admin/users-progress` - Get all users progress summary

## 📊 Admin Dashboard

Access the new admin dashboard at: `http://localhost:9002/admin/user-progress`

Features:

- **User Progress Overview** - See all users with their progress summary
- **Detailed Progress View** - Click "View Details" to see individual user progress
- **Progress Analytics** - Track lessons completed, quiz scores, challenge progress
- **Real-time Data** - All data is live from the database

## 🚀 Testing the Migration

### 1. Start Your Server

```bash
npm run dev
```

### 2. Run Migration

```bash
node scripts/migrate-content.js
```

### 3. Test User Flow

1. Register a new user account
2. Complete some grammar lessons
3. Take some quizzes
4. Complete some challenges
5. Switch to another device and log in
6. Verify progress is synced

### 4. Test Admin Dashboard

1. Log in as admin
2. Visit `/admin/user-progress`
3. View user progress data
4. Click "View Details" to see individual progress

## 🔄 Database Schema Changes

### New Tables Added

- `grammar_lessons` - System-level grammar lessons
- `user_grammar_lessons` - User progress on grammar lessons
- `quizzes` - System-level quizzes
- `quiz_questions` - Quiz questions
- `user_quiz_scores` - User quiz scores and attempts
- `challenge_items` - System-level challenge items
- `challenge_progress` - User challenge progress
- `user_game_stats` - User game statistics

### Updated Tables

- `users` - Added role-based access control
- `user_stats` - Enhanced for better progress tracking

## 🛠️ Troubleshooting

### Migration Fails

- Check that your database is running
- Verify the database schema is updated
- Check console for specific error messages

### API Errors

- Ensure the server is running on port 3001
- Check CORS settings in server configuration
- Verify authentication tokens are being sent

### Progress Not Syncing

- Check that API calls are being made
- Verify database connections
- Check user authentication status

## 📈 Benefits After Migration

1. **Cross-Device Sync** - Users can access their progress from any device
2. **Admin Visibility** - You can see all user progress and engagement
3. **Scalability** - Easy to add new content and track new metrics
4. **Analytics** - Rich data for understanding user behavior
5. **Backup** - All progress is safely stored in the database

## 🔮 Next Steps

After completing the migration:

1. **Add More Content** - Use the admin interface to add more grammar lessons, quizzes, and challenges
2. **Enhance Analytics** - Add more detailed progress tracking and analytics
3. **User Notifications** - Implement progress-based notifications
4. **Gamification** - Add achievements, badges, and leaderboards
5. **Social Features** - Allow users to share progress and compete with friends

## 📞 Support

If you encounter any issues during migration:

1. Check the console for error messages
2. Verify database connectivity
3. Test API endpoints individually
4. Review the database schema
5. Check authentication flow

The migration will transform your app from a local-only experience to a fully cloud-synced learning platform with comprehensive progress tracking!
