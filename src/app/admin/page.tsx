"use client";

import { AdminGuard } from "@/components/admin-guard";
import { AppLayout } from "@/components/app-layout";
import { useGlobalState } from "@/hooks/use-global-state";
import { AdminView } from "./admin-view";
import { useAuth } from "@/contexts/auth-context-sqlite";
import { useEffect, useState } from "react";
import { apiService } from "@/lib/api";
import type { User } from "@/contexts/auth-context-sqlite";

export default function AdminPage() {
  const { allUsersData, isLoading: isGlobalStateLoading } = useGlobalState();
  const { loading: isAuthLoading } = useAuth();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const response = await apiService.getAllUsers();
        if (response.data) {
          setAllUsers(response.data.users);
        } else {
          console.error("Failed to fetch users:", response.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    if (!isGlobalStateLoading && !isAuthLoading) {
      fetchUsers();
    }
  }, [isGlobalStateLoading, isAuthLoading]);

  const isLoading = isGlobalStateLoading || isAuthLoading || isLoadingUsers;

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
