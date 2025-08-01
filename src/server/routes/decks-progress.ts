import { Router, Request, Response } from 'express';
import { database } from '../database/connection';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get deck progress for a specific user and deck
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const deckId = req.query.deck_id as string;

    if (!deckId) {
      return res.status(400).json({ error: 'Missing deck_id parameter' });
    }

    // Get the total cards for the deck
    const deck = await database.get('SELECT cards FROM decks WHERE id = ?', [deckId]);
    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    // Parse the cards JSON if it's a string
    let cards;
    try {
      cards = typeof deck.cards === 'string' ? JSON.parse(deck.cards) : deck.cards;
    } catch (parseError) {
      console.error('Error parsing deck cards:', parseError);
      return res.status(500).json({ error: 'Invalid deck data format' });
    }

    const totalCards = Array.isArray(cards) ? cards.length : 0;

    // Debug: Log the query parameters
    console.log('Querying progress for:', { userId, deckId, totalCards });

    // Get the number of mastered cards for this user and deck
    const masteredCards = await database.all(
      'SELECT COUNT(*) as count FROM user_flashcard_progress WHERE user_id = ? AND deck_id = ? AND status = ?',
      [userId, deckId, 'mastered']
    );

    // Debug: Log the query result
    console.log('Mastered cards query result:', masteredCards);

    // Also check all progress for this user and deck for debugging
    const allProgress = await database.all(
      'SELECT card_id, status FROM user_flashcard_progress WHERE user_id = ? AND deck_id = ?',
      [userId, deckId]
    );
    console.log('All progress for this deck:', allProgress);

    const masteredCount = masteredCards[0]?.count || 0;
    const progress = totalCards > 0 ? (masteredCount / totalCards) * 100 : 0;

    console.log('Final result:', { progress: Math.round(progress), masteredCount, totalCards });

    res.json({ 
      progress: Math.round(progress),
      masteredCount,
      totalCards
    });
  } catch (error) {
    console.error('Get deck progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
