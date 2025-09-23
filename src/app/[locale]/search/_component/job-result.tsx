import { buildSearchParams } from '@/lib/utils';
import { loadJobSearchParams } from '@/lib/utils/searchParams';
import { SearchParams } from 'nuqs';
import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import HydratedResult from './hydrated-result';
import { ApiClient } from '@/lib/service/api-client.server';


type JobResultProps = {
    searchParams: Promise<SearchParams>
}
async function JobResult({ searchParams }: JobResultProps) {

    const dataFromParams = await loadJobSearchParams(searchParams);
    const queryClient = new QueryClient();

    const searchParamsString = buildSearchParams(dataFromParams).toString();

    const queryKey = ['searchJobs', searchParamsString]

    await queryClient.prefetchInfiniteQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await ApiClient.instance.get(`${process.env.NEXT_PUBLIC_URL}/api/search/jobs?${searchParamsString}`,
                {
                    next: { revalidate: 300 }
                });
            if (response.isOk()) {
                console.log("data")
                const data = await response.value.json();
                console.log(data.json)
                return data;
            }
            return []
        },
        initialPageParam: 0
    })


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HydratedResult searchParamsString={searchParamsString} />
        </HydrationBoundary>
    )
}

export default JobResult;