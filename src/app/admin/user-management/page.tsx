
'use client';

import { AdminGuard } from '@/components/admin-guard';
import { AppLayout } from '@/components/app-layout';
import { useAuth } from '@/contexts/auth-context';
import { UserManagementView } from './user-management-view';

export default function UserManagementPage() {
  const { allUsers, loading, addUser, updateUser, deleteUser } = useAuth();

  if (loading) {
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

  const learners = allUsers.filter((u) => u.role === 'learner');

  return (
    <AdminGuard>
      <AppLayout>
        <UserManagementView
          users={learners}
          onAddUser={addUser}
          onUpdateUser={updateUser}
          onDeleteUser={deleteUser}
        />
      </AppLayout>
    </AdminGuard>
  );
}
