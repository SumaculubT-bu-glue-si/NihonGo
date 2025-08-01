"use client";

import { useAuth } from "@/contexts/auth-context-sqlite";
import { NihonGoLogo } from "./icons";
import {
  Home,
  BookMarked,
  BookOpen,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Users,
  Swords,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import UserSettingsForm from "./user-settings-form";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const menuItems = [
    { href: "/decks", label: "Home", icon: Home, admin: false },
    {
      href: "/grammar-lessons",
      label: "Grammar",
      icon: BookMarked,
      admin: false,
    },
    { href: "/dictionary", label: "Dictionary", icon: BookOpen, admin: false },
    { href: "/quizzes", label: "Quizzes", icon: ClipboardList, admin: false },
    { href: "/stats", label: "Dashboard", icon: BarChart3, admin: false },
  ];

  const visibleMenuItems = menuItems.filter((item) => !item.admin);

  return (
    <>
      <div className="min-h-screen w-full flex flex-col">
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
                    pathname.startsWith(item.href)
                      ? "text-primary-foreground font-semibold"
                      : "text-primary-foreground/70"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              {user?.role === "admin" && (
                <DropdownMenu
                  open={isAdminMenuOpen}
                  onOpenChange={setIsAdminMenuOpen}
                >
                  <div
                    onMouseEnter={() => setIsAdminMenuOpen(true)}
                    onMouseLeave={() => setIsAdminMenuOpen(false)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Link
                        href="/admin"
                        className={cn(
                          "transition-colors hover:text-primary-foreground/80 flex items-center gap-1",
                          pathname.startsWith("/admin")
                            ? "text-primary-foreground font-semibold"
                            : "text-primary-foreground/70"
                        )}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Admin
                        <ChevronDown className="h-4 w-4" />
                      </Link>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Learning Status</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/usage-analysis">Usage Analysis</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/user-management">
                          User Management
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              )}
            </nav>
            <div className="flex flex-1 items-center justify-end gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:bg-primary/90"
                  >
                    <Avatar className="h-10 w-10 border-2 border-primary-foreground/50">
                      <AvatarImage
                        src={user?.photo_url ?? ""}
                        alt={user?.display_name ?? "User"}
                        data-ai-hint="person"
                      />
                      <AvatarFallback>
                        {user?.display_name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.display_name}
                      </p>
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
      <UserSettingsForm
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        user={user}
      />
    </>
  );
}
