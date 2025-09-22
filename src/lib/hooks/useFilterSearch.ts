import { useQueryStates } from "nuqs";
import { jobSearchParams } from "../utils/searchParams";

export const useFilterSearch = () => {
    return useQueryStates(jobSearchParams);
};
