
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockLoginHistory = [
    { type: 'Login', timestamp: '2024-07-28 09:15:23' },
    { type: 'Logout', timestamp: '2024-07-28 11:30:05' },
    { type: 'Login', timestamp: '2024-07-27 14:05:11' },
    { type: 'Logout', timestamp: '2024-07-27 15:00:45' },
];

export function UserManagementView({ users }: { users: User[] }) {
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold font-headline">User Management</h1>
        <p className="text-muted-foreground">
          View and manage all learner accounts in the system.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learner Accounts</CardTitle>
          <CardDescription>
            A list of all registered learners.
          </CardDescription>
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
              {users.map((user, userIndex) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                        <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <p className="font-mono text-sm tracking-widest text-muted-foreground">••••••••</p>
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                        {mockLoginHistory.slice(0, 2).map((item, index) => (
                            <li key={index} className="text-xs text-muted-foreground">
                                <span className={item.type === 'Login' ? 'text-green-500' : 'text-red-500'}>
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
                        <DropdownMenuItem disabled>Edit User</DropdownMenuItem>
                        <DropdownMenuItem disabled className="text-destructive focus:text-destructive">Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
