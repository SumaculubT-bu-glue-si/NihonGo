"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin-guard";
import { AppLayout } from "@/components/app-layout";
import { useAuth } from "@/contexts/auth-context-sqlite";
import { UserManagementView } from "./user-management-view";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";
import type { User } from "@/contexts/auth-context-sqlite";
import type { UserFormData } from "./user-form";

export default function UserManagementPage() {
  const { user, signOut, updateUserByAdmin, deleteUserByAdmin } = useAuth();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getAllUsers();
        if (response.data) {
          setAllUsers(response.data.users);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      } finally {
        setIsUsersLoading(false);
      }
    };
    fetchUsers();
  }, [toast]);

  const isLoading = isUsersLoading;

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

  const handleUpdateUser = async (userId: string, data: UserFormData) => {
    try {
      await updateUserByAdmin(userId, data);
      toast({
        title: "User Updated",
        description: "User details have been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserByAdmin(userId);
      toast({
        title: "User Deleted",
        description: "The user has been removed from the database.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  // Filter out the current admin from the list they are managing
  const learners = allUsers.filter((u) => u.id !== user?.id);

  return (
    <AdminGuard>
      <AppLayout>
        <UserManagementView
          users={learners}
          onSignOut={signOut}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
      </AppLayout>
    </AdminGuard>
  );
}
