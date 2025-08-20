import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps, JobPosting } from '@/types';
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
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';

import {
    MoreHorizontal,
    PlusCircle,
    Trash,
    Send,
    Eye,
    Users,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Index({
    auth,
    jobPostings,
}: PageProps<{ jobPostings: JobPosting[] }>) {
    const { props } = usePage();
    const flash = props.flash as { success?: string };

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const publishJob = (jobId: number) => {
        router.patch(
            route('jobs.publish', jobId),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const deleteJob = (jobId: number) => {
        router.delete(route('jobs.destroy', jobId), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Your Job Postings
                    </h2>
                    <Link href={route('jobs.create')}>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Post a New Job
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Job Postings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Your Jobs</CardTitle>
                            <CardDescription>
                                Here is a list of all the jobs you have posted
                                on the platform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Applicants</TableHead>
                                        <TableHead>Date Posted</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobPostings.length > 0 ? (
                                        jobPostings.map((job) => (
                                            <TableRow key={job.id}>
                                                <TableCell className="font-medium">
                                                    {job.title}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            job.status ===
                                                            'published'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {job.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {job.applications_count}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(job.created_at)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <span className="sr-only">
                                                                    Open menu
                                                                </span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>
                                                                Actions
                                                            </DropdownMenuLabel>
                                                            <Link
                                                                href={route(
                                                                    'jobs.show',
                                                                    job.id
                                                                )}
                                                            >
                                                                <DropdownMenuItem>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    'jobs.applicants',
                                                                    job.id
                                                                )}
                                                            >
                                                                <DropdownMenuItem>
                                                                    <Users className="mr-2 h-4 w-4" />
                                                                    View
                                                                    Applicants
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            {job.status ===
                                                                'draft' && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        publishJob(
                                                                            job.id
                                                                        )
                                                                    }
                                                                >
                                                                    <Send className="mr-2 h-4 w-4" />
                                                                    Publish
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuSeparator />
                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <DropdownMenuItem
                                                                        onSelect={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                        className="text-red-600"
                                                                    >
                                                                        <Trash className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Are
                                                                            you
                                                                            absolutely
                                                                            sure?
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This
                                                                            action
                                                                            cannot
                                                                            be
                                                                            undone.
                                                                            This
                                                                            will
                                                                            permanently
                                                                            delete
                                                                            this
                                                                            job
                                                                            posting.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() =>
                                                                                deleteJob(
                                                                                    job.id
                                                                                )
                                                                            }
                                                                            className="bg-destructive hover:bg-destructive/90"
                                                                        >
                                                                            Delete
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center h-24"
                                            >
                                                You haven&apos;t posted any jobs
                                                yet.
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
