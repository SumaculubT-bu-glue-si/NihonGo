"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth, type User } from "@/contexts/auth-context-sqlite";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";

const formSchema = z
  .object({
    displayName: z.string().min(1, "Display name is required."),
    photoURL: z
      .string()
      .url("Please enter a valid URL.")
      .or(z.literal(""))
      .optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type UserSettingsFormData = z.infer<typeof formSchema>;

interface UserSettingsFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function UserSettingsForm({
  isOpen,
  onOpenChange,
}: UserSettingsFormProps) {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<UserSettingsFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      photoURL: "",
      password: "",
      confirmPassword: "",
    },
  });

  const photoUrlValue = form.watch("photoURL");

  useEffect(() => {
    if (user && isOpen) {
      form.reset({
        displayName: user.display_name || "",
        photoURL: user.photo_url || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user, form, isOpen]);

  const onSubmit = async (data: UserSettingsFormData) => {
    if (!user) return;

    setIsSaving(true);
    try {
      const updateData: Parameters<typeof updateUser>[0] = {
        displayName: data.displayName,
        photoURL: data.photoURL,
      };

      if (data.password) {
        updateData.password = data.password;
      }

      await updateUser(updateData);

      toast({
        title: "Settings Saved",
        description: "Your profile has been updated.",
      });
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your profile information and password.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-6"
          >
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={photoUrlValue || ""}
                  alt={form.getValues("displayName") || ""}
                  data-ai-hint="person"
                />
                <AvatarFallback>
                  {form.getValues("displayName")?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photoURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://placehold.co/100x100.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div>
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-sm text-muted-foreground">
                Leave fields blank to keep your current password.
              </p>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving || !form.formState.isDirty}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
