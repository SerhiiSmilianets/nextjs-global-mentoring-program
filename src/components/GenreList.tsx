'use client'

import { FC } from 'react';
import '../styles/GenreList.scss';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

interface GenreListProps {
    genresList: string[];
}

const GenreList: FC<GenreListProps> = ({ genresList = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'] }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname()

    const handleSelectGenreQuery = (genre: string) => {
        const params = new URLSearchParams(searchParams)
        if (genre === "All") {
            params.delete("filter");
        } else {
            params.set('filter', genre)
        }

        return params.toString()
    }

    const handleLinkClasses = (genre: string) => {
        const staticClass = "genre-item";
        const activeLinkClass = "selected";
        const params = new URLSearchParams(searchParams);
        const selectedGenreFilter = params.get('filter');
        if (genre === "All" && !selectedGenreFilter) {
            return [staticClass, activeLinkClass].join(" ");
        }
        if (selectedGenreFilter === genre) {
            return [staticClass, activeLinkClass].join(" ");
        }

        return staticClass
    }

    return (
        <ul className="genre-list-container">
                {
                    genresList.map((genre, index) => (
                        <Link 
                            key={genre + index} 
                            href={pathname + '?' + handleSelectGenreQuery(genre)} 
                            className={handleLinkClasses(genre)}>{genre}</Link>
                    ))
                }
        </ul>
    )
}

export default GenreList;
