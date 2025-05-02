import { JobCategory } from "@/lib/models/Categories";

export interface ProjectData {
    id?: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
    skills: string[];
    url?: string;
}

export interface ExperienceData {
    id?: string;
    company: string;
    title: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
}

export interface EducationData {
    id?: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
}

export interface ProfileFormData {
    category: JobCategory;
    skills: string[];
    projects: ProjectData[];
    experience: ExperienceData[];
    education: EducationData[];
    summary: string;
}

type StepKey = keyof ProfileFormData;

export interface StepConfig {
    step: number;
    route: string;
    apiEndpoint: string;
    validate: (data: ProfileFormData) => string | null;
    getPayload: (data: ProfileFormData) => Record<string, any>;
  }