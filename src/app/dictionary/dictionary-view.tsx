
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Search, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { searchJisho, type JishoSearchOutput } from '@/ai/flows/jisho-dictionary-flow';
import { suggestDictionaryTerms } from '@/ai/flows/suggest-dictionary-terms-flow';
import { Badge } from '@/components/ui/badge';
import { PronunciationButton } from '@/components/pronunciation-button';
import { useDebounce } from '@/hooks/use-debounce';

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

export function DictionaryView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<JishoSearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);


  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
    }
    setIsSuggestionsLoading(true);
    try {
        const response = await suggestDictionaryTerms({ query: searchQuery });
        setSuggestions(response.suggestions);
    } catch (error) {
        // Fail silently on suggestions
        console.error('Suggestion fetch error:', error);
        setSuggestions([]);
    } finally {
        setIsSuggestionsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, fetchSuggestions]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setResults(null);
    setShowSuggestions(false);

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
  
  // Fetch initial data on load
  useEffect(() => {
    performSearch('welcome');
  }, [performSearch]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    performSearch(query);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
  }
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container mx-auto space-y-6">
        <div>
            <h1 className="mb-2 text-3xl font-bold font-headline">Dictionary</h1>
            <p className="text-muted-foreground">
                Search for any Japanese word using Jisho.org's powerful dictionary.
            </p>
        </div>
      <div className="relative" ref={containerRef}>
        <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
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

        {showSuggestions && (suggestions.length > 0 || isSuggestionsLoading) && (
            <Card className="absolute z-10 w-full mt-2">
                <CardContent className="p-2">
                    {isSuggestionsLoading ? (
                        <div className="flex items-center justify-center p-2 text-sm text-muted-foreground">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Loading suggestions...</span>
                        </div>
                    ) : (
                        <ul className="space-y-1">
                            {suggestions.map((s, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => handleSuggestionClick(s)}
                                        className="w-full text-left p-2 rounded-md hover:bg-accent"
                                    >
                                        {s}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        )}
      </div>


      <div className="space-y-4">
        {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p>Searching for "{query}"...</p>
            </div>
        )}

        {results && results.results.length > 0 && (
            results.results.map((res) => (
                <SearchResultCard key={res.slug} result={res} />
            ))
        )}

        {results && results.results.length === 0 && !isLoading && (
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
