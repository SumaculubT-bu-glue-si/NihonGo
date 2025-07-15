
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { Flashcard } from '@/lib/data';

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
import { useEffect } from 'react';

const formSchema = z.object({
  front: z.string().min(1, 'Front side is required.'),
  back: z.string().min(1, 'Back side is required.'),
  reading: z.string().optional(),
  type: z.enum(['vocabulary', 'grammar', 'kanji']),
  level: z.enum(['N1', 'N2', 'N3', 'N4', 'N5']),
});

type CardFormData = z.infer<typeof formSchema>;

interface CardFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: CardFormData) => void;
  card: Omit<Flashcard, 'id'> | null;
}

export function CardForm({ isOpen, onOpenChange, onSave, card }: CardFormProps) {
  const form = useForm<CardFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      front: '',
      back: '',
      reading: '',
      type: 'vocabulary',
      level: 'N5',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (card) {
        form.reset(card);
      } else {
        form.reset({
          front: '',
          back: '',
          reading: '',
          type: 'vocabulary',
          level: 'N5',
        });
      }
    }
  }, [card, form, isOpen]);


  const onSubmit = (data: CardFormData) => {
    onSave(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{card ? 'Edit Card' : 'Create New Card'}</DialogTitle>
          <DialogDescription>
            {card
              ? 'Update the details of your flashcard.'
              : 'Fill in the details to create a new flashcard.'}
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="vocabulary">Vocabulary</SelectItem>
                        <SelectItem value="grammar">Grammar</SelectItem>
                        <SelectItem value="kanji">Kanji</SelectItem>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a level" />
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
            </div>
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
