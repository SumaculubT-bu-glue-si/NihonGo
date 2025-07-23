

'use client';

import { AuthGuard } from '@/components/auth-guard';
import { AppLayout } from '@/components/app-layout';
import { GrammarView } from './grammar-view';
import { useGlobalState } from '@/hooks/use-global-state';
import { Suspense } from 'react';

function GrammarPageContent() {
    const { isLoading } = useGlobalState();

    if (isLoading) {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }
    
    return <GrammarView />;
}

export default function GrammarLessonsPage() {
  return (
    <AuthGuard>
      <AppLayout>
        <Suspense fallback={<div>Loading...</div>}>
            <GrammarPageContent />
        </Suspense>
      </AppLayout>
    </AuthGuard>
  );
}
