
'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateExampleSentence } from '@/ai/flows/generate-example-sentence';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Flashcard } from '@/lib/data';
import { PronunciationButton } from './pronunciation-button';

type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced';

const deriveLevelFromCard = (card: Flashcard): ProficiencyLevel => {
    if (card.level === 'N5' || card.level === 'N4') return 'beginner';
    if (card.level === 'N3') return 'intermediate';
    return 'advanced';
};

export const SentenceGenerator = memo(function SentenceGenerator({ card }: { card: Flashcard }) {
  const [level, setLevel] = useState<ProficiencyLevel>(() => deriveLevelFromCard(card));
  const [sentences, setSentences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

   useEffect(() => {
    // This effect runs ONLY when the card prop changes to a new card.
    // It resets the level and clears old sentences for the new card.
    setLevel(deriveLevelFromCard(card));
    setSentences([]);
  }, [card.id]);


  const handleGenerate = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsLoading(true);
    setSentences([]);
    try {
      const result = await generateExampleSentence({
        grammarPoint: card.front,
        proficiencyLevel: level,
      });
      setSentences(result.sentences);
    } catch (error) {
      console.error('Sentence generation error:', error);
      toast({
        title: 'Generation Error',
        description: 'Could not generate example sentences.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md text-left">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Select
          value={level}
          onValueChange={(value: ProficiencyLevel) => setLevel(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue aria-label={level} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Generate Sentences
        </Button>
      </div>

      {sentences.length > 0 && (
        <div className="mt-4 space-y-3 rounded-md border bg-secondary/30 p-4">
          <h4 className="font-semibold">Example Sentences:</h4>
          <ul className="space-y-2">
            {sentences.map((sentence, index) => (
              <li key={index} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex-1">{sentence}</span>
                <PronunciationButton text={sentence} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
