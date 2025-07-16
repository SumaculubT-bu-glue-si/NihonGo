
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
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  idea: z.string().min(3, 'Idea must be at least 3 characters long.'),
  category: z.enum(['Vocabulary', 'Grammar', 'Phrases', 'Kanji']),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
});

export type GenerateDeckData = z.infer<typeof formSchema>;

interface GenerateDeckFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGenerate: (data: GenerateDeckData) => void;
}

export function GenerateDeckForm({ isOpen, onOpenChange, onGenerate }: GenerateDeckFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<GenerateDeckData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: '',
      category: 'Vocabulary',
      level: 'Beginner',
    },
  });

  const onSubmit = async (data: GenerateDeckData) => {
    setIsGenerating(true);
    // The actual generation is handled by the parent component,
    // which will call the AI flow.
    try {
        await onGenerate(data);
        form.reset();
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Deck with AI</DialogTitle>
          <DialogDescription>
            Describe your idea, and AI will create a 20-card deck for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="idea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deck Idea</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Japanese food, common verbs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue aria-label={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Vocabulary">Vocabulary</SelectItem>
                        <SelectItem value="Grammar">Grammar</SelectItem>
                        <SelectItem value="Phrases">Phrases</SelectItem>
                        <SelectItem value="Kanji">Kanji</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue aria-label={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                Generate Deck
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
