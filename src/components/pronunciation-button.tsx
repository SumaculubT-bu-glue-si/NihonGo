'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aiPronunciation } from '@/ai/flows/ai-pronunciation';
import { useToast } from '@/hooks/use-toast';

export function PronunciationButton({ text }: { text: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', onEnded);
        audioRef.current = null;
      }
    };
  }, []);

  const handlePronunciation = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    if (!text || isLoading) return;

    setIsLoading(true);
    try {
      const { media, error } = await aiPronunciation({ text });
      if (error) {
        toast({
          title: 'Pronunciation Error',
          description: error,
          variant: 'destructive',
        });
      } else if (media && audioRef.current) {
        audioRef.current.src = media;
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        toast({
            title: "Pronunciation Error",
            description: "No audio data was returned from the service.",
            variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Pronunciation error:', error);
      toast({
        title: 'Pronunciation Error',
        description: error.message || 'Could not generate audio for this word.',
        variant: 'destructive',
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
      ) : isPlaying ? (
        <Square className="h-6 w-6 text-primary" />
      ) : (
        <Volume2 className="h-6 w-6 text-muted-foreground" />
      )}
    </Button>
  );
}
