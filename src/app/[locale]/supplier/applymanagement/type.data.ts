import { Work } from "@/lib/models/Work";

export default interface JobPaginationResponse {
  jobResponseList: Work[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
