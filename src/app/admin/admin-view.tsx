
'use client';

import { useMemo } from 'react';
import type { FullAppData } from '@/hooks/use-global-state';
import { allUsers } from '@/lib/user-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Clock, Target } from 'lucide-react';

interface LearnerStats {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  decksCompleted: number;
  totalDecks: number;
  deckCompletionPercent: number;
  grammarRead: number;
  totalGrammar: number;
  grammarCompletionPercent: number;
  avgQuizScore: number;
  quizzesTaken: number;
}

interface AggregateStats {
  totalLearners: number;
  avgVocabAccuracy: number;
  avgGrammarAccuracy: number;
}

export function AdminView({ allUsersData }: { allUsersData: FullAppData }) {
  const { learnerStats, aggregateStats } = useMemo(() => {
    const learners = allUsers.filter(user => user.role === 'learner');

    const stats: LearnerStats[] = learners.map(user => {
      const data = allUsersData[user.uid];
      if (!data) {
        return {
          uid: user.uid,
          name: user.displayName || 'Unknown',
          email: user.email || 'No email',
          photoURL: user.photoURL || '',
          decksCompleted: 0,
          totalDecks: 0,
          deckCompletionPercent: 0,
          grammarRead: 0,
          totalGrammar: 0,
          grammarCompletionPercent: 0,
          avgQuizScore: 0,
          quizzesTaken: 0,
        };
      }

      const totalDecks = data.decks.length;
      const decksCompleted = data.userStats.filter(s => s.progress > 0 && s.progress === s.total).length;
      const deckCompletionPercent = totalDecks > 0 ? Math.round((decksCompleted / totalDecks) * 100) : 0;
      
      const totalGrammar = data.grammarLessons.length;
      const grammarRead = data.grammarLessons.filter(l => l.read).length;
      const grammarCompletionPercent = totalGrammar > 0 ? Math.round((grammarRead / totalGrammar) * 100) : 0;

      const quizzesTaken = data.quizScores.length;
      const totalScore = data.quizScores.reduce((acc, score) => acc + score.highestScore, 0);
      const avgQuizScore = quizzesTaken > 0 ? Math.round(totalScore / quizzesTaken) : 0;

      return {
        uid: user.uid,
        name: user.displayName || 'Unknown',
        email: user.email || 'No email',
        photoURL: user.photoURL || '',
        decksCompleted,
        totalDecks,
        deckCompletionPercent,
        grammarRead,
        totalGrammar,
        grammarCompletionPercent,
        avgQuizScore,
        quizzesTaken,
      };
    });

    // Calculate Aggregate Stats
    let totalVocabScore = 0;
    let totalVocabQuizzes = 0;
    let totalGrammarScore = 0;
    let totalGrammarQuizzes = 0;

    Object.values(allUsersData).forEach(userData => {
        userData.quizScores.forEach(score => {
            const quiz = userData.quizzes.find(q => q.id === score.quizId);
            if (quiz && quiz.level === 'N5') {
                if(quiz.category === 'vocabulary') {
                    totalVocabScore += score.highestScore;
                    totalVocabQuizzes++;
                } else if (quiz.category === 'grammar') {
                    totalGrammarScore += score.highestScore;
                    totalGrammarQuizzes++;
                }
            }
        });
    });

    const aggStats: AggregateStats = {
        totalLearners: learners.length,
        avgVocabAccuracy: totalVocabQuizzes > 0 ? Math.round(totalVocabScore / totalVocabQuizzes) : 0,
        avgGrammarAccuracy: totalGrammarQuizzes > 0 ? Math.round(totalGrammarScore / totalGrammarQuizzes) : 0,
    };
    
    return { learnerStats: stats, aggregateStats: aggStats };

  }, [allUsersData]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of all learner progress in the system.
        </p>
      </div>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aggregateStats.totalLearners}</div>
            <p className="text-xs text-muted-foreground">all active learners</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Study Time (N5)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1h 6m</div>
            <p className="text-xs text-muted-foreground">per user (mock data)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Vocab Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aggregateStats.avgVocabAccuracy}%</div>
            <p className="text-xs text-muted-foreground">for N5 level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Grammar Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aggregateStats.avgGrammarAccuracy}%</div>
            <p className="text-xs text-muted-foreground">for N5 level</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learner Progress</CardTitle>
          <CardDescription>
            A summary of progress for all {learnerStats.length} learners.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Learner</TableHead>
                <TableHead>Deck Completion</TableHead>
                <TableHead>Grammar Progress</TableHead>
                <TableHead>Average Quiz Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {learnerStats.map(stats => (
                <TableRow key={stats.uid}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={stats.photoURL} alt={stats.name} />
                        <AvatarFallback>{stats.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{stats.name}</p>
                        <p className="text-xs text-muted-foreground">{stats.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                        <Progress value={stats.deckCompletionPercent} className="h-2" />
                        <span className="text-xs text-muted-foreground">
                            {stats.decksCompleted} of {stats.totalDecks} decks completed ({stats.deckCompletionPercent}%)
                        </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                        <Progress value={stats.grammarCompletionPercent} className="h-2" />
                        <span className="text-xs text-muted-foreground">
                            {stats.grammarRead} of {stats.totalGrammar} lessons read ({stats.grammarCompletionPercent}%)
                        </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">{stats.avgQuizScore}%</span>
                        <span className="text-xs text-muted-foreground">
                            Based on {stats.quizzesTaken} quiz(zes) taken
                        </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
