export interface RecentJobPosting {
    id: number;
    title: string;
    status: 'draft' | 'published' | 'archived';
    applications_count: number;
}

export interface RecentApplication {
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

import { User } from './index';

export interface DashboardProps {
    auth: {
        user: User;
    };
    recentJobPostings?: RecentJobPosting[];
    recentApplications?: RecentApplication[];
}
