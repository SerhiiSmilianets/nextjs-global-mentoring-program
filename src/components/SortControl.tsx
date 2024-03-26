"use client"

import { FC, ChangeEvent } from 'react';
import '../styles/SortControl.scss';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const SortControl: FC = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()

    const handleSortChangeQuery = (sorting: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('sortBy', sorting)
        router.push([pathname, params.toString()].join("?"))
    }

    return (
        <div className="sorting-container">
            <p>SORT BY</p>
            <select value={searchParams.get('sortBy') || 'release_date'} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSortChangeQuery(e.currentTarget.value)}>
                <option value="release_date">
                    Release Date
                </option>
                <option value="title">
                    Title
                </option>
            </select>
        </div>
    )
}

export default SortControl
