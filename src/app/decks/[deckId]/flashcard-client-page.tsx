
'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import type { Deck, Flashcard as FlashcardType } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, RotateCw, Lightbulb, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { PronunciationButton } from '@/components/pronunciation-button';
import { SentenceGenerator } from '@/components/sentence-generator';
import Link from 'next/link';
import { useGlobalState } from '@/hooks/use-global-state';
import { useToast } from '@/hooks/use-toast';
import { CardForm, type CardFormData } from './card-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';


const Flashcard = memo(function Flashcard({
  card,
  isFlipped,
}: {
  card: FlashcardType;
  isFlipped: boolean;
}) {
  return (
    <div className={`flip-card w-full h-full ${isFlipped ? 'is-flipped' : ''}`}>
      {/* Front of the card */}
      <Card className="flip-card-front absolute w-full h-full flex flex-col items-center justify-center text-center p-6">
        {card.reading && (
          <p className="text-lg text-muted-foreground">{card.reading}</p>
        )}
        <h2 className="text-5xl md:text-7xl font-bold font-headline my-4">
          {card.front}
        </h2>
        <div className="absolute bottom-6 flex items-center gap-2">
            <PronunciationButton text={card.front} />
        </div>
      </Card>
      {/* Back of the card */}
      <Card className="flip-card-back absolute w-full h-full flex flex-col items-center justify-center text-center p-6 overflow-y-auto">
        <h3 className="text-3xl md:text-5xl font-semibold font-headline mb-4">
          {card.back}
        </h3>
        <SentenceGenerator card={card} />
      </Card>
    </div>
  );
});

