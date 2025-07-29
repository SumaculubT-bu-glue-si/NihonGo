"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: string;
  display_name: string | null;
  email: string;
  photo_url: string | null;
  role: "learner" | "admin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: {
    display_name?: string;
    photo_url?: string;
    password?: string;
  }) => Promise<void>;
  updateUserByAdmin: (
    userId: string,
    data: { display_name?: string; email?: string; photo_url?: string }
  ) => Promise<void>;
  deleteUserByAdmin: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  // Check for existing token and validate it
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = apiService.getToken();
        if (token) {
          const response = await apiService.getProfile();
          if (response.data) {
            setUser(response.data.user);
          } else {
            // Token is invalid, clear it
            apiService.clearToken();
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        apiService.clearToken();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setUser(response.data.user);
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${response.data.user.display_name}!`,
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signUp = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await apiService.register({
        email,
        display_name: displayName,
        password,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setUser(response.data.user);
        toast({
          title: "Account Created!",
          description: `Welcome! Your new ${response.data.user.role} account is ready.`,
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      apiService.clearToken();
      setUser(null);
      router.push("/");
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const updateUser = async (data: {
    display_name?: string;
    photo_url?: string;
    password?: string;
  }) => {
    try {
      const response = await apiService.updateProfile(data);

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setUser(response.data.user);
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error: any) {
      console.error("Update user error:", error);

      if (error.message.includes("password")) {
        toast({
          title: "Password Update Failed",
          description:
            "To change your password, please sign out and sign back in first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const updateUserByAdmin = async (
    userId: string,
    data: { display_name?: string; email?: string; photo_url?: string }
  ) => {
    try {
      // Note: This would need to be implemented in the backend
      // For now, we'll show a placeholder message
      toast({
        title: "Admin Update",
        description:
          "Admin user update functionality needs to be implemented in the backend.",
      });
    } catch (error) {
      console.error("Admin update error:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteUserByAdmin = async (userId: string) => {
    try {
      const response = await apiService.deleteUser(userId);

      if (response.error) {
        throw new Error(response.error);
      }

      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
      });
    } catch (error: any) {
      console.error("Admin delete error:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    signUp,
    updateUser,
    updateUserByAdmin,
    deleteUserByAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
