
'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import type { Deck, StatsData, Flashcard, GrammarLesson } from '@/lib/data';
import { decks as initialDecks, userStats as initialUserStats, grammarLessons as initialGrammarLessons } from '@/lib/initial-data';

const STORAGE_KEY = 'nihongo-app-data';

export interface AppData {
  decks: Deck[];
  userStats: StatsData[];
  grammarLessons: GrammarLesson[];
}

interface GlobalStateContextType {
  appData: AppData;
  isLoading: boolean;
  addDeck: (deckData: Omit<Deck, 'id' | 'cards'>) => void;
  updateDeck: (deckId: string, deckData: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  addGeneratedDeck: (deckData: Omit<Deck, 'id'>) => void;
  addCard: (deckId: string, cardData: Omit<Flashcard, 'id'>) => void;
  updateCard: (deckId: string, cardId: string, cardData: Partial<Flashcard>) => void;
  deleteCard: (deckId: string, cardId: string) => void;
  updateStats: (topic: string, masteredCount: number) => void;
  toggleGrammarLessonRead: (lessonId: string, read: boolean) => void;
  addGrammarLesson: (lessonData: Omit<GrammarLesson, 'id' | 'read'>) => void;
  updateGrammarLesson: (lessonId: string, lessonData: Partial<Omit<GrammarLesson, 'id' | 'read'>>) => void;
  deleteGrammarLesson: (lessonId: string) => void;
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
    const [appData, setAppData] = useState<AppData>({ decks: [], userStats: [], grammarLessons: [] });
    const [isLoading, setIsLoading] = useState(true);

    const loadFromLocalStorage = (): AppData => {
        try {
          const serializedState = localStorage.getItem(STORAGE_KEY);
          if (serializedState === null) {
            const initialData = { decks: initialDecks, userStats: initialUserStats, grammarLessons: initialGrammarLessons };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
            return initialData;
          }
          const storedData = JSON.parse(serializedState);
          if (storedData.decks && storedData.userStats) {
             // Ensure grammarLessons is not undefined
            if (!storedData.grammarLessons) {
                storedData.grammarLessons = initialGrammarLessons;
            }
            return storedData;
          }
        } catch (error) {
          console.error("Error loading from localStorage", error);
        }
        return { decks: initialDecks, userStats: initialUserStats, grammarLessons: initialGrammarLessons };
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
                ...prevData,
                decks: [newDeck, ...prevData.decks],
                userStats: [...prevData.userStats, newStat]
            };
        });
    }, []);
    
    const addGeneratedDeck = useCallback((deckData: Omit<Deck, 'id'>) => {
        setAppData(prevData => {
            const newDeck: Deck = {
                ...deckData,
                id: `deck-${Date.now()}`,
                cards: deckData.cards.map(card => ({...card, id: `card-${Date.now()}-${Math.random()}`}))
            };
            const newStat: StatsData = {
                topic: newDeck.title,
                progress: 0,
                total: newDeck.cards.length,
            };
             return {
                ...prevData,
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
                    stat.topic === originalDeck.title ? { ...stat, topic: deckData.title ?? originalDeck.title } : stat
                );
            }
            
            if(deckData.cards){
                const deck = updatedDecks.find(d => d.id === deckId);
                if(deck){
                     updatedStats = updatedStats.map(stat =>
                        stat.topic === deck.title ? { ...stat, total: deck.cards.length } : stat
                    );
                }
            }

            return {
                ...prevData,
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
            ...prevData,
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

    const addCard = useCallback((deckId: string, cardData: Omit<Flashcard, 'id'>) => {
        setAppData(prevData => {
            const newCard: Flashcard = {
                ...cardData,
                id: `card-${Date.now()}`
            };
            const updatedDecks = prevData.decks.map(deck => {
                if (deck.id === deckId) {
                    return { ...deck, cards: [...deck.cards, newCard] };
                }
                return deck;
            });
            const deck = updatedDecks.find(d => d.id === deckId);
            const updatedStats = prevData.userStats.map(stat => {
                if(deck && stat.topic === deck.title){
                    return {...stat, total: deck.cards.length}
                }
                return stat;
            })
            return { ...prevData, decks: updatedDecks, userStats: updatedStats };
        });
    }, []);

    const updateCard = useCallback((deckId: string, cardId: string, cardData: Partial<Flashcard>) => {
        setAppData(prevData => ({
            ...prevData,
            decks: prevData.decks.map(deck => {
                if (deck.id === deckId) {
                    return {
                        ...deck,
                        cards: deck.cards.map(card =>
                            card.id === cardId ? { ...card, ...cardData } : card
                        )
                    };
                }
                return deck;
            })
        }));
    }, []);

    const deleteCard = useCallback((deckId: string, cardId: string) => {
        setAppData(prevData => {
            const updatedDecks = prevData.decks.map(deck => {
                if (deck.id === deckId) {
                    return {
                        ...deck,
                        cards: deck.cards.filter(card => card.id !== cardId)
                    };
                }
                return deck;
            });
            const deck = updatedDecks.find(d => d.id === deckId);
            const updatedStats = prevData.userStats.map(stat => {
                if(deck && stat.topic === deck.title){
                    return {...stat, total: deck.cards.length}
                }
                return stat;
            })
            return { ...prevData, decks: updatedDecks, userStats: updatedStats };
        });
    }, []);

    const toggleGrammarLessonRead = useCallback((lessonId: string, read: boolean) => {
        setAppData(prevData => ({
            ...prevData,
            grammarLessons: prevData.grammarLessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, read } : lesson
            ),
        }));
    }, []);

    const addGrammarLesson = useCallback((lessonData: Omit<GrammarLesson, 'id' | 'read'>) => {
        setAppData(prevData => {
            const newLesson: GrammarLesson = {
                ...lessonData,
                id: `gl-${Date.now()}`,
                read: false,
            };
            return {
                ...prevData,
                grammarLessons: [newLesson, ...prevData.grammarLessons],
            };
        });
    }, []);

    const updateGrammarLesson = useCallback((lessonId: string, lessonData: Partial<Omit<GrammarLesson, 'id' | 'read'>>) => {
        setAppData(prevData => ({
            ...prevData,
            grammarLessons: prevData.grammarLessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, ...lessonData } : lesson
            ),
        }));
    }, []);

    const deleteGrammarLesson = useCallback((lessonId: string) => {
        setAppData(prevData => ({
            ...prevData,
            grammarLessons: prevData.grammarLessons.filter(lesson => lesson.id !== lessonId),
        }));
    }, []);


    return {
        appData,
        isLoading,
        addDeck,
        updateDeck,
        deleteDeck,
        addGeneratedDeck,
        addCard,
        updateCard,
        deleteCard,
        updateStats,
        toggleGrammarLessonRead,
        addGrammarLesson,
        updateGrammarLesson,
        deleteGrammarLesson,
    };
};
