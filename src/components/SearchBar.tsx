"use client"

import { useRef, FormEvent } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import '@/styles/SearchBar.scss';

const SearchBar = () => {
    const ref = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter()

    const updateSearchQuery = (e: FormEvent) => {
        e.preventDefault()

        const params = new URLSearchParams(searchParams)

        if (!ref.current?.value) {
            params.delete("search");
        } else {
            params.set('search', ref.current.value)
        }

        return params.toString()
    }

    return (
        <div className="default-header__container">
            <div className="add-movie__container">
                <Link href={['/new', searchParams.toString()].join('?')} className="dialog-open-btn">+ ADD MOVIE</Link>
            </div>
            <div className="searchbar__container">
                <div className="search-form__container">
                    <h2>Find your movie</h2>
                    <form onSubmit={(e) => router.push([pathname, updateSearchQuery(e)].join("?"))} id="search-form" data-testid="search-form">
                        <input name="search" defaultValue={searchParams.get('search') || ''} ref={ref} placeholder="What do you want to watch?"/>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
