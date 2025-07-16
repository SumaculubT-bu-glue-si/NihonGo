
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import type { QuizQuestion } from '@/lib/data';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

const formSchema = z.object({
  questionText: z.string().min(1, 'Question text is required.'),
  options: z.array(z.string().min(1, 'Option cannot be empty.')).length(4, 'There must be exactly 4 options.'),
  correctAnswer: z.string().min(1, 'A correct answer must be selected.'),
  explanation: z.string().min(1, 'Explanation is required.'),
}).refine(data => data.options.includes(data.correctAnswer), {
  message: "Correct answer must be one of the options.",
  path: ["correctAnswer"],
});

export type QuestionFormData = z.infer<typeof formSchema>;

interface QuestionFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: QuestionFormData) => void;
  question: QuizQuestion | null;
}

export function QuestionForm({ isOpen, onOpenChange, onSave, question }: QuestionFormProps) {
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (question) {
        form.reset({
          questionText: question.questionText,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        });
      } else {
        form.reset({
          questionText: '',
          options: ['', '', '', ''],
          correctAnswer: '',
          explanation: '',
        });
      }
    }
  }, [question, form, isOpen]);

  const onSubmit = (data: QuestionFormData) => {
    onSave(data);
    onOpenChange(false);
  };

  const options = form.watch('options');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{question ? 'Edit Question' : 'Create New Question'}</DialogTitle>
          <DialogDescription>
            {question ? 'Update the details of the question.' : 'Fill in the details for the new question.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
            <FormField
              control={form.control}
              name="questionText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., What is the meaning of「学校」?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
                <FormLabel>Options</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map(index => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={`options.${index}`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder={`Option ${index + 1}`} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                </div>
            </div>

            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Correct Answer</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {options.map((option, index) => (
                        <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option} disabled={!option.trim()}/>
                          </FormControl>
                          <FormLabel className="font-normal">{option || `Option ${index + 1}`}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g.,「学校」(がっこう) means school." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Question</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
