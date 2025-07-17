
'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import type { Deck, StatsData, Flashcard, GrammarLesson, Quiz, QuizScore, QuizQuestion } from '@/lib/data';
import { decks as initialDecks, userStats as initialUserStats, grammarLessons as initialGrammarLessons, initialQuizzes } from '@/lib/initial-data';
import { useAuth } from '@/contexts/auth-context';

const STORAGE_KEY_PREFIX = 'nihongo-app-data';

export interface AppData {
  decks: Deck[];
  userStats: StatsData[];
  grammarLessons: GrammarLesson[];
  quizzes: Quiz[];
  quizScores: QuizScore[];
}

export interface FullAppData {
  [userId: string]: AppData;
}

interface GlobalStateContextType {
  appData: AppData;
  allUsersData: FullAppData;
  isLoading: boolean;
  addDeck: (deckData: Omit<Deck, 'id' | 'cards'>) => void;
  updateDeck: (deckId: string, deckData: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  addGeneratedDeck: (deckData: Omit<Deck, 'id'>) => void;
  addCard: (deckId: string, cardData: Omit<Flashcard, 'id'>) => Flashcard;
  updateCard: (deckId: string, cardId: string, cardData: Partial<Flashcard>) => void;
  deleteCard: (deckId: string, cardId: string) => void;
  addGeneratedCards: (deckId: string, newCards: Omit<Flashcard, 'id'>[]) => Flashcard[];
  updateStats: (topic: string, masteredCount: number) => void;
  toggleGrammarLessonRead: (lessonId: string, read: boolean) => void;
  addGrammarLesson: (lessonData: Omit<GrammarLesson, 'id' | 'read'>) => void;
  updateGrammarLesson: (lessonId: string, lessonData: Partial<Omit<GrammarLesson, 'id' | 'read'>>) => void;
  deleteGrammarLesson: (lessonId: string) => void;
  updateQuizScore: (quizId: string, score: number) => void;
  addQuiz: (quizData: Omit<Quiz, 'id' | 'questions'>) => Quiz;
  updateQuiz: (quizId: string, quizData: Partial<Quiz>) => void;
  deleteQuiz: (quizId: string) => void;
  addQuestionToQuiz: (quizId: string, questionData: Omit<QuizQuestion, 'id'>) => void;
  updateQuestionInQuiz: (quizId: string, questionId: string, questionData: Partial<QuizQuestion>) => void;
  deleteQuestionFromQuiz: (quizId: string, questionId: string) => void;
  addGeneratedQuiz: (quizData: Omit<Quiz, 'id'>) => void;
}

export const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

const getInitialData = (): AppData => ({
    decks: initialDecks,
    userStats: initialUserStats,
    grammarLessons: initialGrammarLessons,
    quizzes: initialQuizzes,
    quizScores: [],
});


export const useGlobalStateData = () => {
    const { user } = useAuth();
    const [fullAppData, setFullAppData] = useState<FullAppData>({});
    const [isLoading, setIsLoading] = useState(true);

    const currentUserData = user ? fullAppData[user.uid] || getInitialData() : getInitialData();

    // Load all user data from localStorage on mount
    useEffect(() => {
        try {
            const serializedState = localStorage.getItem(STORAGE_KEY_PREFIX);
            if (serializedState) {
                setFullAppData(JSON.parse(serializedState));
            }
        } catch (error) {
            console.error("Error loading all user data from localStorage", error);
        }
        setIsLoading(false);
    }, []);

    // Save all user data to localStorage whenever it changes
    useEffect(() => {
        if (!isLoading) {
            try {
                const serializedState = JSON.stringify(fullAppData);
                localStorage.setItem(STORAGE_KEY_PREFIX, serializedState);
            } catch (error) {
                console.error("Error saving all user data to localStorage", error);
            }
        }
    }, [fullAppData, isLoading]);

    // Helper to update state for the current user
    const setCurrentUserData = useCallback((updater: (prevData: AppData) => AppData) => {
        if (!user) return;
        setFullAppData(prevFullData => ({
            ...prevFullData,
            [user.uid]: updater(prevFullData[user.uid] || getInitialData()),
        }));
    }, [user]);

    const addDeck = useCallback((deckData: Omit<Deck, 'id' | 'cards'>) => {
        setCurrentUserData(prevData => {
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
    }, [setCurrentUserData]);
    
    const addGeneratedDeck = useCallback((deckData: Omit<Deck, 'id'>) => {
        setCurrentUserData(prevData => {
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
    }, [setCurrentUserData]);

    const updateDeck = useCallback((deckId: string, deckData: Partial<Deck>) => {
        setCurrentUserData(prevData => {
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
    }, [setCurrentUserData]);

    const deleteDeck = useCallback((deckId: string) => {
        setCurrentUserData(prevData => {
          const deckToDelete = prevData.decks.find(d => d.id === deckId);
          if (!deckToDelete) return prevData;

          return {
            ...prevData,
            decks: prevData.decks.filter(d => d.id !== deckId),
            userStats: prevData.userStats.filter(s => s.topic !== deckToDelete.title)
          };
        });
    }, [setCurrentUserData]);

    const updateStats = useCallback((topic: string, masteredCount: number) => {
        setCurrentUserData(prevData => {
            const deck = prevData.decks.find(d => d.title === topic);
            const total = deck ? deck.cards.length : 0;
            return {
                ...prevData,
                userStats: prevData.userStats.map(stat =>
                    stat.topic === topic ? { ...stat, progress: masteredCount, total } : stat
                )
            };
        });
    }, [setCurrentUserData]);

    const addCard = useCallback((deckId: string, cardData: Omit<Flashcard, 'id'>) => {
        const newCard: Flashcard = {
            ...cardData,
            id: `card-${Date.now()}`
        };
        setCurrentUserData(prevData => {
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
        return newCard;
    }, [setCurrentUserData]);

    const updateCard = useCallback((deckId: string, cardId: string, cardData: Partial<Flashcard>) => {
        setCurrentUserData(prevData => ({
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
    }, [setCurrentUserData]);

    const deleteCard = useCallback((deckId: string, cardId: string) => {
        setCurrentUserData(prevData => {
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
    }, [setCurrentUserData]);

    const addGeneratedCards = useCallback((deckId: string, newCards: Omit<Flashcard, 'id'>[]) => {
        const cardsWithIds: Flashcard[] = newCards.map(card => ({
            ...card,
            id: `card-${Date.now()}-${Math.random()}`
        }));
        
        setCurrentUserData(prevData => {
            const updatedDecks = prevData.decks.map(deck => {
                if (deck.id === deckId) {
                    return { ...deck, cards: [...deck.cards, ...cardsWithIds] };
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
        return cardsWithIds;
    }, [setCurrentUserData]);

    const toggleGrammarLessonRead = useCallback((lessonId: string, read: boolean) => {
        setCurrentUserData(prevData => ({
            ...prevData,
            grammarLessons: prevData.grammarLessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, read } : lesson
            ),
        }));
    }, [setCurrentUserData]);

    const addGrammarLesson = useCallback((lessonData: Omit<GrammarLesson, 'id' | 'read'>) => {
        setCurrentUserData(prevData => {
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
    }, [setCurrentUserData]);

    const updateGrammarLesson = useCallback((lessonId: string, lessonData: Partial<Omit<GrammarLesson, 'id' | 'read'>>) => {
        setCurrentUserData(prevData => ({
            ...prevData,
            grammarLessons: prevData.grammarLessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, ...lessonData } : lesson
            ),
        }));
    }, [setCurrentUserData]);

    const deleteGrammarLesson = useCallback((lessonId: string) => {
        setCurrentUserData(prevData => ({
            ...prevData,
            grammarLessons: prevData.grammarLessons.filter(lesson => lesson.id !== lessonId),
        }));
    }, [setCurrentUserData]);

    const updateQuizScore = useCallback((quizId: string, newScore: number) => {
        setCurrentUserData(prevData => {
            const existingScore = prevData.quizScores.find(s => s.quizId === quizId);
            if (existingScore) {
                if (newScore > existingScore.highestScore) {
                    return {
                        ...prevData,
                        quizScores: prevData.quizScores.map(s => s.quizId === quizId ? { ...s, highestScore: newScore } : s),
                    };
                }
            } else {
                const newScoreEntry: QuizScore = { quizId, highestScore: newScore };
                return {
                    ...prevData,
                    quizScores: [...prevData.quizScores, newScoreEntry],
                };
            }
            return prevData;
        });
    }, [setCurrentUserData]);

    // Quiz CRUD
    const addQuiz = useCallback((quizData: Omit<Quiz, 'id' | 'questions'>): Quiz => {
      const newQuiz: Quiz = {
        ...quizData,
        id: `quiz-${Date.now()}`,
        questions: [],
      };
      setCurrentUserData(prev => ({
        ...prev,
        quizzes: [newQuiz, ...prev.quizzes],
      }));
      return newQuiz;
    }, [setCurrentUserData]);

    const addGeneratedQuiz = useCallback((quizData: Omit<Quiz, 'id'>) => {
        const newQuiz: Quiz = {
            ...quizData,
            id: `quiz-${Date.now()}`,
            questions: quizData.questions.map(q => ({...q, id: `q-${Date.now()}-${Math.random()}`}))
        };
        setCurrentUserData(prev => ({
            ...prev,
            quizzes: [newQuiz, ...prev.quizzes],
        }));
    }, [setCurrentUserData]);

    const updateQuiz = useCallback((quizId: string, quizData: Partial<Quiz>) => {
      setCurrentUserData(prev => ({
        ...prev,
        quizzes: prev.quizzes.map(q => q.id === quizId ? { ...q, ...quizData } : q),
      }));
    }, [setCurrentUserData]);

    const deleteQuiz = useCallback((quizId: string) => {
      setCurrentUserData(prev => ({
        ...prev,
        quizzes: prev.quizzes.filter(q => q.id !== quizId),
        quizScores: prev.quizScores.filter(qs => qs.quizId !== quizId),
      }));
    }, [setCurrentUserData]);

    // Question CRUD (within a quiz)
    const addQuestionToQuiz = useCallback((quizId: string, questionData: Omit<QuizQuestion, 'id'>) => {
        const newQuestion: QuizQuestion = {
            ...questionData,
            id: `q-${Date.now()}`,
        };
        setCurrentUserData(prev => ({
            ...prev,
            quizzes: prev.quizzes.map(q =>
                q.id === quizId ? { ...q, questions: [...q.questions, newQuestion] } : q
            ),
        }));
    }, [setCurrentUserData]);

    const updateQuestionInQuiz = useCallback((quizId: string, questionId: string, questionData: Partial<QuizQuestion>) => {
        setCurrentUserData(prev => ({
            ...prev,
            quizzes: prev.quizzes.map(q =>
                q.id === quizId
                    ? { ...q, questions: q.questions.map(qu => qu.id === questionId ? { ...qu, ...questionData } : qu) }
                    : q
            ),
        }));
    }, [setCurrentUserData]);

    const deleteQuestionFromQuiz = useCallback((quizId: string, questionId: string) => {
        setCurrentUserData(prev => ({
            ...prev,
            quizzes: prev.quizzes.map(q =>
                q.id === quizId
                    ? { ...q, questions: q.questions.filter(qu => qu.id !== questionId) }
                    : q
            ),
        }));
    }, [setCurrentUserData]);


    return {
        appData: currentUserData,
        allUsersData: fullAppData,
        isLoading,
        addDeck,
        updateDeck,
        deleteDeck,
        addGeneratedDeck,
        addCard,
        updateCard,
        deleteCard,
        addGeneratedCards,
        updateStats,
        toggleGrammarLessonRead,
        addGrammarLesson,
        updateGrammarLesson,
        deleteGrammarLesson,
        updateQuizScore,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        addQuestionToQuiz,
        updateQuestionInQuiz,
        deleteQuestionFromQuiz,
        addGeneratedQuiz,
    };
};
