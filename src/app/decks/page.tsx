
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { DeckBrowser } from './deck-browser';
import { StatsView } from '../stats/stats-view';
import { useGlobalState } from '@/hooks/use-global-state';
import { useToast } from '@/hooks/use-toast';
import type { Deck } from '@/lib/data';

export default function HomePage() {
  const { appData, isLoading, addDeck, updateDeck, deleteDeck } = useGlobalState();
  const { toast } = useToast();

  const handleSaveDeck = (deckData: Deck, editingDeck: Deck | null) => {
    if (editingDeck) {
      // Update existing deck
      updateDeck(editingDeck.id, deckData);
      toast({
        title: "Deck Updated",
        description: "The deck has been successfully updated.",
      });
    } else {
      // Add new deck
      addDeck(deckData);
      toast({
        title: "Deck Created",
        description: "A new deck has been successfully created.",
      });
    }
  };

  const handleDeleteDeck = (id: string) => {
    deleteDeck(id);
    toast({
        title: "Deck Deleted",
        description: "The deck has been successfully deleted.",
        variant: "destructive",
    });
  };

  if (isLoading) {
    return (
        <AuthGuard>
            <AppLayout>
                <div className="flex h-64 w-full items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            </AppLayout>
        </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AppLayout>
        <div className="space-y-8">
            <StatsView stats={appData.userStats} />
            <DeckBrowser 
              decks={appData.decks} 
              userStats={appData.userStats}
              onSave={handleSaveDeck} 
              onDelete={handleDeleteDeck}
            />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
