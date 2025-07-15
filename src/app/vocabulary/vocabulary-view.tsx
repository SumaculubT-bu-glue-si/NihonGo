'use client';

import { useState, useMemo } from 'react';
import { decks, type Flashcard } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PronunciationButton } from '@/components/pronunciation-button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

export function VocabularyView() {
  const [searchTerm, setSearchTerm] = useState('');

  const allVocabulary = useMemo(() => {
    const vocabSet = new Map<string, Flashcard>();
    decks.forEach(deck => {
        deck.cards.forEach(card => {
            if ((card.type === 'vocabulary' || card.type === 'kanji') && !vocabSet.has(card.front)) {
                vocabSet.set(card.front, card);
            }
        })
    });
    return Array.from(vocabSet.values()).sort((a, b) => a.front.localeCompare(b.front, 'ja'));
  }, []);

  const filteredVocabulary = useMemo(() => {
    if (!searchTerm) {
      return allVocabulary;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return allVocabulary.filter(
      (card) =>
        card.front.toLowerCase().includes(lowercasedTerm) ||
        card.back.toLowerCase().includes(lowercasedTerm) ||
        card.reading?.toLowerCase().includes(lowercasedTerm)
    );
  }, [allVocabulary, searchTerm]);

  return (
    <div className="container mx-auto">
      <h1 className="mb-2 text-3xl font-bold font-headline">Vocabulary</h1>
      <p className="mb-6 text-muted-foreground">
        Search for any vocabulary word you have learned.
      </p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search vocabulary (e.g., 学校, school, がっこう)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filteredVocabulary.length > 0 ? (
            filteredVocabulary.map((card) => (
            <Card key={card.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <PronunciationButton text={card.front} />
                    <div>
                        <p className="text-lg font-bold">{card.front}</p>
                        <p className="text-sm text-muted-foreground">{card.reading}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg">{card.back}</p>
                    <Badge variant="outline">{card.level}</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
            <div className="text-center text-muted-foreground py-10">
                <p>No vocabulary found for "{searchTerm}".</p>
            </div>
        )}
      </div>
    </div>
  );
}
