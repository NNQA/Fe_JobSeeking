import React from 'react'
import { JobCard } from './job-card';
import { JobDocument } from '@/lib/models/Document/JobDocument';


type JobListProps = {
    jobData: JobDocument[];
}
function JobList({ jobData }: JobListProps) {
    return (
        <div>
            <div className='space-y-4'>

                {jobData?.map((job) => (
                    // <JobCard key={job.id} job={job} onSave={handleSaveJob} onApply={handleApplyToJob} />
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    )
}

export default JobList