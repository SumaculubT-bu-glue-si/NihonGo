
'use client';

import { useState, useMemo } from 'react';
import type { Deck, Flashcard } from '@/lib/data';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, Edit, Trash2, Wand2 } from 'lucide-react';
import { useGlobalState } from '@/hooks/use-global-state';
import { useToast } from '@/hooks/use-toast';
import { CardForm, type CardFormData } from '../card-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { generateCards } from '@/ai/flows/generate-cards-flow';
import { GenerateCardsForm, type GenerateCardsData } from '../generate-cards-form';

export function ManageCardsClientPage({ deck }: { deck: Deck }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCardFormOpen, setIsCardFormOpen] = useState(false);
  const [isGenerateFormOpen, setIsGenerateFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [cardToDelete, setCardToDelete] = useState<Flashcard | null>(null);

  const {
    appData,
    addCard,
    updateCard,
    deleteCard,
    addGeneratedCards,
  } = useGlobalState();
  const { toast } = useToast();

  const filteredCards = useMemo(() => {
    if (!searchTerm) return deck.cards;
    const lowercasedTerm = searchTerm.toLowerCase();
    return deck.cards.filter(
      (card) =>
        card.front.toLowerCase().includes(lowercasedTerm) ||
        card.back.toLowerCase().includes(lowercasedTerm) ||
        card.reading?.toLowerCase().includes(lowercasedTerm)
    );
  }, [deck.cards, searchTerm]);
  
  const handleAddNew = () => {
    setEditingCard(null);
    setIsCardFormOpen(true);
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setIsCardFormOpen(true);
  };
  
  const handleGenerateNew = () => {
    setIsGenerateFormOpen(true);
  };

  const handleDeleteInitiate = (card: Flashcard) => {
    setCardToDelete(card);
  };

  const handleDeleteConfirm = () => {
    if (!cardToDelete) return;
    deleteCard(deck.id, cardToDelete.id);
    toast({
      title: 'Card Deleted',
      description: 'The flashcard has been successfully deleted.',
    });
    setCardToDelete(null);
  };
  
  const mapDeckLevelToCardLevel = (level: Deck['level']): Flashcard['level'] => {
    if (level === 'Beginner') return 'N5';
    if (level === 'Intermediate') return 'N3';
    if (level === 'Advanced') return 'N1';
    return 'N5';
  }

  const mapDeckCategoryToCardType = (category: Deck['category']): Flashcard['type'] => {
    switch(category) {
        case 'Vocabulary': return 'vocabulary';
        case 'Grammar': return 'grammar';
        case 'Kanji': return 'kanji';
        case 'Phrases': return 'vocabulary';
        default: return 'vocabulary';
    }
  }

  const handleSaveCard = (data: Omit<CardFormData, 'type' | 'level'>) => {
    const cardData = {
        ...data,
        level: mapDeckLevelToCardLevel(deck.level),
        type: mapDeckCategoryToCardType(deck.category),
    };

    if (editingCard) {
      updateCard(deck.id, editingCard.id, cardData);
      toast({
        title: 'Card Updated',
        description: 'The flashcard has been successfully updated.',
      });
    } else {
      addCard(deck.id, cardData);
      toast({
        title: 'Card Created',
        description: 'A new flashcard has been added to the deck.',
      });
    }
    setIsCardFormOpen(false);
    setEditingCard(null);
  };
  
  const handleGenerateCards = async (data: GenerateCardsData) => {
    const generatingToast = toast({
      title: 'Generating Cards...',
      description: 'The AI is creating your new cards. This might take a moment.',
    });

    try {
      const result = await generateCards({
        deckContext: {
          title: deck.title,
          description: deck.description,
          category: deck.category,
          level: deck.level,
        },
        existingCards: deck.cards.map(c => c.front),
        count: data.count,
      });

      addGeneratedCards(deck.id, result.cards);

      generatingToast.update({
        id: generatingToast.id,
        title: 'Cards Generated!',
        description: `Successfully added ${result.cards.length} new cards to the deck.`,
      });
    } catch (error) {
      console.error("Card generation failed", error);
       generatingToast.update({
        id: generatingToast.id,
        title: 'Generation Failed',
        description: 'Could not generate new cards. Please try again.',
        variant: 'destructive',
      });
    }
  };


  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <Link href="/decks" className="text-sm text-primary hover:underline">
            &larr; Back to Decks
        </Link>
        <h1 className="mt-2 text-3xl font-bold font-headline">Manage: {deck.title}</h1>
        <p className="text-muted-foreground">
          View, edit, add, or delete cards in this deck.
        </p>
      </div>
      
      <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
         <div className="flex items-center gap-2">
            <Button onClick={handleGenerateNew} variant="outline">
                <Wand2 className="mr-2 h-4 w-4"/> Generate with AI
            </Button>
            <Button onClick={handleAddNew}>
                <PlusCircle className="mr-2 h-4 w-4"/> Add New Card
            </Button>
         </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Front</TableHead>
              <TableHead>Reading</TableHead>
              <TableHead>Back</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium">{card.front}</TableCell>
                  <TableCell>{card.reading}</TableCell>
                  <TableCell>{card.back}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(card)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteInitiate(card)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No cards found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <CardForm
          isOpen={isCardFormOpen}
          onOpenChange={setIsCardFormOpen}
          onSave={handleSaveCard}
          card={editingCard}
          deck={deck}
        />
        
       <GenerateCardsForm
          isOpen={isGenerateFormOpen}
          onOpenChange={setIsGenerateFormOpen}
          onGenerate={handleGenerateCards}
        />

        <AlertDialog open={!!cardToDelete} onOpenChange={() => setCardToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the card "{cardToDelete?.front}".
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setCardToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
