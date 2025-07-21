
'use server';

/**
 * @fileOverview AI flow for generating grammar challenges.
 *
 * - generateChallenge - A function that handles the challenge generation process.
 * - GenerateChallengeInput - The input type for the generateChallenge function.
 * - GenerateChallengeOutput - The return type for the generateChallenge function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChallengeItemSchema = z.object({
  id: z.number(),
  grammar_point: z.string().describe('The specific grammar point being tested.'),
  english_sentence: z.string().describe('The English sentence prompt for the user to translate.'),
  correct_japanese: z.string().describe('The correct Japanese translation of the English sentence.'),
  word_bank: z.array(z.string()).describe('An array of Japanese words/particles that make up the correct answer. The final punctuation (like 。) should be attached to the last word.'),
  hint: z.string().describe('A short, helpful hint about the grammar point.'),
  distractors: z.array(z.string()).length(2).describe('An array of exactly 2 incorrect words to distract the user.'),
});

const GenerateChallengeInputSchema = z.object({
  unit_topic: z.string().describe('The overall topic of the grammar unit, e.g., "Basic Sentences & Endings".'),
  count: z.number().min(1).max(10).describe('The number of challenge items to generate.'),
});
export type GenerateChallengeInput = z.infer<typeof GenerateChallengeInputSchema>;

const GenerateChallengeOutputSchema = z.object({
  items: z.array(ChallengeItemSchema).describe('An array of generated challenge items.'),
});
export type GenerateChallengeOutput = z.infer<typeof GenerateChallengeOutputSchema>;

export async function generateChallenge(input: GenerateChallengeInput): Promise<GenerateChallengeOutput> {
  return generateChallengeFlow(input);
}

const generateChallengeFlow = ai.defineFlow(
  {
    name: 'generateChallengeFlow',
    inputSchema: GenerateChallengeInputSchema,
    outputSchema: GenerateChallengeOutputSchema,
  },
  async (input) => {
    const customOutputSchema = z.object({
        items: z.array(ChallengeItemSchema).length(input.count).describe(`An array of exactly ${input.count} challenge items.`),
    });

    const prompt = ai.definePrompt({
      name: 'generateChallengePromptSized',
      input: { schema: GenerateChallengeInputSchema },
      output: { schema: customOutputSchema },
      prompt: `You are a Japanese language teacher creating a sentence-building challenge for an N5-level student.

The topic for this unit is: **{{{unit_topic}}}**

Your task is to generate exactly **{{{count}}}** unique challenge items related to this topic. Each item must be a simple sentence suitable for a beginner.

For each item, you must provide:
1.  'id': A sequential number for the item.
2.  'grammar_point': The specific N5 grammar point being tested (e.g., "です", "じゃないです", "でした").
3.  'english_sentence': A simple English sentence for the user to translate.
4.  'correct_japanese': The correct and natural Japanese translation.
5.  'word_bank': An array of the exact words/particles that form the correct Japanese sentence, in order. The final punctuation mark (like '。') MUST be attached to the last word and not be a separate element.
6.  'hint': A brief, one-sentence hint about the grammar rule.
7.  'distractors': An array of exactly 2 Japanese words that are incorrect but plausible distractors. The distractors should not be part of the correct answer.
`,
    });

    const { output } = await prompt(input);
    // Ensure IDs are sequential starting from 1
    const itemsWithSequentialIds = output!.items.map((item, index) => ({
        ...item,
        id: index + 1,
    }));
    return { items: itemsWithSequentialIds };
  }
);
