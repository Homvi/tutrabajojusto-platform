import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateJobSeekerProfileForm from './Partials/UpdateJobSeekerProfileForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

interface ExperienceEntry {
    [key: string]: string;
    title: string;
    company: string;
    dates: string;
    description: string;
}

interface EducationEntry {
    [key: string]: string;
    degree: string;
    institution: string;
    year: string;
}

interface JobSeekerProfileData {
    headline?: string;
    summary?: string;
    skills?: string;
    experience?: ExperienceEntry[];
    education?: EducationEntry[];
}

// Update the PageProps to use the new, structured profile data type
export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    profileData,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    profileData?: JobSeekerProfileData | null;
}>) {
    const isJobSeeker = auth.user.role === 'job_seeker';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Conditionally render the job seeker profile form */}
                    {isJobSeeker && (
                        <div className=" bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <UpdateJobSeekerProfileForm
                                // Pass the profileData prop, handling the possibility of it being null
                                profileData={profileData ?? undefined}
                                className="max-w-xl"
                            />
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
