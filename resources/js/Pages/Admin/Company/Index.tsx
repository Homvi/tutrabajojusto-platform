import React from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

// Define the type for a single company profile object we receive from the controller
interface Company {
    id: number;
    company_name: string;
    registration_number: string;
    website: string | null;
    is_validated: boolean;
    user: {
        name: string;
        email: string;
    };
}

export default function Index({
    auth,
    companies,
}: PageProps<{ companies: Company[] }>) {
    const { props } = usePage();
    const flash = props.flash as { success?: string };

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const validateCompany = (companyId: number) => {
        router.patch(
            route('admin.companies.validate', companyId),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const unvalidatedCompanies = companies.filter((c) => !c.is_validated);
    const validatedCompanies = companies.filter((c) => c.is_validated);

    const CompanyCard = ({ company }: { company: Company }) => (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{company.company_name}</CardTitle>
                    <Badge
                        variant={
                            company.is_validated ? 'default' : 'destructive'
                        }
                    >
                        {company.is_validated
                            ? 'Validated'
                            : 'Needs Validation'}
                    </Badge>
                </div>
                <CardDescription>
                    Registration #: {company.registration_number}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="text-sm font-semibold">Contact</h4>
                    <p className="text-sm text-muted-foreground">
                        {company.user.name} ({company.user.email})
                    </p>
                </div>
                <div>
                    <h4 className="text-sm font-semibold">Website</h4>
                    {company.website ? (
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                        >
                            {company.website}
                        </a>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Not provided
                        </p>
                    )}
                </div>
                {!company.is_validated && (
                    <div className="flex justify-end pt-2">
                        <Button onClick={() => validateCompany(company.id)}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve Company
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Admin: Company Validation
                </h2>
            }
        >
            <Head title="Admin: Companies" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* Unvalidated Companies Section */}
                    <section>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <ShieldAlert className="h-6 w-6 text-destructive" />
                            Awaiting Validation ({unvalidatedCompanies.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {unvalidatedCompanies.length > 0 ? (
                                unvalidatedCompanies.map((company) => (
                                    <CompanyCard
                                        key={company.id}
                                        company={company}
                                    />
                                ))
                            ) : (
                                <p className="text-muted-foreground md:col-span-3">
                                    No companies are currently awaiting
                                    validation.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Validated Companies Section */}
                    <section>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                            Validated Companies ({validatedCompanies.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {validatedCompanies.map((company) => (
                                <CompanyCard
                                    key={company.id}
                                    company={company}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
