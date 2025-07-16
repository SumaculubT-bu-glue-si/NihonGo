'use server';

/**
 * @fileOverview AI flow for generating a full flashcard deck from a user's idea.
 *
 * - generateDeck - A function that handles the deck generation process.
 * - GenerateDeckInput - The input type for the generateDeck function.
 * - GenerateDeckOutput - The return type for the generateDeck function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateDeckInputSchema = z.object({
  idea: z.string().describe("The user's core idea or theme for the flashcard deck."),
  category: z.enum(['Vocabulary', 'Grammar', 'Phrases', 'Kanji']).describe('The category of the deck.'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The difficulty level of the deck.'),
});
export type GenerateDeckInput = z.infer<typeof GenerateDeckInputSchema>;

const cardTypeSchema = z.enum(['vocabulary', 'grammar', 'kanji']);
const cardLevelSchema = z.enum(['N5', 'N4', 'N3', 'N2', 'N1']);

const FlashcardSchema = z.object({
    front: z.string().describe('The Japanese word, phrase, or kanji.'),
    back: z.string().describe('The English translation or explanation.'),
    reading: z.string().optional().describe('The furigana or reading for the Japanese text.'),
    type: cardTypeSchema.describe("The type of card. Should match the deck's category."),
    level: cardLevelSchema.describe("The JLPT level of the card. Should align with the deck's level."),
});

const GenerateDeckOutputSchema = z.object({
  title: z.string().describe("A creative and descriptive title for the generated deck, based on the user's idea."),
  description: z.string().describe("A brief, one-sentence description of the deck's content."),
  cards: z.array(FlashcardSchema).length(20).describe('An array of exactly 20 flashcards relevant to the idea.'),
});
export type GenerateDeckOutput = z.infer<typeof GenerateDeckOutputSchema>;

export async function generateDeck(input: GenerateDeckInput): Promise<GenerateDeckOutput> {
  return generateDeckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDeckPrompt',
  input: { schema: GenerateDeckInputSchema },
  output: { schema: GenerateDeckOutputSchema },
  prompt: `You are an expert Japanese language tutor. Your task is to generate a complete flashcard deck based on the user's request.

The user wants a deck with the following details:
- Idea/Theme: {{{idea}}}
- Category: {{{category}}}
- Level: {{{level}}}

Based on this, you must:
1.  Create a 'title' for the deck. It should be creative and reflect the theme.
2.  Write a short 'description' for the deck.
3.  Generate an array of exactly 20 flashcards ('cards'). Each card must be relevant to the idea, category, and level.

- For 'Vocabulary' or 'Phrases' decks, provide the word/phrase, its reading, and the English translation.
- For 'Grammar' decks, the front should be the grammar point, and the back should be a concise English explanation.
- For 'Kanji' decks, the front is the kanji character, the back is its English meaning, and the reading is its primary on'yomi or kun'yomi.

Ensure the 'type' and 'level' fields for each card are set appropriately based on the overall deck category and level. Map the deck level (Beginner, Intermediate, Advanced) to a suitable JLPT level (N5-N1) for the cards. For example, Beginner can be N5/N4, Intermediate N3/N2, and Advanced N1.
`,
});

const generateDeckFlow = ai.defineFlow(
  {
    name: 'generateDeckFlow',
    inputSchema: GenerateDeckInputSchema,
    outputSchema: GenerateDeckOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
