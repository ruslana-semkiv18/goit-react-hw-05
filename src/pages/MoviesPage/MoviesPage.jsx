import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import MovieList from '../../components/MovieList/MovieList';
import { fetchSearchMovies } from '../../services/movie-api';
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams(); 

  const handleSubmit = e => {
      e.preventDefault();
      const query = e.target.elements.query.value;
      if (query.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }
      setMovies([]);
      setSearchParams({ query });
      e.target.reset();
  };

  useEffect(() => {
    const movieQuery = searchParams.get('query');
    if (movieQuery) {
      const fetchMovies = async () => {
        try {
          const data = await fetchSearchMovies(movieQuery);
          if (data.length === 0) {
            toast.info("No movies found for your search query.");
          }
          setMovies(data);
        } catch {
          toast.error("Please try again later.");
        } 
      };
      fetchMovies(); 
    }
  }, [searchParams]);

  return (
    <div>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className={css.form}>
        <input type="text" name="query" className={css.input} />
        <button type="submit" className={css.button}>Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
