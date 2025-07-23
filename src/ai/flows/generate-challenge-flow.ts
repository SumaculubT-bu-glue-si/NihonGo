

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
  level: z.enum(['N5', 'N4', 'N3', 'N2', 'N1']).describe('The JLPT level of the challenge.'),
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
      prompt: `You are a Japanese language teacher creating a sentence-building challenge for a student at the {{{level}}} level.

The topic for this unit is: **{{{unit_topic}}}**

Your task is to generate exactly **{{{count}}}** unique challenge items. Each item's grammar point and sentence MUST be directly related to the unit topic and appropriate for the specified JLPT level.

**CRITICAL Rules for Content Generation:**
1.  **Level-Appropriate Kanji:**
    -   **N5:** Use primarily hiragana and katakana. Avoid kanji where possible.
    -   **N4:** Introduce some common, basic kanji (e.g., 日, 本, 人, 大, 小) but keep many words in kana. Sentences can be slightly longer than N5.
    -   **N3 and above (N2, N1):** Use standard kanji for all words that are commonly written with kanji. Sentence complexity should increase with the level.
2.  **Word Bank Accuracy:**
    -   The elements of the 'word_bank' array, when joined together in order, MUST perfectly match the 'correct_japanese' string.
    -   The final punctuation mark (like '。') MUST be attached to the last word and not be a separate element.
3.  **Content Requirements for Each Item:**
    -   'id': A sequential number for the item.
    -   'grammar_point': The specific grammar point being tested. This MUST be relevant to both the 'unit_topic' and the 'level'.
    -   'english_sentence': A simple English sentence for the user to translate.
    -   'correct_japanese': The correct and natural Japanese translation.
    -   'word_bank': An array of the exact words/particles that form the correct Japanese sentence.
    -   'hint': A brief, one-sentence hint about the grammar rule.
    -   'distractors': An array of exactly 2 Japanese words that are incorrect but plausible distractors. These should also be level-appropriate.
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
