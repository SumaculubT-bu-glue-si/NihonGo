import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { decks } from '@/lib/data';
import { FlashcardClientPage } from './flashcard-client-page';
import { notFound } from 'next/navigation';

export default function DeckPage({ params }: { params: { deckId: string } }) {
  const deck = decks.find((d) => d.id === params.deckId);

  if (!deck) {
    notFound();
  }

  return (
    <AuthGuard>
      <AppLayout>
        <FlashcardClientPage deck={deck} />
      </AppLayout>
    </AuthGuard>
  );
}
