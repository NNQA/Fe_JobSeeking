export interface Work {
    title: string;
    address: string;
    description: string;
    salary: number;
    level:ELevel; 
    createAt: string;
    updateAt: string;
    skill: Skill;
    activeDate: string;
    expiredDate: string;
}
export interface Skill {
    mainskill: Array<string>;
    other: Array<string>;
}

export enum ELevel{ 
    EXPERT = "EXPERT",
    EXPERIENCE = "EXPERIENCE",
    ENTRY = "ENTRY",
}