
'use client';

import { NihonGoLogo } from '@/components/icons';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { allUsers } from '@/lib/user-data';

export default function LoginPage() {
  const { user, loading, signInAs } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/decks');
      }
    }
  }, [user, router]);

  const handleSignIn = async (userId: string) => {
    await signInAs(userId);
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
      <div className="flex w-full max-w-lg flex-col items-center">
        <NihonGoLogo className="mb-6 h-20 w-20 text-primary" />
        <h1 className="mb-2 text-4xl font-bold font-headline text-foreground">
          Welcome to Nihon GO
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          Select a user to begin.
        </p>
        
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Select a Profile</CardTitle>
                <CardDescription>Choose a user to log in as. This is a mock login for demonstration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {allUsers.map((u) => (
                    <button
                        key={u.uid}
                        onClick={() => handleSignIn(u.uid)}
                        className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-accent"
                    >
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={u.photoURL ?? ''} alt={u.displayName ?? 'User'} />
                            <AvatarFallback>{u.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">{u.displayName}</p>
                            <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                        {u.role === 'admin' && <Badge>Admin</Badge>}
                    </button>
                ))}
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
