'use server';

/**
 * @fileOverview An AI agent for analyzing A/B test results.
 *
 * - analyzeABTest - A function that provides an analysis of A/B test data.
 * - AnalyzeABTestInput - The input type for the analyzeABTest function.
 * - AnalyzeABTestOutput - The return type for the analyzeABTest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ABTestDataSchema = z.object({
  name: z.string().describe("The name of the section being tested (e.g., 'Home', 'Grammar')."),
  'Variant A Engagement': z.number().describe('The engagement score percentage for Variant A.'),
  'Variant B Engagement': z.number().describe('The engagement score percentage for Variant B.'),
  'Variant A Efficiency': z.number().describe('The efficiency score percentage for Variant A.'),
  'Variant B Efficiency': z.number().describe('The efficiency score percentage for Variant B.'),
});

const AnalyzeABTestInputSchema = z.object({
  testData: z.array(ABTestDataSchema).describe('An array of performance data for each section test.'),
});
export type AnalyzeABTestInput = z.infer<typeof AnalyzeABTestInputSchema>;

const AnalyzeABTestOutputSchema = z.object({
  insights: z.array(z.string()).describe("A bulleted list of 3-5 key insights derived from the A/B test data. Each insight should be a concise, actionable string for an admin."),
});
export type AnalyzeABTestOutput = z.infer<typeof AnalyzeABTestOutputSchema>;

export async function analyzeABTest(input: AnalyzeABTestInput): Promise<AnalyzeABTestOutput> {
  return analyzeABTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeABTestPrompt',
  input: { schema: AnalyzeABTestInputSchema },
  output: { schema: AnalyzeABTestOutputSchema },
  prompt: `You are an expert UI/UX data analyst for an e-learning platform. Your task is to analyze A/B test results and provide a bulleted list of actionable insights for an administrator. Focus on identifying which variant is superior for each feature and why.

Here is the data comparing Variant A and Variant B across different app sections:
{{#each testData}}
- **{{this.name}} Section**:
  - Engagement: Variant A ({{this.['Variant A Engagement']}}%) vs. Variant B ({{this.['Variant B Engagement']}}%)
  - Efficiency: Variant A ({{this.['Variant A Efficiency']}}%) vs. Variant B ({{this.['Variant B Efficiency']}}%)
{{/each}}

Based on this data, provide 3-5 bullet points for the "AI Insights" panel. Your analysis should be concise and direct. For each point, state which variant is better and briefly explain why based on the metrics.

Example Insights:
- "For the Home page, Variant B is the clear winner with significantly higher engagement, even with slightly lower efficiency."
- "Variant B improves Grammar section efficiency dramatically, suggesting users find the new layout faster to navigate."
- "Despite a slight dip in engagement, Variant B's improved efficiency on the Dashboard makes it the recommended choice."
- "The variants for the Quizzes section perform similarly. Further testing or user feedback may be needed to declare a winner."
`,
});

const analyzeABTestFlow = ai.defineFlow(
  {
    name: 'analyzeABTestFlow',
    inputSchema: AnalyzeABTestInputSchema,
    outputSchema: AnalyzeABTestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
