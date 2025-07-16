
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
import { Loader2, Wand2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const formSchema = z.object({
  count: z.number().min(1).max(20),
});

export type GenerateCardsData = z.infer<typeof formSchema>;

interface GenerateCardsFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGenerate: (data: GenerateCardsData) => void;
}

export function GenerateCardsForm({ isOpen, onOpenChange, onGenerate }: GenerateCardsFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<GenerateCardsData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      count: 5,
    },
  });

  const onSubmit = async (data: GenerateCardsData) => {
    setIsGenerating(true);
    try {
        await onGenerate(data);
        onOpenChange(false);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!isGenerating) {
            onOpenChange(open);
        }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Cards with AI</DialogTitle>
          <DialogDescription>
            Select how many new cards you want the AI to create for this deck.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Cards: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={20}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      disabled={isGenerating}
                    />
                  </FormControl>
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
                Generate Cards
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
