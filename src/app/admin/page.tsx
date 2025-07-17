
'use client';

import { AdminGuard } from '@/components/admin-guard';
import { AppLayout } from '@/components/app-layout';
import { useGlobalState } from '@/hooks/use-global-state';
import { AdminView } from './admin-view';
import { useAuth } from '@/contexts/auth-context';

export default function AdminPage() {
  const { allUsersData, isLoading: isGlobalStateLoading } = useGlobalState();
  const { allUsers, loading: isAuthLoading } = useAuth();

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
