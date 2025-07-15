
'use client';

import { useState } from 'react';
import type { Deck, StatsData } from '@/lib/data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, CheckCircle, MoreVertical, PlusCircle, Edit, Trash2, Settings } from 'lucide-react';
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

function DeckCard({
  deck,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  progress,
}: {
  deck: Deck;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (deck: Deck) => void;
  onDelete: (id: string) => void;
  progress: number;
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
                className={`h-6 w-6 transition-colors ${
                  isFavorite
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
        <p className="mt-1 text-xs text-muted-foreground">{Math.round(progress)}% completed</p>
      </div>
      <CardFooter className="mt-auto flex justify-between pt-4">
        <span className="text-sm text-muted-foreground">
          {deck.cards.length} cards
        </span>
        <Link href={`/decks/${deck.id}`} passHref>
          <Button>Start Learning</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

interface DeckBrowserProps {
  decks: Deck[];
  userStats: StatsData[];
  onSave: (deckData: Deck, editingDeck: Deck | null) => void;
  onDelete: (id: string) => void;
}


export function DeckBrowser({ decks, userStats, onSave, onDelete }: DeckBrowserProps) {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorite-decks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [filter, setFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);

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

  const handleSaveDeck = (deckData: Deck) => {
    onSave(deckData, editingDeck);
    setIsFormOpen(false);
    setEditingDeck(null);
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
        <Button onClick={handleAddNew} className="mt-4 sm:mt-0">
          <PlusCircle className="mr-2" />
          Add New Deck
        </Button>
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDecks.map((deck) => {
          const stat = userStats.find(s => s.topic === deck.title);
          const progress = stat && stat.total > 0 ? (stat.progress / stat.total) * 100 : 0;
          return (
            <DeckCard
              key={deck.id}
              deck={deck}
              isFavorite={favorites.has(deck.id)}
              onToggleFavorite={toggleFavorite}
              onEdit={handleEdit}
              onDelete={onDelete}
              progress={progress}
            />
          )
        })}
      </div>
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
    </div>
  );
}
