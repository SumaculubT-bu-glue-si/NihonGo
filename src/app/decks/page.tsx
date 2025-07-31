
'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { DeckBrowser } from './deck-browser';
import { useDecksApi } from '@/hooks/use-decks-api';

export default function HomePage() {
  const { decks, loading, error, refetch } = useDecksApi();

  if (loading) {
    return (
      <AuthGuard>
        <AppLayout>
          <div className="flex h-64 w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </AppLayout>
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <AppLayout>
          <div className="flex h-64 w-full items-center justify-center">
            <div className="text-center">
              <p className="text-red-500">{error}</p>
              <button onClick={refetch} className="mt-2 underline text-blue-600">Retry</button>
            </div>
          </div>
        </AppLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AppLayout>
        <div className="space-y-8">
          <DeckBrowser 
            decks={decks} 
            userStats={[]} // TODO: fetch user stats from API if needed
            onSave={() => {}} // TODO: implement deck save
            onDelete={() => {}} // TODO: implement deck delete
            onGenerate={() => {}} // TODO: implement deck generate
          />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
