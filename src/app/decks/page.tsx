
'use client';

import { useState } from 'react';
import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { DeckBrowser } from './deck-browser';
import { StatsView } from '../stats/stats-view';
import { decks as initialDecks, userStats as initialUserStats, type Deck, type StatsData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [decks, setDecks] = useState<Deck[]>(initialDecks);
  const [userStats, setUserStats] = useState<StatsData[]>(initialUserStats);
  const { toast } = useToast();


  const handleSaveDeck = (deckData: Deck, editingDeck: Deck | null) => {
    if (editingDeck) {
      // Update existing deck
      const updatedDecks = decks.map(d => d.id === editingDeck.id ? {...editingDeck, ...deckData} : d);
      setDecks(updatedDecks);

      // Update stats if title changed
      if (editingDeck.title !== deckData.title) {
        setUserStats(prevStats => prevStats.map(stat => 
            stat.topic === editingDeck.title ? { ...stat, topic: deckData.title } : stat
        ));
      }

      toast({
        title: "Deck Updated",
        description: "The deck has been successfully updated.",
      });
    } else {
      // Add new deck
      const newDeck: Deck = { ...deckData, id: `deck-${Date.now()}`, cards: [] };
      setDecks(prevDecks => [newDeck, ...prevDecks]);
      
      // Add new stat for the new deck
      setUserStats(prevStats => [...prevStats, { topic: newDeck.title, progress: 0, total: 0 }]);
      
      toast({
        title: "Deck Created",
        description: "A new deck has been successfully created.",
      });
    }
  };

  const handleDeleteDeck = (id: string) => {
    const deckToDelete = decks.find(d => d.id === id);
    if (!deckToDelete) return;

    setDecks(decks.filter(d => d.id !== id));
    setUserStats(userStats.filter(s => s.topic !== deckToDelete.title));
    
    toast({
        title: "Deck Deleted",
        description: "The deck has been successfully deleted.",
    });
  };


  return (
    <AuthGuard>
      <AppLayout>
        <div className="space-y-8">
            <StatsView stats={userStats} />
            <DeckBrowser 
              decks={decks} 
              onSave={handleSaveDeck} 
              onDelete={handleDeleteDeck}
            />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
