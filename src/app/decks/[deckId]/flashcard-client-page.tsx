
'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { useParams } from 'next/navigation';
import { useDeckApi } from '@/hooks/use-deck-api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, RotateCw, Lightbulb, PlusCircle, Edit, Trash2, Wand2, List } from 'lucide-react';
import { PronunciationButton } from '@/components/pronunciation-button';
import { SentenceGenerator } from '@/components/sentence-generator';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const Flashcard = memo(function Flashcard({ card, isFlipped }: { card: any; isFlipped: boolean }) {
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

export default function FlashcardClientPage() {
  const params = useParams();
  const deckId = params.deckId as string;
  const { deck, progress, loading, error, refetch, markCardMastered, resetProgress } = useDeckApi(deckId);
  const [sessionCards, setSessionCards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  // Initialize session with non-mastered cards
  useEffect(() => {
    if (!deck) return;
    const cards = deck.cards || [];
    const nonMastered = cards.filter((c: any) => progress[c.id] !== 'mastered');
    setSessionCards(nonMastered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [deck, progress]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-2" />
          <p>Loading deck...</p>
        </div>
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500">{error || 'Deck not found'}</p>
          <button onClick={refetch} className="mt-2 underline text-blue-600">Retry</button>
        </div>
      </div>
    );
  }

  const totalCards = deck.cards.length;
  const masteredCount = Object.values(progress).filter((s) => s === 'mastered').length;
  const currentCard = sessionCards[currentIndex];
  const sessionComplete = sessionCards.length === 0 && totalCards > 0;

  const handleDifficulty = async (difficulty: 'easy' | 'medium' | 'hard') => {
    if (!currentCard) return;
    let newSession = [...sessionCards];
    const cardToMove = newSession.splice(currentIndex, 1)[0];
    if (difficulty === 'easy') {
      await markCardMastered(cardToMove.id);
      // Card is removed from session
    } else if (difficulty === 'medium') {
      const halfway = Math.ceil((newSession.length - currentIndex) / 2) + currentIndex;
      newSession.splice(halfway, 0, cardToMove);
    } else {
      const position = Math.min(currentIndex + 3, newSession.length);
      newSession.splice(position, 0, cardToMove);
    }
    setSessionCards(newSession);
    if (currentIndex >= newSession.length && newSession.length > 0) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  };

  const handleReset = async () => {
    await resetProgress();
    if (deck) {
      setSessionCards(deck.cards);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
    toast({ title: 'Session Reset', description: 'Your progress has been reset.' });
  };

  if (sessionComplete) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-4">Deck Complete!</h1>
        <p className="text-muted-foreground mb-8">You've finished all the cards in this deck. Great job!</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={handleReset}>
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
    );
  }

  if (!currentCard) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline mb-4">No cards to review!</h1>
        <p className="text-muted-foreground mb-8">You can add some cards to get started.</p>
        <div className="flex justify-center gap-4">
          <Link href="/decks" passHref>
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Decks
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = totalCards > 0 ? (masteredCount / totalCards) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/decks">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Decks
          </Button>
        </Link>
        <div className="text-sm text-muted-foreground">
          {masteredCount} / {totalCards} Mastered
        </div>
      </div>
      <div className="relative h-80 flex items-center justify-center">
        {currentCard && <Flashcard card={currentCard} isFlipped={isFlipped} />}
      </div>
      <div className="w-full mb-4">
        <Progress value={progressPercent} />
      </div>
      <div className="flex justify-center gap-4">
        <Button onClick={() => setIsFlipped(true)} variant="default" size="sm">Show Answer</Button>
      </div>
      {isFlipped && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4 mt-4">
          <Button onClick={() => handleDifficulty('hard')} variant="outline" className="w-full bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900">Hard</Button>
          <Button onClick={() => handleDifficulty('medium')} variant="outline" className="w-full bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:text-yellow-900">Medium</Button>
          <Button onClick={() => handleDifficulty('easy')} variant="outline" className="w-full bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900">Easy</Button>
        </div>
      )}
    </div>
  );
}
