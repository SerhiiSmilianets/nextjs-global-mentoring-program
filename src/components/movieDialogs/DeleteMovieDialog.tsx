import { FC } from 'react';
import Dialog from '../Dialog';
import DeleteMovieForm from '../movieForms/DeleteMovieForm';

const DeleteMovie: FC = () =>
    <Dialog title={"Delete Movie"} >
        <DeleteMovieForm />
    </Dialog>


export default DeleteMovie;
