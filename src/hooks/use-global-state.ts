
'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import type { Deck, StatsData } from '@/lib/data';
import { decks as initialDecks, userStats as initialUserStats } from '@/lib/initial-data';

const STORAGE_KEY = 'nihongo-app-data';

export interface AppData {
  decks: Deck[];
  userStats: StatsData[];
}

interface GlobalStateContextType {
  appData: AppData;
  isLoading: boolean;
  addDeck: (deckData: Omit<Deck, 'id' | 'cards'>) => void;
  updateDeck: (deckId: string, deckData: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  updateStats: (topic: string, masteredCount: number) => void;
}

export const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const useGlobalStateData = () => {
    const [appData, setAppData] = useState<AppData>({ decks: [], userStats: [] });
    const [isLoading, setIsLoading] = useState(true);

    const loadFromLocalStorage = (): AppData => {
        try {
          const serializedState = localStorage.getItem(STORAGE_KEY);
          if (serializedState === null) {
            const initialData = { decks: initialDecks, userStats: initialUserStats };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
            return initialData;
          }
          const storedData = JSON.parse(serializedState);
          if (storedData.decks && storedData.userStats) {
            return storedData;
          }
        } catch (error) {
          console.error("Error loading from localStorage", error);
        }
        return { decks: initialDecks, userStats: initialUserStats };
    };

    useEffect(() => {
        const data = loadFromLocalStorage();
        setAppData(data);
        setIsLoading(false);

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY && event.newValue) {
                setAppData(JSON.parse(event.newValue));
            }
        };
        
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
          try {
            const serializedState = JSON.stringify(appData);
            localStorage.setItem(STORAGE_KEY, serializedState);
          } catch (error) {
            console.error("Error saving to localStorage", error);
          }
        }
    }, [appData, isLoading]);

    const addDeck = useCallback((deckData: Omit<Deck, 'id' | 'cards'>) => {
        setAppData(prevData => {
            const newDeck: Deck = {
                ...deckData,
                id: `deck-${Date.now()}`,
                cards: []
            };
            const newStat: StatsData = {
                topic: newDeck.title,
                progress: 0,
                total: 0,
            };
            return {
                decks: [newDeck, ...prevData.decks],
                userStats: [...prevData.userStats, newStat]
            };
        });
    }, []);

    const updateDeck = useCallback((deckId: string, deckData: Partial<Deck>) => {
        setAppData(prevData => {
            const originalDeck = prevData.decks.find(d => d.id === deckId);
            if (!originalDeck) return prevData;

            const updatedDecks = prevData.decks.map(d =>
                d.id === deckId ? { ...d, ...deckData } : d
            );

            let updatedStats = prevData.userStats;
            if (deckData.title && originalDeck.title !== deckData.title) {
                updatedStats = updatedStats.map(stat =>
                    stat.topic === originalDeck.title ? { ...stat, topic: deckData.title } : stat
                );
            }

            return {
                decks: updatedDecks,
                userStats: updatedStats
            };
        });
    }, []);

    const deleteDeck = useCallback((deckId: string) => {
        setAppData(prevData => {
          const deckToDelete = prevData.decks.find(d => d.id === deckId);
          if (!deckToDelete) return prevData;

          return {
            decks: prevData.decks.filter(d => d.id !== deckId),
            userStats: prevData.userStats.filter(s => s.topic !== deckToDelete.title)
          };
        });
    }, []);

    const updateStats = useCallback((topic: string, masteredCount: number) => {
        setAppData(prevData => {
            const deck = prevData.decks.find(d => d.title === topic);
            const total = deck ? deck.cards.length : 0;
            return {
                ...prevData,
                userStats: prevData.userStats.map(stat =>
                    stat.topic === topic ? { ...stat, progress: masteredCount, total } : stat
                )
            };
        });
    }, []);

    return {
        appData,
        isLoading,
        addDeck,
        updateDeck,
        deleteDeck,
        updateStats,
    };
};
