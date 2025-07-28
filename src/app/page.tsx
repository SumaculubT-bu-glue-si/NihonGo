
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

function ForgotPasswordForm({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call a backend service here.
    // For this mock, we just show a confirmation.
    toast({
      title: "Password Reset Sent",
      description: `If an account exists for ${email}, a password reset link has been sent.`,
    });
    onOpenChange(false);
  };

  return (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="forgot-email">Email</Label>
        <Input
          id="forgot-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button type="submit">Send Reset Link</Button>
      </DialogFooter>
    </form>
  )
}

function AuthForm({
  mode,
  role,
  onSignIn,
  onSignUp,
  onSwitchMode,
}: {
  mode: 'login' | 'signup';
  role: 'admin' | 'learner';
  onSignIn: (email: string, pass: string, role: 'admin' | 'learner') => Promise<void>;
  onSignUp: (displayName: string, email: string, pass: string) => Promise<void>;
  onSwitchMode?: () => void;
}) {
  const { allUsers } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassOpen, setIsForgotPassOpen] = useState(false);

  const adminUser = allUsers.find(u => u.role === 'admin');

  useEffect(() => {
    if (role === 'admin' && adminUser) {
      setEmail(adminUser.email || '');
    }
  }, [role, adminUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await onSignIn(email, password, role);
      } else {
        await onSignUp(displayName, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const buttonText = mode === 'login' ? 'Log in' : 'Sign Up';
  const loadingText = mode === 'login' ? 'Logging In...' : 'Signing Up...';
  const isPasswordRequired = role === 'learner' || (role === 'admin' && mode === 'signup');

  return (
    <>
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
          placeholder={role === 'admin' ? '' : 'your@email.com'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          readOnly={role === 'admin'}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
            <Label htmlFor={`${role}-password`}>Password</Label>
            {mode === 'login' && (
                <button type="button" onClick={() => setIsForgotPassOpen(true)} className="text-xs text-primary hover:underline">
                    Forgot Password?
                </button>
            )}
        </div>
        <Input
          id={`${role}-password`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required={isPasswordRequired}
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
    <Dialog open={isForgotPassOpen} onOpenChange={setIsForgotPassOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Forgot Password</DialogTitle>
                <DialogDescription>Enter your email to receive a password reset link.</DialogDescription>
            </DialogHeader>
            <ForgotPasswordForm onOpenChange={setIsForgotPassOpen} />
        </DialogContent>
    </Dialog>
    </>
  );
}


export default function LoginPage() {
  const { user, allUsers, loading, signInAs, addUser } = useAuth();
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/decks');
      }
    }
  }, [user, router]);

  const handleSignIn = async (email: string, pass: string, role: 'admin' | 'learner') => {
    await signInAs(email, pass, role);
  };

  const handleSignUp = async (displayName: string, email: string, pass: string) => {
    const existingUser = allUsers.find(u => u.email === email);
    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }
    await addUser({ displayName, email, photoURL: '', password: pass });
    toast({
        title: "Account Created",
        description: "You can now log in with your new credentials.",
    });
    setAuthMode('login');
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
                            {authMode === 'login' ? "Enter your credentials to continue." : 'Sign up to start your learning journey.'}
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
                </Card>
            </TabsContent>
            <TabsContent value="admin">
                 <Card>
                    <CardHeader>
                        <CardTitle>Login as Admin</CardTitle>
                        <CardDescription>Press Log In to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AuthForm mode="login" role="admin" onSignIn={handleSignIn} onSignUp={handleSignUp} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
