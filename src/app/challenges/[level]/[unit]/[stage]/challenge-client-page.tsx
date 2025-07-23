

'use client';

import { useState, useEffect, useRef } from 'react';
import type { ChallengeItem } from '@/lib/data';
import { cn, shuffle } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, X as CloseIcon } from 'lucide-react';
import { PronunciationButton } from '@/components/pronunciation-button';
import { useRouter, useParams } from 'next/navigation';
import { Howl } from 'howler';
import Image from 'next/image';
import { useGlobalState } from '@/hooks/use-global-state';
import { useToast } from '@/hooks/use-toast';

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
      className="h-14 text-lg bg-secondary text-gray-900 hover:bg-secondary/80"
    >
      {word}
    </Button>
  );
}

export function ChallengeClientPage({ items, level, unitId }: { items: ChallengeItem[], level: string, unitId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const { appData, loseHeart, addDiamonds, completeChallengeNode } = useGlobalState();
  const { hearts } = appData;
  const params = useParams<{ level: string; unit: string; stage: string }>();

  const [sessionItems, setSessionItems] = useState<ChallengeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [wordBank, setWordBank] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctSound = new Howl({ src: ['/correct-sound.mp3'] });
  const incorrectSound = new Howl({ src: ['/incorrect-sound.mp3'] });
  
  const currentItem = sessionItems[currentIndex];
  
  const getRedirectUrl = () => {
    return `/grammar-lessons?tab=challenges&level=${level}&unit=${encodeURIComponent(unitId)}`;
  };

  useEffect(() => {
    // Initialize session items when the component mounts or `items` prop changes
    setSessionItems([...items]);
    setCurrentIndex(0);
  }, [items]);

  useEffect(() => {
    if (!currentItem) return;
    const newWordBank = shuffle([...currentItem.word_bank, ...currentItem.distractors]);
    setWordBank(newWordBank);
    setSelectedWords([]);
    setIsAnswered(false);
  }, [currentItem]);
  
    useEffect(() => {
    if (currentItem?.correct_japanese) {
      // Auto-play TTS when the item appears
      const utterance = new SpeechSynthesisUtterance(currentItem.correct_japanese);
      utterance.lang = 'ja-JP';
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
      if (japaneseVoice) {
        utterance.voice = japaneseVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
     // Cleanup on unmount
    return () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    };
  }, [currentItem]);
  
  useEffect(() => {
    if (hearts === 0 && !isCorrect) {
        toast({
            title: "You're out of hearts!",
            description: "Refill your hearts or practice to earn more.",
            variant: "destructive"
        });
        const timer = setTimeout(() => {
            router.push(getRedirectUrl());
        }, 2000);
        return () => clearTimeout(timer);
    }
  }, [hearts, router, toast, isCorrect, getRedirectUrl]);

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

    if (correct) {
      correctSound.play();
    } else {
      incorrectSound.play();
      loseHeart();
    }
  };

  const handleSkip = () => {
    if (isAnswered) return;

    // Move the current item to the end of the queue
    setSessionItems(prevItems => {
        const newItems = [...prevItems];
        const skippedItem = newItems.splice(currentIndex, 1)[0];
        newItems.push(skippedItem);
        return newItems;
    });

    // We don't increment the index here because the array re-orders,
    // so the item at the `currentIndex` will be the next item automatically.
    // If we're at the end, loop back to the start.
    if (currentIndex >= sessionItems.length - 1) {
        setCurrentIndex(0);
    }
  }

  const handleContinue = () => {
    let newItems = [...sessionItems];
    if (isCorrect) {
        // If correct, remove the item from the session
        newItems.splice(currentIndex, 1);
    } else {
        // If incorrect, just move to the next index
        // If we are at the end, loop back to the beginning
        if (currentIndex < newItems.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(0);
        }
    }
    
    setSessionItems(newItems);
    
    if (newItems.length === 0) {
      // All items completed
      addDiamonds(100);
      const decodedUnitId = decodeURIComponent(params.unit as string);
      completeChallengeNode(`${params.level}|${decodedUnitId}|${params.stage}`);
      toast({
          title: "Stage Complete!",
          description: "You earned 100 diamonds!",
      });
      router.push(getRedirectUrl());
    } else {
      // If we removed the last item, reset index
      if (currentIndex >= newItems.length) {
        setCurrentIndex(0);
      }
    }
  }
  
  const handleExit = () => {
    router.push(getRedirectUrl());
  }

  if (!currentItem) {
    // This can happen briefly when the session ends before navigation.
    // Or if initial items are empty.
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#2e3856]">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = ((items.length - sessionItems.length) / items.length) * 100;

  return (
    <div className="flex flex-col h-screen bg-[#2e3856] text-white font-sans">
      {/* Header */}
      <header className="p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-white/10" onClick={handleExit}>
            <CloseIcon className="h-7 w-7" />
          </Button>
          <Progress value={progressPercentage} className="h-4 bg-gray-500 [&>div]:bg-green-400" />
          <div className="flex items-center gap-2">
            <Heart className="h-7 w-7 text-red-500 fill-red-500" />
            <span className="text-xl font-bold">{hearts}</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center p-4 sm:p-6 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Write this in Japanese</h1>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
             <div className="text-2xl sm:text-4xl font-bold tracking-wider">
               {currentItem.english_sentence}
            </div>
            <PronunciationButton text={currentItem.correct_japanese} />
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
                <Button variant="ghost" size="lg" className="hover:bg-white/10 text-lg" onClick={handleSkip}>SKIP</Button>
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
                    {!isCorrect && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm">{currentItem.hint}</span>
                             <div className="text-sm font-semibold flex items-center gap-1">
                                {currentItem.correct_japanese}
                                <PronunciationButton text={currentItem.correct_japanese} />
                            </div>
                        </div>
                    )}
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
