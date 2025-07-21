
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

const QuizCategorySchema = z.enum(['vocabulary', 'grammar']);
const QuizLevelSchema = z.enum(['N5', 'N4', 'N3', 'N2', 'N1']);

const GenerateQuizInputSchema = z.object({
  category: QuizCategorySchema,
  level: QuizLevelSchema,
  title: z.string().describe('The title for the new quiz.'),
  questionCount: z.number().optional().default(10).describe('The number of questions to generate for the quiz.'),
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
  questions: z.array(QuizQuestionSchema).describe('An array of quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof QuizSchema>;


export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  const result = await generateQuizFlow(input);
  return result;
}


const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: QuizSchema,
  },
  async (input) => {
    // Dynamically set the number of questions in the output schema
    const customOutputSchema = z.object({
        title: z.string().describe('A descriptive title for the quiz.'),
        questions: z.array(QuizQuestionSchema).length(input.questionCount).describe(`An array of exactly ${input.questionCount} quiz questions.`),
    });

    const prompt = ai.definePrompt({
        name: 'generateSizedQuizPrompt',
        input: { schema: GenerateQuizInputSchema },
        output: { schema: customOutputSchema },
        prompt: `You are an expert Japanese language teacher creating a multiple-choice quiz for a student.

The quiz title will be: {{{title}}}

Quiz Details:
- Category: {{{category}}}
- JLPT Level: {{{level}}}

Your task is to generate a quiz with exactly {{{questionCount}}} unique and challenging questions appropriate for the specified category and level. The generated 'title' field must exactly match the provided title.

- For 'vocabulary' quizzes, test knowledge of words. The question can be in Japanese or English.
- For 'grammar' quizzes, test understanding of grammar points. The question should present a sentence with a blank and ask the user to fill it in.

Rules:
- Each question must have 4 options.
- The 'correctAnswer' must exactly match one of the options.
- Provide a concise 'explanation' for each correct answer.
- Ensure variety and do not repeat concepts.
`,
    });

    const { output } = await prompt(input);
    return output!;
  }
);
