import { User } from './index';

// Company profile interface
export interface CompanyProfile {
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

// Company interface for admin views
export interface Company {
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

// Company with user details
export interface CompanyWithUser extends CompanyProfile {
    user: User;
}
