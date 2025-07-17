
'use client';

import { useMemo } from 'react';
import type { FullAppData } from '@/hooks/use-global-state';
import { allUsers } from '@/lib/user-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

export function AdminView({ allUsersData }: { allUsersData: FullAppData }) {
  const learnerStats = useMemo<LearnerStats[]>(() => {
    return allUsers
      .filter(user => user.role === 'learner')
      .map(user => {
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
  }, [allUsersData]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of all learner progress in the system.
        </p>
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
