import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../database/connection';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// ===== GRAMMAR LESSONS =====

// Get all grammar lessons for a user (with progress)
router.get('/grammar-lessons', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    
    const lessons = await database.all(
      `SELECT gl.*, 
              COALESCE(ugl.read, 0) as user_read,
              COALESCE(ugl.completed_at, NULL) as completed_at
       FROM grammar_lessons gl
       LEFT JOIN user_grammar_lessons ugl ON gl.id = ugl.lesson_id AND ugl.user_id = ?
       ORDER BY gl.level, gl.created_at ASC`,
      [userId]
    );

    res.json({ lessons });
  } catch (error) {
    console.error('Get grammar lessons error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific grammar lesson with user progress
router.get('/grammar-lessons/:lessonId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { lessonId } = req.params;

    const lesson = await database.get(
      'SELECT * FROM grammar_lessons WHERE id = ?',
      [lessonId]
    );

    if (!lesson) {
      return res.status(404).json({ error: 'Grammar lesson not found' });
    }

    const userProgress = await database.get(
      'SELECT * FROM user_grammar_lessons WHERE user_id = ? AND lesson_id = ?',
      [userId, lessonId]
    );

    res.json({
      lesson: {
        ...lesson,
        examples: JSON.parse(lesson.examples),
        user_read: userProgress?.read || false,
        completed_at: userProgress?.completed_at || null,
      },
    });
  } catch (error) {
    console.error('Get grammar lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark grammar lesson as read
router.post('/grammar-lessons/:lessonId/read', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { lessonId } = req.params;

    await database.run(
      `INSERT OR REPLACE INTO user_grammar_lessons (user_id, lesson_id, read, completed_at)
       VALUES (?, ?, 1, CURRENT_TIMESTAMP)`,
      [userId, lessonId]
    );

    res.json({ message: 'Lesson marked as read' });
  } catch (error) {
    console.error('Mark lesson as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== QUIZZES =====

// Get all quizzes for a user (with scores)
router.get('/quizzes', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    
    const quizzes = await database.all(
      `SELECT q.*, 
              COALESCE(qs.highest_score, 0) as user_highest_score,
              COALESCE(qs.attempts, 0) as attempts
       FROM quizzes q
       LEFT JOIN user_quiz_scores qs ON q.id = qs.quiz_id AND qs.user_id = ?
       ORDER BY q.level, q.created_at ASC`,
      [userId]
    );

    res.json({ quizzes });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific quiz with questions and user score
router.get('/quizzes/:quizId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { quizId } = req.params;

    const quiz = await database.get(
      'SELECT * FROM quizzes WHERE id = ?',
      [quizId]
    );

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = await database.all(
      'SELECT * FROM quiz_questions WHERE quiz_id = ? ORDER BY created_at ASC',
      [quizId]
    );

    const userScore = await database.get(
      'SELECT * FROM user_quiz_scores WHERE user_id = ? AND quiz_id = ?',
      [userId, quizId]
    );

    res.json({
      quiz: {
        ...quiz,
        questions: questions.map(q => ({
          ...q,
          options: JSON.parse(q.options),
        })),
        user_highest_score: userScore?.highest_score || 0,
        attempts: userScore?.attempts || 0,
      },
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit quiz score
router.post('/quizzes/:quizId/score', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { quizId } = req.params;
    const { score } = req.body;

    if (typeof score !== 'number' || score < 0 || score > 100) {
      return res.status(400).json({ error: 'Invalid score' });
    }

    await database.run(
      `INSERT OR REPLACE INTO user_quiz_scores (user_id, quiz_id, highest_score, attempts, updated_at)
       VALUES (?, ?, ?, COALESCE((SELECT attempts FROM user_quiz_scores WHERE user_id = ? AND quiz_id = ?), 0) + 1, CURRENT_TIMESTAMP)`,
      [userId, quizId, score, userId, quizId]
    );

    res.json({ message: 'Score saved' });
  } catch (error) {
    console.error('Save quiz score error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== CHALLENGES =====

// Get challenge progress for a user
router.get('/challenges/progress', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    
    const progress = await database.all(
      'SELECT * FROM challenge_progress WHERE user_id = ? ORDER BY level, unit_id, stage_id',
      [userId]
    );

    // Group by level and unit
    const groupedProgress: any = {};
    progress.forEach(p => {
      if (!groupedProgress[p.level]) {
        groupedProgress[p.level] = {};
      }
      if (!groupedProgress[p.level][p.unit_id]) {
        groupedProgress[p.level][p.unit_id] = {};
      }
      groupedProgress[p.level][p.unit_id][p.stage_id] = p.status;
    });

    res.json({ progress: groupedProgress });
  } catch (error) {
    console.error('Get challenge progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update challenge progress
router.post('/challenges/progress', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { level, unitId, stageId, status } = req.body;

    if (!level || !unitId || !stageId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await database.run(
      `INSERT OR REPLACE INTO challenge_progress (user_id, level, unit_id, stage_id, status, updated_at)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [userId, level, unitId, stageId, status]
    );

    res.json({ message: 'Progress updated' });
  } catch (error) {
    console.error('Update challenge progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get challenge items for a specific stage
router.get('/challenges/:level/:unitId/:stageId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { level, unitId, stageId } = req.params;
    
    const items = await database.all(
      'SELECT * FROM challenge_items WHERE level = ? AND unit_id = ? AND stage_id = ? ORDER BY item_order',
      [level, unitId, stageId]
    );

    res.json({ items });
  } catch (error) {
    console.error('Get challenge items error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== ADMIN ENDPOINTS =====

// Get all user progress (admin only)
router.get('/admin/user-progress/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    // Check if current user is admin
    const currentUser = await database.get(
      'SELECT role FROM users WHERE id = ?',
      [req.user!.userId]
    );

    if (currentUser?.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get user's grammar lesson progress
    const grammarProgress = await database.all(
      `SELECT gl.title, gl.level, ugl.read, ugl.completed_at
       FROM grammar_lessons gl
       LEFT JOIN user_grammar_lessons ugl ON gl.id = ugl.lesson_id AND ugl.user_id = ?
       ORDER BY gl.level, gl.created_at`,
      [userId]
    );

    // Get user's quiz scores
    const quizScores = await database.all(
      `SELECT q.title, q.level, qs.highest_score, qs.attempts, qs.updated_at
       FROM quizzes q
       LEFT JOIN user_quiz_scores qs ON q.id = qs.quiz_id AND qs.user_id = ?
       ORDER BY q.level, q.created_at`,
      [userId]
    );

    // Get user's challenge progress
    const challengeProgress = await database.all(
      `SELECT level, unit_id, stage_id, status, updated_at
       FROM challenge_progress 
       WHERE user_id = ?
       ORDER BY level, unit_id, stage_id`,
      [userId]
    );

    // Get user's game stats
    const gameStats = await database.get(
      'SELECT * FROM user_game_stats WHERE user_id = ?',
      [userId]
    );

    res.json({
      grammarProgress,
      quizScores,
      challengeProgress,
      gameStats,
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users with their progress summary (admin only)
router.get('/admin/users-progress', authenticateToken, async (req: Request, res: Response) => {
  try {
    // Check if current user is admin
    const currentUser = await database.get(
      'SELECT role FROM users WHERE id = ?',
      [req.user!.userId]
    );

    if (currentUser?.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await database.all(
      `SELECT u.id, u.email, u.display_name, u.created_at, u.last_active_at,
              COUNT(DISTINCT ugl.lesson_id) as lessons_completed,
              COUNT(DISTINCT qs.quiz_id) as quizzes_attempted,
              AVG(qs.highest_score) as avg_quiz_score,
              COUNT(DISTINCT cp.id) as challenges_completed,
              ugs.hearts, ugs.diamonds, ugs.current_challenge_level
       FROM users u
       LEFT JOIN user_grammar_lessons ugl ON u.id = ugl.user_id AND ugl.read = 1
       LEFT JOIN user_quiz_scores qs ON u.id = qs.user_id
       LEFT JOIN challenge_progress cp ON u.id = cp.user_id AND cp.status = 'completed'
       LEFT JOIN user_game_stats ugs ON u.id = ugs.user_id
       WHERE u.role = 'learner'
       GROUP BY u.id
       ORDER BY u.created_at DESC`
    );

    res.json({ users });
  } catch (error) {
    console.error('Get users progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 