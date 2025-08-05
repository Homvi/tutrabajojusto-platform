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
import { Checkbox } from '@/Components/ui/checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import Logo from '@/Components/Logo';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title={t('Log in')} />

            <div
                className="min-h-screen items-center flex-col flex justify-center 
            "
            >
                <div className="mb-6">
                    <Link href="/">
                        <Logo width={150} />
                    </Link>
                </div>
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">
                            {t('Welcome Back!')}
                        </CardTitle>
                        <CardDescription>
                            {t('Log in to access your dashboard.')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                                {status}
                            </div>
                        )}
                        <form onSubmit={submit}>
                            {/* Email Field */}
                            <div>
                                <Label htmlFor="email">{t('Email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
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
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) =>
                                            setData('remember', !!checked)
                                        }
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {t('Remember me')}
                                    </Label>
                                </div>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-muted-foreground underline hover:text-primary"
                                    >
                                        {t('Forgot your password?')}
                                    </Link>
                                )}
                            </div>

                            <div className="mt-6 flex flex-col items-center">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {t('Log in')}
                                </Button>

                                <p className="mt-4 text-center text-sm text-muted-foreground">
                                    {t("Don't have an account?")}{' '}
                                    <Link
                                        href={route('register.job-seeker')}
                                        className="underline hover:text-primary"
                                    >
                                        {t('Register now.')}
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
