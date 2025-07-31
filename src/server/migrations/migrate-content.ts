import { database } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

// Import the actual hardcoded data
import { grammarLessons } from '../../lib/grammar-lessons-data';
import { allQuizzes } from '../../lib/quiz-data';
import { staticChallengeItems } from '../../lib/challenge-items-data';

interface GrammarLesson {
  id: string;
  title: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  explanation: string;
  examples: string[];
}

interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  audioDataUri?: string;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  category: 'vocabulary' | 'grammar';
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  questions: QuizQuestion[];
}

interface ChallengeItem {
  id: number;
  grammar_point: string;
  english_sentence: string;
  correct_japanese: string;
  word_bank: string[];
  hint: string;
  distractors: string[];
}

async function migrateGrammarLessons() {
  console.log('📚 Migrating grammar lessons...');
  
  let migratedCount = 0;
  for (const lesson of grammarLessons) {
    try {
      await database.run(
        'INSERT OR REPLACE INTO grammar_lessons (id, title, level, explanation, examples) VALUES (?, ?, ?, ?, ?)',
        [lesson.id, lesson.title, lesson.level, lesson.explanation, JSON.stringify(lesson.examples)]
      );
      migratedCount++;
      console.log(`✓ Migrated grammar lesson: ${lesson.title}`);
    } catch (error) {
      console.error(`✗ Failed to migrate grammar lesson: ${lesson.title}`, error);
    }
  }
  
  console.log(`📊 Total grammar lessons migrated: ${migratedCount}`);
}

async function migrateQuizzes() {
  console.log('📝 Migrating quizzes...');
  
  let quizCount = 0;
  let questionCount = 0;
  
  // Flatten all quizzes from the nested structure
  const allQuizzesFlat: Quiz[] = [];
  
  // Extract quizzes from the nested structure
  Object.keys(allQuizzes).forEach(category => {
    Object.keys(allQuizzes[category as keyof typeof allQuizzes]).forEach(level => {
      const quizzes = allQuizzes[category as keyof typeof allQuizzes][level as keyof typeof allQuizzes.vocabulary];
      if (Array.isArray(quizzes)) {
        allQuizzesFlat.push(...quizzes);
      }
    });
  });
  
  for (const quiz of allQuizzesFlat) {
    try {
      // Insert quiz
      await database.run(
        'INSERT OR REPLACE INTO quizzes (id, title, category, level) VALUES (?, ?, ?, ?)',
        [quiz.id, quiz.title, quiz.category, quiz.level]
      );
      quizCount++;
      
      // Insert quiz questions
      for (const question of quiz.questions) {
        await database.run(
          'INSERT OR REPLACE INTO quiz_questions (id, quiz_id, question_text, options, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?)',
          [
            question.id,
            quiz.id,
            question.questionText,
            JSON.stringify(question.options),
            question.correctAnswer,
            question.explanation
          ]
        );
        questionCount++;
      }
      
      console.log(`✓ Migrated quiz: ${quiz.title} (${quiz.questions.length} questions)`);
    } catch (error) {
      console.error(`✗ Failed to migrate quiz: ${quiz.title}`, error);
    }
  }
  
  console.log(`📊 Total quizzes migrated: ${quizCount}`);
  console.log(`📊 Total questions migrated: ${questionCount}`);
}

async function migrateChallengeItems() {
  console.log('🎯 Migrating challenge items...');
  
  let itemCount = 0;
  
  // Flatten all challenge items from the nested structure
  const allChallengeItems: Array<ChallengeItem & { level: string; unit_id: string; stage_id: string; item_order: number }> = [];
  
  Object.keys(staticChallengeItems).forEach(level => {
    Object.keys(staticChallengeItems[level]).forEach(unitId => {
      Object.keys(staticChallengeItems[level][unitId]).forEach(stageId => {
        const items = staticChallengeItems[level][unitId][stageId];
        items.forEach((item, index) => {
          allChallengeItems.push({
            ...item,
            level,
            unit_id: unitId,
            stage_id: stageId,
            item_order: index + 1
          });
        });
      });
    });
  });
  
  for (const item of allChallengeItems) {
    try {
      await database.run(
        `INSERT OR REPLACE INTO challenge_items 
         (level, unit_id, stage_id, item_order, grammar_point, english_sentence, correct_japanese, word_bank, hint, distractors) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.level,
          item.unit_id,
          item.stage_id,
          item.item_order,
          item.grammar_point,
          item.english_sentence,
          item.correct_japanese,
          JSON.stringify(item.word_bank),
          item.hint,
          JSON.stringify(item.distractors)
        ]
      );
      itemCount++;
      
      if (itemCount % 50 === 0) {
        console.log(`✓ Migrated ${itemCount} challenge items...`);
      }
    } catch (error) {
      console.error(`✗ Failed to migrate challenge item: ${item.grammar_point}`, error);
    }
  }
  
  console.log(`📊 Total challenge items migrated: ${itemCount}`);
}

async function createInitialChallengeProgress() {
  console.log('🔄 Creating initial challenge progress structure...');
  
  // Get all unique level/unit/stage combinations
  const combinations = new Set<string>();
  
  Object.keys(staticChallengeItems).forEach(level => {
    Object.keys(staticChallengeItems[level]).forEach(unitId => {
      Object.keys(staticChallengeItems[level][unitId]).forEach(stageId => {
        combinations.add(`${level}|${unitId}|${stageId}`);
      });
    });
  });
  
  console.log(`📊 Found ${combinations.size} unique challenge stage combinations`);
  console.log('💡 Challenge progress will be created when users start playing');
}

async function migrateContent() {
  try {
    console.log('🚀 Starting comprehensive content migration...');
    console.log('==========================================');
    
    // Check if database tables exist
    const tables = await database.all("SELECT name FROM sqlite_master WHERE type='table'");
    const tableNames = tables.map(t => t.name);
    
    console.log('📋 Available database tables:', tableNames.join(', '));
    
    // Migrate content
    await migrateGrammarLessons();
    console.log('');
    
    await migrateQuizzes();
    console.log('');
    
    await migrateChallengeItems();
    console.log('');
    
    await createInitialChallengeProgress();
    console.log('');
    
    // Summary
    console.log('✅ Content migration completed successfully!');
    console.log('');
    console.log('📊 Migration Summary:');
    console.log('====================');
    
    // Count migrated items
    const grammarCount = await database.get('SELECT COUNT(*) as count FROM grammar_lessons');
    const quizCount = await database.get('SELECT COUNT(*) as count FROM quizzes');
    const questionCount = await database.get('SELECT COUNT(*) as count FROM quiz_questions');
    const challengeCount = await database.get('SELECT COUNT(*) as count FROM challenge_items');
    
    console.log(`📚 Grammar Lessons: ${grammarCount?.count || 0}`);
    console.log(`📝 Quizzes: ${quizCount?.count || 0}`);
    console.log(`❓ Quiz Questions: ${questionCount?.count || 0}`);
    console.log(`🎯 Challenge Items: ${challengeCount?.count || 0}`);
    console.log('');
    console.log('🎉 All your hardcoded content has been successfully migrated to the database!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Restart your server to ensure all changes are loaded');
    console.log('2. Update your frontend components to use the new API endpoints');
    console.log('3. Test the admin dashboard at: http://localhost:9002/admin/user-progress');
    console.log('4. Test user progress tracking across devices');
    
  } catch (error) {
    console.error('❌ Content migration failed:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateContent().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}

export { migrateContent }; 