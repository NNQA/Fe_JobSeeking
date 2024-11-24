import { Address } from "./Address";
import { Company } from "./Company";

export interface Work {
    id:string;
    title: string;
    description: string;
    salary: Salary;
    address: Address;
    categories: Array<Category>;
    skills: Array<Skill>;
    experience:string;
    expiredDate: Date;
    position: JobPostion;
    type: JobType;
    company?:Company;
    createdDateTime?: Date;
    updatedDateTime?: Date;
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
export interface  Salary{
      numberSort: number;
      value: string;
}