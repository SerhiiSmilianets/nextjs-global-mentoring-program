import { FC } from 'react';
import Dialog from '../Dialog';
import DeleteMovieForm from '../movieForms/DeleteMovieForm';
import { createPortal } from 'react-dom';

const DeleteMovie: FC = () =>
    createPortal(
        <Dialog title={"Delete Movie"} >
            <DeleteMovieForm />
        </Dialog>,
    document.body)

export default DeleteMovie;
