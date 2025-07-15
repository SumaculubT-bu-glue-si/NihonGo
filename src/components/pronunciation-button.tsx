
'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aiPronunciation } from '@/ai/flows/ai-pronunciation';
import { useToast } from '@/hooks/use-toast';

const AUDIO_CACHE_KEY_PREFIX = 'audio_cache_';

// Helper function to get an item from localStorage
const getCachedAudio = (text: string): string | null => {
  try {
    return localStorage.getItem(AUDIO_CACHE_KEY_PREFIX + text);
  } catch (error) {
    console.warn('Could not read from localStorage', error);
    return null;
  }
};

// Helper function to set an item in localStorage
const setCachedAudio = (text: string, dataUrl: string) => {
  try {
    localStorage.setItem(AUDIO_CACHE_KEY_PREFIX + text, dataUrl);
  } catch (error) {
    console.warn('Could not write to localStorage', error);
  }
};


export function PronunciationButton({ text }: { text: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize the audio element
    const audio = new Audio();
    audioRef.current = audio;

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);

    // Cleanup function to stop audio and remove listener when component unmounts
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

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    if (!text || isLoading) return;
    
    setIsLoading(true);

    try {
        const cachedAudio = getCachedAudio(text);
        if (cachedAudio) {
            audio.src = cachedAudio;
            audio.play();
            setIsPlaying(true);
        } else {
            const { media, error } = await aiPronunciation({ text });
      
            if (error) {
                toast({
                title: 'Pronunciation Error',
                description: error,
                variant: 'destructive',
                });
            } else if (media) {
                setCachedAudio(text, media);
                audio.src = media;
                audio.play();
                setIsPlaying(true);
            } else {
                toast({
                    title: "Pronunciation Error",
                    description: "No audio data was returned from the service.",
                    variant: "destructive",
                });
            }
        }
    } catch (error: any) {
      console.error('Pronunciation error:', error);
      toast({
        title: 'Pronunciation Error',
        description: error.message || 'Could not generate audio for this word.',
        variant: 'destructive',
      });
    } finally {
        // Only set loading to false if not playing, otherwise onEnded will handle it.
        if (!audio.src || audio.paused) {
            setIsLoading(false);
        }
    }
  };

  const isDisabled = isLoading;

  useEffect(() => {
    // When playback starts or stops, update loading state
    if (isPlaying) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPlaying]);


  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePronunciation}
      disabled={isDisabled}
      aria-label="Listen to pronunciation"
    >
      {isLoading && !isPlaying ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : isPlaying ? (
        <Square className="h-6 w-6 text-primary" />
      ) : (
        <Volume2 className="h-6 w-6 text-muted-foreground" />
      )}
    </Button>
  );
}
