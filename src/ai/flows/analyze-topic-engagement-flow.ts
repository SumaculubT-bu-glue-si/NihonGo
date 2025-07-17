'use server';

/**
 * @fileOverview An AI agent for analyzing topic engagement from a chart.
 *
 * - analyzeTopicEngagement - A function that provides an analysis of topic stats.
 * - AnalyzeTopicEngagementInput - The input type for the analyzeTopicEngagement function.
 * - AnalyzeTopicEngagementOutput - The return type for the analyzeTopicEngagement function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const UserProgressSchema = z.object({
  name: z.string().describe("The learner's first name."),
  vocabulary: z.number().describe('The completion percentage for vocabulary-related decks.'),
  grammar: z.number().describe('The completion percentage for grammar lessons.'),
  quizzes: z.number().describe('The average score percentage for all quizzes taken.'),
});

const AnalyzeTopicEngagementInputSchema = z.object({
  chartData: z.array(UserProgressSchema).describe('An array of progress data for each user, matching the chart.'),
});
export type AnalyzeTopicEngagementInput = z.infer<typeof AnalyzeTopicEngagementInputSchema>;

const AnalyzeTopicEngagementOutputSchema = z.object({
  analysis: z.array(z.string()).describe("A bulleted list of 3-5 key insights derived from the topic engagement data. Each insight should be a concise string."),
});
export type AnalyzeTopicEngagementOutput = z.infer<typeof AnalyzeTopicEngagementOutputSchema>;

export async function analyzeTopicEngagement(input: AnalyzeTopicEngagementInput): Promise<AnalyzeTopicEngagementOutput> {
  return analyzeTopicEngagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTopicEngagementPrompt',
  input: { schema: AnalyzeTopicEngagementInputSchema },
  output: { schema: AnalyzeTopicEngagementOutputSchema },
  prompt: `You are an expert data analyst for an e-learning platform. Your task is to analyze user engagement data from a chart and provide a bulleted list of key insights. Be concise and focus on actionable observations for an administrator.

Here is the data:
{{#each chartData}}
- {{this.name}}: Vocabulary {{this.vocabulary}}%, Grammar {{this.grammar}}%, Quizzes {{this.quizzes}}%
{{/each}}

Based on this data, provide 3-5 bullet points for an "AI Insights" panel. Identify overall trends, high-performing users, and areas where users are struggling. For example:
- "Vocabulary seems to be the strongest area for most learners."
- "Quiz scores are consistently lower than other areas, suggesting the quizzes may be too difficult or learners need more review."
- "Yuki is excelling in all topics, showing high engagement."
- "Ren could use extra encouragement, particularly in grammar."
`,
});

const analyzeTopicEngagementFlow = ai.defineFlow(
  {
    name: 'analyzeTopicEngagementFlow',
    inputSchema: AnalyzeTopicEngagementInputSchema,
    outputSchema: AnalyzeTopicEngagementOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