export function FlashcardClientPage({ deck }: { deck: Deck }) {
  const [cardsToShow, setCardsToShow] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  
  const { appData, updateStats, isLoading, addCard, updateCard, deleteCard } = useGlobalState();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<FlashcardType | null>(null);
  const [cardToDelete, setCardToDelete] = useState<FlashcardType | null>(null);

  const getStorageKey = useCallback(() => `flashcard-session-${deck.id}`, [deck.id]);

  // Effect to initialize or load a session
  useEffect(() => {
    if (isLoading) return;

    try {
      const savedSession = localStorage.getItem(getStorageKey());
      const deckStats = appData.userStats.find(s => s.topic === deck.title);
      const initialProgress = deckStats ? deckStats.progress : 0;
      setMasteredCount(initialProgress);
      
      if (savedSession) {
        const { savedCards, savedIndex } = JSON.parse(savedSession);
        if (Array.isArray(savedCards) && typeof savedIndex === 'number') {
          setCardsToShow(savedCards);
          setCurrentIndex(savedIndex);
        } else {
          throw new Error("Invalid session data format. Starting a new session.");
        }
      } else {
        const nonMasteredCards = deck.cards.slice(initialProgress);
        setCardsToShow([...nonMasteredCards].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Could not load session from localStorage, starting fresh.", error);
      const deckStats = appData.userStats.find(s => s.topic === deck.title);
      const currentProgress = deckStats ? deckStats.progress : 0;
      setMasteredCount(currentProgress);
      const nonMasteredCards = deck.cards.slice(currentProgress);
      const shuffledCards = [...nonMasteredCards].sort(() => Math.random() - 0.5);
      setCardsToShow(shuffledCards);
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [deck.id, deck.title, deck.cards, getStorageKey, appData.userStats, isLoading]);


  // Save session to localStorage whenever state changes that defines the session
  useEffect(() => {
    if (cardsToShow.length > 0) {
      try {
        const sessionData = JSON.stringify({
          savedCards: cardsToShow,
          savedIndex: currentIndex,
        });
        localStorage.setItem(getStorageKey(), sessionData);
      } catch (error) {
        console.error("Could not save session to localStorage", error);
      }
    }
  }, [cardsToShow, currentIndex, getStorageKey]);

  // When the underlying deck data changes (e.g., from a CRUD operation), refresh the session
  useEffect(() => {
    if (!isLoading && (cardsToShow.length > 0 || deck.cards.length > 0)) {
        const deckStats = appData.userStats.find(s => s.topic === deck.title);
        const currentProgress = deckStats ? deckStats.progress : 0;

        const nonMasteredCards = deck.cards.slice(currentProgress);
        const shuffled = [...nonMasteredCards].sort(() => Math.random() - 0.5)
        setCardsToShow(shuffled);
        
        if (currentIndex >= shuffled.length && shuffled.length > 0) {
            setCurrentIndex(0);
        } else if (shuffled.length === 0) {
            setCurrentIndex(0);
        }
    }
  }, [appData.decks, appData.userStats, deck.title, isLoading, currentIndex]);
  
  // This effect safely syncs the local masteredCount with the global state after render.
  useEffect(() => {
    const deckStats = appData.userStats.find(s => s.topic === deck.title);
    if (deckStats && masteredCount !== deckStats.progress) {
      updateStats(deck.title, masteredCount);
    }
  }, [masteredCount, deck.title, updateStats, appData.userStats]);


  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (cardsToShow.length === 0) return;

    let newCardsToShow = [...cardsToShow];
    const cardToMove = newCardsToShow.splice(currentIndex, 1)[0];
    
    if (difficulty === 'easy') {
      setMasteredCount(prev => prev + 1);
        // Card is just removed from the session queue.
    } else if (difficulty === 'medium') {
        const halfway = Math.ceil((newCardsToShow.length - currentIndex) / 2) + currentIndex;
        newCardsToShow.splice(halfway, 0, cardToMove);
    } else { // 'hard'
        const position = Math.min(currentIndex + 3, newCardsToShow.length);
        newCardsToShow.splice(position, 0, cardToMove);
    }
    
    setCardsToShow(newCardsToShow);

    if (currentIndex >= newCardsToShow.length && newCardsToShow.length > 0) {
        setCurrentIndex(0);
    }
    
    setIsFlipped(false);
  };
  
  const resetSession = () => {
    try {
        localStorage.removeItem(getStorageKey());
    } catch (error) {
        console.error("Could not remove session from localStorage", error);
    }
    setMasteredCount(0);
    const shuffledCards = [...deck.cards].sort(() => Math.random() - 0.5);
    setCardsToShow(shuffledCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    updateStats(deck.title, 0); // Reset global stats too
  }
  
  const handleAddNew = () => {
    setEditingCard(null);
    setIsFormOpen(true);
  };

  const handleEdit = () => {
    if (currentCard) {
      setEditingCard(currentCard);
      setIsFormOpen(true);
    }
  };

  const handleDeleteInitiate = () => {
    if (currentCard) {
      setCardToDelete(currentCard);
    }
  };

  const handleDeleteConfirm = () => {
    if (!cardToDelete) return;

    deleteCard(deck.id, cardToDelete.id);
    
    const newCardsToShow = cardsToShow.filter(c => c.id !== cardToDelete.id);
    setCardsToShow(newCardsToShow);

    if (currentIndex >= newCardsToShow.length && newCardsToShow.length > 0) {
      setCurrentIndex(0);
    }

    toast({
      title: 'Card Deleted',
      description: 'The flashcard has been successfully deleted.',
    });
    setCardToDelete(null);
  };

  const mapDeckLevelToCardLevel = (level: Deck['level']): FlashcardType['level'] => {
    if (level === 'Beginner') return 'N5';
    if (level === 'Intermediate') return 'N3';
    if (level === 'Advanced') return 'N1';
    return 'N5';
  }

  const mapDeckCategoryToCardType = (category: Deck['category']): FlashcardType['type'] => {
    switch(category) {
        case 'Vocabulary': return 'vocabulary';
        case 'Grammar': return 'grammar';
        case 'Kanji': return 'kanji';
        case 'Phrases': return 'vocabulary';
        default: return 'vocabulary';
    }
  }

  const handleSaveCard = (data: Omit<CardFormData, 'type' | 'level'>) => {
    const cardData = {
        ...data,
        level: mapDeckLevelToCardLevel(deck.level),
        type: mapDeckCategoryToCardType(deck.category),
    };

    if (editingCard) {
      updateCard(deck.id, editingCard.id, cardData);
      
      const updatedCardsToShow = cardsToShow.map(c => c.id === editingCard.id ? { ...c, ...cardData } : c);
      setCardsToShow(updatedCardsToShow);

      toast({
        title: 'Card Updated',
        description: 'The flashcard has been successfully updated.',
      });
    } else {
      addCard(deck.id, cardData);
      toast({
        title: 'Card Created',
        description: 'A new flashcard has been added to the deck.',
      });
    }
    setIsFormOpen(false);
    setEditingCard(null);
  };


  const currentCard = cardsToShow[currentIndex];
  const totalCards = deck.cards.length;
  const progress = totalCards > 0 ? (masteredCount / totalCards) * 100 : 0;
  const sessionComplete = cardsToShow.length === 0 && totalCards > 0;
  
  useEffect(() => {
    if (sessionComplete) {
      try {
        localStorage.removeItem(getStorageKey());
      } catch (error) {
        console.error("Could not remove session from localStorage on completion", error);
      }
    }
  }, [sessionComplete, getStorageKey]);

  if (isLoading) {
    return (
        <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }

  if (sessionComplete) {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline mb-4">Deck Complete!</h1>
            <p className="text-muted-foreground mb-8">You've finished all the cards in this deck. Great job!</p>
            <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={resetSession}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Review Again
                </Button>
                <Link href="/decks" passHref>
                    <Button>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Decks
                    </Button>
                </Link>
            </div>
        </div>
    )
  }
  
  if (!currentCard) {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold font-headline mb-4">No cards to review!</h1>
            <p className="text-muted-foreground mb-8">You can add some cards to get started.</p>
             <div className="flex justify-center gap-4">
                <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add First Card
                </Button>
                <Link href="/decks" passHref>
                    <Button variant="outline">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Decks
                    </Button>
                </Link>
            </div>
             <CardForm
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSave={handleSaveCard}
                card={editingCard}
                deck={deck}
            />
        </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full mb-4">
        <div className="flex justify-between items-center mb-2">
            <Link href="/decks" className="text-sm text-primary hover:underline">
                &larr; {deck.title}
            </Link>
            <span className="text-sm text-muted-foreground">{masteredCount} / {totalCards} Mastered</span>
        </div>
        <Progress value={progress} />
      </div>

      <div
        className="w-full h-96 perspective-[1000px] mb-6"
        onClick={() => setIsFlipped(!isFlipped)}
        aria-roledescription="card"
      >
        <Flashcard card={currentCard} isFlipped={isFlipped} />
      </div>

      {!isFlipped ? (
        <Button onClick={() => setIsFlipped(true)} className="w-full md:w-1/2">
            <Lightbulb className="mr-2 h-4 w-4" />
            Show Answer
        </Button>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4">
            <Button onClick={() => handleDifficulty('hard')} variant="outline" className="w-full bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900">Hard</Button>
            <Button onClick={() => handleDifficulty('medium')} variant="outline" className="w-full bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:text-yellow-900">Medium</Button>
            <Button onClick={() => handleDifficulty('easy')} variant="outline" className="w-full bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900">Easy</Button>
        </div>
      )}

      <div className="mt-8 flex justify-between w-full text-muted-foreground text-sm">
        <span>Cards left in session: {cardsToShow.length}</span>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleAddNew} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4"/> Add
          </Button>
          <Button variant="ghost" size="sm" onClick={handleEdit} className="flex items-center gap-1">
            <Edit className="h-4 w-4"/> Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDeleteInitiate} className="flex items-center gap-1 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4"/> Delete
          </Button>
        </div>
      </div>
      <div className="mt-2 w-full text-right text-sm">
         <button onClick={resetSession} className="hover:text-primary hover:underline">Reset Session</button>
      </div>

       <CardForm
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSave={handleSaveCard}
          card={editingCard}
          deck={deck}
        />

        <AlertDialog open={!!cardToDelete} onOpenChange={() => setCardToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the card "{cardToDelete?.front}".
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setCardToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </div>
  );
}
