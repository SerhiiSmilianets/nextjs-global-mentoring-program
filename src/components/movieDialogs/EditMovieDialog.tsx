import { FC } from 'react';
import Dialog from '../Dialog';
import EditMovieForm from '../movieForms/EditMovieForm';
import { createPortal } from 'react-dom';
import { MovieData } from '../../types';

const EditMovie: FC = () => {
    // const loadedData = useLoaderData() as MovieData;
    return (
            <Dialog title={"Edit Movie"} >
                <EditMovieForm movieData={loadedData} />
            </Dialog>,
    )
}

export default EditMovie;
