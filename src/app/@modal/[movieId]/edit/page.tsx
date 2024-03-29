import React, { FC} from 'react';
import {MOVIE_API_URL} from '@/constants';
import '@/styles/MovieForm.scss';
import { MovieData } from '@/types';
import EditMovieDialog from '@/components/movieDialogs/EditMovieDialog';

const loadMovieDetails = async (movieId: string): Promise<MovieData> => {
  const responseData = await fetch([MOVIE_API_URL, movieId].join('/'), {
    next: { revalidate: 10 },
  });
  const resData = await responseData.json();
  console.log(resData)
  return resData;
}

interface EditMovieProps {
  params: {
    movieId: string;
  };
}

const EditMoviePage: FC<EditMovieProps> = async ({params}) => {
  const {movieId} = params;
  const movieData = await loadMovieDetails(movieId)
  console.log(movieData)

  return (
    <EditMovieDialog movieData = {movieData} />
  );
}

export default EditMoviePage;
