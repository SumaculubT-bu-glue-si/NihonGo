"use client";

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import type {
  Deck,
  StatsData,
  Flashcard,
  GrammarLesson,
  Quiz,
  QuizScore,
  QuizQuestion,
  ChallengeProgress,
} from "@/lib/data";
import {
  decks as initialDecks,
  userStats as initialUserStats,
  grammarLessons as initialGrammarLessons,
  initialQuizzes,
  challengeData as initialChallengeData,
} from "@/lib/initial-data";
import { useAuth } from "@/contexts/auth-context-sqlite";
import type { CheckGrammarOutput } from "@/ai/flows/grammar-checker-flow";

const USER_DATA_STORAGE_KEY_PREFIX = "nihongo-app-data";
const AB_TEST_STORAGE_KEY = "nihongo-ab-variants";
const HEART_REGEN_MINUTES = 30;

export type ChallengeData = typeof initialChallengeData;
export type GrammarCheckHistoryItem = CheckGrammarOutput & {
  inputText: string;
};

export interface AppData {
  decks: Deck[];
  userStats: StatsData[];
  grammarLessons: GrammarLesson[];
  quizzes: Quiz[];
  quizScores: QuizScore[];
  favoriteGrammarLessons: string[];
  challengeData: ChallengeData;
  challengeProgress: ChallengeProgress;
  hearts: number;
  diamonds: number;
  lastHeartLossTimestamp: number | null;
  currentChallengeLevel: "N5" | "N4" | "N3" | "N2" | "N1";
  grammarCheckHistory: GrammarCheckHistoryItem[];
}

export interface FullAppData {
  [userId: string]: AppData;
}

interface ActiveVariants {
  home: "A" | "B";
  grammar: "A" | "B";
  dictionary: "A" | "B";
  quizzes: "A" | "B";
  dashboard: "A" | "B";
}

interface GlobalStateContextType {
  appData: AppData & { activeVariants: ActiveVariants };
  allUsersData: FullAppData;
  isLoading: boolean;
  addDeck: (deckData: Omit<Deck, "id" | "cards">) => void;
  updateDeck: (deckId: string, deckData: Partial<Deck>) => void;
  deleteDeck: (deckId: string) => void;
  addGeneratedDeck: (deckData: Omit<Deck, "id">) => void;
  addCard: (deckId: string, cardData: Omit<Flashcard, "id">) => Flashcard;
  updateCard: (
    deckId: string,
    cardId: string,
    cardData: Partial<Flashcard>
  ) => void;
  deleteCard: (deckId: string, cardId: string) => void;
  addGeneratedCards: (
    deckId: string,
    newCards: Omit<Flashcard, "id">[]
  ) => Flashcard[];
  updateStats: (topic: string, masteredCount: number) => void;
  toggleGrammarLessonRead: (lessonId: string, read: boolean) => void;
  toggleGrammarLessonFavorite: (lessonId: string) => void;
  updateQuizScore: (quizId: string, score: number) => void;
  addQuiz: (quizData: Omit<Quiz, "id" | "questions">) => Quiz;
  updateQuiz: (quizId: string, quizData: Partial<Quiz>) => void;
  deleteQuiz: (quizId: string) => void;
  addQuestionToQuiz: (
    quizId: string,
    questionData: Omit<QuizQuestion, "id">
  ) => void;
  updateQuestionInQuiz: (
    quizId: string,
    questionId: string,
    questionData: Partial<QuizQuestion>
  ) => void;
  deleteQuestionFromQuiz: (quizId: string, questionId: string) => void;
  addGeneratedQuiz: (quizData: Omit<Quiz, "id">) => void;
  completeChallengeNode: (nodeId: string) => void;
  loseHeart: () => void;
  addHeart: () => void;
  addDiamonds: (amount: number) => void;
  purchaseHearts: (heartsToBuy: number, cost: number) => boolean;
  addGrammarCheckToHistory: (item: GrammarCheckHistoryItem) => void;
  clearGrammarCheckHistory: () => void;
  setActiveVariants: (variants: ActiveVariants) => void;
  setCurrentChallengeLevel: (level: "N5" | "N4" | "N3" | "N2" | "N1") => void;
}

export const GlobalStateContext = createContext<
  GlobalStateContextType | undefined
>(undefined);

export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

