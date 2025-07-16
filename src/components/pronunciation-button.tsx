
'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';

export function PronunciationButton({ text, size = "default" }: { text: string; size?: "sm" | "default" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // When the component unmounts, stop any playing audio.
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  // When text changes, invalidate the old audio
  useEffect(() => {
    setAudioSrc(null);
    setIsPlaying(false);
    if(audioRef.current) {
      audioRef.current.src = "";
    }
  }, [text]);

  const handleFetchAndPlayAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    
    if (audioSrc && audioRef.current) {
      audioRef.current.play();
      return;
    }

    setIsLoading(true);
    try {
      const response = await textToSpeech(text);
      setAudioSrc(response.media);
    } catch (error) {
      console.error('TTS Error:', error);
      toast({
        title: 'Pronunciation Error',
        description: 'Could not generate pronunciation audio.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // This effect plays the audio as soon as the src is available
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioSrc]);

  let Icon;
  if (isLoading) Icon = Loader2;
  else if (isPlaying) Icon = Square;
  else Icon = Volume2;

  return (
    <>
      <Button
        variant="ghost"
        size={size === "sm" ? "sm" : "icon"}
        onClick={handleFetchAndPlayAudio}
        aria-label="Listen to pronunciation"
        disabled={isLoading}
      >
        <Icon className={isLoading ? "animate-spin" : ""} />
      </Button>
      <audio
        ref={audioRef}
        src={audioSrc ?? ''}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </>
  );
}
