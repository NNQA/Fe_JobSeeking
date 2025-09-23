import { Metadata, ResolvingMetadata } from "next";
import FreelancerMarketplace from "./_component/free-lance-market-place";
import type { SearchParams } from 'nuqs/server'
import JobResult from "./_component/job-result";
import { fetchJobDependencies } from "@/lib/fetchers/jobs/job";
type Props = {
    params: Promise<{ slug: string, locale: string }>
    searchParams: Promise<SearchParams>
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: "search page",
        description: "asss",
    }
}
export default async function SearchPage({ params, searchParams }: Props) {
    const jobDependencies = await fetchJobDependencies();
    const { body: categories } = jobDependencies;
    return (
        <FreelancerMarketplace jobDependencies={{
            categories: categories,
        }}>
            <JobResult searchParams={searchParams} />
        </FreelancerMarketplace>
    )
}