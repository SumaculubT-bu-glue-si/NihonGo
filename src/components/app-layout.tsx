
'use client';

import { useAuth } from '@/contexts/auth-context';
import { NihonGoLogo } from './icons';
import { Home, BookMarked, BookOpen, ClipboardList, BarChart3, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { UserSettingsForm } from './user-settings-form';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { href: '/decks', label: 'Home', icon: Home, admin: false },
    { href: '/grammar-lessons', label: 'Grammar', icon: BookMarked, admin: false },
    { href: '/dictionary', label: 'Dictionary', icon: BookOpen, admin: false },
    { href: '/quizzes', label: 'Quizzes', icon: ClipboardList, admin: false },
    { href: '/stats', label: 'Dashboard', icon: BarChart3, admin: false },
    { href: '/admin', label: 'Admin', icon: ShieldCheck, admin: true },
  ];
  
  const visibleMenuItems = menuItems.filter(item => !item.admin || (item.admin && user?.role === 'admin'));

  return (
    <>
      <div className="min-h-screen pb-72 w-full flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
          <div className="container flex h-16 items-center">
              <Link href="/decks" className="mr-6 flex items-center gap-2">
                  <NihonGoLogo className="h-8 w-8 text-primary-foreground" />
                  <span className="font-bold font-headline text-lg">Nihon GO</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                  {visibleMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "transition-colors hover:text-primary-foreground/80 flex items-center gap-2",
                        pathname.startsWith(item.href) ? "text-primary-foreground font-semibold" : "text-primary-foreground/70"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
              </nav>
              <div className="flex flex-1 items-center justify-end gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-primary/90">
                      <Avatar className="h-10 w-10 border-2 border-primary-foreground/50">
                        <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} data-ai-hint="person" />
                        <AvatarFallback>
                          {user?.displayName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setIsSettingsOpen(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
          </div>
        </header>
        <main className="flex-1 container mx-auto p-4 sm:p-6">{children}</main>
      </div>
      <UserSettingsForm isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}
