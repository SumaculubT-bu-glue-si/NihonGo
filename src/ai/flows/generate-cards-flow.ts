'use server';

/**
 * @fileOverview AI flow for generating new flashcards for an existing deck.
 *
 * - generateCards - A function that handles the card generation process.
 * - GenerateCardsInput - The input type for the generateCards function.
 * - GenerateCardsOutput - The return type for the generateCards function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const cardTypeSchema = z.enum(['vocabulary', 'grammar', 'kanji']);
const cardLevelSchema = z.enum(['N5', 'N4', 'N3', 'N2', 'N1']);

const FlashcardSchema = z.object({
    front: z.string().describe('The Japanese word, phrase, or kanji.'),
    back: z.string().describe('The English translation or explanation.'),
    reading: z.string().optional().describe('The furigana or reading for the Japanese text.'),
    type: cardTypeSchema.describe("The type of card. Should match the deck's category."),
    level: cardLevelSchema.describe("The JLPT level of the card. Should align with the deck's level."),
});

export const GenerateCardsInputSchema = z.object({
  deckContext: z.object({
    title: z.string().describe('The title of the deck.'),
    description: z.string().describe('The description of the deck.'),
    category: z.enum(['Vocabulary', 'Grammar', 'Phrases', 'Kanji']).describe('The category of the deck.'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The difficulty level of the deck.'),
  }),
  existingCards: z.array(z.string()).describe('An array of the "front" text of existing cards to avoid duplication.'),
  count: z.number().min(1).max(20).describe('The number of new cards to generate.'),
});
export type GenerateCardsInput = z.infer<typeof GenerateCardsInputSchema>;

export const GenerateCardsOutputSchema = z.object({
  cards: z.array(FlashcardSchema).describe('An array of newly generated flashcards.'),
});
export type GenerateCardsOutput = z.infer<typeof GenerateCardsOutputSchema>;

export async function generateCards(input: GenerateCardsInput): Promise<GenerateCardsOutput> {
  return generateCardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCardsPrompt',
  input: { schema: GenerateCardsInputSchema },
  output: { schema: GenerateCardsOutputSchema },
  prompt: `You are an expert Japanese language tutor creating new flashcards for an existing deck.

The user wants to add {{{count}}} new cards to the following deck:
- Title: {{{deckContext.title}}}
- Description: {{{deckContext.description}}}
- Category: {{{deckContext.category}}}
- Level: {{{deckContext.level}}}

The deck already contains the following cards (by their front text). You MUST NOT generate cards that are duplicates of these:
{{#each existingCards}}
- {{{this}}}
{{/each}}

Your task is to generate exactly {{{count}}} new, unique, and relevant flashcards for this deck. Ensure the 'type' and 'level' for each new card are appropriate for the deck's category and level.
`,
});

const generateCardsFlow = ai.defineFlow(
  {
    name: 'generateCardsFlow',
    inputSchema: GenerateCardsInputSchema,
    outputSchema: GenerateCardsOutputSchema,
  },
  async (input) => {
    // Ensure the number of generated cards matches the request count.
    const customOutputSchema = z.object({
        cards: z.array(FlashcardSchema).length(input.count).describe(`An array of exactly ${input.count} flashcards.`),
    });

    const customPrompt = ai.definePrompt({
        name: 'generateCardsPromptSized',
        input: { schema: GenerateCardsInputSchema },
        output: { schema: customOutputSchema },
        prompt: prompt.prompt,
    });
        
    const { output } = await customPrompt(input);
    return output!;
  }
);
