import { BudgetMethod } from "../enum/budget-enum"
import { JobLevel } from "../enum/jobLevel-enum"
import { JobStatus } from "../enum/jobStatus-enum"


export interface JobDocument {
    id: string
    title: string
    description: string
    categoryInfos: CategoryInfo[]
    requiredSkills: SkillInfo[]
    clientInfo: ClientInfo
    budgetMethod: BudgetMethod
    jobLevel: JobLevel
    budgetAmountMax: number
    budgetAmountMin: number
    hourlyRateMax: number
    hourlyRateMin: number
    durationEstimate: string
    deadline: string
    createdDateTime: string
    updatedDateTime: string
    status: JobStatus
    searchTags: string
}

export interface CategoryInfo {
    id: number
    name: string
}

export interface SkillInfo {
    id: number
    name: string
}

export interface ClientInfo {
    id: number
    userName: string
}

