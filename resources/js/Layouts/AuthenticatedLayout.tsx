import React, { PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import Logo from '@/Components/Logo';
import { ThemeToggle } from '@/Components/ThemeToggle';
import Footer from '@/Components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { ChevronDown, Shield } from 'lucide-react';

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const { t } = useTranslation();
    const isJobSeeker = user.role === 'job_seeker';
    const isAdmin = user.is_admin; // Assuming 'is_admin' is passed from backend

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-900">
            <header className="fixed top-0 w-full bg-white/80 dark:bg-neutral-950/20 backdrop-blur-lg border-b border-gray-200 dark:border-neutral-800 shadow-sm z-50">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-6">
                            <Link href="/dashboard">
                                <Logo className="h-9 w-auto" />
                            </Link>
                            <nav className="hidden md:flex gap-4">
                                <Link href={route('jobs.public.index')}>
                                    <Button variant="secondary">
                                        {t('Browse Jobs')}
                                    </Button>
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />

                            {/* Admin Panel Link */}
                            {isAdmin && (
                                <Link href={route('admin.companies.index')}>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        title={t('Admin Panel')}
                                    >
                                        <Shield className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}

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
                                        {t('My Account')}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link href={route('dashboard')}>
                                        <DropdownMenuItem>
                                            {t('Dashboard')}
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={route('profile.edit')}>
                                        <DropdownMenuItem>
                                            {t('Profile')}
                                        </DropdownMenuItem>
                                    </Link>

                                    {isJobSeeker && (
                                        <Link
                                            href={route(
                                                'my-applications.index'
                                            )}
                                        >
                                            <DropdownMenuItem>
                                                {t('My Applications')}
                                            </DropdownMenuItem>
                                        </Link>
                                    )}

                                    <DropdownMenuSeparator />
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full"
                                    >
                                        <DropdownMenuItem>
                                            {t('Log Out')}
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="pt-16 min-h-screen flex flex-col">
                {header && (
                    <header className="bg-white dark:bg-neutral-950 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
