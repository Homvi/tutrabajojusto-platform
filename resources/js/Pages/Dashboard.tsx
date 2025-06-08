// File: resources/js/Pages/Dashboard.tsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types'; // Import PageProps

// Ensure the Dashboard component receives PageProps
export default function Dashboard({ auth }: PageProps) {
    return (
        // Pass the user object to the AuthenticatedLayout
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You&apos;re logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
