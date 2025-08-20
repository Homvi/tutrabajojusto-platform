import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, ApplicationWithProfile } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';
import { ArrowLeft, Mail, User, Check, X as XIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Show({
    auth,
    application,
}: PageProps<{ application: ApplicationWithProfile }>) {
    const { job_seeker_profile: profile, status } = application;
    const skills = profile.skills
        ? profile.skills.split(',').map((s) => s.trim())
        : [];

    const updateStatus = (newStatus: 'shortlisted' | 'rejected') => {
        router.patch(
            route('applications.updateStatus', application.id),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () =>
                    toast.success(`Applicant status updated to ${newStatus}.`),
                onError: () => toast.error('Failed to update status.'),
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('jobs.applicants', {
                            job: application.job_posting_id,
                        })}
                    >
                        <ArrowLeft className="h-6 w-6 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Applicant Profile
                    </h2>
                </div>
            }
        >
            <Head title={`Applicant: ${profile.user.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <User className="h-8 w-8" />
                                    {profile.user.name}
                                </CardTitle>
                                <CardDescription className="mt-2 text-base">
                                    {profile.headline ||
                                        'No headline provided.'}
                                </CardDescription>
                                <a
                                    href={`mailto:${profile.user.email}`}
                                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 mt-2"
                                >
                                    <Mail className="h-4 w-4" />
                                    {profile.user.email}
                                </a>
                            </div>
                            <div>
                                <Badge
                                    variant={
                                        status === 'shortlisted'
                                            ? 'default'
                                            : status === 'rejected'
                                              ? 'destructive'
                                              : 'secondary'
                                    }
                                >
                                    Status: {status}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center gap-2 my-4">
                                <Button
                                    onClick={() => updateStatus('shortlisted')}
                                    size="sm"
                                >
                                    <Check className="mr-2 h-4 w-4" /> Shortlist
                                </Button>
                                <Button
                                    onClick={() => updateStatus('rejected')}
                                    variant="destructive"
                                    size="sm"
                                >
                                    <XIcon className="mr-2 h-4 w-4" /> Reject
                                </Button>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Summary
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {profile.summary ||
                                            'No summary provided.'}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.length > 0 ? (
                                            skills.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="secondary"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">
                                                No skills listed.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Work Experience
                                    </h3>
                                    <div className="space-y-6">
                                        {profile.experience &&
                                        profile.experience.length > 0 ? (
                                            profile.experience.map(
                                                (exp, index) => (
                                                    <div key={index}>
                                                        <h4 className="font-semibold">
                                                            {exp.title}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {exp.company} •{' '}
                                                            {exp.dates}
                                                        </p>
                                                        <p className="mt-2">
                                                            {exp.description}
                                                        </p>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p className="text-sm text-muted-foreground">
                                                No work experience provided.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Education
                                    </h3>
                                    <div className="space-y-4">
                                        {profile.education &&
                                        profile.education.length > 0 ? (
                                            profile.education.map(
                                                (edu, index) => (
                                                    <div key={index}>
                                                        <h4 className="font-semibold">
                                                            {edu.degree}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {edu.institution} •{' '}
                                                            {edu.year}
                                                        </p>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p className="text-sm text-muted-foreground">
                                                No education provided.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
