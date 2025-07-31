import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';

export function useDecksApi() {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getDecks();
      if (response.data) {
        setDecks(response.data.decks);
      } else {
        setError(response.error || 'Failed to fetch decks');
      }
    } catch (err) {
      setError('Failed to fetch decks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return { decks, loading, error, refetch: fetchDecks };
} 