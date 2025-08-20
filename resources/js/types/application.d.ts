import { ExperienceEntry, EducationEntry } from './profile';

// Base application interface
export interface Application {
    id: number;
    status: 'submitted' | 'viewed' | 'shortlisted' | 'rejected';
    created_at: string;
    job_posting: {
        id: number;
        title: string;
        company_profile: {
            company_name: string;
        };
    };
}

// Application with detailed job posting info
export interface ApplicationWithJobPosting extends Application {
    job_posting: {
        id: number;
        title: string;
        company_profile: {
            company_name: string;
        } | null;
    };
}

// Application status type
export type ApplicationStatus = Application['status'];

// Applicant interface (for company view of applications)
export interface Applicant {
    id: number;
    status: 'submitted' | 'viewed' | 'shortlisted' | 'rejected';
    created_at: string;
    job_seeker_profile: {
        id: number;
        headline: string;
        user: {
            name: string;
            email: string;
        };
    };
}

// Simple job posting interface for applicants view
export interface SimpleJobPosting {
    id: number;
    title: string;
}

// Application with detailed job seeker profile (for company view)
export interface ApplicationWithProfile {
    id: number;
    job_posting_id: number;
    status: 'submitted' | 'viewed' | 'shortlisted' | 'rejected';
    job_seeker_profile: {
        id: number;
        headline: string;
        summary: string;
        skills: string;
        experience: ExperienceEntry[];
        education: EducationEntry[];
        user: {
            name: string;
            email: string;
        };
    };
}
