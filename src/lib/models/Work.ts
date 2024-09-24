import { Address } from "./Address";

export interface Work {
    title: string;
    description: string;
    salary: string;
    address: Address;
    jobCategories: Array<Category>;
    skills: Array<Skill>;
    experience:string;
    expiredDate: Date;
    position: JobPostion;
    jobType: string;
}
export interface  Category{
    jobNameCategory: string;
}
export interface Skill {
    nameSkill: string;
}

export interface JobPostion {
    jobPositionName: string;
}
