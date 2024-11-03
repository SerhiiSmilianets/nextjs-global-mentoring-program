import type { Metadata } from "next";
import { Inter } from "next/font/google";


//components import
import GenreList from '../components/GenreList';
import SortControl from "../components/SortControl";


//styles import
import '@/styles/MovieListPage.scss';

//helpers import
import {GENRE_LIST} from '@/constants'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Greatest Movie Site Ever",
  description: "Find the movie you would like to watch",
};

export default function RootLayout({
  children,
  modal,
  movieslist,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  movieslist: React.ReactNode;
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
            {movieslist}
          </main>
          {modal}
      </body>
    </html>
  );
}
