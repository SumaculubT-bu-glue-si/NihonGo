
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
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser,
  updatePassword as firebaseUpdatePassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore, collection, getDocs, query, where, limit } from 'firebase/firestore';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'learner' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (displayName: string, email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (
    data: {
      displayName?: string;
      photoURL?: string;
      password?: string;
    }
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            role: userData.role || 'learner',
          });
        } else {
          // This case might happen if user doc creation failed
          // or if you have users in Auth but not Firestore.
          // For now, we sign them out to maintain consistency.
          await firebaseSignOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  const signIn = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (displayName: string, email: string, pass: string) => {
    const db = getFirestore();
    // Check if an admin already exists. The first user becomes the admin.
    const usersRef = collection(db, "users");
    const adminQuery = query(usersRef, where("role", "==", "admin"), limit(1));
    const adminSnapshot = await getDocs(adminQuery);
    const isAdminExisting = !adminSnapshot.empty;
    const role = isAdminExisting ? 'learner' : 'admin';

    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      uid: firebaseUser.uid,
      displayName,
      email,
      role: role,
      photoURL: '',
    });

    // Sign out the new user immediately so they have to log in.
    // This simplifies state management and ensures they go through the proper login flow.
    await firebaseSignOut(auth);
    
    toast({
        title: "Account Created!",
        description: `Your ${role} account is ready. Please log in.`
    });
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push('/');
  };

  const updateUser = async (
    data: {
      displayName?: string;
      photoURL?: string;
      password?: string;
    }
  ) => {
     if (!auth.currentUser) throw new Error("Not authenticated");

     if(data.displayName || data.photoURL) {
        await updateProfile(auth.currentUser, { displayName: data.displayName, photoURL: data.photoURL });
     }
    
     const userDocRef = doc(db, 'users', auth.currentUser.uid);
     await setDoc(userDocRef, { displayName: data.displayName, photoURL: data.photoURL }, { merge: true });

     if (data.password) {
        await firebaseUpdatePassword(auth.currentUser, data.password);
     }
      setUser(prev => prev ? ({...prev, ...data}) : null);
  };
  

  const value = {
    user,
    loading,
    signIn,
    signOut,
    signUp,
    updateUser,
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
