export interface JobCategory {
    id?: string
    category: string;
    status?: number;
    fields: Array<Jobfield>;
    createdDateTime?: Date;
    updatedDateTime?: Date;
}

export interface Jobfield {
    id?: string
    name: string;
    status: number;
    createdDateTime: Date;
    updatedDateTime: Date;
}