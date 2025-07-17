
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { allUsers as initialAllUsers } from '@/lib/user-data';

const USER_DATA_STORAGE_KEY = 'nihongo-all-users-data';
const LOGGED_IN_USER_ID_KEY = 'loggedInUserId';

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
  allUsers: User[];
  loading: boolean;
  signInAs: (userId: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (
    userId: string,
    data: {
      displayName?: string;
      photoURL?: string;
      email?: string;
    }
  ) => Promise<void>;
  addUser: (
    data: Omit<User, 'uid' | 'role'> & { role?: 'learner' | 'admin' }
  ) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(initialAllUsers);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load all user data from localStorage
    try {
      const storedUsers = localStorage.getItem(USER_DATA_STORAGE_KEY);
      const users = storedUsers ? JSON.parse(storedUsers) : initialAllUsers;
      setAllUsers(users);

      const loggedInUserId = localStorage.getItem(LOGGED_IN_USER_ID_KEY);
      if (loggedInUserId) {
        const foundUser = users.find((u: User) => u.uid === loggedInUserId);
        setUser(foundUser || null);
      }
    } catch (e) {
      // If parsing fails, start fresh
      setAllUsers(initialAllUsers);
    }
    setLoading(false);
  }, []);

  // Persist all user data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(allUsers));
      } catch (error) {
        console.error("Failed to save user data to localStorage. Quota may be exceeded.", error);
      }
    }
  }, [allUsers, loading]);

  const signInAs = useCallback(
    async (userId: string) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      const selectedUser = allUsers.find((u) => u.uid === userId);
      if (selectedUser) {
        setUser(selectedUser);
        localStorage.setItem(LOGGED_IN_USER_ID_KEY, selectedUser.uid);
      }
      setLoading(false);
    },
    [allUsers]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem(LOGGED_IN_USER_ID_KEY);
    setLoading(false);
    router.push('/');
  }, [router]);

  const updateUser = useCallback(
    async (
      userId: string,
      data: { displayName?: string; photoURL?: string; email?: string }
    ) => {
      setAllUsers((currentUsers) =>
        currentUsers.map((u) => (u.uid === userId ? { ...u, ...data } : u))
      );
      if (user?.uid === userId) {
        setUser((currentUser) =>
          currentUser ? { ...currentUser, ...data } : null
        );
      }
    },
    [user]
  );

  const addUser = useCallback(
    async (
      data: Omit<User, 'uid' | 'role'> & { role?: 'learner' | 'admin' }
    ): Promise<User> => {
      const newUser: User = {
        uid: `user-${Date.now()}`,
        role: data.role || 'learner',
        ...data,
      };
      setAllUsers((currentUsers) => [...currentUsers, newUser]);
      return newUser;
    },
    []
  );

  const deleteUser = useCallback(async (userId: string) => {
    setAllUsers((currentUsers) =>
      currentUsers.filter((u) => u.uid !== userId)
    );
  }, []);

  const value = {
    user,
    allUsers,
    loading,
    signInAs,
    signOut,
    updateUser,
    addUser,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
