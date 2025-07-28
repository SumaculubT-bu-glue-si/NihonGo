
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
import { doc, setDoc, getDoc, getFirestore, collection, getDocs, query, limit } from 'firebase/firestore';
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

    const usersRef = collection(db, "users");
    const q = query(usersRef, limit(1));
    const querySnapshot = await getDocs(q);
    
    // Check if any user document exists at all.
    // We check for 1 or more to determine if this is the first user.
    const isFirstUser = querySnapshot.docs.length === 0;
    const role = isFirstUser ? 'admin' : 'learner';
    
    const newUser: User = {
        uid: firebaseUser.uid,
        displayName: displayName,
        email: email,
        photoURL: firebaseUser.photoURL,
        role: role,
    };
    
    await setDoc(doc(db, "users", firebaseUser.uid), newUser);
    setUser(newUser);

    toast({
        title: "Account Created!",
        description: `Welcome! Your new ${role} account is ready.`
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

     const firebaseUser = auth.currentUser;
     const userDocRef = doc(db, 'users', firebaseUser.uid);

     const updatesForAuth: { displayName?: string; photoURL?: string } = {};
     const updatesForFirestore: { displayName?: string; photoURL?: string } = {};
     
     if (data.displayName) {
        updatesForAuth.displayName = data.displayName;
        updatesForFirestore.displayName = data.displayName;
     }

     if (data.photoURL !== undefined) {
        updatesForAuth.photoURL = data.photoURL;
        updatesForFirestore.photoURL = data.photoURL;
     }

     try {
        if(data.password) {
            await firebaseUpdatePassword(firebaseUser, data.password);
        }
     } catch(error: any) {
        if (error.code === 'auth/requires-recent-login') {
            toast({
                title: "Login Required",
                description: "To change your password, please sign out and sign back in first.",
                variant: 'destructive',
            });
        } else {
            toast({
                title: "Error",
                description: "Failed to update password. Please try again.",
                variant: 'destructive',
            });
        }
        // Do not proceed with other updates if password change fails.
        return;
     }
     
     if(Object.keys(updatesForAuth).length > 0) {
        await updateProfile(firebaseUser, updatesForAuth);
     }

     if (Object.keys(updatesForFirestore).length > 0) {
        await setDoc(userDocRef, updatesForFirestore, { merge: true });
     }
     
     setUser(prev => prev ? ({
        ...prev, 
        displayName: updatesForAuth.displayName ?? prev.displayName,
        photoURL: updatesForAuth.photoURL ?? prev.photoURL,
    }) : null);
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
