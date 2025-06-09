import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';

// Define the type for a single application object we receive from the controller
interface Application {
    id: number;
    status: 'submitted' | 'viewed' | 'shortlisted' | 'rejected';
    created_at: string; // Corrected: This matches the 'created_at' timestamp from Laravel
    job_posting: {
        id: number;
        title: string;
        company_profile: {
            company_name: string;
        };
    };
}

export default function Index({
    auth,
    applications,
}: PageProps<{ applications: Application[] }>) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusVariant = (status: Application['status']) => {
        switch (status) {
            case 'submitted':
                return 'secondary';
            case 'viewed':
                return 'default';
            case 'shortlisted':
                return 'default'; // Or a custom 'success' variant if you have one
            case 'rejected':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    My Applications
                </h2>
            }
        >
            <Head title="My Applications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Job Applications</CardTitle>
                            <CardDescription>
                                Here is a list of all the jobs you have applied
                                to and their current status.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Job Title</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Date Applied</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {applications.length > 0 ? (
                                        applications.map((app) => (
                                            <TableRow key={app.id}>
                                                <TableCell className="font-medium">
                                                    {app.job_posting.title}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        app.job_posting
                                                            .company_profile
                                                            .company_name
                                                    }
                                                </TableCell>
                                                {/* Corrected: Use 'created_at' for formatting */}
                                                <TableCell>
                                                    {formatDate(app.created_at)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={getStatusVariant(
                                                            app.status
                                                        )}
                                                    >
                                                        {app.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link
                                                        href={route(
                                                            'jobs.public.show',
                                                            app.job_posting.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            View Job
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center h-24"
                                            >
                                                You haven&apos;t applied to any
                                                jobs yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
