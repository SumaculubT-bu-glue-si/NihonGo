
'use server';

/**
 * @fileOverview AI flow for generating a quiz.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { textToSpeech } from './text-to-speech-flow';

const QuizCategorySchema = z.enum(['vocabulary', 'grammar', 'listening']);
const QuizLevelSchema = z.enum(['N5', 'N4', 'N3', 'N2', 'N1']);

const GenerateQuizInputSchema = z.object({
  category: QuizCategorySchema,
  level: QuizLevelSchema,
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
    questionText: z.string().describe("The main question text. For listening quizzes, this will be the text to be converted to speech. For other types, it's the question shown to the user."),
    options: z.array(z.string()).length(4).describe('An array of exactly 4 multiple-choice options.'),
    correctAnswer: z.string().describe('The correct answer, which must be one of the provided options.'),
    explanation: z.string().describe('A brief explanation for why the correct answer is right.'),
});

const QuizSchema = z.object({
  title: z.string().describe('A descriptive title for the quiz.'),
  questions: z.array(QuizQuestionSchema).length(10).describe('An array of exactly 10 quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof QuizSchema>;


export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  const result = await generateQuizFlow(input);

  if (input.category === 'listening') {
    const questionsWithAudio = await Promise.all(result.questions.map(async (q) => {
        const audioData = await textToSpeech({ text: q.questionText });
        return { ...q, audioDataUri: audioData.media };
    }));
    return { ...result, questions: questionsWithAudio };
  }
  
  return result;
}


const prompt = ai.definePrompt({
    name: 'generateQuizPrompt',
    input: { schema: GenerateQuizInputSchema },
    output: { schema: QuizSchema },
    prompt: `You are an expert Japanese language teacher creating a 10-question multiple-choice quiz for a student.

Quiz Details:
- Category: {{{category}}}
- JLPT Level: {{{level}}}

Your task is to generate a quiz with exactly 10 unique and challenging questions appropriate for the specified category and level.

- For 'vocabulary' quizzes, test knowledge of words. The question can be in Japanese or English.
- For 'grammar' quizzes, test understanding of grammar points. The question should present a sentence with a blank and ask the user to fill it in.
- For 'listening' quizzes, the 'questionText' should be a simple Japanese sentence to be read aloud. The user will not see this text. The options should be possible English translations.

Rules:
- Each question must have 4 options.
- The 'correctAnswer' must exactly match one of the options.
- Provide a concise 'explanation' for each correct answer.
- Ensure variety and do not repeat concepts.
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: QuizSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
