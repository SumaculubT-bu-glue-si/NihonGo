
'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2, Play, Square, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function PronunciationButton({ text, size = "default" }: { text: string; size?: "sm" | "default" }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!window.speechSynthesis) {
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
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
        console.error('Speech synthesis error', event);
        toast({
            title: 'Pronunciation Error',
            description: 'Could not play pronunciation audio.',
            variant: 'destructive',
        });
        setIsSpeaking(false);
    };
    
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
