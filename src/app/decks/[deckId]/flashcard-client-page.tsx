
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Deck, Flashcard as FlashcardType } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, RotateCw, Lightbulb } from 'lucide-react';
import { PronunciationButton } from '@/components/pronunciation-button';
import { SentenceGenerator } from '@/components/sentence-generator';
import Link from 'next/link';
import { useGlobalState } from '@/hooks/use-global-state';

function Flashcard({
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
      <Card className="flip-card-back absolute w-full h-full flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-3xl md:text-5xl font-semibold font-headline">
          {card.back}
        </h3>
        {card.type === 'grammar' && <SentenceGenerator grammarPoint={card.front} />}
      </Card>
    </div>
  );
}

export function FlashcardClientPage({ deck }: { deck: Deck }) {
  const [cardsToShow, setCardsToShow] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const { updateStats } = useGlobalState();

  const getStorageKey = useCallback(() => `flashcard-session-${deck.id}`, [deck.id]);

  // Load session from localStorage on initial mount
  useEffect(() => {
    try {
        const savedSession = localStorage.getItem(getStorageKey());
        if (savedSession) {
            const { savedCards, savedIndex, savedMasteredCount } = JSON.parse(savedSession);
            setCardsToShow(savedCards);
            setCurrentIndex(savedIndex);
            setMasteredCount(savedMasteredCount);
        } else {
            // No saved session, start a new one
            setCardsToShow([...deck.cards].sort(() => Math.random() - 0.5));
            setCurrentIndex(0);
            setMasteredCount(0);
        }
    } catch (error) {
        console.error("Could not load session from localStorage", error);
        setCardsToShow([...deck.cards].sort(() => Math.random() - 0.5));
    }
    setIsFlipped(false);
  }, [deck.cards, getStorageKey]);

  // Save session to localStorage whenever state changes
  useEffect(() => {
    if (cardsToShow.length > 0 || masteredCount > 0) {
        try {
            const sessionData = JSON.stringify({
                savedCards: cardsToShow,
                savedIndex: currentIndex,
                savedMasteredCount: masteredCount,
            });
            localStorage.setItem(getStorageKey(), sessionData);
        } catch (error) {
            console.error("Could not save session to localStorage", error);
        }
    }
  }, [cardsToShow, currentIndex, masteredCount, getStorageKey]);

  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    let newCardsToShow = [...cardsToShow];
    const cardToMove = newCardsToShow.splice(currentIndex, 1)[0];

    if (difficulty === 'easy') {
      const newMasteredCount = masteredCount + 1;
      setMasteredCount(newMasteredCount);
      // Update global stats
      updateStats(deck.title, newMasteredCount);
    } else if (difficulty === 'medium') {
      const halfway = Math.ceil(newCardsToShow.length / 2);
      newCardsToShow.splice(halfway, 0, cardToMove);
    } else { // 'hard'
      const position = Math.max(newCardsToShow.length - 2, 0);
      newCardsToShow.splice(position, 0, cardToMove);
    }

    setCardsToShow(newCardsToShow);

    if (newCardsToShow.length > 0) {
      if (currentIndex >= newCardsToShow.length) {
        setCurrentIndex(0);
      }
      setIsFlipped(false);
    }
  };
  
  const resetSession = () => {
    try {
        localStorage.removeItem(getStorageKey());
    } catch (error) {
        console.error("Could not remove session from localStorage", error);
    }
    setCardsToShow([...deck.cards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setMasteredCount(0);
    updateStats(deck.title, 0); // Reset global stats too
    setIsFlipped(false);
  }
  
  const currentCard = cardsToShow[currentIndex];
  const totalCards = deck.cards.length;
  const progress = totalCards > 0 ? (masteredCount / totalCards) * 100 : 0;
  const sessionComplete = cardsToShow.length === 0;
  
  useEffect(() => {
    if (sessionComplete) {
      try {
        localStorage.removeItem(getStorageKey());
      } catch (error) {
        console.error("Could not remove session from localStorage on completion", error);
      }
    }
  }, [sessionComplete, getStorageKey]);

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
            <p>Loading cards...</p>
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
        className="w-full h-80 perspective-[1000px] mb-6 cursor-pointer"
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
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
            <Button onClick={() => handleDifficulty('hard')} variant="outline" className="w-full md:w-auto bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900">Hard</Button>
            <Button onClick={() => handleDifficulty('medium')} variant="outline" className="w-full md:w-auto bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:text-yellow-900">Medium</Button>
            <Button onClick={() => handleDifficulty('easy')} variant="outline" className="w-full md:w-auto bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900">Easy</Button>
        </div>
      )}

      <div className="mt-8 text-muted-foreground text-sm">
        Cards left in this session: {cardsToShow.length}
      </div>

    </div>
  );
}
