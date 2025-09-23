import { JobCategory } from "@/lib/models/Categories";
import { BudgetMethod } from "@/lib/models/enum/budget-enum";
import { JobLevel } from "@/lib/models/enum/jobLevel-enum";
import { Skill } from "@/lib/models/Job";

export interface SearchPage {
    cate: string[];
    provinceName: string[];
    position: string[];
}

export interface JobDependencies {
    categories: JobCategory[];
    skills: Skill[];
}

export type JobSearchParams = {
    q?: string;
    categoryIds: string[] | string;
    skillIds?: string[] | string;
    budgetMethod?: BudgetMethod;
    jobLevels?: string[];
    minBudget?: string;
    maxBudget?: string;
    minHourlyRate?: string;
    maxHourlyRate?: string;
    clientId?: string;
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
    page?: string;
    size?: string;
};
