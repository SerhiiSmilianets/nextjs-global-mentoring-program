import { FC } from 'react';
import '../../styles/MovieForm.scss';
import { useParams, useNavigate, Form } from 'react-router-dom';
import { useForm } from "react-hook-form"

const DeleteMovieForm: FC = () => {
    const params = useParams();
    const movieId = params.movieId as string;
    const navigate = useNavigate();
    const { handleSubmit } = useForm();

    const handleSubmitForm = async () => {
        try {
            const response = await fetch(`http://localhost:4000/movies/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.ok) {
                return navigate('/')
            }

        } catch (error) {
            console.error("Error:", error);
        }

    }
    return (
        <div className='movie-form__container'>
            <p>Are you sure you want delete this movie?</p>
            <Form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className='movie-form__row form-buttons__container'>
                    <button className='btn submit' type='submit'>Submit</button>
                </div>
            </Form>
        </div>
    )
}

export default DeleteMovieForm;
