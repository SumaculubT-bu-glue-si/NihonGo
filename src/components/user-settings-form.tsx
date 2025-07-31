// src/components/user-settings-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { useAuth, type User } from "@/contexts/auth-context-sqlite";

import { useState, ChangeEvent, useRef } from "react";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Define the Zod schema for form validation
const userSettingsFormSchema = z.object({
  display_name: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters.",
    })
    .max(30, {
      message: "Display name must not be longer than 30 characters.",
    }),
  photo_url: z.string().optional().nullable(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional()
    .or(z.literal('')),
  confirmPassword: z
    .string()
    .optional()
    .or(z.literal(''))
}).refine(data => {
  if (data.password && !data.confirmPassword) {
    return false;
  }
  return data.password === data.confirmPassword;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Define the type for the form values
type UserSettingsFormValues = z.infer<typeof userSettingsFormSchema>;

// Define the props for the UserSettingsForm component
interface UserSettingsFormProps {
  open: boolean; // Controls dialog visibility
  onOpenChange: (open: boolean) => void; // Function to control dialog/modal
  user: User | null; // Pass the current user data
}

const UserSettingsForm = ({ open, user, onOpenChange }: UserSettingsFormProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateUser } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<UserSettingsFormValues>({
    resolver: zodResolver(userSettingsFormSchema),
    defaultValues: {
      display_name: user?.display_name || "",
      photo_url: user?.photo_url || "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange",
  });

  const { formState, handleSubmit } = form;
  const { isDirty, isValid } = formState;

  // Handle photo upload
  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsSaving(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/uploads`,
        { method: "POST", body: formData }
      );

      if (response.ok) {
        const { url } = await response.json();
        form.setValue("photo_url", url, { shouldDirty: true, shouldValidate: true });
        toast({ title: "Photo Uploaded", description: "Your photo has been uploaded successfully." });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to upload photo. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during photo upload.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle removing the photo
  const handleRemovePhoto = () => {
    form.setValue("photo_url", null, { shouldDirty: true, shouldValidate: true });
    toast({ title: "Photo Removed", description: "Your photo has been removed. Save changes to confirm." });
  };

  // Handle form submission
  const onSubmit = async (values: UserSettingsFormValues) => {
    setIsSaving(true);
    try {
      const updateData = {
        display_name: values.display_name,
        photo_url: values.photo_url ?? undefined,
        password: values.password || undefined
      };

      await updateUser(updateData);

      toast({ title: "Settings Saved", description: "Your profile has been updated." });
      form.reset(values);
      onOpenChange(false);
    } catch (error) {
      console.error("Save failed:", error);
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const currentPhotoUrl = form.watch("photo_url");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>User Settings</DialogTitle>
          <DialogDescription>
            Update your profile settings and preferences
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full py-4 max-h-[70vh] overflow-y-auto pr-6">
            <Separator />
            <div className="flex flex-col w-full gap-8">
              {/* Photo Upload Section */}
              <div>
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20 overflow-hidden rounded-full">
                        {currentPhotoUrl ? (
                          <Image
                            src={currentPhotoUrl}
                            alt="Profile Photo"
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                            No Photo
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Change Photo
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        {currentPhotoUrl && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemovePhoto}
                          >
                            Remove Photo
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>Upload a photo for your profile.</FormDescription>
                  <FormMessage />
                </FormItem>
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="display_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium">Change Password</h3>
                <p className="text-sm text-muted-foreground">
                  Leave fields blank to keep your current password.
                </p>
                <div className="space-y-4 mt-4">
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
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={!isDirty || isSaving || !isValid}
            >
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettingsForm;