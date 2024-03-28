"use client"

import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import '@/styles/MovieForm.scss';
import Dialog from '@/components/Dialog';

interface DeleteMovieProps {
  params: {
    movieId: string;
  };
}

const DeleteMovie: FC<DeleteMovieProps> = ({params}) => {
  const router = useRouter();
  const { handleSubmit } = useForm();
  const {movieId} = params;
  
  const handleSubmitForm = async () => {
    try {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            return router.push('/')
        }
  
    } catch (error) {
        console.error("Error:", error);
    }
  }

  return (
    <Dialog title={"Delete Movie"} >
        <div className='movie-form__container'>
            <p>Are you sure you want delete this movie?</p>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className='movie-form__row form-buttons__container'>
                    <button className='btn submit' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    </Dialog>
  );
}

export default DeleteMovie;
