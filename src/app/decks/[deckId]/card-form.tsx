
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { Flashcard } from '@/lib/data';
import type { Deck } from '@/lib/data';

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
import { useEffect } from 'react';

const formSchema = z.object({
  front: z.string().min(1, 'Front text is required.'),
  back: z.string().min(1, 'Back text is required.'),
  reading: z.string().optional(),
  type: z.enum(['vocabulary', 'grammar', 'kanji']).optional(),
  level: z.enum(['N1', 'N2', 'N3', 'N4', 'N5']).optional(),
});

export type CardFormData = z.infer<typeof formSchema>;

interface CardFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: Omit<CardFormData, 'type' | 'level'>) => void;
  card: Flashcard | null;
  deck: Deck;
}

export function CardForm({ isOpen, onOpenChange, onSave, card, deck }: CardFormProps) {
  const form = useForm<CardFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      front: '',
      back: '',
      reading: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (card) {
        form.reset({
            front: card.front,
            back: card.back,
            reading: card.reading,
        });
      } else {
        form.reset({
          front: '',
          back: '',
          reading: '',
        });
      }
    }
  }, [card, form, isOpen]);


  const onSubmit = (data: Omit<CardFormData, 'type' | 'level'>) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{card ? 'Edit Card' : 'Create New Card'}</DialogTitle>
          <DialogDescription>
            {card
              ? 'Update the details of your flashcard.'
              : 'Fill in the details for your new flashcard.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="front"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Front (Japanese)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 日本" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="reading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reading (Furigana)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., にほん" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="back"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Back (English)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Japan"
                      {...field}
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
              <Button type="submit">Save Card</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