const getInitialUserData = (): AppData => ({
  decks: initialDecks,
  userStats: initialUserStats,
  grammarLessons: initialGrammarLessons,
  quizzes: initialQuizzes,
  quizScores: [],
  favoriteGrammarLessons: [],
  challengeData: initialChallengeData,
  challengeProgress: {},
  hearts: 5,
  diamonds: 100,
  lastHeartLossTimestamp: null,
  currentChallengeLevel: "N5",
  grammarCheckHistory: [],
});

const getInitialVariants = (): ActiveVariants => ({
  home: "A",
  grammar: "A",
  dictionary: "A",
  quizzes: "A",
  dashboard: "A",
});

export const useGlobalStateData = () => {
  const { user } = useAuth();
  const [fullAppData, setFullAppData] = useState<FullAppData>({});
  const [activeVariants, setActiveVariants] = useState<ActiveVariants>(
    getInitialVariants()
  );
  const [isLoading, setIsLoading] = useState(true);

  const currentUserData = user
    ? fullAppData[user.id] || getInitialUserData()
    : getInitialUserData();

  // Load all data from localStorage on mount
  useEffect(() => {
    try {
      // Load user-specific data
      const serializedUserData = localStorage.getItem(
        USER_DATA_STORAGE_KEY_PREFIX
      );
      if (serializedUserData) {
        const parsedData: FullAppData = JSON.parse(serializedUserData);
        // Ensure all users have the latest data structure
        Object.keys(parsedData).forEach((userId) => {
          parsedData[userId] = {
            ...getInitialUserData(),
            ...parsedData[userId],
          };
        });
        setFullAppData(parsedData);
      }

      // Load global A/B variant data
      const serializedVariantData = localStorage.getItem(AB_TEST_STORAGE_KEY);
      if (serializedVariantData) {
        setActiveVariants(JSON.parse(serializedVariantData));
      }
    } catch (error) {
      console.error("Error loading data from localStorage", error);
    }
    setIsLoading(false);
  }, []);

  // Save user-specific data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        const serializedState = JSON.stringify(fullAppData);
        localStorage.setItem(USER_DATA_STORAGE_KEY_PREFIX, serializedState);
      } catch (error) {
        console.error("Error saving user data to localStorage", error);
      }
    }
  }, [fullAppData, isLoading]);

  // Save global A/B variant data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        const serializedState = JSON.stringify(activeVariants);
        localStorage.setItem(AB_TEST_STORAGE_KEY, serializedState);
      } catch (error) {
        console.error("Error saving variant data to localStorage", error);
      }
    }
  }, [activeVariants, isLoading]);

  // Helper to update state for the current user
  const setCurrentUserData = useCallback(
    (updater: (prevData: AppData) => AppData) => {
      if (!user) return;
      setFullAppData((prevFullData) => ({
        ...prevFullData,
        [user.id]: updater(prevFullData[user.id] || getInitialUserData()),
      }));
    },
    [user]
  );

  const addHeart = useCallback(() => {
    setCurrentUserData((prev) => {
      if (prev.hearts >= 5) {
        return { ...prev, lastHeartLossTimestamp: null };
      }
      return {
        ...prev,
        hearts: prev.hearts + 1,
        lastHeartLossTimestamp: Date.now(),
      };
    });
  }, [setCurrentUserData]);

  useEffect(() => {
    if (!user || !currentUserData) return;

    const timer = setInterval(() => {
      if (
        currentUserData.hearts < 5 &&
        currentUserData.lastHeartLossTimestamp
      ) {
        const thirtyMinutes = HEART_REGEN_MINUTES * 60 * 1000;
        const timePassed = Date.now() - currentUserData.lastHeartLossTimestamp;

        if (timePassed >= thirtyMinutes) {
          addHeart();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [user, currentUserData, addHeart]);

  const addDeck = useCallback(
    (deckData: Omit<Deck, "id" | "cards">) => {
      setCurrentUserData((prevData) => {
        const newDeck: Deck = {
          ...deckData,
          id: `deck-${Date.now()}`,
          cards: [],
        };
        const newStat: StatsData = {
          topic: newDeck.title,
          progress: 0,
          total: 0,
        };
        return {
          ...prevData,
          decks: [newDeck, ...prevData.decks],
          userStats: [...prevData.userStats, newStat],
        };
      });
    },
    [setCurrentUserData]
  );

  const addGeneratedDeck = useCallback(
    (deckData: Omit<Deck, "id">) => {
      setCurrentUserData((prevData) => {
        const newDeck: Deck = {
          ...deckData,
          id: `deck-${Date.now()}`,
          cards: deckData.cards.map((card) => ({
            ...card,
            id: `card-${Date.now()}-${Math.random()}`,
          })),
        };
        const newStat: StatsData = {
          topic: newDeck.title,
          progress: 0,
          total: newDeck.cards.length,
        };
        return {
          ...prevData,
          decks: [newDeck, ...prevData.decks],
          userStats: [...prevData.userStats, newStat],
        };
      });
    },
    [setCurrentUserData]
  );

  const updateDeck = useCallback(
    (deckId: string, deckData: Partial<Deck>) => {
      setCurrentUserData((prevData) => {
        const originalDeck = prevData.decks.find((d) => d.id === deckId);
        if (!originalDeck) return prevData;

        const updatedDecks = prevData.decks.map((d) =>
          d.id === deckId ? { ...d, ...deckData } : d
        );

        let updatedStats = prevData.userStats;
        if (deckData.title && originalDeck.title !== deckData.title) {
          updatedStats = updatedStats.map((stat) =>
            stat.topic === originalDeck.title
              ? { ...stat, topic: deckData.title ?? originalDeck.title }
              : stat
          );
        }

        if (deckData.cards) {
          const deck = updatedDecks.find((d) => d.id === deckId);
          if (deck) {
            updatedStats = updatedStats.map((stat) =>
              stat.topic === deck.title
                ? { ...stat, total: deck.cards.length }
                : stat
            );
          }
        }

        return {
          ...prevData,
          decks: updatedDecks,
          userStats: updatedStats,
        };
      });
    },
    [setCurrentUserData]
  );

  const deleteDeck = useCallback(
    (deckId: string) => {
      setCurrentUserData((prevData) => {
        const deckToDelete = prevData.decks.find((d) => d.id === deckId);
        if (!deckToDelete) return prevData;

        return {
          ...prevData,
          decks: prevData.decks.filter((d) => d.id !== deckId),
          userStats: prevData.userStats.filter(
            (s) => s.topic !== deckToDelete.title
          ),
        };
      });
    },
    [setCurrentUserData]
  );

  const updateStats = useCallback(
    (topic: string, masteredCount: number) => {
      setCurrentUserData((prevData) => {
        const deck = prevData.decks.find((d) => d.title === topic);
        const total = deck ? deck.cards.length : 0;
        return {
          ...prevData,
          userStats: prevData.userStats.map((stat) =>
            stat.topic === topic
              ? { ...stat, progress: masteredCount, total }
              : stat
          ),
        };
      });
    },
    [setCurrentUserData]
  );

  const addCard = useCallback(
    (deckId: string, cardData: Omit<Flashcard, "id">) => {
      const newCard: Flashcard = {
        ...cardData,
        id: `card-${Date.now()}`,
      };
      setCurrentUserData((prevData) => {
        const updatedDecks = prevData.decks.map((deck) => {
          if (deck.id === deckId) {
            return { ...deck, cards: [...deck.cards, newCard] };
          }
          return deck;
        });
        const deck = updatedDecks.find((d) => d.id === deckId);
        const updatedStats = prevData.userStats.map((stat) => {
          if (deck && stat.topic === deck.title) {
            return { ...stat, total: deck.cards.length };
          }
          return stat;
        });
        return { ...prevData, decks: updatedDecks, userStats: updatedStats };
      });
      return newCard;
    },
    [setCurrentUserData]
  );

  const updateCard = useCallback(
    (deckId: string, cardId: string, cardData: Partial<Flashcard>) => {
      setCurrentUserData((prevData) => ({
        ...prevData,
        decks: prevData.decks.map((deck) => {
          if (deck.id === deckId) {
            return {
              ...deck,
              cards: deck.cards.map((card) =>
                card.id === cardId ? { ...card, ...cardData } : card
              ),
            };
          }
          return deck;
        }),
      }));
    },
    [setCurrentUserData]
  );

  const deleteCard = useCallback(
    (deckId: string, cardId: string) => {
      setCurrentUserData((prevData) => {
        const updatedDecks = prevData.decks.map((deck) => {
          if (deck.id === deckId) {
            return {
              ...deck,
              cards: deck.cards.filter((card) => card.id !== cardId),
            };
          }
          return deck;
        });
        const deck = updatedDecks.find((d) => d.id === deckId);
        const updatedStats = prevData.userStats.map((stat) => {
          if (deck && stat.topic === deck.title) {
            return { ...stat, total: deck.cards.length };
          }
          return stat;
        });
        return { ...prevData, decks: updatedDecks, userStats: updatedStats };
      });
    },
    [setCurrentUserData]
  );

  const addGeneratedCards = useCallback(
    (deckId: string, newCards: Omit<Flashcard, "id">[]) => {
      const cardsWithIds: Flashcard[] = newCards.map((card) => ({
        ...card,
        id: `card-${Date.now()}-${Math.random()}`,
      }));

      setCurrentUserData((prevData) => {
        const updatedDecks = prevData.decks.map((deck) => {
          if (deck.id === deckId) {
            return { ...deck, cards: [...deck.cards, ...cardsWithIds] };
          }
          return deck;
        });
        const deck = updatedDecks.find((d) => d.id === deckId);
        const updatedStats = prevData.userStats.map((stat) => {
          if (deck && stat.topic === deck.title) {
            return { ...stat, total: deck.cards.length };
          }
          return stat;
        });
        return { ...prevData, decks: updatedDecks, userStats: updatedStats };
      });
      return cardsWithIds;
    },
    [setCurrentUserData]
  );

  const toggleGrammarLessonRead = useCallback(
    (lessonId: string, read: boolean) => {
      setCurrentUserData((prevData) => ({
        ...prevData,
        grammarLessons: prevData.grammarLessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, read } : lesson
        ),
      }));
    },
    [setCurrentUserData]
  );

  const toggleGrammarLessonFavorite = useCallback(
    (lessonId: string) => {
      setCurrentUserData((prevData) => {
        const newFavorites = new Set(prevData.favoriteGrammarLessons);
        if (newFavorites.has(lessonId)) {
          newFavorites.delete(lessonId);
        } else {
          newFavorites.add(lessonId);
        }
        return {
          ...prevData,
          favoriteGrammarLessons: Array.from(newFavorites),
        };
      });
    },
    [setCurrentUserData]
  );

  const updateQuizScore = useCallback(
    (quizId: string, newScore: number) => {
      setCurrentUserData((prevData) => {
        const existingScore = prevData.quizScores.find(
          (s) => s.quizId === quizId
        );
        if (existingScore) {
          if (newScore > existingScore.highestScore) {
            return {
              ...prevData,
              quizScores: prevData.quizScores.map((s) =>
                s.quizId === quizId ? { ...s, highestScore: newScore } : s
              ),
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
    },
    [setCurrentUserData]
  );

  // Quiz CRUD
  const addQuiz = useCallback(
    (quizData: Omit<Quiz, "id" | "questions">): Quiz => {
      const newQuiz: Quiz = {
        ...quizData,
        id: `quiz-${Date.now()}`,
        questions: [],
      };
      setCurrentUserData((prev) => ({
        ...prev,
        quizzes: [newQuiz, ...prev.quizzes],
      }));
      return newQuiz;
    },
    [setCurrentUserData]
  );

  const addGeneratedQuiz = useCallback(
    (quizData: Omit<Quiz, "id">) => {
      const newQuiz: Quiz = {
        ...quizData,
        id: `quiz-${Date.now()}`,
        questions: quizData.questions.map((q) => ({
          ...q,
          id: `q-${Date.now()}-${Math.random()}`,
        })),
      };
      setCurrentUserData((prev) => ({
        ...prev,
        quizzes: [newQuiz, ...prev.quizzes],
      }));
    },
    [setCurrentUserData]
  );

  const updateQuiz = useCallback(
    (quizId: string, quizData: Partial<Quiz>) => {
      setCurrentUserData((prev) => ({
        ...prev,
        quizzes: prev.quizzes.map((q) =>
          q.id === quizId ? { ...q, ...quizData } : q
        ),
      }));
    },
    [setCurrentUserData]
  );

  const deleteQuiz = useCallback(
    (quizId: string) => {
      setCurrentUserData((prev) => ({
        ...prev,
        quizzes: prev.quizzes.filter((q) => q.id !== quizId),
        quizScores: prev.quizScores.filter((qs) => qs.quizId !== quizId),
      }));
    },
    [setCurrentUserData]
  );

  // Question CRUD (within a quiz)
  const addQuestionToQuiz = useCallback(
    (quizId: string, questionData: Omit<QuizQuestion, "id">) => {
      const newQuestion: QuizQuestion = {
        ...questionData,
        id: `q-${Date.now()}`,
      };
      setCurrentUserData((prev) => ({
        ...prev,
        quizzes: prev.quizzes.map((q) =>
          q.id === quizId
            ? { ...q, questions: [...q.questions, newQuestion] }
            : q
        ),
      }));
    },
    [setCurrentUserData]
  );

  const updateQuestionInQuiz = useCallback(
    (
      quizId: string,
      questionId: string,
      questionData: Partial<QuizQuestion>
    ) => {
      setCurrentUserData((prev) => ({
        ...prev,
        quizzes: prev.quizzes.map((q) =>
          q.id === quizId
            ? {
                ...q,
                questions: q.questions.map((qu) =>
                  qu.id === questionId ? { ...qu, ...questionData } : qu
                ),
              }
            : q
        ),
      }));
    },
    [setCurrentUserData]
  );

  const deleteQuestionFromQuiz = useCallback(
    (quizId: string, questionId: string) => {
      setCurrentUserData((prev) => ({
        ...prev,
        quizzes: prev.quizzes.map((q) =>
          q.id === quizId
            ? {
                ...q,
                questions: q.questions.filter((qu) => qu.id !== questionId),
              }
            : q
        ),
      }));
    },
    [setCurrentUserData]
  );

  const completeChallengeNode = useCallback(
    (nodeId: string) => {
      const [level, unitId, stageId] = nodeId.split("|");
      setCurrentUserData((prev) => {
        const newProgress = { ...prev.challengeProgress };
        if (!newProgress[level]) newProgress[level] = {};
        if (!newProgress[level][unitId]) newProgress[level][unitId] = {};
        newProgress[level][unitId][stageId] = "completed";

        return {
          ...prev,
          challengeProgress: newProgress,
        };
      });
    },
    [setCurrentUserData]
  );

  const loseHeart = useCallback(() => {
    setCurrentUserData((prev) => {
      if (prev.hearts === 0) return prev;
      const newHearts = prev.hearts - 1;
      let newTimestamp = prev.lastHeartLossTimestamp;
      // Set timestamp only when the timer isn't already running (i.e., when going from 5 to 4 hearts)
      if (prev.hearts === 5) {
        newTimestamp = Date.now();
      }
      return {
        ...prev,
        hearts: newHearts,
        lastHeartLossTimestamp: newTimestamp,
      };
    });
  }, [setCurrentUserData]);

  const addDiamonds = useCallback(
    (amount: number) => {
      setCurrentUserData((prev) => ({
        ...prev,
        diamonds: (prev.diamonds || 0) + amount,
      }));
    },
    [setCurrentUserData]
  );

  const purchaseHearts = useCallback(
    (heartsToBuy: number, cost: number): boolean => {
      let success = false;
      setCurrentUserData((prev) => {
        if (prev.diamonds >= cost && prev.hearts < 5) {
          success = true;
          const newHearts = Math.min(5, prev.hearts + heartsToBuy);
          // If hearts are now full, clear the timer timestamp
          const newTimestamp =
            newHearts === 5 ? null : prev.lastHeartLossTimestamp;
          return {
            ...prev,
            diamonds: prev.diamonds - cost,
            hearts: newHearts,
            lastHeartLossTimestamp: newTimestamp,
          };
        }
        return prev;
      });
      return success;
    },
    [setCurrentUserData]
  );

  const setCurrentChallengeLevel = useCallback(
    (level: "N5" | "N4" | "N3" | "N2" | "N1") => {
      setCurrentUserData((prev) => ({
        ...prev,
        currentChallengeLevel: level,
      }));
    },
    [setCurrentUserData]
  );

  const addGrammarCheckToHistory = useCallback(
    (item: GrammarCheckHistoryItem) => {
      setCurrentUserData((prev) => ({
        ...prev,
        // Add to the beginning of the array and keep the last 20 items
        grammarCheckHistory: [
          {
            ...item,
            isCorrect: item.isCorrect,
            correctedText: item.correctedText,
            explanation: item.explanation,
            examples: item.examples,
          },
          ...prev.grammarCheckHistory,
        ].slice(0, 20),
      }));
    },
    [setCurrentUserData]
  );

  const clearGrammarCheckHistory = useCallback(() => {
    setCurrentUserData((prev) => ({
      ...prev,
      grammarCheckHistory: [],
    }));
  }, [setCurrentUserData]);

  return {
    appData: { ...currentUserData, activeVariants },
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
    toggleGrammarLessonFavorite,
    updateQuizScore,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    addQuestionToQuiz,
    updateQuestionInQuiz,
    deleteQuestionFromQuiz,
    addGeneratedQuiz,
    completeChallengeNode,
    loseHeart,
    addHeart,
    addDiamonds,
    purchaseHearts,
    addGrammarCheckToHistory,
    clearGrammarCheckHistory,
    setActiveVariants,
    setCurrentChallengeLevel,
  };
};
