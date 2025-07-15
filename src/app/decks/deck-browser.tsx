'use client';

import { useState } from 'react';
import { decks, type Deck } from '@/lib/data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

function DeckCard({ deck, isFavorite, onToggleFavorite }: { deck: Deck; isFavorite: boolean; onToggleFavorite: (id: string) => void; }) {
  return (
    <Card className="flex h-full transform flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <Badge variant={deck.level === 'Beginner' ? 'default' : deck.level === 'Intermediate' ? 'secondary' : 'destructive'} className="mb-2 bg-accent text-accent-foreground">{deck.level}</Badge>
                <CardTitle className="font-headline">{deck.title}</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onToggleFavorite(deck.id)} aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                <Star className={`h-6 w-6 transition-colors ${isFavorite ? 'fill-yellow-400 text-yellow-500' : 'text-muted-foreground'}`} />
            </Button>
        </div>
        <CardDescription>{deck.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-between">
        <span className="text-sm text-muted-foreground">{deck.cards.length} cards</span>
        <Link href={`/decks/${deck.id}`} passHref>
          <Button>Start Learning</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}


export function DeckBrowser() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('All');

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      return newFavs;
    });
  };

  const categories = ['All', 'Vocabulary', 'Grammar', 'Phrases', 'Favorites'];

  const filteredDecks = decks.filter(deck => {
    if (filter === 'All') return true;
    if (filter === 'Favorites') return favorites.has(deck.id);
    return deck.category === filter;
  });

  return (
    <div className="container mx-auto">
      <h1 className="mb-2 text-3xl font-bold font-headline">Explore Decks</h1>
      <p className="mb-6 text-muted-foreground">Choose a deck to start your learning journey.</p>
      
      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-5">
            {categories.map(category => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDecks.map(deck => (
          <DeckCard key={deck.id} deck={deck} isFavorite={favorites.has(deck.id)} onToggleFavorite={toggleFavorite} />
        ))}
      </div>
      {filteredDecks.length === 0 && (
        <div className="col-span-full mt-10 flex flex-col items-center justify-center text-center">
            <CheckCircle className="mb-4 h-16 w-16 text-muted-foreground/50"/>
            <h2 className="text-2xl font-semibold text-muted-foreground">No Decks Found</h2>
            <p className="text-muted-foreground">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
}
