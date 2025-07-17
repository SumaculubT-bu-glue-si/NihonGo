
'use client';

import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Search, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { searchJisho, type JishoSearchOutput } from '@/ai/flows/jisho-dictionary-flow';
import { Badge } from '@/components/ui/badge';
import { PronunciationButton } from '@/components/pronunciation-button';
import { useGlobalState } from '@/hooks/use-global-state';
import { cn } from '@/lib/utils';

function SearchResultCard({ result }: { result: JishoSearchOutput['results'][0] }) {
    const mainReading = result.japanese[0];
  
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <PronunciationButton text={mainReading.word ?? mainReading.reading ?? ''} />
              <h2 className="text-3xl font-bold">{mainReading.word}</h2>
              <p className="text-xl text-muted-foreground">{mainReading.reading}</p>
            </div>
            {result.is_common && <Badge>Common word</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.senses.map((sense, index) => (
            <div key={index} className="flex gap-4">
              <span className="text-muted-foreground">{index + 1}.</span>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-1">
                    {sense.parts_of_speech.map(pos => (
                        <Badge key={pos} variant="secondary" className="capitalize">{pos.toLowerCase()}</Badge>
                    ))}
                </div>
                <p>{sense.english_definitions.join('; ')}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  
function InitialStateCard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <BookOpen className="h-12 w-12 mb-4" />
        <h3 className="text-xl font-semibold">Jisho Dictionary</h3>
        <p>Start by searching for a word in English or Japanese.</p>
    </div>
  )
}

export function DictionaryView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<JishoSearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [hasSearched, setHasSearched] = useState(false);
  const { appData } = useGlobalState();
  const activeVariant = appData.activeVariants.dictionary;

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setResults(null);
    setHasSearched(true);

    try {
      const response = await searchJisho({ query: searchQuery });
      setResults(response);
    } catch (error) {
      console.error('Dictionary search error:', error);
      toast({
        title: "Search Error",
        description: "Could not fetch dictionary results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    performSearch(query);
  };
  
  return (
    <div className="container mx-auto space-y-6">
        <div>
            <h1 className="mb-2 text-3xl font-bold font-headline">Dictionary</h1>
            <p className="text-muted-foreground">
                Search for any Japanese word using Jisho.org's powerful dictionary.
            </p>
        </div>
      <div className="relative">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search in English or Japanese (e.g., 猫, ねこ, cat)"
                className="text-lg h-12"
            />
            <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                <Search className="h-5 w-5" />
                )}
                <span className="sr-only">Search</span>
            </Button>
        </form>
      </div>


      <div className={cn("space-y-4", activeVariant === 'B' && "rounded-lg border bg-card p-4")}>
        {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p>Searching for "{query}"...</p>
            </div>
        )}

        {!hasSearched && !isLoading && <InitialStateCard />}
        
        {hasSearched && results && results.results.length > 0 && (
            results.results.map((res) => (
                <SearchResultCard key={res.slug} result={res} />
            ))
        )}

        {hasSearched && results && results.results.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center text-muted-foreground">
                <BookOpen className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold">No Results Found</h3>
                <p>We couldn't find any matches for "{query}".</p>
                <p className="text-xs mt-1">Try checking your spelling or using a different term.</p>
            </div>
        )}
      </div>

    </div>
  );
}
