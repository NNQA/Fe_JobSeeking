import { Applicant } from "@/lib/models/Applicant";

export default interface ApplicantPaginationResponse {
    applicantResponses: Applicant[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}
