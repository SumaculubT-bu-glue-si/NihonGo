
'use client';

import { useState } from 'react';
import type { User } from '@/contexts/auth-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserForm, type UserFormData } from './user-form';

const mockLoginHistory = [
  { type: 'Login', timestamp: '2024-07-28 09:15:23' },
  { type: 'Logout', timestamp: '2024-07-28 11:30:05' },
  { type: 'Login', timestamp: '2024-07-27 14:05:11' },
  { type: 'Logout', timestamp: '2024-07-27 15:00:45' },
];

interface UserManagementViewProps {
  users: User[];
  onAddUser: (
    data: Omit<User, 'uid' | 'role'> & { role?: 'learner' | 'admin' }
  ) => Promise<User>;
  onUpdateUser: (
    userId: string,
    data: { displayName?: string; photoURL?: string; email?: string }
  ) => Promise<void>;
  onDeleteUser: (userId: string) => Promise<void>;
}

export function UserManagementView({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}: UserManagementViewProps) {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleAddNew = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteInitiate = (user: User) => {
    setUserToDelete(user);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    try {
      await onDeleteUser(userToDelete.uid);
      toast({
        title: 'User Deleted',
        description: `${userToDelete.displayName} has been removed.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user.',
        variant: 'destructive',
      });
    } finally {
      setUserToDelete(null);
    }
  };

  const handleSaveUser = async (data: UserFormData) => {
    try {
      if (editingUser) {
        // Update user
        await onUpdateUser(editingUser.uid, data);
        toast({
          title: 'User Updated',
          description: 'User details have been successfully updated.',
        });
      } else {
        // Add new user
        await onAddUser({ ...data, role: 'learner' });
        toast({
          title: 'User Added',
          description: 'A new learner has been successfully added.',
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save user details.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <h1 className="mb-2 text-3xl font-bold font-headline">User Management</h1>
            <p className="text-muted-foreground">
                View and manage all learner accounts in the system.
            </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
             <Button onClick={handleAddNew}>
                <PlusCircle className="mr-2" />
                Add New Learner
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learner Accounts</CardTitle>
          <CardDescription>A list of all registered learners.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">User</TableHead>
                <TableHead>Mock Password</TableHead>
                <TableHead>Login History (Mock)</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={user.photoURL ?? ''}
                          alt={user.displayName ?? ''}
                        />
                        <AvatarFallback>
                          {user.displayName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-mono text-sm tracking-widest text-muted-foreground">
                      ••••••••
                    </p>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      {mockLoginHistory.slice(0, 2).map((item, index) => (
                        <li key={index} className="text-xs text-muted-foreground">
                          <span
                            className={
                              item.type === 'Login'
                                ? 'text-green-500'
                                : 'text-red-500'
                            }
                          >
                            {item.type}
                          </span>
                          : {new Date(item.timestamp).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteInitiate(user)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <UserForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSaveUser}
        user={editingUser}
      />

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              account for "{userToDelete?.displayName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
