'use client'

import { FC } from 'react';
// import { useLoaderData,  useLocation } from "react-router-dom";
import { getRuntimeFormatted, getReleaseYear, getMovieItem, addImageFallback } from '@/utils/movieUtils';
import {MOVIE_API_URL} from '@/constants'
import { MovieData } from '@/types';
import Link from 'next/link';
// import Image from 'next/image'
// import { useSearchParams } from "next/navigation";

import '@/styles/MovieDetails.scss';

const loadMovieDetails = async (movieId) => {
    return await getMovieItem([MOVIE_API_URL, movieId].join('/'))
}

const MovieDetails: FC = async ({movieData}) => {
    const {poster_path, title, vote_average, genres, release_date, runtime, overview} = movieData;
    // const searchParams = useSearchParams();

    return (
        <div className="movie-details__container">
            <div className="movie-details__poster">
                <img className="movie-details__image" src={poster_path} alt={title} onError={addImageFallback}/>
            </div>
            <div className="movie-details__info">
                <div className="movie-details__info-header">
                    <h1 className="movie-details__title">{title}</h1>
                    <span className="movie-details__rating">{vote_average}</span>
                </div>

                <div className="movie-details__genres-container">
                    <p className="movie-details__genres">{(genres ? genres.length === 2 ? genres.join(' & ') : genres.join(', ') : "")}</p>
                </div>

                <div className="movie-details__info-middle">
                    <span>{(getReleaseYear(release_date))}</span>
                    <span>{(getRuntimeFormatted(runtime))}</span>
                </div>

                <p className='movie-details__overview'>{overview}</p>
            </div>
            {/* <Link href={`/?${searchParams.toString()}`} className="reset-header-btn"> &#x1F50E;&#xFE0E;</Link> */}
        </div>
    )
}

export default MovieDetails;

export async function loader({ params}: { params: { movieId: string } }) {
    return await getMovieItem([MOVIE_API_URL, params.movieId].join('/'))
}
