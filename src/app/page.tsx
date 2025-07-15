'use client';

import { Button } from '@/components/ui/button';
import { NihonGoLogo, GoogleIcon } from '@/components/icons';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/decks');
    }
  }, [user, router]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/decks');
    } catch (error) {
      console.error('Failed to sign in', error);
      // Optionally show a toast notification for the error
    }
  };

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-card p-8 shadow-2xl">
        <NihonGoLogo className="mb-6 h-20 w-20 text-primary" />
        <h1 className="mb-2 text-4xl font-bold font-headline text-foreground">
          Nihon GO
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          Your AI-powered journey to mastering Japanese.
        </p>
        <Button
          onClick={handleSignIn}
          size="lg"
          className="w-full text-base"
          disabled={loading}
        >
          <GoogleIcon className="mr-3 h-6 w-6" />
          Sign in with Google
        </Button>
      </div>
    </main>
  );
}
