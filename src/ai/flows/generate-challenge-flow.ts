
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
  grammar_point: z.string().describe('The specific grammar point being tested, which must be directly related to the unit topic.'),
  english_sentence: z.string().describe('The English sentence prompt for the user to translate.'),
  correct_japanese: z.string().describe('The correct and natural Japanese translation of the English sentence.'),
  word_bank: z.array(z.string()).describe("An array of Japanese words/particles that, when joined in order, EXACTLY form the 'correct_japanese' sentence. The final punctuation (like 。) should be attached to the last word."),
  hint: z.string().describe('A short, helpful hint about the grammar point.'),
  distractors: z.array(z.string()).length(2).describe('An array of exactly 2 incorrect but relevant Japanese words to distract the user.'),
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

Your task is to generate exactly **{{{count}}}** unique challenge items. Each item's grammar point and sentence MUST be directly related to the unit topic.

For each item, you must provide:
1.  'id': A sequential number for the item.
2.  'grammar_point': The specific N5 grammar point being tested. This MUST be relevant to the 'unit_topic'. For example, if the topic is "Particles", the grammar point should be a specific particle like "は" or "が".
3.  'english_sentence': A simple English sentence for the user to translate.
4.  'correct_japanese': The correct and natural Japanese translation.
5.  'word_bank': An array of the exact words/particles that form the correct Japanese sentence. The words in the bank should primarily be in hiragana or katakana, avoiding kanji where possible.
    - **CRITICAL RULE**: The elements of the 'word_bank' array, when joined together in order, MUST perfectly match the 'correct_japanese' string.
    - The final punctuation mark (like '。') MUST be attached to the last word and not be a separate element.
6.  'hint': A brief, one-sentence hint about the grammar rule.
7.  'distractors': An array of exactly 2 Japanese words that are incorrect but plausible distractors. These should also be in kana and relevant to the sentence.
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
