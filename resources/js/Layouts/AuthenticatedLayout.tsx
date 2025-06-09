import React, { PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import Logo from '@/Components/Logo';
import { ThemeToggle } from '@/Components/ThemeToggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { ChevronDown } from 'lucide-react';

// Update the props interface to accept an optional 'header' prop
export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-900">
            <header className="fixed top-0 w-full bg-white/80 dark:bg-neutral-950/20 backdrop-blur-lg border-b border-gray-200 dark:border-neutral-800 shadow-sm z-50">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo on the left */}
                        <div className="flex items-center">
                            <Link href="/dashboard">
                                <Logo className="h-9 w-auto" />
                            </Link>
                        </div>

                        {/* Right side with Nav, User Dropdown and Theme Toggle */}
                        <div className="flex items-center gap-4">
                            <nav className="hidden md:flex gap-4">
                                <Link href={route('jobs.public.index')}>
                                    <Button variant="secondary">
                                        Browse Jobs
                                    </Button>
                                </Link>
                            </nav>
                            <ThemeToggle />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-2"
                                    >
                                        <span>{user.name}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                >
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link href={route('profile.edit')}>
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full"
                                    >
                                        <DropdownMenuItem>
                                            Log Out
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content area now has padding-top to account for the fixed navbar */}
            <div className="pt-16">
                {/* Render the optional sub-header if it exists */}
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
