import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import GuestLayout from '@/Layouts/GuestLayout';
import { useTranslation } from '@/hooks/useTranslation';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Building, Euro, MapPin, Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

// --- Reusable Interfaces ---
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

interface Filters {
    search?: string;
    sort?: string;
    types?: string[];
}

// --- Job Card Component ---
const JobCard = ({ job }: { job: JobPosting }) => {
    const { t } = useTranslation();
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
                        {t(job.type.charAt(0).toUpperCase() + job.type.slice(1))}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />{' '}
                        {job.location || t('Remote')}
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
                    <Link href={route('jobs.public.show', job.id)}>
                        <Button variant="outline">{t('View Details')}</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

// --- Main Page Component ---
export default function Index({
    jobPostings,
    filters,
}: PageProps<{ jobPostings: JobPosting[]; filters: Filters }>) {
    const { t } = useTranslation();
    // Safely initialize state, ensuring filters is always an object.
    const safeFilters =
        filters && typeof filters === 'object' && !Array.isArray(filters)
            ? filters
            : {};

    const [search, setSearch] = useState(safeFilters.search || '');
    const [sortOrder, setSortOrder] = useState(safeFilters.sort || 'latest');
    const [types, setTypes] = useState<string[]>(safeFilters.types || []);

    // Debounce the search term to avoid excessive requests while typing
    const [debouncedSearch] = useDebounce(search, 500);

    // This effect triggers a new data fetch whenever the filters change
    useEffect(() => {
        const queryParams: Record<string, string | string[]> = {};
        if (debouncedSearch) queryParams.search = debouncedSearch;
        if (sortOrder) queryParams.sort = sortOrder;
        if (types.length > 0) queryParams.types = types;

        router.get(route('jobs.public.index'), queryParams, {
            preserveState: true,
            replace: true,
        });
    }, [debouncedSearch, sortOrder, types]);

    const handleTypeChange = (type: string) => {
        setTypes((prevTypes) =>
            prevTypes.includes(type)
                ? prevTypes.filter((t) => t !== type)
                : [...prevTypes, type]
        );
    };

    return (
        <GuestLayout>
            <Head title="Browse Jobs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold tracking-tight">
                            {t('Find Your Next Opportunity')}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t('Browse through all our published job offers with transparent salaries.')}
                        </p>
                    </div>

                    {/* Filters Section */}
                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                {/* Search Input */}
                                <div className="md:col-span-2">
                                    <Label htmlFor="search">
                                        {t('Search by Keyword')}
                                    </Label>
                                    <div className="relative mt-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="search"
                                            type="text"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            placeholder={t('Job title, company, or keyword...')}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                {/* Sort Select */}
                                <div>
                                    <Label htmlFor="sort">{t('Sort By')}</Label>
                                    <Select
                                        value={sortOrder}
                                        onValueChange={setSortOrder}
                                    >
                                        <SelectTrigger
                                            id="sort"
                                            className="mt-1"
                                        >
                                            <SelectValue placeholder={t('Sort jobs')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="latest">
                                                {t('Latest')}
                                            </SelectItem>
                                            <SelectItem value="salary_high_to_low">
                                                {t('Salary: High to Low')}
                                            </SelectItem>
                                            <SelectItem value="salary_low_to_high">
                                                {t('Salary: Low to High')}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {/* Type Checkboxes */}
                            <div className="mt-4">
                                <Label>{t('Work Type')}</Label>
                                <div className="flex items-center space-x-6 mt-2">
                                    {['on-site', 'hybrid', 'remote'].map(
                                        (type) => (
                                            <div
                                                key={type}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={type}
                                                    checked={types.includes(
                                                        type
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleTypeChange(type)
                                                    }
                                                />
                                                <Label
                                                    htmlFor={type}
                                                    className="font-normal capitalize"
                                                >
                                                    {t(type.charAt(0).toUpperCase() + type.slice(1))}
                                                </Label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Job Listings Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobPostings.length > 0 ? (
                            jobPostings.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <div className="md:col-span-3 text-center py-16">
                                <h3 className="text-xl font-semibold">
                                    {t('No jobs found.')}
                                </h3>
                                <p className="text-muted-foreground mt-2">
                                    {t('Try adjusting your search criteria.')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
