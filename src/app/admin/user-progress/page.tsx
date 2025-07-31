'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Users, BookOpen, Trophy, Target } from 'lucide-react';

interface UserProgress {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
  last_active_at: string;
  lessons_completed: number;
  quizzes_attempted: number;
  avg_quiz_score: number;
  challenges_completed: number;
  hearts: number;
  diamonds: number;
  current_challenge_level: string;
}

interface DetailedUserProgress {
  grammarProgress: any[];
  quizScores: any[];
  challengeProgress: any[];
  gameStats: any;
}

export default function UserProgressPage() {
  const [users, setUsers] = useState<UserProgress[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProgress | null>(null);
  const [detailedProgress, setDetailedProgress] = useState<DetailedUserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    loadUsersProgress();
  }, []);

  const loadUsersProgress = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllUsersProgress();
      if (response.data) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Failed to load users progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserDetails = async (userId: string) => {
    try {
      setLoadingDetails(true);
      const response = await apiService.getUserProgress(userId);
      if (response.data) {
        setDetailedProgress(response.data);
      }
    } catch (error) {
      console.error('Failed to load user details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'N5': 'bg-green-100 text-green-800',
      'N4': 'bg-blue-100 text-blue-800',
      'N3': 'bg-yellow-100 text-yellow-800',
      'N2': 'bg-orange-100 text-orange-800',
      'N1': 'bg-red-100 text-red-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading user progress...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">User Progress Dashboard</h1>
        <p className="text-gray-600">Monitor user engagement and learning progress</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.length > 0 
                ? Math.round(users.reduce((sum, user) => sum + user.lessons_completed, 0) / users.length)
                : 0
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Quiz Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.length > 0 
                ? Math.round(users.reduce((sum, user) => sum + (user.avg_quiz_score || 0), 0) / users.length)
                : 0
              }%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.length > 0 
                ? Math.round(users.reduce((sum, user) => sum + user.challenges_completed, 0) / users.length)
                : 0
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Lessons</TableHead>
                <TableHead>Quizzes</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Challenges</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.display_name || 'Anonymous'}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell>{formatDate(user.last_active_at)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.lessons_completed}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.quizzes_attempted}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={user.avg_quiz_score || 0} className="w-16" />
                      <span className="text-sm">{Math.round(user.avg_quiz_score || 0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.challenges_completed}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(user.current_challenge_level)}>
                      {user.current_challenge_level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            loadUserDetails(user.id);
                          }}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Progress Details: {user.display_name || user.email}
                          </DialogTitle>
                        </DialogHeader>
                        
                        {loadingDetails ? (
                          <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                          </div>
                        ) : detailedProgress ? (
                          <Tabs defaultValue="grammar" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="grammar">Grammar Lessons</TabsTrigger>
                              <TabsTrigger value="quizzes">Quiz Scores</TabsTrigger>
                              <TabsTrigger value="challenges">Challenges</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="grammar" className="space-y-4">
                              <div className="grid gap-4">
                                {detailedProgress.grammarProgress.map((lesson, index) => (
                                  <Card key={index}>
                                    <CardContent className="pt-4">
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <h4 className="font-medium">{lesson.title}</h4>
                                          <p className="text-sm text-gray-500">Level: {lesson.level}</p>
                                        </div>
                                        <Badge variant={lesson.read ? "default" : "secondary"}>
                                          {lesson.read ? "Completed" : "Not Read"}
                                        </Badge>
                                      </div>
                                      {lesson.completed_at && (
                                        <p className="text-xs text-gray-500 mt-1">
                                          Completed: {formatDate(lesson.completed_at)}
                                        </p>
                                      )}
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="quizzes" className="space-y-4">
                              <div className="grid gap-4">
                                {detailedProgress.quizScores.map((quiz, index) => (
                                  <Card key={index}>
                                    <CardContent className="pt-4">
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <h4 className="font-medium">{quiz.title}</h4>
                                          <p className="text-sm text-gray-500">Level: {quiz.level}</p>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-lg font-bold">{quiz.highest_score}%</div>
                                          <p className="text-xs text-gray-500">{quiz.attempts} attempts</p>
                                        </div>
                                      </div>
                                      <Progress value={quiz.highest_score} className="mt-2" />
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="challenges" className="space-y-4">
                              <div className="grid gap-4">
                                {detailedProgress.challengeProgress.map((challenge, index) => (
                                  <Card key={index}>
                                    <CardContent className="pt-4">
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <h4 className="font-medium">
                                            Level {challenge.level} - Unit {challenge.unit_id} - Stage {challenge.stage_id}
                                          </h4>
                                          <p className="text-sm text-gray-500">
                                            Updated: {formatDate(challenge.updated_at)}
                                          </p>
                                        </div>
                                        <Badge variant={
                                          challenge.status === 'completed' ? 'default' : 
                                          challenge.status === 'active' ? 'secondary' : 'outline'
                                        }>
                                          {challenge.status}
                                        </Badge>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>
                          </Tabs>
                        ) : (
                          <p className="text-center text-gray-500">No detailed progress available</p>
                        )}
                      </DialogContent>
                    </Dialog>
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