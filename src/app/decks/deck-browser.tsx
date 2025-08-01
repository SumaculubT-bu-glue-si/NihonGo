'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Deck, StatsData } from '@/lib/data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, CheckCircle, MoreVertical, PlusCircle, Edit, Trash2, Settings, Wand2, List } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DeckForm } from './deck-form';
import { Progress } from '@/components/ui/progress';
import { GenerateDeckForm, type GenerateDeckData } from './generate-deck-form';
import { useToast } from '@/hooks/use-toast';
import { useGlobalState } from '@/hooks/use-global-state';
import { useAuth } from '@/contexts/auth-context-sqlite';
import { apiService } from '@/lib/api';

function DeckCard({
  deck,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  progress,
  studied,
  total
}: {
  deck: Deck;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (deck: Deck) => void;
  onDelete: (id: string) => void;
  progress: number;
  studied: number;
  total: number;
}) {
  return (
    <Card className="flex h-full transform flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <Badge
              variant={
                deck.level === 'Beginner'
                  ? 'default'
                  : deck.level === 'Intermediate'
                    ? 'secondary'
                    : 'destructive'
              }
              className="mb-2 bg-accent text-accent-foreground"
            >
              {deck.level}
            </Badge>
            <CardTitle className="font-headline">{deck.title}</CardTitle>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(deck.id)}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <Star
                className={`h-6 w-6 transition-colors ${isFavorite
                  ? 'fill-yellow-400 text-yellow-500'
                  : 'text-muted-foreground'
                  }`}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(deck)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Deck Details
                </DropdownMenuItem>
                <Link href={`/decks/${deck.id}/manage`} passHref>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Cards
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Deck
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the deck "{deck.title}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(deck.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardDescription>{deck.description}</CardDescription>
      </CardHeader>
      <div className="px-6 pb-2">
        <Progress value={progress} className="h-2" />
        <p className="mt-1 text-xs text-muted-foreground">
          {studied} of {total} cards mastered ({Math.round(progress)}%)
        </p>
      </div>
      <CardFooter className="mt-auto flex justify-between pt-4">
        <span className="text-sm text-muted-foreground">
          {total} cards total
        </span>
        <Link href={`/decks/${deck.id}`} passHref>
          <Button>Start Learning</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

function DeckListItem({
  deck,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  progress,
  studied,
  total
}: {
  deck: Deck;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (deck: Deck) => void;
  onDelete: (id: string) => void;
  progress: number;
  studied: number;
  total: number;
}) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-2">
            <Link href={`/decks/${deck.id}`} passHref>
              <h3 className="font-semibold text-lg hover:underline">{deck.title}</h3>
            </Link>
            <Badge variant="outline">{deck.level}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{deck.description}</p>
          <div className="flex items-center gap-2">
            <Progress value={progress} className="h-2 w-32" />
            <span className="text-xs text-muted-foreground">
              {studied} of {total} cards mastered
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link href={`/decks/${deck.id}`} passHref>
            <Button>
              Learn
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(deck.id)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-yellow-400 text-yellow-500' : 'text-muted-foreground'
                }`}
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(deck)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <Link href={`/decks/${deck.id}/manage`} passHref>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Manage Cards
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the deck "{deck.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(deck.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

interface DeckBrowserProps {
  decks: Deck[];
  onSave: (deckData: Omit<Deck, 'id' | 'cards' | 'progress' | 'total'>, editingDeck: Deck | null) => void;
  onDelete: (id: string) => void;
  onGenerate: (deckData: GenerateDeckData) => void;
}


export function DeckBrowser({ decks, onSave, onDelete, onGenerate }: DeckBrowserProps) {
  const { appData } = useGlobalState();
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGenerateFormOpen, setIsGenerateFormOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [deckProgress, setDeckProgress] = useState<Record<string, { progress: number, studied: number, total: number }>>({});
  const { toast } = useToast();

  const activeVariant = appData.activeVariants.home;

  // Debug: Log component state changes
  console.log('DeckBrowser render:', {
    decksLength: decks.length,
    authLoading,
    user: !!user,
    userId: user?.id,
    deckProgressKeys: Object.keys(deckProgress).length
  });

  useEffect(() => {
    const saved = localStorage.getItem('favorite-decks');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  // Fetch progress for each deck
  useEffect(() => {
    console.log('DeckBrowser useEffect triggered:', { authLoading, user: !!user, userId: user?.id, decksLength: decks.length });

    // Wait for authentication to complete and ensure user is available
    if (authLoading) {
      console.log('Still loading auth, waiting...');
      return;
    }

    if (!user || !user.id) {
      console.log('No user or user ID available');
      return;
    }

    if (decks.length === 0) {
      console.log('No decks available');
      return;
    }

    console.log('Starting to fetch progress for', decks.length, 'decks');

    const fetchProgress = async () => {
      const progressMap: Record<string, { progress: number, studied: number, total: number }> = {};

      for (const deck of decks) {
        try {
          console.log(`Fetching progress for deck: ${deck.id}`);

          // First get the deck details to get accurate card count from database
          const deckResponse = await apiService.getDeck(deck.id);
          let totalCards = deck.cards?.length || 0;

          if (deckResponse.data && deckResponse.data.deck && deckResponse.data.deck.cards) {
            totalCards = Array.isArray(deckResponse.data.deck.cards)
              ? deckResponse.data.deck.cards.length
              : (typeof deckResponse.data.deck.cards === 'string'
                ? JSON.parse(deckResponse.data.deck.cards).length
                : 0);
          }

          console.log(`Total cards for deck ${deck.id}:`, totalCards);

          // Use the same progress fetching method as flashcard-client-page.tsx
          const response = await apiService.getDeckProgress(deck.id);
          console.log(`Progress response for deck ${deck.id}:`, response);

          if (response.data) {
            // Calculate mastered count the same way as flashcard-client-page.tsx
            const masteredCount = response.data.progress.filter((p: { card_id: string; status: string }) => p.status === 'mastered').length;
            const progress = totalCards > 0 ? (masteredCount / totalCards) * 100 : 0;

            console.log(`Calculated progress for deck ${deck.id}:`, { masteredCount, totalCards, progress });

            progressMap[deck.id] = {
              progress: Math.round(progress),
              studied: masteredCount,
              total: totalCards
            };
          } else {
            console.error(`No data in progress response for deck ${deck.id}:`, response);
            throw new Error(response.error || 'Failed to fetch progress');
          }
        } catch (error) {
          console.error(`Failed to fetch progress for deck ${deck.id}:`, error);
          progressMap[deck.id] = {
            progress: 0,
            studied: 0,
            total: deck.cards?.length || 0
          };
        }
      }

      console.log('Final progress map:', progressMap);
      setDeckProgress(progressMap);
    };

    fetchProgress().catch(error => {
      console.error('Error in fetchProgress:', error);
    });
  }, [user, decks, authLoading]);

  // Also add a manual refresh function for debugging
  // const refreshProgress = useCallback(async () => {
  //   console.log('Manual refresh button clicked:', {
  //     user: !!user,
  //     userId: user?.id,
  //     decksLength: decks.length,
  //     authLoading
  //   });

  //   if (!user || !user.id) {
  //     console.log('Manual refresh: No user available');
  //     toast({ title: 'Debug', description: 'No user available', variant: 'destructive' });
  //     return;
  //   }

  //   if (decks.length === 0) {
  //     console.log('Manual refresh: No decks available');
  //     toast({ title: 'Debug', description: 'No decks available', variant: 'destructive' });
  //     return;
  //   }

  //   console.log('Manual refresh triggered - proceeding with', decks.length, 'decks');
  //   toast({ title: 'Debug', description: `Fetching progress for ${decks.length} decks...` });

  //   const progressMap: Record<string, { progress: number, studied: number, total: number }> = {};

  //   for (const deck of decks) {
  //     try {
  //       const deckResponse = await apiService.getDeck(deck.id);
  //       let totalCards = deck.cards?.length || 0;

  //       if (deckResponse.data && deckResponse.data.deck && deckResponse.data.deck.cards) {
  //         totalCards = Array.isArray(deckResponse.data.deck.cards)
  //           ? deckResponse.data.deck.cards.length
  //           : (typeof deckResponse.data.deck.cards === 'string'
  //             ? JSON.parse(deckResponse.data.deck.cards).length
  //             : 0);
  //       }

  //       const response = await apiService.getDeckProgress(deck.id);
  //       if (response.data) {
  //         const masteredCount = response.data.progress.filter((p: { card_id: string; status: string }) => p.status === 'mastered').length;
  //         const progress = totalCards > 0 ? (masteredCount / totalCards) * 100 : 0;

  //         progressMap[deck.id] = {
  //           progress: Math.round(progress),
  //           studied: masteredCount,
  //           total: totalCards
  //         };
  //       }
  //     } catch (error) {
  //       console.error(`Manual refresh failed for deck ${deck.id}:`, error);
  //       progressMap[deck.id] = {
  //         progress: 0,
  //         studied: 0,
  //         total: deck.cards?.length || 0
  //       };
  //     }
  //   }

  //   console.log('Manual refresh completed, setting progress map:', progressMap);
  //   setDeckProgress(progressMap);
  //   toast({ title: 'Debug', description: 'Progress refresh completed!' });
  // }, [user, decks, toast]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      localStorage.setItem('favorite-decks', JSON.stringify(Array.from(newFavs)));
      return newFavs;
    });
  };

  const handleEdit = (deck: Deck) => {
    setEditingDeck(deck);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingDeck(null);
    setIsFormOpen(true);
  };

  const handleGenerateNew = () => {
    setIsGenerateFormOpen(true);
  };

  const handleSaveDeck = (deckData: Omit<Deck, 'id' | 'cards' | 'progress' | 'total'>) => {
    onSave(deckData, editingDeck);
    setIsFormOpen(false);
    setEditingDeck(null);
  }

  const handleGenerateDeck = (deckData: GenerateDeckData) => {
    onGenerate(deckData);
    setIsGenerateFormOpen(false);
  }

  const categories = ['All', 'Vocabulary', 'Grammar', 'Kanji', 'Phrases', 'Favorites'];

  const filteredDecks = decks.filter((deck) => {
    if (filter === 'All') return true;
    if (filter === 'Favorites') return favorites.has(deck.id);
    return deck.category === filter;
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold font-headline">Explore Decks</h1>
          <p className="text-muted-foreground">
            Choose a deck to start your learning journey.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          {/* <Button onClick={refreshProgress} variant="secondary" size="sm">
            🔄 Debug Refresh
          </Button> */}
          <Button onClick={handleGenerateNew} variant="outline">
            <Wand2 className="mr-2" />
            Generate Deck with AI
          </Button>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2" />
            Add New Deck
          </Button>
        </div>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {activeVariant === 'A' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDecks.map((deck) => {
            const progressData = deckProgress[deck.id] || { progress: 0, studied: 0, total: deck.cards?.length || 0 };
            return (
              <DeckCard
                key={deck.id}
                deck={deck}
                isFavorite={favorites.has(deck.id)}
                onToggleFavorite={toggleFavorite}
                onEdit={handleEdit}
                onDelete={onDelete}
                progress={progressData.progress}
                studied={progressData.studied}
                total={progressData.total}
              />
            )
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDecks.map((deck) => {
            const progressData = deckProgress[deck.id] || { progress: 0, studied: 0, total: deck.cards?.length || 0 };
            return (
              <DeckListItem
                key={deck.id}
                deck={deck}
                isFavorite={favorites.has(deck.id)}
                onToggleFavorite={toggleFavorite}
                onEdit={handleEdit}
                onDelete={onDelete}
                progress={progressData.progress}
                studied={progressData.studied}
                total={progressData.total}
              />
            )
          })}
        </div>
      )}


      {filteredDecks.length === 0 && (
        <div className="col-span-full mt-10 flex flex-col items-center justify-center text-center">
          <CheckCircle className="mb-4 h-16 w-16 text-muted-foreground/50" />
          <h2 className="text-2xl font-semibold text-muted-foreground">
            No Decks Found
          </h2>
          <p className="text-muted-foreground">
            Try selecting a different category or creating a new deck.
          </p>
        </div>
      )}

      <DeckForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSaveDeck}
        deck={editingDeck}
      />

      <GenerateDeckForm
        isOpen={isGenerateFormOpen}
        onOpenChange={setIsGenerateFormOpen}
        onGenerate={handleGenerateDeck}
      />
    </div>
  );
}
