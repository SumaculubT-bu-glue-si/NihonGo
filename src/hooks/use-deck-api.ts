import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/lib/api';

export function useDeckApi(deckId: string | undefined) {
  const [deck, setDeck] = useState<any>(null);
  const [progress, setProgress] = useState<{ [cardId: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeck = async () => {
    if (!deckId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getDeck(deckId);
      if (response.data) {
        setDeck(response.data.deck);
      } else {
        setError(response.error || 'Failed to fetch deck');
      }
    } catch (err) {
      setError('Failed to fetch deck');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = useCallback(async () => {
    if (!deckId) return;
    try {
      const response = await apiService.getDeckProgress(deckId);
      if (response.data) {
        const progressMap: { [cardId: string]: string } = {};
        response.data.progress.forEach((p: { card_id: string; status: string }) => {
          progressMap[p.card_id] = p.status;
        });
        setProgress(progressMap);
      }
    } catch (err) {
      // ignore for now
    }
  }, [deckId]);

  useEffect(() => {
    fetchDeck();
    fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  const markCardMastered = async (cardId: string) => {
    if (!deckId) return;
    await apiService.updateDeckProgress(deckId, cardId, 'mastered');
    setProgress((prev) => ({ ...prev, [cardId]: 'mastered' }));
  };

  const resetProgress = async () => {
    if (!deckId) return;
    await apiService.resetDeckProgress(deckId);
    setProgress({});
  };

  return { deck, progress, loading, error, refetch: fetchDeck, markCardMastered, resetProgress };
} 