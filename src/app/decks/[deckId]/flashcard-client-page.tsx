'use client';

import { useState } from 'react';
import type { Deck, Flashcard as FlashcardType } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, RotateCw, Lightbulb } from 'lucide-react';
import { PronunciationButton } from '@/components/pronunciation-button';
import { SentenceGenerator } from '@/components/sentence-generator';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const currentCard = deck.cards[currentIndex];
  const progress = (currentIndex / deck.cards.length) * 100;

  const handleNext = () => {
    setIsFlipped(false);
    setCompleted(prev => new Set(prev.add(currentIndex)));
    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    // In a real app, this would update review scheduling logic
    console.log(`Card marked as ${difficulty}`);
    handleNext();
  }

  const isLastCard = currentIndex === deck.cards.length - 1;

  if (isLastCard && completed.has(currentIndex)) {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline mb-4">Deck Complete!</h1>
            <p className="text-muted-foreground mb-8">You've finished all the cards in this deck. Great job!</p>
            <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => { setCurrentIndex(0); setCompleted(new Set()); setIsFlipped(false); }}>
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

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full mb-4">
        <div className="flex justify-between items-center mb-2">
            <Link href="/decks" className="text-sm text-primary hover:underline">
                &larr; {deck.title}
            </Link>
            <span className="text-sm text-muted-foreground">{currentIndex + 1} / {deck.cards.length}</span>
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
            <Button onClick={() => handleDifficulty('easy')} variant="outline" className="w-full md:w-auto bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900">Easy</Button>
            <Button onClick={() => handleDifficulty('medium')} variant="outline" className="w-full md:w-auto bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:text-yellow-900">Medium</Button>
            <Button onClick={() => handleDifficulty('hard')} variant="outline" className="w-full md:w-auto bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900">Hard</Button>
        </div>
      )}

      <div className="flex justify-between w-full mt-8">
        <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
          <ChevronLeft className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Prev</span>
        </Button>
        <Button variant="outline" onClick={handleNext} disabled={isLastCard}>
          <span className="mr-2 hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
