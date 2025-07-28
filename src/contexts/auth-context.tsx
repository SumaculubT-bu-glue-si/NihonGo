
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
  password?: string;
}

// Mock Auth context type
interface AuthContextType {
  user: User | null;
  allUsers: User[];
  loading: boolean;
  signInAs: (email: string, pass: string, role: 'admin' | 'learner') => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (
    userId: string,
    data: {
      displayName?: string;
      photoURL?: string;
      email?: string;
      password?: string;
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
    async (email: string, pass: string, role: 'admin' | 'learner') => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      const foundUser = allUsers.find((u) => u.email === email && u.role === role);

      if (!foundUser) {
        setLoading(false);
        throw new Error('Incorrect email or password');
      }

      // Special logic for admin
      if (foundUser.role === 'admin') {
        // If admin has no password set, log in directly.
        // Otherwise, check the password.
        if (!foundUser.password || foundUser.password === '') {
          // No password needed
        } else if (foundUser.password !== pass) {
          setLoading(false);
          throw new Error('Incorrect email or password');
        }
      } else {
        // Standard password check for learners
        if (foundUser.password !== pass) {
            setLoading(false);
            throw new Error('Incorrect email or password');
        }
      }

      setUser(foundUser);
      localStorage.setItem(LOGGED_IN_USER_ID_KEY, foundUser.uid);
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
      data: { displayName?: string; photoURL?: string; email?: string, password?: string; }
    ) => {
      setAllUsers((currentUsers) =>
        currentUsers.map((u) => {
            if (u.uid === userId) {
                // Create a new user object with the updated data.
                const updatedUser = { ...u, ...data };
                // If the password field is an empty string in the update data, it means we don't want to change it.
                // However, our logic now uses an empty string to mean "no password set".
                // So, we only update the password if a non-empty password is provided.
                if (data.password === '') {
                    delete updatedUser.password;
                }
                return updatedUser;
            }
            return u;
        })
      );
      if (user?.uid === userId) {
         setUser((currentUser) => {
            if (!currentUser) return null;
            const updatedUser = { ...currentUser, ...data };
             if (data.password === '') {
                delete updatedUser.password;
             }
            return updatedUser;
        });
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
