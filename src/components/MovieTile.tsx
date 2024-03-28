'use client'

import React, { useRef, useState, useEffect, FC } from "react";
// import { Link, useLocation } from "react-router-dom";
import Link from 'next/link';
import Image from 'next/image'
import { getReleaseYear, addImageFallback } from '@/utils/movieUtils';
import { MovieData } from '../types';
import '@/styles/MovieTile.scss';
import { useSearchParams } from "next/navigation";

const useOutsideClick = (menuRef: React.RefObject<HTMLDivElement>, setMenuTileContextOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuTileContextOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {

            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, setMenuTileContextOpen]);
}

interface MovieTileProps {
    movieData: MovieData;
}

const MovieTile: FC<MovieTileProps> = ({movieData}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);// need to hide/show menu
    const [isMenuTileContextRendered, setMenuTileContextRendered] = useState(false)// need for menu render
    const searchParams = useSearchParams();
    const queryParams = new URLSearchParams(searchParams);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleTileMenuOpen = () => {
        setMenuTileContextRendered(true)
        setIsMenuOpen(true)
    }

    useOutsideClick(menuRef, setIsMenuOpen);

    return (
        <div className="movie-tile__container">
            <Link href={`/${movieData.id + '?' + searchParams.toString()}`} className="movie-tile" id={movieData.id.toString()}>
                <img className="movie-tile__image"  
                    src={movieData.poster_path} 
                    alt={movieData.title} 
                    onError={addImageFallback}
                    // width={550}
                    // height={700}
                />
                <div className="movie-tile__header">
                    <h4 className="movie-tile__title">{movieData.title}</h4>
                    <span className="movie-tile__release">{(getReleaseYear(movieData.release_date))}</span>
                </div>
                <div className="movie-tile__footer">
                    <p className="movie-tile__genres">{(movieData.genres || []).join(', ')}</p>
                </div>
            </Link>

            <button onClick={handleTileMenuOpen} className='movie-tile__control-btn'>&#8942;</button>
            
            {isMenuTileContextRendered &&
                <div className={'movie-tile__context-container ' + (isMenuOpen ? '' : 'hidden')} ref={menuRef}>
                    <button className="close-context-btn" onClick={() => setIsMenuOpen(false)}>&times;</button>
                    <ul className='movie-tile__context-menu'>
                        <li><Link href={`/${movieData.id}/edit?${queryParams.toString().toString()}`} className="dialog-open-btn">Edit</Link></li>
                        <li><Link href={`/${movieData.id}/delete?${queryParams.toString().toString()}`} className="dialog-open-btn">Delete</Link></li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default MovieTile
