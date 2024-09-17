import { Address } from "cluster";

export interface Work {
    title: string;
    description: string;
    salary: Salary;
    skill: Skill;
    catergory: Category;

    address: Address;
    activeDate: string;
    expiredDate: string;
}
export interface  Category{
    nameCate: Array<string>;
}
export interface Skill {
    nameSkill: Array<string>;
}

export interface Salary {
    text: string;
}