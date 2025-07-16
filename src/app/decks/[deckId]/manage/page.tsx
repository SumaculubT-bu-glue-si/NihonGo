
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { notFound, useParams } from 'next/navigation';
import { useGlobalState } from '@/hooks/use-global-state';
import { ManageCardsClientPage } from './manage-cards-client-page';

export default function ManageCardsPage() {
  const params = useParams();
  const deckId = params.deckId as string;
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
        <ManageCardsClientPage deck={deck} />
      </AppLayout>
    </AuthGuard>
  );
}
