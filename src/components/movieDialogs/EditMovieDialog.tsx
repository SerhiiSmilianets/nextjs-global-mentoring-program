import { FC } from 'react';
import Dialog from '../Dialog';
import EditMovieForm from '../movieForms/EditMovieForm';
import { createPortal } from 'react-dom';
import { useLoaderData } from "react-router-dom";
import { MovieData } from '../../types';

const EditMovie: FC = () => {
    const loadedData = useLoaderData() as MovieData;
    return (
        createPortal(
            <Dialog title={"Edit Movie"} >
                <EditMovieForm movieData={loadedData} />
            </Dialog>,
        document.body)
    )
}

export default EditMovie;
