import React, { FC } from 'react';
import MovieTile from "@/components/MovieTile";
import {MOVIE_API_URL} from '@/constants'
import { MovieData } from '@/types';

//styles import
import '@/styles/MovieListPage.scss';

const loadMoviesList = async (searchParams: URLSearchParams): Promise<MovieData[]> => {
    const params = new URLSearchParams(searchParams);
    const sortBy = params.get("sortBy");
    let additionalQueryParameters = params.toString().length ? '&searchBy=title&limit=100&sortOrder=asc' : '?searchBy=title&limit=100&sortOrder=asc';
    if (!sortBy) {
        additionalQueryParameters = [additionalQueryParameters, "sortBy=release_date"].join('&')
    }

    const responseData = await fetch([MOVIE_API_URL, '?', params.toString(), additionalQueryParameters].join(''), {
        next: { revalidate: 10 },
      });
    const resData = await responseData.json();
    return resData.data;
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
