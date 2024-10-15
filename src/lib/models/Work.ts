import { Address } from "./Address";

export interface Work {
    id:string;
    title: string;
    description: string;
    salary: string;
    address: Address;
    categories: Array<Category>;
    skills: Array<Skill>;
    experience:string;
    expiredDate: Date;
    position: JobPostion;
    type: JobType;
}
export interface  Category{
    id?:string;
    jobCategoryName: string;
}
export interface Skill {
    id?:string;
    nameSkill: string;
}

export interface JobPostion {
    id?:string;
    jobPositionName: string;
}

export interface JobType {
    jobTypeName: string;
}
