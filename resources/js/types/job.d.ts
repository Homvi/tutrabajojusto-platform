// Base job posting interface
export interface JobPosting {
    id: number;
    title: string;
    status: 'draft' | 'published' | 'archived';
    applications_count: number;
    created_at: string;
}

// Public job posting interface (used in public job listings)
export interface PublicJobPosting {
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

// Job filters interface
export interface JobFilters {
    search?: string;
    sort?: string;
    types?: string[];
}

// Job posting with company profile (for detailed views)
export interface JobPostingWithCompany extends JobPosting {
    company_profile?: {
        id: number;
        company_name: string;
        is_validated: boolean;
    } | null;
}

// Detailed job posting interface (for job detail views)
export interface DetailedJobPosting {
    id: number;
    title: string;
    description: string;
    responsibilities: string;
    qualifications: string;
    type: 'on-site' | 'hybrid' | 'remote';
    location: string;
    remote_policy: string;
    employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
    start_date: string;
    salary_min: number;
    salary_currency: string;
    salary_period: 'monthly' | 'yearly';
    application_deadline: string;
    interview_rounds: string;
    application_process_duration: string;
    status: 'draft' | 'published' | 'archived';
    created_at: string;
}

// Public detailed job posting interface (for public job detail views)
export interface PublicDetailedJobPosting {
    id: number;
    title: string;
    description: string;
    responsibilities: string;
    qualifications: string;
    type: 'on-site' | 'hybrid' | 'remote';
    location: string;
    remote_policy: string;
    employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
    start_date: string;
    salary_min: number;
    salary_currency: string;
    salary_period: 'monthly' | 'yearly';
    application_deadline: string;
    interview_rounds: string;
    application_process_duration: string;
    company_profile: {
        company_name: string;
        website: string;
    };
}
