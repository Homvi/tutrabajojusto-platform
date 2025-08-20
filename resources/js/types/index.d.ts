export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'job_seeker' | 'company';
    is_admin: boolean;
    companyProfile?: CompanyProfile | null;
}

interface CompanyProfile {
    id: number;
    company_name: string;
    is_validated: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// Re-export all type modules
export * from './dashboard';
export * from './job';
export * from './application';
export * from './profile';
export * from './company';
export * from './components';
