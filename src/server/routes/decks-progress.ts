import { database } from '../database/connection';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');
  const deckId = searchParams.get('deck_id');

  if (!userId || !deckId) {
    return NextResponse.json({ error: 'Missing user_id or deck_id' }, { status: 400 });
  }

  // Get the total cards for the deck
  const deck = await database.get('SELECT cards FROM decks WHERE id = ?', [deckId]);
  if (!deck) {
    return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
  }

  const totalCards = deck.cards.length;

  // Get the number of mastered cards for this user and deck
  const masteredCards = await database.all(
    'SELECT COUNT(*) as count FROM user_flashcard_progress WHERE user_id = ? AND deck_id = ? AND status = ?',
    [userId, deckId, 'mastered']
  );

  const progress = (masteredCards[0].count / totalCards) * 100;

  return NextResponse.json({ 
    progress: Math.round(progress),
    masteredCount: masteredCards[0].count,
    totalCards
  });
}
