import React, { FormEventHandler, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import Logo from '@/Components/Logo'; // Using the global layout for theme provider
import GuestLayout from '@/Layouts/GuestLayout';

// Component to display input errors
const InputError = ({
    message,
    className = '',
}: {
    message?: string;
    className?: string;
}) => {
    return message ? (
        <p className={'text-sm text-red-600 dark:text-red-400 ' + className}>
            {message}
        </p>
    ) : null;
};

export default function RegisterJobSeeker() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // The POST route name matches what we defined in routes/auth.php
        post('/register-job-seeker');
    };

    return (
        <GuestLayout>
            <Head title={t('Job Seeker Registration')} />
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 p-4">
                <div className="mb-6">
                    <Link href="/">
                        <Logo width={150} />
                    </Link>
                </div>

                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">
                            {t('Create your Job Seeker Account')}
                        </CardTitle>
                        <CardDescription>
                            {t('Start your search for a transparent and fair job.')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            {/* Name Field */}
                            <div>
                                <Label htmlFor="name">{t('Name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="mt-4">
                                <Label htmlFor="email">{t('Email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="mt-4">
                                <Label htmlFor="password">{t('Password')}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mt-4">
                                <Label htmlFor="password_confirmation">
                                    {t('Confirm Password')}
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6 flex flex-col items-center">
                                <p className="text-center text-sm text-muted-foreground mb-4">
                                    {t('Are you a company?')}{' '}
                                    <Link
                                        href={route('register.company')}
                                        className="underline hover:text-primary"
                                    >
                                        {t('Register here.')}
                                    </Link>
                                </p>

                                <Button
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {t('Register')}
                                </Button>

                                <Link
                                    href={route('login')}
                                    className="mt-4 text-sm text-muted-foreground underline hover:text-primary"
                                >
                                    {t('Already registered?')}
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
