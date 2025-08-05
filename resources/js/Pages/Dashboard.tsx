import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { User } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import {
    Building,
    UserCircle,
    PlusCircle,
    List,
    Eye,
    AlertCircle,
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';

// --- Constants ---
const RECENT_ITEMS_LIMIT = 5;

// --- Interface Definitions ---
interface RecentJobPosting {
    id: number;
    title: string;
    status: 'draft' | 'published' | 'archived';
    applications_count: number;
}

interface RecentApplication {
    id: number;
    status: 'submitted' | 'viewed' | 'shortlisted' | 'rejected';
    created_at: string;
    job_posting: {
        id: number;
        title: string;
        company_profile: {
            company_name: string;
        } | null;
    };
}

interface DashboardProps {
    auth: {
        user: User;
    };
    recentJobPostings?: RecentJobPosting[];
    recentApplications?: RecentApplication[];
}

// A dedicated component for the validation alert
const ValidationAlert = () => {
    const { t } = useTranslation();
    return (
        <Alert
            variant="destructive"
            className="border-amber-500 bg-amber-50 text-amber-800 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-200"
        >
            <AlertCircle className="h-4 w-4 !text-amber-600 dark:!text-amber-400" />
            <AlertTitle className="font-semibold">{t('Validation Pending')}</AlertTitle>
            <AlertDescription>
                {t('Your company profile is under review. Job postings will not be public until your account is approved.')}
            </AlertDescription>
        </Alert>
    );
};

// --- Job Seeker Dashboard Component ---
const JobSeekerDashboard = ({
    user,
    recentApplications,
}: {
    user: User;
    recentApplications: RecentApplication[];
}) => {
    const { t } = useTranslation();
    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    const getStatusVariant = (status: RecentApplication['status']) => {
        if (status === 'rejected') return 'destructive';
        if (status === 'shortlisted' || status === 'viewed') return 'default';
        return 'secondary';
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserCircle className="h-6 w-6" />
                        <span>{t('Job Seeker Dashboard')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('Welcome back, {name}! Let\'s find your next opportunity.').replace('{name}', user.name)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Link href={route('jobs.public.index')}>
                            <Button>Browse Jobs</Button>
                        </Link>
                        <Link href={route('profile.edit')}>
                            <Button variant="secondary">
                                {t('Complete Your Profile')}
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('Recent Applications')}</CardTitle>
                    <CardDescription>
                        {t('Here are the {count} most recent jobs you\'ve applied to.').replace('{count}', RECENT_ITEMS_LIMIT.toString())}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('Job Title')}</TableHead>
                                <TableHead>{t('Company')}</TableHead>
                                <TableHead>{t('Status')}</TableHead>
                                <TableHead>{t('Date Applied')}</TableHead>
                                <TableHead className="text-right">
                                    {t('Actions')}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentApplications.length > 0 ? (
                                recentApplications.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell className="font-medium">
                                            {app.job_posting.title}
                                        </TableCell>
                                        <TableCell>
                                            {app.job_posting.company_profile
                                                ?.company_name || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={getStatusVariant(
                                                    app.status
                                                )}
                                            >
                                                {t(app.status.charAt(0).toUpperCase() + app.status.slice(1))}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(app.created_at)}
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
                                                    {t('View Job')}
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
                                        {t("You haven't applied to any jobs yet.")}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Company Dashboard Component ---
const CompanyDashboard = ({
    user,
    recentJobPostings,
}: {
    user: User;
    recentJobPostings: RecentJobPosting[];
}) => {
    const { t } = useTranslation();
    return (
    <div className="space-y-8">
        {!user.companyProfile?.is_validated && <ValidationAlert />}

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="h-6 w-6" />
                    <span>{t('Company Dashboard')}</span>
                </CardTitle>
                <CardDescription>
                    {t('Welcome back, {name}! Manage your job postings and applications.').replace('{name}', user.name)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Link href={route('jobs.create')}>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {t('Post a New Job Offer')}
                        </Button>
                    </Link>
                    <Link href={route('jobs.index')}>
                        <Button variant="secondary">
                            <List className="mr-2 h-4 w-4" />
                            {t('Manage All Jobs')}
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>

                    <Card>
                <CardHeader>
                    <CardTitle>{t('Recent Job Postings')}</CardTitle>
                    <CardDescription>
                        {t('Here are your {count} most recent job postings.').replace('{count}', RECENT_ITEMS_LIMIT.toString())}
                    </CardDescription>
                </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('Title')}</TableHead>
                            <TableHead>{t('Status')}</TableHead>
                            <TableHead>{t('Applicants')}</TableHead>
                            <TableHead className="text-right">
                                {t('Actions')}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentJobPostings.length > 0 ? (
                            recentJobPostings.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">
                                        {job.title}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                job.status === 'published'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {t(job.status.charAt(0).toUpperCase() + job.status.slice(1))}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {job.applications_count}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('jobs.show', job.id)}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="mr-2 h-4 w-4" />
                                                {t('View')}
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center h-24"
                                >
                                    {t("You haven't created any job postings yet.")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
    );
};

// --- Main Export ---
export default function Dashboard({
    auth,
    recentJobPostings,
    recentApplications,
}: DashboardProps) {
    const { t } = useTranslation();
    const { user } = auth;
    const isCompany = user.role === 'company';

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {t('Dashboard')}
                </h2>
            }
        >
            <Head title={t('Dashboard')} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isCompany ? (
                        <CompanyDashboard
                            user={user}
                            recentJobPostings={recentJobPostings || []}
                        />
                    ) : (
                        <JobSeekerDashboard
                            user={user}
                            recentApplications={recentApplications || []}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
