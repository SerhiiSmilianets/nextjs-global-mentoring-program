import { FC } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate, Form } from 'react-router-dom';

import {GENRE_LIST} from '../../constants'
import {getFirstSelectedGenre, getDateFormatted} from '../../utils/movieUtils'
import '../../styles/MovieForm.scss';
import { MovieData } from '../../types';

interface MovieDataProps {
    movieData: MovieData;
}

const EditMovieForm: FC<MovieDataProps> = ({movieData}) => {
    const defaultValues = {
        title: movieData.title,
        release_date: getDateFormatted(movieData.release_date),
        poster_path: movieData.poster_path,
        vote_average: movieData.vote_average,
        genres: getFirstSelectedGenre(movieData.genres),
        runtime: movieData.runtime,
        overview: movieData.overview,
        id: movieData.id
    }
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: {errors} } = useForm<MovieData>({
        defaultValues
    });

    const handleSubmitForm = async(data: MovieData) => {
        try {
            const response = await fetch("http://localhost:4000/movies", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const result = await response.json();
            if (result.id) {
                navigate('/')
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='movie-form__container'>
            <Form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className='movie-form__row'>
                    <div className='movie-form__field-column left'>
                        <label htmlFor="movie_title">Title</label>
                        <input 
                            className={"" + (errors.title && "input-error")} 
                            {...register("title", { required: "This is required" })} 
                            id="movie_title" 
                            type="text" 
                            placeholder="Movie title"  />
                        <span className="error-message">{errors.title?.message}</span>
                    </div>

                    <div className='movie-form__field-column right'>
                        <label htmlFor="movie_release_date">Release Date</label>
                        <input 
                            className={"" + (errors.release_date && "input-error")}
                            {...register("release_date", 
                                { required: "This is required", 
                                setValueAs: v =>{
                                    const regex = /^\d{4}-\d{2}-\d{2}$/;
                                    if(regex.test(v)) {
                                        return new Date(v)
                                    }
                                    return "This field should have format YYYY-MM-DD"
                                },
                                pattern: {value: /^\d{4}-\d{2}-\d{2}$/, message: "This field should have format YYYY-MM-DD"}
                            })} 
                            id="movie_release_date" 
                            type="text" 
                            placeholder="Select date"  />
                        <span className="error-message">{errors.release_date?.message}</span>
                    </div>
                </div>

                <div className='movie-form__row'>
                    <div className='movie-form__field-column left'>
                        <label htmlFor="movie_poster_url">Movie URL</label>
                        <input 
                            className={"" + (errors.poster_path && "input-error")}
                            {...register("poster_path", { required: "This is required", pattern: {value: /^(http|https):\/\/[^ "]+$/, message: "This field must be a valid uri"} })} 
                            id="movie_poster_url" 
                            type="text" 
                            placeholder="https://"  />
                        <span className="error-message">{errors.poster_path?.message}</span>
                    </div>

                    <div className='movie-form__field-column right'>
                        <label htmlFor="movie_rating">Rating</label>
                        <input 
                            className={"" + (errors.vote_average && "input-error")}
                            {...register("vote_average", { required: "This is required", valueAsNumber: true, min: {value:0.0, message: "Not less than 0" }, max: {value:9.9, message: "Not more than 9.9" } })} 
                            id="movie_rating" type="number" 
                            placeholder="7.8" 
                            min={0.0} 
                            max={9.9} 
                            step={0.1}/>
                        <span className="error-message">{errors.vote_average?.message}</span>
                    </div>
                </div>

                <div className='movie-form__row'>
                    <div className='movie-form__field-column left'>
                        <label htmlFor="movie_genre">Genre</label>
                        <select 
                            className={"" + (errors.genres && "input-error")}
                            id="movie_genre" 
                            {...register("genres", { required: "This is required", setValueAs: v => [v] })}>
                            <option value="">Select Genre</option>
                            {GENRE_LIST.map((item) =>
                                <option key={item} value={item}>{item}</option>
                            )}
                        </select>
                        <span className="error-message">{errors.genres?.message}</span>
                    </div>
                    <div className='movie-form__field-column right'>
                        <label htmlFor="movie_runtime">Runtime</label>
                        <input 
                            className={"" + (errors.runtime && "input-error")}
                            {...register("runtime", { required: "This is required", valueAsNumber: true })} 
                            id="movie_runtime" 
                            type="number" placeholder="minutes" 
                            min="1"/>
                        <span className="error-message">{errors.runtime?.message}</span>
                    </div>
                </div>

                <div className='movie-form__row'>
                    <div className='movie-form__field-column text-area__container'>
                        <label htmlFor="movie_overview">Overview</label>
                        <textarea 
                            className={"" + (errors.overview && "input-error")}
                            {...register("overview", { required: "This is required" })} 
                            id="movie_overview" 
                            placeholder="Movie description" />
                        <span className="error-message">{errors.overview?.message}</span>
                    </div>
                </div>

                <div className='movie-form__row form-buttons__container'>
                    <button onClick={() => reset(defaultValues)} className='btn reset'>Reset</button>
                    <button className='btn submit' type='submit'>Submit</button>
                </div>

                <input type='hidden' {...register("id", { required: "This is required"})} />
            </Form>
        </div>
    )
}

export default EditMovieForm;
