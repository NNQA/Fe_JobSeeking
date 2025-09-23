'use client'
import React from 'react'
import { JobCardSkeleton } from './job-card-skeleton';
import JobList from './job-list';
import Pagination from './pagination';
import { useSearchJobs } from '@/lib/hooks/react-query/useSearchJobs';
import { EmptyState } from './empty-state';
type HydratedJobResultsProps = {
    searchParamsString: string;
};
function HydratedResult({ searchParamsString }: HydratedJobResultsProps) {
    const { data, isLoading, fetchNextPage, hasNextPage } = useSearchJobs(searchParamsString)
    if (isLoading) {
        return (
            <div>
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
            </div>
        )
    }
    const isHaveData = data?.jobs.length === 0;
    return (
        <>{
            isHaveData ? <EmptyState /> :
                <div>

                    <JobList jobData={data?.meta?.content ?? []} />
                    <Pagination totalElements={data?.meta?.totalElements ?? 0} totalPages={data?.meta.totalPages ?? 0} />
                </div>
        }
        </>

    )
}

export default HydratedResult