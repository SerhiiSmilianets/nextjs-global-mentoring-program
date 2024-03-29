import { FC } from 'react';
import Dialog from '../Dialog';
import EditMovieForm from '../movieForms/EditMovieForm';

const EditMovie: FC = ({movieData}) => {
    console.log(movieData)
    return (
        <Dialog title={"Edit Movie"} >
            <EditMovieForm movieData={movieData} />
        </Dialog>
    )
}

export default EditMovie;
