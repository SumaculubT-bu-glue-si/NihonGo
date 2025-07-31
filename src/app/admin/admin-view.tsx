"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import type { FullAppData } from "@/hooks/use-global-state";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Trophy,
  Target,
  BarChart as BarChartIcon,
  Download,
  FileText,
  FileSpreadsheet,
  Loader2,
  Wand2,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { analyzeTopicEngagement } from "@/ai/flows/analyze-topic-engagement-flow";
import type { User } from "@/contexts/auth-context-sqlite";

interface LearnerStats {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  is_active: boolean;
  last_active: string;
  studyTime: string;
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

interface UserProgressChartData {
  name: string;
  vocabulary: number;
  grammar: number;
  quizzes: number;
}

const ITEMS_PER_PAGE = 5;

export function AdminView({
  allUsersData,
  allUsers,
}: {
  allUsersData: FullAppData;
  allUsers: User[];
}) {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [topicAnalysis, setTopicAnalysis] = useState<string[]>([]);
  const [isAnalyzingTopics, setIsAnalyzingTopics] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { learnerStats, aggregateStats, userProgressChartData } =
    useMemo(() => {
      const learners = allUsers.filter((user) => user.role === "learner");

      const stats: LearnerStats[] = learners.map((user, index) => {
        const data = allUsersData[user.id];
        if (!data) {
      return {
        uid: user.id,
        name: user.display_name || "Unknown",
        email: user.email || "No email",
        photoURL: user.photo_url || "",
        is_active: user.is_active || false,
        last_active: user.last_active || "Never",
        studyTime: "0m",
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
        const decksCompleted = data.userStats.filter(
          (s) => s.progress > 0 && s.progress === s.total
        ).length;
        const deckCompletionPercent =
          totalDecks > 0 ? Math.round((decksCompleted / totalDecks) * 100) : 0;

        const totalGrammar = data.grammarLessons.length;
        const grammarRead = data.grammarLessons.filter((l) => l.read).length;
        const grammarCompletionPercent =
          totalGrammar > 0 ? Math.round((grammarRead / totalGrammar) * 100) : 0;

        const quizzesTaken = data.quizScores.length;
        const totalScore = data.quizScores.reduce(
          (acc, score) => acc + score.highestScore,
          0
        );
        const avgQuizScore =
          quizzesTaken > 0 ? Math.round(totalScore / quizzesTaken) : 0;

        const mockTimes = ["1h 15m", "45m", "2h 5m", "1h 30m", "55m"];

        return {
          uid: user.id,
          name: user.display_name || "Unknown",
          email: user.email || "No email",
          photoURL: user.photo_url || "",
          is_active: user.is_active || false,
          last_active: user.last_active || "Never",
          studyTime: mockTimes[index % mockTimes.length],
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

      Object.values(allUsersData).forEach((userData) => {
        userData.quizScores.forEach((score) => {
          const quiz = userData.quizzes.find((q) => q.id === score.quizId);
          if (quiz && quiz.level === "N5") {
            if (quiz.category === "vocabulary") {
              totalVocabScore += score.highestScore;
              totalVocabQuizzes++;
            } else if (quiz.category === "grammar") {
              totalGrammarScore += score.highestScore;
              totalGrammarQuizzes++;
            }
          }
        });
      });

      const aggStats: AggregateStats = {
        totalLearners: learners.length,
        avgVocabAccuracy:
          totalVocabQuizzes > 0
            ? Math.round(totalVocabScore / totalVocabQuizzes)
            : 0,
        avgGrammarAccuracy:
          totalGrammarQuizzes > 0
            ? Math.round(totalGrammarScore / totalGrammarQuizzes)
            : 0,
      };

      // Calculate chart data
      const chartData: UserProgressChartData[] = learners.map((user) => {
        const data = allUsersData[user.id];
        if (!data) {
          return {
            name: user.display_name?.split(" ")[0] || "Unknown",
            vocabulary: 0,
            grammar: 0,
            quizzes: 0,
          };
        }

        const vocabDecks = data.decks.filter(
          (d) =>
            d.category === "Vocabulary" ||
            d.category === "Kanji" ||
            d.category === "Phrases"
        );
        const totalVocabCards = vocabDecks.reduce(
          (acc, deck) => acc + deck.cards.length,
          0
        );
        const completedVocabCards = vocabDecks.reduce((acc, deck) => {
          const stat = data.userStats.find((s) => s.topic === deck.title);
          return acc + (stat ? stat.progress : 0);
        }, 0);
        const vocabPercent =
          totalVocabCards > 0
            ? Math.round((completedVocabCards / totalVocabCards) * 100)
            : 0;

        const totalGrammar = data.grammarLessons.length;
        const grammarRead = data.grammarLessons.filter((l) => l.read).length;
        const grammarPercent =
          totalGrammar > 0 ? Math.round((grammarRead / totalGrammar) * 100) : 0;

        const quizzesTaken = data.quizScores.length;
        const totalQuizScore = data.quizScores.reduce(
          (acc, score) => acc + score.highestScore,
          0
        );
        const avgQuizScore =
          quizzesTaken > 0 ? Math.round(totalQuizScore / quizzesTaken) : 0;

        return {
          name: user.display_name?.split(" ")[0] || "Unknown",
          vocabulary: vocabPercent,
          grammar: grammarPercent,
          quizzes: avgQuizScore,
        };
      });

      return {
        learnerStats: stats,
        aggregateStats: aggStats,
        userProgressChartData: chartData,
      };
    }, [allUsersData, allUsers]);

  const totalPages = Math.ceil(learnerStats.length / ITEMS_PER_PAGE);
  const paginatedLearnerStats = learnerStats.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const handleAnalyzeTopics = async () => {
      if (!userProgressChartData || userProgressChartData.length === 0) {
        setIsAnalyzingTopics(false);
        return;
      }
      setIsAnalyzingTopics(true);
      try {
        const result = await analyzeTopicEngagement({
          chartData: userProgressChartData,
        });
        setTopicAnalysis(result.analysis);
      } catch (error) {
        console.error("Failed to analyze topic engagement:", error);
        setTopicAnalysis(["Could not retrieve AI analysis at this time."]);
      } finally {
        setIsAnalyzingTopics(false);
      }
    };
    handleAnalyzeTopics();
  }, [userProgressChartData]);

  const handleDownloadExcel = () => {
    const dataToExport = learnerStats.map((stat) => ({
      "Learner Name": stat.name,
      Email: stat.email,
      "Study Time (Mock)": stat.studyTime,
      "Decks Completed (%)": stat.deckCompletionPercent,
      "Grammar Read (%)": stat.grammarCompletionPercent,
      "Avg Quiz Score (%)": stat.avgQuizScore,
      "Quizzes Taken": stat.quizzesTaken,
    }));

    const worksheet = utils.json_to_sheet(dataToExport);

    // Set column widths
    worksheet["!cols"] = [
      { wch: 20 }, // Learner Name
      { wch: 25 }, // Email
      { wch: 18 }, // Study Time
      { wch: 20 }, // Decks Completed
      { wch: 20 }, // Grammar Read
      { wch: 20 }, // Avg Quiz Score
      { wch: 15 }, // Quizzes Taken
    ];

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Learner Progress");

    writeFile(workbook, "LearnerProgress.xlsx");
  };

  const handleDownloadPdf = async () => {
    const dashboardElement = dashboardRef.current;
    if (!dashboardElement) return;

    setIsDownloadingPdf(true);
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(dashboardElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f9fafb", // Tailwind gray-50
      });

      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      const padding = 40;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [contentWidth + padding * 2, contentHeight + padding * 2],
      });

      pdf.setFillColor("#f9fafb");
      pdf.rect(
        0,
        0,
        pdf.internal.pageSize.width,
        pdf.internal.pageSize.height,
        "F"
      );

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        padding,
        padding,
        contentWidth,
        contentHeight
      );
      pdf.save("AdminDashboard.pdf");
    } catch (e) {
      console.error("Error generating PDF", e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold font-headline">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            An overview of all learner progress in the system.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button variant="outline" onClick={handleDownloadExcel}>
            <FileSpreadsheet className="mr-2" />
            Download Excel
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
          >
            {isDownloadingPdf ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <FileText className="mr-2" />
            )}
            Download PDF
          </Button>
        </div>
      </div>
      <div
        ref={dashboardRef}
        className="space-y-6 bg-background p-4 rounded-lg"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {aggregateStats.totalLearners}
              </div>
              <p className="text-xs text-muted-foreground">
                all active learners
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Top Learner
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {learnerStats[0]?.name.split(' ')[0] || 'N/A'}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Score: {Math.max(...learnerStats.map(s => s.avgQuizScore))}%
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {learnerStats[0]?.decksCompleted} decks
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Vocab Accuracy
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {aggregateStats.avgVocabAccuracy}%
              </div>
              <p className="text-xs text-muted-foreground">for N5 level</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Grammar Accuracy
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {aggregateStats.avgGrammarAccuracy}%
              </div>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Deck Completion</TableHead>
                  <TableHead>Grammar Progress</TableHead>
                  <TableHead>Average Quiz Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLearnerStats.map((stats) => (
                  <TableRow key={stats.uid}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={stats.photoURL} alt={stats.name} />
                          <AvatarFallback>
                            {stats.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{stats.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {stats.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{stats.is_active? "Active" : "Inactive"}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Progress
                          value={stats.deckCompletionPercent}
                          className="h-2"
                        />
                        <span className="text-xs text-muted-foreground">
                          {stats.decksCompleted} of {stats.totalDecks} decks
                          completed ({stats.deckCompletionPercent}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Progress
                          value={stats.grammarCompletionPercent}
                          className="h-2"
                        />
                        <span className="text-xs text-muted-foreground">
                          {stats.grammarRead} of {stats.totalGrammar} lessons
                          read ({stats.grammarCompletionPercent}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">
                          {stats.avgQuizScore}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Based on {stats.quizzesTaken} quiz(zes) taken
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5" />
                Topic Engagement
              </CardTitle>
              <CardDescription>
                Comparison of topic completion percentage per user.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={userProgressChartData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--accent))", opacity: 0.2 }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm text-center">
                            <span className="text-sm font-bold text-foreground">
                              {data.name}
                            </span>
                            <p
                              className="text-xs"
                              style={{ color: "#ec4899" }}
                            >{`Vocabulary: ${payload[0].value}%`}</p>
                            <p
                              className="text-xs"
                              style={{ color: "#60a5fa" }}
                            >{`Grammar: ${payload[1].value}%`}</p>
                            <p
                              className="text-xs"
                              style={{ color: "#81C784" }}
                            >{`Quizzes: ${payload[2].value}%`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="vocabulary"
                    fill="#ec4899"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar dataKey="grammar" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="quizzes" fill="#81C784" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Progress Insights
              </CardTitle>
              <CardDescription>
                An AI-generated summary of the topic engagement data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzingTopics ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p>Analyzing engagement...</p>
                </div>
              ) : (
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {topicAnalysis.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
