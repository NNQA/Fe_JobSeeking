import { parseAsString, parseAsArrayOf, createLoader, createSearchParamsCache, parseAsIndex, parseAsInteger } from 'nuqs/server'

export const jobSearchParams = {
    q: parseAsString,
    categoryIds: parseAsArrayOf(parseAsString),
    jobLevels: parseAsArrayOf(parseAsString),
    skillIds: parseAsArrayOf(parseAsString),
    t: parseAsArrayOf(parseAsString),
    amount: parseAsString,
    hourly_rate: parseAsString,
    clientId: parseAsString,
    sortBy: parseAsString,
    page: parseAsIndex,
    size: parseAsInteger,
}
export const searchParamsCach = createSearchParamsCache(jobSearchParams)
export const loadJobSearchParams = createLoader(jobSearchParams)
