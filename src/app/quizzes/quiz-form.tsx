
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { Quiz } from '@/lib/data';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
});

export type QuizFormData = z.infer<typeof formSchema>;

interface QuizFormProps {
  onSave: (data: QuizFormData) => void;
  quiz: Quiz;
}

export function QuizForm({ onSave, quiz }: QuizFormProps) {
  const form = useForm<QuizFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: quiz.title,
    },
  });

  useEffect(() => {
    form.reset({
      title: quiz.title,
    });
  }, [quiz, form]);

  const onSubmit = (data: QuizFormData) => {
    onSave(data);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Quiz Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., N5 Vocabulary Quiz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isDirty}>
              Save Title
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
