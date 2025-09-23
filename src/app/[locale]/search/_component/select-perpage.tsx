"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { parseAsInteger, useQueryState } from 'nuqs'
import React from 'react'

function SelectPerPage() {

    const [size, setSize] = useQueryState("size", parseAsInteger.withDefault(5).withOptions({
        shallow: false
    }))

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Jobs Per Page:</span>
            <Select value={size.toString()} onValueChange={(value) => setSize(Number(value))}>
                <SelectTrigger className="w-20">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectPerPage