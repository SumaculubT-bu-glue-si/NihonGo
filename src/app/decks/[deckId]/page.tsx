
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { FlashcardClientPage } from './flashcard-client-page';
import { notFound, useParams } from 'next/navigation';
import { useGlobalState } from '@/hooks/use-global-state';

export default function DeckPage() {
  const params = useParams<{ deckId: string }>();
  const deckId = params.deckId;
  const { appData, isLoading } = useGlobalState();

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

  return (
    <AuthGuard>
      <AppLayout>
        <FlashcardClientPage deck={deck} />
      </AppLayout>
    </AuthGuard>
  );
}
