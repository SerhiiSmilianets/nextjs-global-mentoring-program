import React, { FC } from 'react';
import { getRuntimeFormatted, getReleaseYear, addImageFallback } from '@/utils/movieUtils';
import {MOVIE_API_URL} from '@/constants';
import { MovieData } from '@/types';
import Link from 'next/link';
import '@/styles/MovieDetails.scss';

const loadMovieDetails = async (movieId: string): Promise<MovieData> => {
  const responseData = await fetch([MOVIE_API_URL, movieId].join('/'));
  const resData = await responseData.json();
  return resData;
}

interface MovieProps {
  params: {
    movieId: string;
  };
  searchParams: URLSearchParams;
}

const Movie: FC<MovieProps> = async ({params, searchParams}) => {
  const {movieId} = params
  const movieData = await loadMovieDetails(movieId)
  const {poster_path, title, vote_average, genres, release_date, runtime, overview} = movieData;
  const queryParams = new URLSearchParams(searchParams);

  return (
    <div className="movie-details__container">
        <div className="movie-details__poster">
            <img className="movie-details__image" src={poster_path} alt={title} /*onError={addImageFallback}*/></img>
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
        <Link href={`/?${queryParams.toString()}`} className="reset-header-btn"> &#x1F50E;&#xFE0E;</Link>
    </div>
  )
}

export default Movie;
