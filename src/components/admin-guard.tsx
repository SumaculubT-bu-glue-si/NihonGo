
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

export function AdminGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return; // Don't do anything while loading
    }
    if (!user) {
      router.push('/'); // Not logged in, redirect to login
      return;
    }
    if (user.role !== 'admin') {
      router.push('/decks'); // Not an admin, redirect to home
    }
  }, [user, loading, router]);

  // While loading or if user is not an admin, show a loading spinner
  // to prevent flashing the admin content.
  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // If user is an admin, render the children
  return <>{children}</>;
}
