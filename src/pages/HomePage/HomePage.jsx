import { useEffect, useState } from 'react';
import { fetchMovieData } from '../../services/movie-api';
import toast, {Toaster} from 'react-hot-toast';
import MovieList from '../../components/MovieList/MovieList';
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
      async function getMovieData() {
          try {
              const data = await fetchMovieData("/trending/movie/day");
              setMovies(data.results);
          } catch (error) {
              console.error('Error fetching movie data:', error);
              toast.error("Please try again later.");
          }
      }

    getMovieData();
  }, []);

  return (
    <div>
      <Toaster position="top-right" />
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

