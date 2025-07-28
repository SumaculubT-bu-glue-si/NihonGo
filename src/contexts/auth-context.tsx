
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
import { auth, storage } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

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
      photoURL?: string; // This can now be a data URI for new uploads
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
    
    // The very first document to be created is the admin
    const isFirstUser = querySnapshot.empty;
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
      photoURL?: string; // Can be a data URI or a regular URL
      password?: string;
    }
  ) => {
     if (!auth.currentUser) throw new Error("Not authenticated");

     const firebaseUser = auth.currentUser;
     const userDocRef = doc(db, 'users', firebaseUser.uid);
     const updateDataForAuth: { displayName?: string; photoURL?: string } = {};
     const updateDataForFirestore: { displayName?: string; photoURL?: string } = {};
     
     let finalPhotoURL = user?.photoURL;

     // Handle photo upload if a new photo data is provided
     if (data.photoURL && data.photoURL.startsWith('data:image')) {
        const storageRef = ref(storage, `profile-pictures/${firebaseUser.uid}`);
        const uploadResult = await uploadString(storageRef, data.photoURL, 'data_url');
        const downloadURL = await getDownloadURL(uploadResult.ref);
        updateDataForAuth.photoURL = downloadURL;
        updateDataForFirestore.photoURL = downloadURL;
        finalPhotoURL = downloadURL;
     }

     if(data.displayName) {
        updateDataForAuth.displayName = data.displayName;
        updateDataForFirestore.displayName = data.displayName;
     }

     if(Object.keys(updateDataForAuth).length > 0) {
        await updateProfile(firebaseUser, updateDataForAuth);
     }
    
     if (Object.keys(updateDataForFirestore).length > 0) {
        await setDoc(userDocRef, updateDataForFirestore, { merge: true });
     }

     if (data.password) {
        await firebaseUpdatePassword(firebaseUser, data.password);
     }
     
     // Correctly update the local state to reflect changes instantly
     setUser(prev => prev ? ({
        ...prev, 
        displayName: data.displayName ?? prev.displayName,
        photoURL: finalPhotoURL,
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
