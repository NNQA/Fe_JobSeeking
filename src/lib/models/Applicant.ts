import { User } from "./User";
import { Work } from "./Work";

export interface Applicant {
    id?: string;
    user: User;
    job: Work;

    resumeUrl: string;
    createdDateTime?: Date;
    updatedDateTime?: Date;
}