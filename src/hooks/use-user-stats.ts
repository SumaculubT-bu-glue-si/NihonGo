import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context-sqlite';

export interface UserStats {
  id: number;
  user_id: string;
  hearts: number;
  diamonds: number;
  current_challenge_level: string;
  created_at: string;
  updated_at: string;
}

export function useUserStats() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user stats from database
  const fetchUserStats = async () => {
    if (!user) {
      setUserStats(null);
      setLoading(false);
      return;
    }

    try {
      console.log('🔄 Fetching user stats from database...');
      setLoading(true);
      setError(null);
      
      const response = await apiService.getUserStats();
      if (response.data) {
        console.log('✅ User stats fetched:', response.data);
        setUserStats(response.data);
      } else {
        console.error('❌ Failed to fetch user stats:', response.error);
        setError(response.error || 'Failed to fetch user stats');
      }
    } catch (err) {
      console.error('❌ Error fetching user stats:', err);
      setError('Failed to fetch user stats');
    } finally {
      setLoading(false);
    }
  };

  // Update user stats in database
  const updateUserStats = async (stats: {
    hearts?: number;
    diamonds?: number;
    currentChallengeLevel?: string;
  }) => {
    if (!user) {
      console.error('❌ User not authenticated');
      return false;
    }

    try {
      console.log('🔄 Updating user stats...', stats);
      const response = await apiService.updateUserStats(stats);
      if (response.data) {
        console.log('✅ User stats updated:', response.data.stats);
        setUserStats(response.data.stats);
        return true;
      } else {
        console.error('❌ Failed to update user stats:', response.error);
        setError(response.error || 'Failed to update user stats');
        return false;
      }
    } catch (err) {
      console.error('❌ Error updating user stats:', err);
      setError('Failed to update user stats');
      return false;
    }
  };

  // Update hearts specifically
  const updateHearts = async (hearts: number) => {
    return await updateUserStats({ hearts });
  };

  // Update diamonds specifically
  const updateDiamonds = async (diamonds: number) => {
    return await updateUserStats({ diamonds });
  };

  // Update current challenge level
  const updateChallengeLevel = async (level: string) => {
    return await updateUserStats({ currentChallengeLevel: level });
  };

  // Load user stats on mount and when user changes
  useEffect(() => {
    fetchUserStats();
  }, [user]);

  return {
    userStats,
    loading,
    error,
    fetchUserStats,
    updateUserStats,
    updateHearts,
    updateDiamonds,
    updateChallengeLevel,
    // Convenience getters
    hearts: userStats?.hearts ?? 5,
    diamonds: userStats?.diamonds ?? 0,
    currentChallengeLevel: userStats?.current_challenge_level ?? 'N5',
  };
}
