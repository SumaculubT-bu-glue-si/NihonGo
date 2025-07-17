
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { allUsers } from '@/lib/user-data';

// Mock User type
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'learner' | 'admin';
}

// Mock Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInAs: (userId: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for a logged-in user ID in localStorage to persist session
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
       const foundUser = allUsers.find(u => u.uid === loggedInUserId);
       setUser(foundUser || null);
    }
    setLoading(false);
  }, []);

  const signInAs = async (userId: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    const selectedUser = allUsers.find(u => u.uid === userId);
    if (selectedUser) {
        setUser(selectedUser);
        localStorage.setItem('loggedInUserId', selectedUser.uid);
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('loggedInUserId');
    // We do NOT clear app data on sign out, so A/B settings persist
    // localStorage.removeItem('nihongo-app-data');
    setLoading(false);
    router.push('/');
  };

  const updateUser = async (data: { displayName?: string; photoURL?: string }) => {
     // This function is now more complex with multiple users.
     // For this mock, we won't update the central `allUsers` list,
     // but we will update the currently logged-in user's state.
     // A real implementation would require a backend.
    setUser(currentUser => {
        if (!currentUser) return null;
        const updatedUser = { ...currentUser, ...data };
        // We aren't saving this back to `allUsers` or localStorage in this mock,
        // so changes will be lost on refresh.
        return updatedUser;
    });
  }

  const value = { user, loading, signInAs, signOut, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
