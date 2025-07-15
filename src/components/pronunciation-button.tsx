
'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function PronunciationButton({ text }: { text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

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
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(voice => voice.lang.startsWith('ja'));

    if (!japaneseVoice) {
        toast({
            title: 'No Japanese Voice Pack',
            description: 'Could not find a Japanese voice pack on your device. Please install one to use this feature.',
            variant: 'destructive',
        });
        return;
    }

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
        console.error('Speech synthesis error', event);
        toast({
            title: 'Pronunciation Error',
            description: 'An unexpected error occurred.',
            variant: 'destructive',
        });
        setIsPlaying(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };
  
  useEffect(() => {
    const handleVoicesChanged = () => {
      // Re-check for voices when they are loaded
    };
    
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    
    // Ensure voices are loaded on component mount
    window.speechSynthesis.getVoices();
    
    // Cleanup on unmount
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      if (isPlaying) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);


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
