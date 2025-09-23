import PaginationBar from '@/components/custom/PaginationBar'
import React from 'react'
import SelectPerPage from './select-perpage';
type PagitionSearchJobProps = {
    totalPages: number;
    totalElements: number;
}
function Pagination({ totalElements, totalPages }: PagitionSearchJobProps) {
    return (
        <div className='flex items-center justify-between py-6 w-full'>
            <SelectPerPage />
            <PaginationBar className='items-end flex justify-end' totalElement={totalElements} totalPages={totalPages} />
        </div>
    )
}

export default Pagination