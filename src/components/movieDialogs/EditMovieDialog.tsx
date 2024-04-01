import { FC } from 'react';
import Dialog from '@/components/Dialog';
import EditMovieForm from '@/components/movieForms/EditMovieForm';
import { MovieData } from '@/types';

interface EditMovieProps {
  movieData: MovieData;
}

const EditMovie: FC<EditMovieProps> = ({movieData}) => {
    return (
        <Dialog title={"Edit Movie"} >
            <EditMovieForm movieData={movieData} />
        </Dialog>
    )
}

export default EditMovie;
