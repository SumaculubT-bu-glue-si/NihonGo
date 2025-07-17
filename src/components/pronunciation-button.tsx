
'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2, Play, Square, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function PronunciationButton({ text, size = "default" }: { text: string; size?: "sm" | "default" }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // This effect pre-loads voices and handles API readiness
  useEffect(() => {
    const handleVoicesChanged = () => {
        // This is a common pattern to ensure voices are loaded.
        speechSynthesis.getVoices();
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
        // Initial load
        handleVoicesChanged();
    }

    return () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
            window.speechSynthesis.cancel();
        }
    };
  }, []);
  
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (typeof window === 'undefined' || !window.speechSynthesis) {
        toast({
            title: "TTS Not Supported",
            description: "Your browser does not support text-to-speech.",
            variant: "destructive",
        });
        return;
    }

    if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';

    // Find a Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
    if (japaneseVoice) {
        utterance.voice = japaneseVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
        // Check if the error is a cancellation, which is not a true error.
        if (event.error !== 'cancelled') {
            console.error('Speech synthesis error', event);
            toast({
                title: 'Pronunciation Error',
                description: 'Could not play pronunciation audio. Please try again.',
                variant: 'destructive',
            });
        }
        setIsSpeaking(false);
    };
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };
  
  // Cancel speech if component unmounts
  useEffect(() => {
    return () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
        }
    }
  }, [isSpeaking]);

  let Icon = Volume2;
  if(isSpeaking) Icon = Square;

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "sm" : "icon"}
      onClick={handleSpeak}
      aria-label="Listen to pronunciation"
    >
      <Icon />
    </Button>
  );
}
