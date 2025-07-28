
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
      role?: 'learner' | 'admin';
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
          // If the doc doesn't exist, create it.
          // This happens on the very first sign-up.
           const usersRef = collection(db, "users");
           const adminQuery = query(usersRef, limit(1)); // Check if any user exists
           const existingUserSnapshot = await getDocs(adminQuery);
           const role = existingUserSnapshot.empty ? 'admin' : 'learner';

           const newUser: User = {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL,
                role: role
           };

           try {
            await setDoc(userDocRef, newUser);
            setUser(newUser);
           } catch(e) {
             console.error("Error creating user document:", e);
             // Sign out if we can't create the user doc to prevent inconsistent state
             await firebaseSignOut(auth);
             setUser(null);
           }
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    await updateProfile(firebaseUser, { displayName });
    
    toast({
        title: "Account Created!",
        description: `Your new account is ready. Welcome!`
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
      role?: 'learner' | 'admin';
    }
  ) => {
     if (!auth.currentUser) throw new Error("Not authenticated");

     const updateData: { displayName?: string; photoURL?: string, role?: string } = {};

     if(data.displayName) {
        updateData.displayName = data.displayName;
     }
     if(data.photoURL) {
        updateData.photoURL = data.photoURL;
     }

     if(data.displayName || data.photoURL) {
        await updateProfile(auth.currentUser, updateData);
     }
    
     const userDocRef = doc(db, 'users', auth.currentUser.uid);
     
     if (data.role) {
         updateData.role = data.role;
     }

     if (Object.keys(updateData).length > 0) {
        await setDoc(userDocRef, updateData, { merge: true });
     }

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
