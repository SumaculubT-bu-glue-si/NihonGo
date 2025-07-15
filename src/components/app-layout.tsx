
'use client';

import { useAuth } from '@/contexts/auth-context';
import { NihonGoLogo } from './icons';
import { Home, BookText, SpellCheck, LogOut, Settings, BarChart3 } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { href: '/decks', label: 'Home', icon: Home },
    { href: '/grammar-checker', label: 'Grammar Checker', icon: SpellCheck },
    { href: '/vocabulary', label: 'Vocabulary', icon: BookText },
    { href: '/stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen pb-72 w-full flex flex-col">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
            <Link href="/decks" className="mr-6 flex items-center gap-2">
                <NihonGoLogo className="h-8 w-8 text-primary" />
                <span className="font-bold font-headline text-lg">Nihon GO</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "transition-colors hover:text-primary",
                      pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>
            <div className="flex flex-1 items-center justify-end gap-4">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
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
                  <DropdownMenuItem>
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
  );
}
