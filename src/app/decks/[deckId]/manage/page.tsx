
'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useGlobalState } from '@/hooks/use-global-state';
import { useToast } from '@/hooks/use-toast';
import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { CardForm } from './card-form';
import type { Flashcard } from '@/lib/data';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type CardFormData = Omit<Flashcard, 'id'>;

export default function ManageDeckPage() {
  const params = useParams();
  const deckId = params.deckId as string;
  const { appData, isLoading, addCard, updateCard, deleteCard } = useGlobalState();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [cardToDelete, setCardToDelete] = useState<Flashcard | null>(null);

  if (isLoading) {
    return (
      <AuthGuard>
        <AppLayout>
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </AppLayout>
      </AuthGuard>
    );
  }

  const deck = appData.decks.find((d) => d.id === deckId);

  if (!deck) {
    return notFound();
  }

  const handleAddNew = () => {
    setEditingCard(null);
    setIsFormOpen(true);
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleDeleteInitiate = (card: Flashcard) => {
    setCardToDelete(card);
  };

  const handleDeleteConfirm = () => {
    if (!cardToDelete) return;
    deleteCard(deckId, cardToDelete.id);
    toast({
      title: 'Card Deleted',
      description: 'The flashcard has been successfully deleted.',
      variant: 'destructive',
    });
    setCardToDelete(null);
  };

  const handleSaveCard = (data: CardFormData) => {
    if (editingCard) {
      updateCard(deckId, editingCard.id, data);
      toast({
        title: 'Card Updated',
        description: 'The flashcard has been successfully updated.',
      });
    } else {
      addCard(deckId, data);
      toast({
        title: 'Card Created',
        description: 'A new flashcard has been added to the deck.',
      });
    }
    setIsFormOpen(false);
    setEditingCard(null);
  };

  return (
    <AuthGuard>
      <AppLayout>
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
                <Link href="/decks" className="text-sm text-primary hover:underline">
                    &larr; Back to Decks
                </Link>
                <h1 className="text-3xl font-bold font-headline">Manage "{deck.title}"</h1>
                <p className="text-muted-foreground">
                    {deck.cards.length} cards in this deck.
                </p>
            </div>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Card
            </Button>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Front (Japanese)</TableHead>
                  <TableHead>Back (English)</TableHead>
                  <TableHead>Reading</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deck.cards.length > 0 ? (
                  deck.cards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium">{card.front}</TableCell>
                      <TableCell>{card.back}</TableCell>
                      <TableCell>{card.reading}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{card.level}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(card)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteInitiate(card)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No cards yet. Add your first one!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <CardForm
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSave={handleSaveCard}
          card={editingCard}
        />

        <AlertDialog open={!!cardToDelete} onOpenChange={() => setCardToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the card "{cardToDelete?.front}".
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setCardToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      </AppLayout>
    </AuthGuard>
  );
}
