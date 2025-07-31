
'use client';

import { useState, useEffect } from 'react';
import { useContentApi, type GrammarLesson } from '@/hooks/use-content-api';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, BookOpen, ArrowRight, Star, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

type LevelFilter = 'All' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
type StatusFilter = 'all' | 'completed' | 'incomplete';
type CategoryFilter = LevelFilter | 'Favorites';

const levelColors: { [key in LevelFilter]?: string } = {
  N5: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  N4: 'bg-green-100 text-green-800 hover:bg-green-200',
  N3: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  N2: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  N1: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
};

const LessonItem = ({ lesson, isFavorite, onToggleFavorite }: { lesson: GrammarLesson, isFavorite: boolean, onToggleFavorite: (id: string) => void }) => (
  <div className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer group">
      <Link href={`/grammar-lessons/${lesson.id}`} passHref className="flex-grow">
        <div className="flex items-center gap-4">
          {lesson.user_read ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          ) : (
              <BookOpen className="h-5 w-5 text-muted-foreground shrink-0" />
          )}
          <div className="flex-grow">
            <p className="font-semibold">{lesson.title}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-2">
         <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(lesson.id); }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Star
                className={`h-5 w-5 transition-colors ${
                isFavorite
                    ? 'fill-yellow-400 text-yellow-500'
                    : 'text-muted-foreground/50 group-hover:text-muted-foreground'
                }`}
            />
        </Button>
         <Badge className={cn(levelColors[lesson.level as LevelFilter] ?? 'bg-gray-100 text-gray-800', 'border-transparent')}>
            {lesson.level}
          </Badge>
          <Link href={`/grammar-lessons/${lesson.id}`} passHref>
            <Button size="sm" variant="ghost">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
      </div>
  </div>
);

const LessonCard = ({ lesson, isFavorite, onToggleFavorite }: { lesson: GrammarLesson, isFavorite: boolean, onToggleFavorite: (id: string) => void }) => (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader>
            <div className="flex justify-between items-start">
                <Badge className={cn(levelColors[lesson.level as LevelFilter] ?? 'bg-gray-100 text-gray-800', 'border-transparent')}>
                    {lesson.level}
                </Badge>
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onToggleFavorite(lesson.id)}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Star
                            className={`h-5 w-5 transition-colors ${
                            isFavorite
                                ? 'fill-yellow-400 text-yellow-500'
                                : 'text-muted-foreground/50 hover:text-muted-foreground'
                            }`}
                        />
                    </Button>
                  {lesson.user_read ? (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Completed</span>
                      </div>
                   ) : (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>Not started</span>
                      </div>
                   )}
                </div>
            </div>
            <CardTitle className="text-lg">{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">
                {lesson.explanation}
            </p>
        </CardContent>
        <CardFooter>
            <Link href={`/grammar-lessons/${lesson.id}`} className="w-full">
                <Button className="w-full" variant="outline">
                    Start Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </CardFooter>
    </Card>
);

export function GrammarLessonsView() {
  const { grammarLessons, loading, error } = useContentApi();
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('grammar-lessons-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (lessonId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      localStorage.setItem('grammar-lessons-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const filteredLessons = grammarLessons.filter(lesson => {
    // Level filter
    if (levelFilter !== 'All' && lesson.level !== levelFilter) return false;
    
    // Status filter
    if (statusFilter === 'completed' && !lesson.user_read) return false;
    if (statusFilter === 'incomplete' && lesson.user_read) return false;
    
    // Category filter (favorites)
    if (categoryFilter === 'Favorites' && !favorites.includes(lesson.id)) return false;
    
    return true;
  });

  const completedLessons = grammarLessons.filter(lesson => lesson.user_read).length;
  const totalLessons = grammarLessons.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p>Loading grammar lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert>
        <AlertDescription>
          Error loading grammar lessons: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedLessons} of {totalLessons} lessons completed
              </span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
            <div className="text-center text-sm text-muted-foreground">
              {progressPercentage}% Complete
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Tabs value={levelFilter} onValueChange={(value) => setLevelFilter(value as LevelFilter)}>
            <TabsList>
              <TabsTrigger value="All">All Levels</TabsTrigger>
              <TabsTrigger value="N5">N5</TabsTrigger>
              <TabsTrigger value="N4">N4</TabsTrigger>
              <TabsTrigger value="N3">N3</TabsTrigger>
              <TabsTrigger value="N2">N2</TabsTrigger>
              <TabsTrigger value="N1">N1</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap gap-2">
          <RadioGroup value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="completed" id="completed" />
              <Label htmlFor="completed">Completed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="incomplete" id="incomplete" />
              <Label htmlFor="incomplete">Not Started</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-wrap gap-2">
          <RadioGroup value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as CategoryFilter)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="All" id="all-cat" />
              <Label htmlFor="all-cat">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Favorites" id="favorites" />
              <Label htmlFor="favorites">Favorites</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {filteredLessons.length} {filteredLessons.length === 1 ? 'Lesson' : 'Lessons'}
          </h3>
        </div>

        {viewMode === 'list' ? (
          <Card>
            <div className="divide-y">
              {filteredLessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  isFavorite={favorites.includes(lesson.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isFavorite={favorites.includes(lesson.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {filteredLessons.length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No lessons found matching your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
