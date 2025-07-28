
'use client';

import { AdminGuard } from '@/components/admin-guard';
import { AppLayout } from '@/components/app-layout';
import { useGlobalState } from '@/hooks/use-global-state';
import { AdminView } from './admin-view';
import { useAuth } from '@/contexts/auth-context';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const { allUsersData, isLoading: isGlobalStateLoading } = useGlobalState();
  const { loading: isAuthLoading } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    // This is a placeholder for fetching all users.
    // In a real app, this would be a secure admin-only API call.
    const fetchUsers = async () => {
        const db = getFirestore();
        // This is simplified. A real app would need pagination and better indexing.
        const userDocs = await Promise.all(Object.keys(allUsersData).map(uid => getDoc(doc(db, 'users', uid))));
        const users = userDocs.filter(doc => doc.exists()).map(doc => doc.data());
        setAllUsers(users);
    }
    if(!isGlobalStateLoading) {
        fetchUsers();
    }
  }, [allUsersData, isGlobalStateLoading])

  const isLoading = isGlobalStateLoading || isAuthLoading;

  if (isLoading) {
    return (
      <AdminGuard>
        <AppLayout>
          <div className="flex h-64 w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </AppLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AppLayout>
        <AdminView allUsersData={allUsersData} allUsers={allUsers} />
      </AppLayout>
    </AdminGuard>
  );
}
