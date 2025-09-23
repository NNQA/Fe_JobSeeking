"use client"
import React from "react"
import { SearchHeader } from "./search-header"
import { FilterSidebar } from "./filter/filter-sidebar"
import { SortDropdown } from "./sort-dropdown"
import { JobCategory } from "@/lib/models/Categories"
import useFilters from "../hooks/useFilter"
export interface FreelanceMarketplaceProps {
  jobDependencies: {
    categories: JobCategory[];
  };
  children: React.ReactNode
}
export default function FreelancerMarketplace({ jobDependencies, children }: FreelanceMarketplaceProps) {
  const { filter, dispatch, isPending } = useFilters();

  return (
    <div className="min-h-screen">
      <SearchHeader categories={jobDependencies.categories} dispatch={dispatch} filters={filter} isPending key={"search-header"} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-2">
            <FilterSidebar categories={jobDependencies?.categories} filter={filter} dispatch={dispatch} isPending={isPending} />
          </div>
          <div className="lg:col-span-5">
            <SortDropdown />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
