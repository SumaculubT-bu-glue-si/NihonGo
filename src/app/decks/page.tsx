
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { DeckBrowser } from './deck-browser';
import { StatsView } from '../stats/stats-view';
import { useGlobalState } from '@/hooks/use-global-state';
import { useToast } from '@/hooks/use-toast';
import type { Deck } from '@/lib/data';
import { generateDeck } from '@/ai/flows/generate-deck-flow';
import { type GenerateDeckData } from './generate-deck-form';

export default function HomePage() {
  const { appData, isLoading, addDeck, updateDeck, deleteDeck, addGeneratedDeck } = useGlobalState();
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

  const handleGenerateDeck = async (data: GenerateDeckData) => {
    const generatingToast = toast({
      title: 'Generating Deck...',
      description: 'The AI is creating your new deck. This might take a moment.',
    });

    try {
      const generatedData = await generateDeck(data);
      addGeneratedDeck({
        ...generatedData,
        category: data.category,
        level: data.level,
      });

      generatingToast.update({
        id: generatingToast.id,
        title: 'Deck Generated!',
        description: `Successfully created the "${generatedData.title}" deck.`,
      });
    } catch (error) {
      console.error("Deck generation failed", error);
       generatingToast.update({
        id: generatingToast.id,
        title: 'Generation Failed',
        description: 'Could not generate the deck. Please try again.',
        variant: 'destructive',
      });
    }
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
            <StatsView appData={appData} />
            <DeckBrowser 
              decks={appData.decks} 
              userStats={appData.userStats}
              onSave={handleSaveDeck} 
              onDelete={handleDeleteDeck}
              onGenerate={handleGenerateDeck}
            />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
