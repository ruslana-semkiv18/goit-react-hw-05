import { useParams, useLocation, Link, NavLink, Outlet} from 'react-router-dom';
import { useEffect, useState, useRef, Suspense } from 'react';
import { FaUser } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovieData } from '../../services/movie-api';
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');
    
  useEffect(() => {
    if (!movieId) return;
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieData(`/movie/${movieId}`);
        setMovieData(data);
      } catch {
        toast.error("Please try again later.");
      } 
    };

    fetchDetails();
  }, [movieId]);

  if (!movieData) return null;


  return (
    <div>
      <Toaster position="top-right" />
        <Link to={backLinkRef.current}>
            <button className={css.btnClose}>Go back</button>
        </Link>
        <div className={css.wrapDetails}>
            {movieData.poster_path ? (
         <img
            src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
            alt={movieData.title}
                  width={240}
                  className={css.image}
              />) : <FaUser size={240} />}
          <div className={css.wrapInfo}>
              <h2 className={css.title}>{movieData.title}</h2>
              <p className={css.score}>User Score: {movieData.vote_average*10}%</p>
              <p className={css.overview}>Overview: {movieData.overview}</p>
              <p className={css.genres}>Genres:</p>
              <ul className={css.list}>
                {movieData.genres.map(genre => (
                  <li key={genre.id} className={css.item}>{genre.name}</li>))}
              </ul>
          </div>
          </div>
          
          <ul className={css.listDetails}>
              <li className={css.itemDetails}>
                  <NavLink to="cast" >Cast</NavLink>
              </li>
              <li className={css.itemDetails}>
                  <NavLink to="reviews">Reviews</NavLink>
              </li>
          </ul>
              

      <Suspense fallback={<div className={css.load}>LOADING SUBPAGE!!!</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
