"use client";

import { NihonGoLogo } from "@/components/icons";
import { useAuth, type User } from "@/contexts/auth-context-sqlite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
function ForgotPasswordForm({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // TODO: Implement password reset functionality with SQLite backend
      toast({
        title: "Password Reset",
        description: "Password reset functionality will be implemented soon.",
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          "Failed to send password reset email. Please check the address.",
        variant: "destructive",
      });
    }
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
        <Button
          type="button"
          variant="ghost"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button type="submit">Send Reset Link</Button>
      </DialogFooter>
    </form>
  );
}

function AuthForm({
  mode,
  onSignIn,
  onSignUp,
  onSwitchMode,
}: {
  mode: "login" | "signup";
  onSignIn: (email: string, pass: string) => Promise<void>;
  onSignUp: (displayName: string, email: string, pass: string) => Promise<void>;
  onSwitchMode?: () => void;
}) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassOpen, setIsForgotPassOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        await onSignIn(email, password);
      } else {
        await onSignUp(displayName, email, password);
      }
    } catch (err: any) {
      if (err.message) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = mode === "login" ? "Log in" : "Sign Up";
  const loadingText = mode === "login" ? "Logging In..." : "Signing Up...";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="displayName">Name</Label>
            <Input
              id="displayName"
              type="text"
              placeholder="e.g. Yuki Sato"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {mode === "login" && (
              <button
                type="button"
                onClick={() => setIsForgotPassOpen(true)}
                className="text-xs text-primary hover:underline"
              >
                Forgot Password?
              </button>
            )}
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
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
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={onSwitchMode}
              className="font-semibold text-primary hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        )}
      </form>
      <Dialog open={isForgotPassOpen} onOpenChange={setIsForgotPassOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email to receive a password reset link.
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm onOpenChange={setIsForgotPassOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function LoginPage() {
  const { user, loading, signIn, signUp } = useAuth();
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/decks");
      }
    }
  }, [user, router]);

  const switchAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "signup" : "login"));
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
          An AI-powered Japanese learning app. The first user to sign up becomes
          the admin.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>
              {authMode === "login" ? "Login" : "Create an Account"}
            </CardTitle>
            <CardDescription>
              {authMode === "login"
                ? "Enter your credentials to continue."
                : "Sign up to start your learning journey."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm
              mode={authMode}
              onSignIn={signIn}
              onSignUp={signUp}
              onSwitchMode={switchAuthMode}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
