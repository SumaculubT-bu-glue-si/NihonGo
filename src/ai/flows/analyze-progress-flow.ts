
'use server';

/**
 * @fileOverview An AI agent for analyzing a user's overall learning progress.
 *
 * - analyzeProgress - A function that provides an analysis of learning stats.
 * - AnalyzeProgressInput - The input type for the analyzeProgress function.
 * - AnalyzeProgressOutput - The return type for the analyzeProgress function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DeckProgressSchema = z.object({
  title: z.string(),
  progress: z.number(),
  total: z.number(),
});

const AnalyzeProgressInputSchema = z.object({
  deckStats: z.array(DeckProgressSchema).describe('An array of progress stats for each deck.'),
  grammarStats: z.object({
    read: z.number().describe('Number of grammar lessons read.'),
    total: z.number().describe('Total number of grammar lessons.'),
  }).describe('Progress stats for grammar lessons.'),
  quizStats: z.object({
    quizzesTaken: z.number().describe('Number of quizzes the user has taken at least once.'),
    averageScore: z.number().describe('The average score across all taken quizzes, as a percentage.'),
    scoresByLevel: z.record(z.string(), z.object({
        average: z.number(),
        count: z.number(),
    })).describe('A breakdown of average scores by JLPT level.'),
  }).describe('Performance stats for quizzes.'),
});
export type AnalyzeProgressInput = z.infer<typeof AnalyzeProgressInputSchema>;

const AnalyzeProgressOutputSchema = z.object({
  analysis: z.string().describe("A friendly, encouraging, and insightful analysis of the user's progress in 2-3 paragraphs. It should highlight strengths, identify areas for improvement, and suggest what to focus on next."),
});
export type AnalyzeProgressOutput = z.infer<typeof AnalyzeProgressOutputSchema>;

export async function analyzeProgress(input: AnalyzeProgressInput): Promise<AnalyzeProgressOutput> {
  return analyzeProgressFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeProgressPrompt',
  input: { schema: AnalyzeProgressInputSchema },
  output: { schema: AnalyzeProgressOutputSchema },
  prompt: `You are a friendly and encouraging Japanese language tutor named "Go-sensei". Your task is to analyze the user's learning progress and provide a helpful, personalized analysis. Address the user directly and maintain a positive and motivational tone.

Here is the user's progress data:

**Deck Completion:**
{{#each deckStats}}
- Deck "{{this.title}}": Completed {{this.progress}} of {{this.total}} cards.
{{/each}}

**Grammar Lessons:**
- Read {{grammarStats.read}} of {{grammarStats.total}} lessons.

**Quiz Performance:**
- Quizzes Taken: {{quizStats.quizzesTaken}}
- Overall Average Score: {{quizStats.averageScore}}%
- Performance by Level:
{{#each quizStats.scoresByLevel}}
  - {{@key}}: Average score of {{this.average}}% over {{this.count}} quiz(zes).
{{/each}}

Based on this data, provide an analysis in 2-3 short paragraphs. Your analysis should:
1.  Start with a word of encouragement.
2.  Highlight the user's strengths (e.g., strong quiz scores in a certain area, good progress in a specific deck).
3.  Gently point out areas for improvement (e.g., lower quiz scores in another area, unread grammar lessons).
4.  Suggest a clear, actionable next step. For example, if grammar scores are low, suggest reviewing some grammar lessons. If a deck is almost complete, encourage them to finish it.
5.  End on a positive and motivating note. Keep it concise and easy to read.
`,
});

const analyzeProgressFlow = ai.defineFlow(
  {
    name: 'analyzeProgressFlow',
    inputSchema: AnalyzeProgressInputSchema,
    outputSchema: AnalyzeProgressOutputSchema,
    flow: {
      retries: 3,
    },
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
