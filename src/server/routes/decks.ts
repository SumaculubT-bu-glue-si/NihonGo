import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../database/connection';
import { authenticateToken } from '../middleware/auth';
import { CreateDeckRequest, CreateFlashcardRequest } from '../types';

const router = Router();

// Get all decks for the authenticated user (including system decks)
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const SYSTEM_USER_ID = 'system';

    const decks = await database.all(
      `SELECT d.*, 
              COUNT(f.id) as card_count,
              COALESCE(us.progress, 0) as progress,
              COALESCE(us.total, 0) as total
       FROM decks d
       LEFT JOIN flashcards f ON d.id = f.deck_id
       LEFT JOIN user_stats us ON d.title = us.topic AND us.user_id = ?
       WHERE d.user_id = ? OR d.user_id = ?
       GROUP BY d.id
       ORDER BY d.created_at DESC`,
      [userId, userId, SYSTEM_USER_ID]
    );

    res.json({ decks });
  } catch (error) {
    console.error('Get decks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific deck with its flashcards (allow system decks)
router.get('/:deckId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId } = req.params;
    const SYSTEM_USER_ID = 'system';

    const deck = await database.get(
      'SELECT * FROM decks WHERE id = ? AND (user_id = ? OR user_id = ?)',
      [deckId, userId, SYSTEM_USER_ID]
    );

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const flashcards = await database.all(
      'SELECT * FROM flashcards WHERE deck_id = ? ORDER BY created_at ASC',
      [deckId]
    );

    // Optionally, fetch user stats for this deck
    const stats = await database.get(
      'SELECT * FROM user_stats WHERE user_id = ? AND topic = ?',
      [userId, deck.title]
    );

    res.json({
      deck: {
        ...deck,
        cards: flashcards,
        progress: stats?.progress || 0,
        total: stats?.total || flashcards.length,
      },
    });
  } catch (error) {
    console.error('Get deck error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new deck
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const deckData: CreateDeckRequest = req.body;

    // Validate required fields
    if (!deckData.title || !deckData.category || !deckData.level) {
      return res.status(400).json({
        error: 'Title, category, and level are required',
      });
    }

    const deckId = uuidv4();
    const deck = {
      id: deckId,
      user_id: userId,
      title: deckData.title,
      description: deckData.description || null,
      category: deckData.category,
      level: deckData.level,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await database.run(
      'INSERT INTO decks (id, user_id, title, description, category, level) VALUES (?, ?, ?, ?, ?, ?)',
      [deck.id, deck.user_id, deck.title, deck.description, deck.category, deck.level]
    );

    // Initialize stats for the new deck
    await database.run(
      'INSERT INTO user_stats (user_id, topic, progress, total) VALUES (?, ?, ?, ?)',
      [userId, deck.title, 0, 0]
    );

    res.status(201).json({
      message: 'Deck created successfully',
      deck: {
        ...deck,
        cards: [],
        progress: 0,
        total: 0,
      },
    });
  } catch (error) {
    console.error('Create deck error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a deck
router.put('/:deckId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId } = req.params;
    const updateData: Partial<CreateDeckRequest> = req.body;

    // Check if deck exists and belongs to user
    const existingDeck = await database.get(
      'SELECT * FROM decks WHERE id = ? AND user_id = ?',
      [deckId, userId]
    );

    if (!existingDeck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (updateData.title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(updateData.title);
    }

    if (updateData.description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(updateData.description);
    }

    if (updateData.category !== undefined) {
      updateFields.push('category = ?');
      updateValues.push(updateData.category);
    }

    if (updateData.level !== undefined) {
      updateFields.push('level = ?');
      updateValues.push(updateData.level);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateValues.push(deckId);

    await database.run(
      `UPDATE decks SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Update stats topic if title changed
    if (updateData.title && updateData.title !== existingDeck.title) {
      await database.run(
        'UPDATE user_stats SET topic = ? WHERE user_id = ? AND topic = ?',
        [updateData.title, userId, existingDeck.title]
      );
    }

    const updatedDeck = await database.get(
      'SELECT * FROM decks WHERE id = ?',
      [deckId]
    );

    res.json({
      message: 'Deck updated successfully',
      deck: updatedDeck,
    });
  } catch (error) {
    console.error('Update deck error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a deck
router.delete('/:deckId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId } = req.params;

    // Check if deck exists and belongs to user
    const deck = await database.get(
      'SELECT * FROM decks WHERE id = ? AND user_id = ?',
      [deckId, userId]
    );

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    // Delete deck (cascading will delete flashcards and stats)
    await database.run('DELETE FROM decks WHERE id = ?', [deckId]);

    res.json({ message: 'Deck deleted successfully' });
  } catch (error) {
    console.error('Delete deck error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a flashcard to a deck
router.post('/:deckId/cards', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId } = req.params;
    const cardData: CreateFlashcardRequest = req.body;

    // Validate required fields
    if (!cardData.front || !cardData.back || !cardData.type || !cardData.level) {
      return res.status(400).json({
        error: 'Front, back, type, and level are required',
      });
    }

    // Check if deck exists and belongs to user
    const deck = await database.get(
      'SELECT * FROM decks WHERE id = ? AND user_id = ?',
      [deckId, userId]
    );

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const cardId = uuidv4();
    const card = {
      id: cardId,
      deck_id: deckId,
      type: cardData.type,
      front: cardData.front,
      back: cardData.back,
      reading: cardData.reading || null,
      level: cardData.level,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await database.run(
      'INSERT INTO flashcards (id, deck_id, type, front, back, reading, level) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [card.id, card.deck_id, card.type, card.front, card.back, card.reading, card.level]
    );

    // Update deck stats
    const cardCount = await database.get(
      'SELECT COUNT(*) as count FROM flashcards WHERE deck_id = ?',
      [deckId]
    );

    await database.run(
      'UPDATE user_stats SET total = ? WHERE user_id = ? AND topic = ?',
      [cardCount.count, userId, deck.title]
    );

    res.status(201).json({
      message: 'Flashcard added successfully',
      card,
    });
  } catch (error) {
    console.error('Add flashcard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a flashcard
router.put('/:deckId/cards/:cardId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId, cardId } = req.params;
    const updateData: Partial<CreateFlashcardRequest> = req.body;

    // Check if deck exists and belongs to user
    const deck = await database.get(
      'SELECT * FROM decks WHERE id = ? AND user_id = ?',
      [deckId, userId]
    );

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    // Check if card exists
    const card = await database.get(
      'SELECT * FROM flashcards WHERE id = ? AND deck_id = ?',
      [cardId, deckId]
    );

    if (!card) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (updateData.front !== undefined) {
      updateFields.push('front = ?');
      updateValues.push(updateData.front);
    }

    if (updateData.back !== undefined) {
      updateFields.push('back = ?');
      updateValues.push(updateData.back);
    }

    if (updateData.reading !== undefined) {
      updateFields.push('reading = ?');
      updateValues.push(updateData.reading);
    }

    if (updateData.type !== undefined) {
      updateFields.push('type = ?');
      updateValues.push(updateData.type);
    }

    if (updateData.level !== undefined) {
      updateFields.push('level = ?');
      updateValues.push(updateData.level);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateValues.push(cardId);

    await database.run(
      `UPDATE flashcards SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    const updatedCard = await database.get(
      'SELECT * FROM flashcards WHERE id = ?',
      [cardId]
    );

    res.json({
      message: 'Flashcard updated successfully',
      card: updatedCard,
    });
  } catch (error) {
    console.error('Update flashcard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a flashcard
router.delete('/:deckId/cards/:cardId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId, cardId } = req.params;

    // Check if deck exists and belongs to user
    const deck = await database.get(
      'SELECT * FROM decks WHERE id = ? AND user_id = ?',
      [deckId, userId]
    );

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    // Delete the flashcard
    const result = await database.run(
      'DELETE FROM flashcards WHERE id = ? AND deck_id = ?',
      [cardId, deckId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    // Update deck stats
    const cardCount = await database.get(
      'SELECT COUNT(*) as count FROM flashcards WHERE deck_id = ?',
      [deckId]
    );

    await database.run(
      'UPDATE user_stats SET total = ? WHERE user_id = ? AND topic = ?',
      [cardCount.count, userId, deck.title]
    );

    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    console.error('Delete flashcard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's flashcard progress for a deck
router.get('/:deckId/progress', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId } = req.params;
    const progress = await database.all(
      'SELECT card_id, status FROM user_flashcard_progress WHERE user_id = ? AND deck_id = ?',
      [userId, deckId]
    );
    res.json({ progress });
  } catch (error) {
    console.error('Get flashcard progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update progress for a card (mark as mastered/learning)
router.post('/:deckId/progress', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId } = req.params;
    const { cardId, status } = req.body;
    if (!cardId || !status) {
      return res.status(400).json({ error: 'cardId and status are required' });
    }
    await database.run(
      `INSERT INTO user_flashcard_progress (user_id, deck_id, card_id, status, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_id, deck_id, card_id) DO UPDATE SET status = excluded.status, updated_at = CURRENT_TIMESTAMP`,
      [userId, deckId, cardId, status]
    );
    res.json({ message: 'Progress updated' });
  } catch (error) {
    console.error('Update flashcard progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset all progress for a deck
router.post('/:deckId/progress/reset', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { deckId } = req.params;
    await database.run(
      'DELETE FROM user_flashcard_progress WHERE user_id = ? AND deck_id = ?',
      [userId, deckId]
    );
    res.json({ message: 'Progress reset' });
  } catch (error) {
    console.error('Reset flashcard progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 