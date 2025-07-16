
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { generateGrammarLesson } from '@/ai/flows/generate-grammar-lesson-flow';
import type { GrammarLesson } from '@/lib/data';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  topic: z.string().min(2, 'Topic must be at least 2 characters.'),
  level: z.enum(['N5', 'N4', 'N3', 'N2', 'N1']),
});

type GenerateLessonFormData = z.infer<typeof formSchema>;

interface GenerateLessonFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onLessonGenerated: (lessonData: Omit<GrammarLesson, 'id' | 'read'>) => void;
}

export function GenerateLessonForm({
  isOpen,
  onOpenChange,
  onLessonGenerated,
}: GenerateLessonFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const form = useForm<GenerateLessonFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      level: 'N5',
    },
  });

  const onSubmit = async (data: GenerateLessonFormData) => {
    setIsGenerating(true);
    try {
      const generatedLesson = await generateGrammarLesson(data);
      onLessonGenerated({
        ...generatedLesson,
        level: data.level, // Ensure the level from the form is used
      });
      toast({
        title: 'Lesson Generated!',
        description: `Successfully created a lesson for "${generatedLesson.title}".`,
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Lesson generation error:', error);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate the lesson. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Lesson with AI</DialogTitle>
          <DialogDescription>
            Provide a topic and a JLPT level, and AI will create a new grammar lesson for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Giving and receiving" {...field} />
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
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isGenerating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
