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
import Logo from '@/Components/Logo';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';

export default function RegisterCompany() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        registration_number: '', // New field
        website: '', // New field
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
        post('/register-company');
    };

    return (
        <GuestLayout>
            <Head title={t('Company Registration')} />
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 p-4">
                <div className="mb-6">
                    <Link href="/">
                        <Logo width={150} />
                    </Link>
                </div>

                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">
                            {t('Create your Company Account')}
                        </CardTitle>
                        <CardDescription>
                            {t('Start posting transparent job offers.')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Company Name Field */}
                            <div>
                                <Label htmlFor="company_name">
                                    {t('Company Name')}
                                </Label>
                                <Input
                                    id="company_name"
                                    name="company_name"
                                    value={data.company_name}
                                    className="mt-1 block w-full"
                                    autoComplete="organization"
                                    autoFocus
                                    onChange={(e) =>
                                        setData('company_name', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.company_name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Registration Number Field */}
                            <div>
                                <Label htmlFor="registration_number">
                                    {t('Company Registration Number')}
                                </Label>
                                <Input
                                    id="registration_number"
                                    name="registration_number"
                                    value={data.registration_number}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            'registration_number',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.registration_number}
                                    className="mt-2"
                                />
                            </div>

                            {/* Website Field */}
                            <div>
                                <Label htmlFor="website">
                                    {t('Website')} (Optional)
                                </Label>
                                <Input
                                    id="website"
                                    name="website"
                                    type="text"
                                    value={data.website}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('website', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.website}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <Label htmlFor="email">{t('Email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
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
                            <div>
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
                            <div>
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

                            <div className="pt-2 flex flex-col items-center">
                                <p className="text-center text-sm text-muted-foreground mb-4">
                                    {t('Are you a job seeker?')}{' '}
                                    <Link
                                        href={route('register.job-seeker')}
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
