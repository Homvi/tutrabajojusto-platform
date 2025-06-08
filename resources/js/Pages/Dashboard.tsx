import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Building, UserCircle, PlusCircle, List } from 'lucide-react';

// A dedicated component for the Job Seeker's dashboard view
const JobSeekerDashboard = ({ user }: { user: User }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-6 w-6" />
                <span>Job Seeker Dashboard</span>
            </CardTitle>
            <CardDescription>
                Welcome back, {user.name}! Let&apos;s find your next
                opportunity.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="mb-4 text-muted-foreground">
                Your profile is your key to success. A complete and up-to-date
                profile attracts the best companies.
            </p>
            <Link href={route('profile.edit')}>
                <Button>Complete Your Profile</Button>
            </Link>
        </CardContent>
    </Card>
);

// A dedicated component for the Company's dashboard view
const CompanyDashboard = ({ user }: { user: User }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                <span>Company Dashboard</span>
            </CardTitle>
            <CardDescription>
                Welcome back to {user.name}! Let&apos;s find the best talent for
                your team.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="mb-4 text-muted-foreground">
                Post a new job opening or manage your existing listings.
            </p>
            <div className="flex items-center gap-4">
                <Link href={route('jobs.create')}>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post a New Job Offer
                    </Button>
                </Link>
                <Link href={route('jobs.index')}>
                    <Button variant="secondary">
                        <List className="mr-2 h-4 w-4" />
                        Manage Your Jobs
                    </Button>
                </Link>
            </div>
        </CardContent>
    </Card>
);

export default function Dashboard({ auth }: PageProps) {
    const { user } = auth;
    const isCompany = user.role === 'company';

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isCompany ? (
                        <CompanyDashboard user={user} />
                    ) : (
                        <JobSeekerDashboard user={user} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
