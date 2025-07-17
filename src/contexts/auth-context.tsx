
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

// Mock User type
interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Mock Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Firebase User object
const mockUser: User = {
  uid: 'mock-user-id-123',
  displayName: 'Alex Tanaka',
  email: 'alex.tanaka@example.com',
  photoURL: 'https://placehold.co/100x100.png',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for a logged-in state in localStorage to persist session
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
       const storedUser = localStorage.getItem('mockUser');
       setUser(storedUser ? JSON.parse(storedUser) : mockUser);
    }
    setLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser(mockUser);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('mockUser');
    setLoading(false);
    router.push('/');
  };

  const updateUser = async (data: { displayName?: string; photoURL?: string }) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        const updatedUser = { ...currentUser, ...data };
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
        return updatedUser;
    });
  }

  const value = { user, loading, signInWithGoogle, signOut, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
