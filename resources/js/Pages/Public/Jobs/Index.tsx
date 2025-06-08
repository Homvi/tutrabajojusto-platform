import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import GuestLayout from '@/Layouts/GuestLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Building, Euro, MapPin } from 'lucide-react';

// Define the type for a single job posting Prop
// Note: We also get company_profile nested from the controller query
interface JobPosting {
    id: number;
    title: string;
    type: 'on-site' | 'hybrid' | 'remote';
    location: string;
    salary_min: number;
    salary_currency: string;
    salary_period: 'monthly' | 'yearly';
    company_profile: {
        company_name: string;
    };
    published_at: string;
}

// A dedicated component for a single job card
const JobCard = ({ job }: { job: JobPosting }) => {
    const formatSalary = (cents: number, currency: string, period: string) => {
        const amount = cents / 100;
        return (
            new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: currency,
            }).format(amount) + `/${period}`
        );
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                            <Building className="h-4 w-4" />
                            {job.company_profile.company_name}
                        </CardDescription>
                    </div>
                    <Badge
                        variant={
                            job.type === 'remote' ? 'default' : 'secondary'
                        }
                    >
                        {job.type}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />{' '}
                        {job.location || 'Remote'}
                    </span>
                    <span className="flex items-center gap-1">
                        <Euro className="h-4 w-4" />{' '}
                        {formatSalary(
                            job.salary_min,
                            job.salary_currency,
                            job.salary_period
                        )}
                    </span>
                </div>
                <div className="flex justify-end">
                    {/* This link now points to the correct public details page */}
                    <Link href={route('jobs.public.show', job.id)}>
                        <Button variant="outline">View Details</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default function Index({
    jobPostings,
}: PageProps<{ jobPostings: JobPosting[] }>) {
    return (
        // Using GuestLayout as this is a public page
        <GuestLayout>
            <Head title="Browse Jobs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight">
                            Find Your Next Opportunity
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Browse through all our published job offers with
                            transparent salaries.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobPostings.length > 0 ? (
                            jobPostings.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <p className="md:col-span-3 text-center text-muted-foreground">
                                No job postings are available at the moment.
                                Please check back later!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
