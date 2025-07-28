
'use client';

import { AdminGuard } from '@/components/admin-guard';
import { AppLayout } from '@/components/app-layout';
import { useAuth } from '@/contexts/auth-context';
import { UserManagementView } from './user-management-view';
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

export default function UserManagementPage() {
  const { user, loading } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
        setIsUsersLoading(true);
        const db = getFirestore();
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => doc.data());
        setAllUsers(userList);
        setIsUsersLoading(false);
    }
    fetchAllUsers();
  }, [])


  const isLoading = loading || isUsersLoading;

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

  const handleAddUser = async () => { /* ... */ };
  const handleUpdateUser = async () => { /* ... */ };
  const handleDeleteUser = async () => { /* ... */ };

  const learners = allUsers.filter((u) => u.role === 'learner');

  return (
    <AdminGuard>
      <AppLayout>
        <UserManagementView
          users={learners}
          onAddUser={handleAddUser as any}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
      </AppLayout>
    </AdminGuard>
  );
}
