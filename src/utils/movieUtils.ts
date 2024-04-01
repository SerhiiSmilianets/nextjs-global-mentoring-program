import {GENRE_LIST} from '@/constants'

const getRuntimeFormatted = (runtime: number): string => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return [hours, 'h',' ', minutes, 'min'].join('')
}

const getDateFormatted = (release_date: string): string => {
    const releaseDate = new Date (release_date);
    const yyyy = releaseDate.getFullYear();
    let mm: string | number = releaseDate.getMonth() + 1; // Months start at 0!
    let dd: string | number = releaseDate.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return [yyyy, mm, dd].join('-')
}

const getReleaseYear = (release_date: string): number => {
    return (new Date(release_date).getFullYear())
}

const getMovieItem = async (url: string): Promise<any> => {
    const responseData = await fetch(url);
    const resData = await responseData.json();
    return resData
}

const getMoviesList = async (url: string): Promise<any[]> => {
    const responseData = await fetch(url);
    const resData = await responseData.json();
    return resData.data;
}

const addImageFallback = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.src = '/fallback.jpg';
};

const getFirstSelectedGenre = (movieGenres: string[]): string => {
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