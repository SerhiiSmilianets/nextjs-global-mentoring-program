"use client"

import React, { FC, useEffect, useState } from 'react';
import { MOVIE_API_URL } from '@/constants';
import '@/styles/MovieForm.scss';
import { MovieData } from '@/types';
import EditMovieDialog from '@/components/movieDialogs/EditMovieDialog';

const loadMovieDetails = async (movieId: string): Promise<MovieData> => {
  const responseData = await fetch([MOVIE_API_URL, movieId].join('/'));
  const resData = await responseData.json();
  return resData;
}

interface EditMovieProps {
  params: {
    movieId: string;
  };
}

const EditMoviePage: FC<EditMovieProps> = ({params}) => {
  const {movieId} = params;
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const data = await loadMovieDetails(movieId);
      setMovieData(data);
    };

    fetchMovieData();
  }, [movieId]);

  if (!movieData) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return (
    <EditMovieDialog movieData={movieData} />
  );
}

export default EditMoviePage;
