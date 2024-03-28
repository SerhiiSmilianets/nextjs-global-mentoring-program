import { FC } from 'react';
import Dialog from '../Dialog';
import AddMovieForm from '../movieForms/AddMovieForm';

const AddNewMovie: FC = () =>
    <Dialog title={"Add Movie"} >
        <AddMovieForm />
    </Dialog>


export default AddNewMovie;
