import React, { FC } from 'react';
import MovieTile from "@/components/MovieTile";
import { getMoviesList } from '@/utils/movieUtils';
import {MOVIE_API_URL} from '@/constants'
import { MovieData } from '@/types';

const loadMoviesList = async (searchParams: URLSearchParams): Promise<MovieData[]> => {
    const params = new URLSearchParams(searchParams);
    const sortBy = params.get("sortBy");
    let additionalQueryParameters = params.toString().length ? '&searchBy=title&limit=100&sortOrder=asc' : '?searchBy=title&limit=100&sortOrder=asc';
    if (!sortBy) {
        additionalQueryParameters = [additionalQueryParameters, "sortBy=release_date"].join('&')
    }
    return await getMoviesList([MOVIE_API_URL, '?', params.toString(), additionalQueryParameters].join(''));
}

interface MoviesListProps {
  searchParams: URLSearchParams;
}

const MoviesList: FC<MoviesListProps> = async ({searchParams}) => {
    const moviesList = await loadMoviesList(searchParams);

    return (
        <div className="movies-list">
            <h1>{moviesList.length} movies found</h1>
            <div className="movies-grid">
                {
                moviesList && moviesList.map((movie: MovieData) => (
                    <MovieTile
                        key={movie.id}
                        movieData={movie}
                    />
                ))
                }
            </div>
        </div>
    );
}

export default MoviesList;
