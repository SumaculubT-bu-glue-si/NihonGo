import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/lib/api';

export interface ChallengeProgress {
    [level: string]: {
        [unitId: string]: {
            [stageId: string]: 'completed' | 'active' | 'locked';
        }
    }
}

export function useChallengeProgress() {
    const [progress, setProgress] = useState<ChallengeProgress>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProgress = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiService.getChallengeProgress();

            if (response.error) {
                setError(response.error);
                return;
            }

            if (response.data?.progress) {
                setProgress(response.data.progress);
            }
        } catch (err) {
            console.error('Failed to fetch challenge progress:', err);
            setError('Failed to load challenge progress');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProgress = useCallback(async (
        level: string,
        unitId: string,
        stageId: string,
        status: 'completed' | 'active' | 'locked'
    ) => {
        try {
            const response = await apiService.updateChallengeProgress(level, unitId, stageId, status);

            if (response.error) {
                console.error('Failed to update challenge progress:', response.error);
                return false;
            }

            // Update local state immediately for smooth UX
            setProgress(prev => ({
                ...prev,
                [level]: {
                    ...prev[level],
                    [unitId]: {
                        ...prev[level]?.[unitId],
                        [stageId]: status
                    }
                }
            }));

            return true;
        } catch (err) {
            console.error('Failed to update challenge progress:', err);
            return false;
        }
    }, []);

    // Fetch progress on mount
    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    return {
        progress,
        loading,
        error,
        fetchProgress,
        updateProgress
    };
} 