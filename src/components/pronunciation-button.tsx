'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aiPronunciation } from '@/ai/flows/ai-pronunciation';
import { useToast } from '@/hooks/use-toast';

export function PronunciationButton({ text }: { text: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    }
  }, []);

  const handlePronunciation = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping
    if (!text || isLoading) return;

    setIsLoading(true);
    try {
      const { media, error } = await aiPronunciation({ text });
      if (error) {
        toast({
          title: "Pronunciation Error",
          description: error,
          variant: "destructive",
        });
      } else if (media && audioRef.current) {
        audioRef.current.src = media;
        audioRef.current.play();
      } else {
        throw new Error('No audio data received.');
      }
    } catch (error: any) {
      console.error('Pronunciation error:', error);
      toast({
        title: "Pronunciation Error",
        description: error.message || "Could not generate audio for this word.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePronunciation}
      disabled={isLoading}
      aria-label="Listen to pronunciation"
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <Volume2 className="h-6 w-6 text-muted-foreground" />
      )}
    </Button>
  );
}
