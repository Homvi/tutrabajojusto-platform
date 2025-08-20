import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps, SimpleJobPosting, Applicant } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';

export default function Applicants({
    auth,
    job,
    applications,
}: PageProps<{ job: SimpleJobPosting; applications: Applicant[] }>) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
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
                        Applicants for: {job.title}
                    </h2>
                </div>
            }
        >
            <Head title={`Applicants for ${job.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Received Applications</CardTitle>
                            <CardDescription>
                                Review the profiles of candidates who have
                                applied for this position.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Applicant Name</TableHead>
                                        <TableHead>Headline</TableHead>
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
                                                    {
                                                        app.job_seeker_profile
                                                            .user.name
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {app.job_seeker_profile
                                                        .headline || 'N/A'}
                                                </TableCell>
                                                {/* Corrected: Use 'created_at' for formatting */}
                                                <TableCell>
                                                    {formatDate(app.created_at)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            app.status ===
                                                            'shortlisted'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {app.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link
                                                        href={route(
                                                            'applicants.show',
                                                            app.id
                                                        )}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Profile
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
                                                There are no applicants for this
                                                job yet.
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
