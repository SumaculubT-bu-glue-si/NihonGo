
'use client';

import { NihonGoLogo } from '@/components/icons';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allUsers, User } from '@/lib/user-data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function LoginForm({ role, onSignIn }: { role: 'admin' | 'learner', onSignIn: (email: string, role: 'admin' | 'learner') => Promise<void> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const adminUser = allUsers.find(u => u.role === 'admin');
  const learnerUsers = allUsers.filter(u => u.role === 'learner');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSignIn(email, role);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input
          id={`${role}-email`}
          type="email"
          placeholder={role === 'admin' ? adminUser?.email : learnerUsers[0]?.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input
          id={`${role}-password`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (any value is fine)"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
}

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

  const handleSignIn = async (email: string, role: 'admin' | 'learner') => {
    const foundUser = allUsers.find(u => u.email === email && u.role === role);

    if (foundUser) {
      await signInAs(foundUser.uid);
    } else {
      throw new Error('Invalid email for the selected role.');
    }
  };

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  
  const adminUser = allUsers.find(u => u.role === 'admin');
  const learnerUsers = allUsers.filter(u => u.role === 'learner');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-sm flex-col items-center">
        <NihonGoLogo className="mb-6 h-20 w-20 text-primary" />
        <h1 className="mb-2 text-4xl font-bold font-headline text-foreground">
          Welcome to Nihon GO
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          An AI-powered Japanese learning app.
        </p>
        
        <Tabs defaultValue="learner" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="learner">Learner</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="learner">
                <Card>
                    <CardHeader>
                        <CardTitle>Login as Learner</CardTitle>
                        <CardDescription>Enter a learner's email to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm role="learner" onSignIn={handleSignIn} />
                    </CardContent>
                     <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            <p className="mb-1">Use one of these emails:</p>
                            <ul className="space-y-1">
                                {learnerUsers.map(learner => (
                                    <li key={learner.uid}>
                                        <code className="bg-muted p-1 rounded">{learner.email}</code>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="admin">
                 <Card>
                    <CardHeader>
                        <CardTitle>Login as Admin</CardTitle>
                        <CardDescription>Enter the admin's email to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm role="admin" onSignIn={handleSignIn} />
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-muted-foreground">
                           Use email: <code className="bg-muted p-1 rounded">{adminUser?.email}</code>
                        </p>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
