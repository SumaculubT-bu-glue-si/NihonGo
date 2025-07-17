
'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function PronunciationButton({ text, size = "default" }: { text: string; size?: "sm" | "default" }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Ensure voices are loaded and clean up on unmount.
  useEffect(() => {
    const loadVoices = () => speechSynthesis.getVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices(); // Initial attempt
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Cleanup function
    return () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            speechSynthesis.onvoiceschanged = null;
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
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

    // Cancel any previous speech before starting a new one.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';

    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
    if (japaneseVoice) {
        utterance.voice = japaneseVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
        // This is a more robust check. If isSpeaking is already false,
        // it means we've intentionally cancelled it, so we can ignore the error.
        if (isSpeaking) {
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
  
  let Icon = isSpeaking ? Square : Volume2;

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "sm" : "icon"}
      onClick={handleSpeak}
      aria-label={isSpeaking ? "Stop pronunciation" : "Listen to pronunciation"}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
