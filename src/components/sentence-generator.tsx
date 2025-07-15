
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateExampleSentence } from '@/ai/flows/generate-example-sentence';
import { Loader2, Wand2, Volume2, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Flashcard } from '@/lib/data';

type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced';

function SentencePronunciationButton({ sentence }: { sentence: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [japaneseVoice, setJapaneseVoice] = useState<SpeechSynthesisVoice | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const foundVoice = voices.find(voice => voice.lang.startsWith('ja'));
      if(foundVoice) {
        setJapaneseVoice(foundVoice);
      }
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
        window.speechSynthesis.onvoiceschanged = null;
        if (isPlaying) {
            window.speechSynthesis.cancel();
        }
    };
  }, [isPlaying]);


  const handlePlayback = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      toast({
        title: 'Unsupported Browser',
        description: 'Your browser does not support text-to-speech.',
        variant: 'destructive',
      });
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!japaneseVoice) {
        toast({
            title: 'No Japanese Voice Pack',
            description: 'Could not find a Japanese voice pack on your device.',
            variant: 'destructive',
        });
        return;
    }


    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.voice = japaneseVoice;
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error', event.error);
      toast({
        title: 'Pronunciation Error',
        description: 'An unexpected error occurred during playback.',
        variant: 'destructive',
      });
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const Icon = isPlaying ? Square : Volume2;

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handlePlayback}
      className="h-6 w-6"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

export function SentenceGenerator({ card }: { card: Flashcard }) {
  const [level, setLevel] = useState<ProficiencyLevel>(() => {
    if (card.level === 'N5' || card.level === 'N4') return 'beginner';
    if (card.level === 'N3') return 'intermediate';
    return 'advanced';
  });
  const [sentences, setSentences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
            <SelectValue placeholder="Proficiency" />
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
                <SentencePronunciationButton sentence={sentence} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
