import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

//components import
import GenreList from '../components/GenreList';
import SortControl from "../components/SortControl";
import MovieTile from "../components/MovieTile";

//styles import
import '@/styles/MovieListPage.scss';

//helpers import
import {GENRE_LIST, MOVIE_API_URL} from '../constants'
import { getMoviesList } from '../utils/movieUtils';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Greatest Movie Site Ever",
  description: "Find the movie you would like to watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>



          <header className="header__container">
            {children}
          </header>

          <nav>
              <div className="nav-components__container">
                  <GenreList genresList={GENRE_LIST} />
                  <SortControl />
              </div>
              <hr />
          </nav>

          <main>
              <div className="movies-list">
                  {/* <h1>{moviesList.length} movies found</h1>
                  <div className="movies-grid">
                      {
                      moviesList && moviesList.map((movie) => (
                          <MovieTile
                              key={movie.id}
                              movieData={movie}
                          />
                      ))
                      }
                  </div> */}
              </div>
          </main>



        
      </body>
    </html>
  );
}
