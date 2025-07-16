
'use client';

import { useState, useMemo } from 'react';
import type { Flashcard } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { PronunciationButton } from '@/components/pronunciation-button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useGlobalState } from '@/hooks/use-global-state';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type LevelFilter = 'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
type TypeFilter = 'all' | 'vocabulary' | 'kanji';

export function VocabularyView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const { appData, isLoading } = useGlobalState();

  const allVocabulary = useMemo(() => {
    const vocabSet = new Map<string, Flashcard>();
    appData.decks.forEach(deck => {
        deck.cards.forEach(card => {
            if ((card.type === 'vocabulary' || card.type === 'kanji') && !vocabSet.has(card.front)) {
                vocabSet.set(card.front, card);
            }
        })
    });
    return Array.from(vocabSet.values()).sort((a, b) => a.front.localeCompare(b.front, 'ja'));
  }, [appData.decks]);

  const filteredVocabulary = useMemo(() => {
    return allVocabulary
      .filter(card => {
        if (typeFilter === 'all') return true;
        return card.type === typeFilter;
      })
      .filter(card => {
        if (levelFilter === 'All') return true;
        return card.level === levelFilter;
      })
      .filter(card => {
        if (!searchTerm) return true;
        const lowercasedTerm = searchTerm.toLowerCase();
        return card.front.toLowerCase().includes(lowercasedTerm) ||
               card.back.toLowerCase().includes(lowercasedTerm) ||
               card.reading?.toLowerCase().includes(lowercasedTerm);
      });
  }, [allVocabulary, searchTerm, levelFilter, typeFilter]);

  if (isLoading) {
    return (
        <div className="flex h-64 w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-2 text-3xl font-bold font-headline">Vocabulary</h1>
      <p className="mb-6 text-muted-foreground">
        Search and filter all the vocabulary and kanji you have learned across your decks.
      </p>

      <div className="mb-6 space-y-4 rounded-lg border p-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
            type="text"
            placeholder="Search vocabulary (e.g., 学校, school, がっこう)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Tabs value={levelFilter} onValueChange={(v) => setLevelFilter(v as LevelFilter)}>
                <TabsList>
                    {(['All', 'N5', 'N4', 'N3', 'N2', 'N1'] as LevelFilter[]).map(level => (
                        <TabsTrigger key={level} value={level}>{level}</TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <RadioGroup value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)} className="flex items-center">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vocabulary" id="r2" />
                    <Label htmlFor="r2">Vocabulary</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kanji" id="r3" />
                    <Label htmlFor="r3">Kanji</Label>
                </div>
            </RadioGroup>
        </div>
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
                <div className="flex items-center gap-4 text-right">
                    <p className="text-lg">{card.back}</p>
                    <div className="flex flex-col items-end gap-1">
                        <Badge variant="secondary" className="capitalize">{card.type}</Badge>
                        <Badge variant="outline">{card.level}</Badge>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
            <div className="text-center text-muted-foreground py-10">
                <p>No vocabulary found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
}
