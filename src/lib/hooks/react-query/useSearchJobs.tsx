'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { PageResponseSearch } from '@/lib/models/PageResponseSearch'
import { JobDocument } from '@/lib/models/Document/JobDocument'

export function useSearchJobs(searchParamsString: string) {
    return useInfiniteQuery({
        queryKey: ['jobs', searchParamsString],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/search/jobs?${searchParamsString}&page=${pageParam}`, {
                cache: 'no-store',
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            const data = await res.json();
            return data.body as PageResponseSearch<JobDocument>;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return !lastPage.last ? lastPage.pageNumber + 1 : undefined
        },
        select: (data) => {
            const jobs = data.pages.flatMap((page) => page.content)
            const meta = data.pages[0]
            return { jobs, meta }
        },
    })
}
