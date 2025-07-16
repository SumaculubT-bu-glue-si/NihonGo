
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
} from '@/components/ui/form';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({});

export type GenerateQuizData = z.infer<typeof formSchema>;

interface GenerateQuizFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGenerate: () => void;
  context: { category: string; level: string } | null;
}

export function GenerateQuizForm({ isOpen, onOpenChange, onGenerate, context }: GenerateQuizFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<GenerateQuizData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async () => {
    setIsGenerating(true);
    try {
        await onGenerate();
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Quiz with AI</DialogTitle>
          {context && (
            <DialogDescription>
              This will create a new 10-question quiz for{' '}
              <span className="font-semibold capitalize">{context.category}</span> at the{' '}
              <span className="font-semibold">{context.level}</span> level.
            </DialogDescription>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
             <p className="text-sm text-muted-foreground">
                The AI will generate a title and 10 unique questions. Do you want to proceed?
             </p>
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
                Generate Quiz
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
