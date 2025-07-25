
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';
import { Separator } from './ui/separator';

const formSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  email: z.string().email('Please enter a valid email.'),
  photoURL: z.string().url('Please enter a valid URL.').or(z.literal('')).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters.').optional().or(z.literal('')),
  confirmPassword: z.string().optional(),
}).refine(data => {
    if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
    }
    return true;
}, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

type UserSettingsFormData = z.infer<typeof formSchema>;

interface UserSettingsFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function UserSettingsForm({ isOpen, onOpenChange }: UserSettingsFormProps) {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<UserSettingsFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: '',
      email: '',
      photoURL: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const photoUrlValue = form.watch('photoURL');

  useEffect(() => {
    if (user && isOpen) {
      form.reset({
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user, form, isOpen]);
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('photoURL', reader.result as string, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UserSettingsFormData) => {
    if (!user) return;

    setIsSaving(true);
    try {
      const updateData: {
        displayName: string;
        email: string;
        photoURL?: string;
        password?: string;
      } = {
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
      };

      if (data.password) {
        updateData.password = data.password;
      }

      await updateUser(user.uid, updateData);

      toast({
        title: 'Settings Saved',
        description: 'Your profile has been updated.',
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your profile information and password.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
            <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={photoUrlValue || ''} alt={form.getValues('displayName') || ''} data-ai-hint="person" />
                    <AvatarFallback>{form.getValues('displayName')?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload Photo
                </Button>
                <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="photoURL"
                render={({ field }) => (
                    <FormItem className="hidden">
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <Separator className="my-6" />

            <div>
                <h3 className="text-md font-semibold mb-2">Change Password</h3>
                <p className="text-sm text-muted-foreground mb-4">Leave fields blank to keep your current password.</p>
                <div className="space-y-4">
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

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || !form.formState.isDirty}>
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
