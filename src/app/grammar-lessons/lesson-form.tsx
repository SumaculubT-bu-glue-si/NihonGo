
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { GrammarLesson } from '@/lib/data';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  level: z.enum(['N5', 'N4', 'N3', 'N2', 'N1']),
  explanation: z.string().min(10, 'Explanation must be at least 10 characters.'),
  examples: z.string().min(1, 'Please provide at least one example sentence.'),
});

export type LessonFormData = z.infer<typeof formSchema>;

interface LessonFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: LessonFormData) => void;
  lesson: GrammarLesson | null;
}

export function LessonForm({ isOpen, onOpenChange, onSave, lesson }: LessonFormProps) {
  const form = useForm<LessonFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      level: 'N5',
      explanation: '',
      examples: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (lesson) {
        form.reset({
          title: lesson.title,
          level: lesson.level,
          explanation: lesson.explanation,
          examples: lesson.examples.join('\n'),
        });
      } else {
        form.reset({
          title: '',
          level: 'N5',
          explanation: '',
          examples: '',
        });
      }
    }
  }, [lesson, form, isOpen]);

  const onSubmit = (data: LessonFormData) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{lesson ? 'Edit Lesson' : 'Create New Lesson'}</DialogTitle>
          <DialogDescription>
            {lesson
              ? 'Update the details of this grammar lesson.'
              : 'Fill in the details for a new grammar lesson.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AはBです (A is B)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JLPT Level</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue aria-label={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="N5">N5</SelectItem>
                        <SelectItem value="N4">N4</SelectItem>
                        <SelectItem value="N3">N3</SelectItem>
                        <SelectItem value="N2">N2</SelectItem>
                        <SelectItem value="N1">N1</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Textarea
                      placeholder="Explain the grammar point here..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="examples"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Examples</FormLabel>
                   <FormControl>
                    <Textarea
                      placeholder="Enter each example sentence on a new line."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Lesson</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
