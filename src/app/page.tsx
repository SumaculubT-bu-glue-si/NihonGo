
'use client';

import { NihonGoLogo } from '@/components/icons';
import { useAuth, type User } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function AuthForm({
  mode,
  role,
  onSignIn,
  onSignUp,
  onSwitchMode,
}: {
  mode: 'login' | 'signup';
  role: 'admin' | 'learner';
  onSignIn: (email: string, role: 'admin' | 'learner') => Promise<void>;
  onSignUp: (displayName: string, email: string) => Promise<void>;
  onSwitchMode?: () => void;
}) {
  const { allUsers } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const adminUser = allUsers.find(u => u.role === 'admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await onSignIn(email, role);
      } else {
        await onSignUp(displayName, email);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const buttonText = mode === 'login' ? 'Log in' : 'Sign Up';
  const loadingText = mode === 'login' ? 'Logging In...' : 'Signing Up...';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div className="space-y-2">
            <Label htmlFor={`${role}-displayName`}>Name</Label>
            <Input
            id={`${role}-displayName`}
            type="text"
            placeholder="e.g. Yuki Sato"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input
          id={`${role}-email`}
          type="email"
          placeholder={mode === 'login' && role === 'admin' ? (adminUser?.email ?? '') : (mode === 'login' ? 'learner@example.com' : 'your@email.com')}
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
       <div className="pt-2">
         <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? loadingText : buttonText}
          </Button>
       </div>
       {onSwitchMode && (
          <p className="text-center text-sm text-muted-foreground">
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              type="button"
              onClick={onSwitchMode}
              className="font-semibold text-primary hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        )}
    </form>
  );
}


export default function LoginPage() {
  const { user, allUsers, loading, signInAs, addUser } = useAuth();
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

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
      throw new Error('Incorrect email or password');
    }
  };

  const handleSignUp = async (displayName: string, email: string) => {
    const existingUser = allUsers.find(u => u.email === email);
    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }
    const newUser = await addUser({ displayName, email, photoURL: '' });
    await signInAs(newUser.uid);
  }
  
  const switchAuthMode = () => {
    setAuthMode(prev => (prev === 'login' ? 'signup' : 'login'));
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
                        <CardTitle>{authMode === 'login' ? 'Login as Learner' : 'Create an Account'}</CardTitle>
                        <CardDescription>
                            {authMode === 'login' ? "Enter a learner's email to continue." : 'Sign up to start your learning journey.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <AuthForm
                          mode={authMode}
                          role="learner"
                          onSignIn={handleSignIn}
                          onSignUp={handleSignUp}
                          onSwitchMode={switchAuthMode}
                        />
                    </CardContent>
                    {authMode === 'login' && (
                        <CardFooter>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link" className="text-xs p-0 h-auto text-muted-foreground">
                                        Use a sample email
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Sample Learner Accounts</DialogTitle>
                                    </DialogHeader>
                                    <p className="text-sm text-muted-foreground">Click any email to copy it.</p>
                                    <ul className="space-y-1 rounded-md border p-2 text-sm">
                                        {learnerUsers.map(learner => (
                                            <li key={learner.uid}>
                                                <button 
                                                    onClick={() => navigator.clipboard.writeText(learner.email ?? '')}
                                                    className="w-full text-left p-1 rounded hover:bg-muted"
                                                >
                                                    {learner.email}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    )}
                </Card>
            </TabsContent>
            <TabsContent value="admin">
                 <Card>
                    <CardHeader>
                        <CardTitle>Login as Admin</CardTitle>
                        <CardDescription>Enter the admin's email to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AuthForm mode="login" role="admin" onSignIn={handleSignIn} onSignUp={handleSignUp} />
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
