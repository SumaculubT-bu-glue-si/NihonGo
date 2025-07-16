
'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function PronunciationButton({ text }: { text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [japaneseVoice, setJapaneseVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const foundVoice = voices.find(voice => voice.lang.startsWith('ja'));
      if (foundVoice) {
        setJapaneseVoice(foundVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      // Ensure any ongoing speech is stopped when the component unmounts.
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePronunciation = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
        toast({
            title: 'Unsupported Browser',
            description: 'Your browser does not support text-to-speech.',
            variant: 'destructive',
        });
        return;
    }
    
    // If this button is currently playing, stop it.
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    
    // If another audio is playing, stop it before starting a new one.
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    if (!japaneseVoice) {
        toast({
            title: 'No Japanese Voice Pack',
            description: 'Could not find a Japanese voice pack on your device. Please install one to use this feature.',
            variant: 'destructive',
        });
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.voice = japaneseVoice;
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      utteranceRef.current = null;
    };
    
    utterance.onerror = (event) => {
        // The 'interrupted' error is common and can be ignored if we manage state correctly.
        if (event.error === 'interrupted') {
            setIsPlaying(false);
            return;
        }
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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePronunciation}
      aria-label="Listen to pronunciation"
    >
      {isPlaying ? (
        <Square className="h-6 w-6 text-primary" />
      ) : (
        <Volume2 className="h-6 w-6 text-muted-foreground" />
      )}
    </Button>
  );
}
