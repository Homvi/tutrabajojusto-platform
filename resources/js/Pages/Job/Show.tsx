import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import {
    ArrowLeft,
    CalendarDays,
    CaseSensitive,
    Euro,
    MapPin,
    Briefcase,
    Clock,
} from 'lucide-react';
import { Separator } from '@/Components/ui/separator';

// Define the full type for a single job posting based on our migration
interface JobPosting {
    id: number;
    title: string;
    description: string;
    responsibilities: string;
    qualifications: string;
    type: 'on-site' | 'hybrid' | 'remote';
    location: string;
    remote_policy: string;
    employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
    start_date: string;
    salary_min: number;
    salary_currency: string;
    salary_period: 'monthly' | 'yearly';
    application_deadline: string;
    interview_rounds: string;
    application_process_duration: string;
    status: 'draft' | 'published' | 'archived';
    created_at: string;
}

// A small helper component to display key details with an icon
const DetailItem = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center text-sm font-semibold text-muted-foreground">
            {icon}
            <span className="ml-2">{label}</span>
        </div>
        <div className="text-base font-medium">{value || 'Not specified'}</div>
    </div>
);

export default function Show({
    auth,
    jobPosting,
}: PageProps<{ jobPosting: JobPosting }>) {
    const formatSalary = (cents: number, currency: string, period: string) => {
        const amount = cents / 100;
        return (
            new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: currency,
            }).format(amount) + `/${period}`
        );
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('jobs.index')}>
                        <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Job Details
                    </h2>
                </div>
            }
        >
            <Head title={jobPosting.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-3xl">
                                        {jobPosting.title}
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                        {jobPosting.location}
                                    </CardDescription>
                                </div>
                                <Badge
                                    variant={
                                        jobPosting.status === 'published'
                                            ? 'default'
                                            : 'secondary'
                                    }
                                >
                                    {jobPosting.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Separator className="my-4" />

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                <DetailItem
                                    icon={<Euro className="h-4 w-4" />}
                                    label="Salary"
                                    value={formatSalary(
                                        jobPosting.salary_min,
                                        jobPosting.salary_currency,
                                        jobPosting.salary_period
                                    )}
                                />
                                <DetailItem
                                    icon={<Briefcase className="h-4 w-4" />}
                                    label="Employment"
                                    value={jobPosting.employment_type}
                                />
                                <DetailItem
                                    icon={<MapPin className="h-4 w-4" />}
                                    label="Work Type"
                                    value={jobPosting.type}
                                />
                                <DetailItem
                                    icon={<CalendarDays className="h-4 w-4" />}
                                    label="Start Date"
                                    value={formatDate(jobPosting.start_date)}
                                />
                            </div>

                            <div className="prose dark:prose-invert max-w-none">
                                <p>{jobPosting.description}</p>

                                <h4 className="mt-6">Key Responsibilities</h4>
                                <p>{jobPosting.responsibilities}</p>

                                <h4 className="mt-6">Qualifications</h4>
                                <p>{jobPosting.qualifications}</p>
                            </div>

                            <Separator className="my-6" />

                            <h3 className="text-lg font-semibold mb-4">
                                Application Process
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <DetailItem
                                    icon={<CalendarDays className="h-4 w-4" />}
                                    label="Apply Before"
                                    value={formatDate(
                                        jobPosting.application_deadline
                                    )}
                                />
                                <DetailItem
                                    icon={<CaseSensitive className="h-4 w-4" />}
                                    label="Interviews"
                                    value={jobPosting.interview_rounds}
                                />
                                <DetailItem
                                    icon={<Clock className="h-4 w-4" />}
                                    label="Process Duration"
                                    value={
                                        jobPosting.application_process_duration
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
