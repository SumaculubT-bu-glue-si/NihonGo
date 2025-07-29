"use client";

import { AdminGuard } from "@/components/admin-guard";
import { AppLayout } from "@/components/app-layout";
import { useGlobalState } from "@/hooks/use-global-state";
import { AdminView } from "./admin-view";
import { useAuth } from "@/contexts/auth-context-sqlite";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { allUsersData, isLoading: isGlobalStateLoading } = useGlobalState();
  const { loading: isAuthLoading } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Implement admin user fetching from SQLite backend
    const fetchUsers = async () => {
      // This will be implemented with the SQLite API
      console.log(
        "Admin user fetching will be implemented with SQLite backend"
      );
    };
    if (!isGlobalStateLoading) {
      fetchUsers();
    }
  }, [allUsersData, isGlobalStateLoading]);

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
