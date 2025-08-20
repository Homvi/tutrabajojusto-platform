// Experience entry interface
export interface ExperienceEntry {
    [key: string]: string;
    title: string;
    company: string;
    dates: string;
    description: string;
}

// Education entry interface
export interface EducationEntry {
    [key: string]: string;
    degree: string;
    institution: string;
    year: string;
}

// Job seeker profile data interface
export interface JobSeekerProfileData {
    headline?: string;
    summary?: string;
    skills?: string;
    experience?: ExperienceEntry[];
    education?: EducationEntry[];
}

// Job seeker profile form data type
export type JobSeekerProfileFormData = {
    headline: string;
    summary: string;
    skills: string;
    experience: ExperienceEntry[];
    education: EducationEntry[];
};

// Job seeker profile interface (for detailed views)
export interface JobSeekerProfile {
    id: number;
    user_id: number;
    headline?: string;
    summary?: string;
    skills?: string;
    experience?: ExperienceEntry[];
    education?: EducationEntry[];
    created_at: string;
    updated_at: string;
}
