import {GENRE_LIST} from '../constants'

const getRuntimeFormatted = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return [hours, 'h',' ', minutes, 'min'].join('')
}

const getDateFormatted = (release_date) => {
    console.log(typeof release_date);
    const releaseDate = new Date (release_date);
    const yyyy = releaseDate.getFullYear();
    let mm = releaseDate.getMonth() + 1; // Months start at 0!
    let dd = releaseDate.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return [yyyy, mm, dd].join('-')
}

const getReleaseYear = (release_date) => {
    return (new Date(release_date).getFullYear())
}

const getMovieItem = async (url) => {
    const response = await fetch(url);
    const resData = await response.json();
    return resData
}

const getMoviesList = async (url) => {
    const response = await fetch(url);
    const resData = await response.json();
    return resData.data;
}

const addImageFallback = (event) => {
    event.currentTarget.src = '/fallback.jpg';
};

const getFirstSelectedGenre = (movieGenres) => {
    const selectedGenre = movieGenres.find((genre) => {
        return GENRE_LIST.indexOf(genre) > -1
    })

    return selectedGenre ? selectedGenre : GENRE_LIST[0]
}

export {
    getRuntimeFormatted,
    getReleaseYear,
    getMovieItem,
    getMoviesList,
    addImageFallback,
    getFirstSelectedGenre,
    getDateFormatted
}
