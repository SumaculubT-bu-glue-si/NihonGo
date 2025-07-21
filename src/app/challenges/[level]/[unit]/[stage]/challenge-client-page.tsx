
'use client';

import { useState, useEffect } from 'react';
import type { ChallengeItem } from '@/lib/data';
import { cn, shuffle } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, X as CloseIcon } from 'lucide-react';
import { PronunciationButton } from '@/components/pronunciation-button';
import { useRouter } from 'next/navigation';

function WordButton({
  word,
  onClick,
  isDisabled,
}: {
  word: string;
  onClick: () => void;
  isDisabled: boolean;
}) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      disabled={isDisabled}
      className="h-14 text-lg bg-secondary hover:bg-secondary/80"
    >
      {word}
    </Button>
  );
}

export function ChallengeClientPage({ items }: { items: ChallengeItem[] }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [wordBank, setWordBank] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentItem = items[currentIndex];

  useEffect(() => {
    const newWordBank = shuffle([...currentItem.word_bank, ...currentItem.distractors]);
    setWordBank(newWordBank);
    setSelectedWords([]);
    setIsAnswered(false);
  }, [currentIndex, currentItem]);

  const handleSelectWord = (word: string) => {
    setSelectedWords((prev) => [...prev, word]);
    setWordBank((prev) => prev.filter((w) => w !== word));
  };

  const handleDeselectWord = (word: string, index: number) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords.splice(index, 1);
    setSelectedWords(newSelectedWords);
    setWordBank((prev) => shuffle([...prev, word]));
  };
  
  const checkAnswer = () => {
    if (isAnswered) return;
    const userAnswer = selectedWords.join('');
    const correctAnswer = currentItem.correct_japanese;

    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (!correct) {
        setLives(prev => prev > 0 ? prev - 1 : 0);
    }
  };

  const handleContinue = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // TODO: Show results screen
      router.push('/grammar-lessons');
    }
  }

  const progressPercentage = (currentIndex / items.length) * 100;

  return (
    <div className="flex flex-col h-screen bg-[#2e3856] text-white font-sans">
      {/* Header */}
      <header className="p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-white/10" onClick={() => router.back()}>
            <CloseIcon className="h-7 w-7" />
          </Button>
          <Progress value={progressPercentage} className="h-4 bg-gray-500 [&>div]:bg-green-400" />
          <div className="flex items-center gap-2">
            <Heart className="h-7 w-7 text-red-500 fill-red-500" />
            <span className="text-xl font-bold">{lives}</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center p-4 sm:p-6 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Write this in Japanese</h1>
        
        <div className="flex items-center gap-4">
           {/* Placeholder for character image */}
           <div className="w-24 h-24 sm:w-32 sm:h-32 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: 'url(https://placehold.co/128x128/7e57c2/FFFFFF?text=GO)' }} data-ai-hint="friendly mascot"></div>
           <div className="flex items-center gap-2">
             <div className="text-2xl sm:text-4xl font-bold tracking-wider">
               <p className="text-xs text-gray-300">{currentItem.hint}</p>
               {currentItem.english_sentence}
            </div>
           </div>
        </div>
        
        {/* Answer Area */}
        <div className="w-full max-w-2xl">
            <div className="flex flex-wrap gap-2 p-4 border-b-2 border-dashed border-gray-500 min-h-[6rem]">
                 {selectedWords.map((word, index) => (
                    <Button
                        key={`${word}-${index}`}
                        variant="outline"
                        size="lg"
                        onClick={() => handleDeselectWord(word, index)}
                        className="h-14 text-lg bg-secondary/80 text-secondary-foreground hover:bg-secondary"
                    >
                    {word}
                    </Button>
                ))}
            </div>
        </div>


        {/* Word Bank */}
        <div className="w-full max-w-2xl flex flex-wrap justify-center gap-2">
          {wordBank.map((word, index) => (
            <WordButton
              key={`${word}-${index}`}
              word={word}
              onClick={() => handleSelectWord(word)}
              isDisabled={isAnswered}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={cn(
        "w-full p-4 border-t-2 transition-all duration-300",
        isAnswered && isCorrect && "bg-green-200/20 border-green-500",
        isAnswered && !isCorrect && "bg-red-200/20 border-red-500",
        !isAnswered && "border-gray-700"
      )}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {!isAnswered ? (
             <>
                <Button variant="ghost" size="lg" className="hover:bg-white/10 text-lg">SKIP</Button>
                <Button 
                    size="lg" 
                    className="bg-green-500 hover:bg-green-600 text-white text-lg px-12"
                    onClick={checkAnswer}
                    disabled={selectedWords.length === 0}
                >
                    CHECK
                </Button>
             </>
          ) : (
            <>
                <div className="flex flex-col">
                    <span className="text-lg font-bold">{isCorrect ? "Correct!" : "Incorrect"}</span>
                    {!isCorrect && <PronunciationButton text={currentItem.correct_japanese} />}
                </div>
                 <Button 
                    size="lg" 
                    className={cn(
                        "text-white text-lg px-12",
                        isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                    )}
                    onClick={handleContinue}
                >
                    CONTINUE
                </Button>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
