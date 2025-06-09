import React, { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Logo from '@/Components/Logo';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { Button } from '@/Components/ui/button';

export default function GuestLayout({ children }: PropsWithChildren) {
    // Use the usePage hook to access the globally shared 'auth' prop
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-neutral-900">
            <header className="fixed top-0 w-full bg-white/80 dark:bg-neutral-950/20 backdrop-blur-lg border-b border-gray-200 dark:border-neutral-800 shadow-sm z-50">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-6">
                            <Link href="/">
                                <Logo className="h-9 w-auto" />
                            </Link>
                            <nav className="hidden md:flex gap-4">
                                <Link href={route('jobs.public.index')}>
                                    <Button variant="secondary">
                                        Browse Jobs
                                    </Button>
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            {auth.user ? (
                                // If user is logged in, show a link to their dashboard
                                <Link href={route('dashboard')}>
                                    <Button variant="outline">Dashboard</Button>
                                </Link>
                            ) : (
                                // If user is a guest, show Log In and Sign Up
                                <>
                                    <Link href={route('login')}>
                                        <Button variant="outline">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href={route('register.job-seeker')}>
                                        <Button>Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="w-full mt-16">{children}</main>
        </div>
    );
}
