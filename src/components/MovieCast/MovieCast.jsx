import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import toast, {Toaster} from 'react-hot-toast';
import { fetchMovieData } from '../../services/movie-api';
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await fetchMovieData(`/movie/${movieId}/credits`);
        setCast(data.cast);
      } catch {
        toast.error("Please try again later.");
      } 
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <Toaster position="top-right" />
      <ul className={css.list}>
      {cast.map(actor => (
        <li key={actor.cast_id} className={css.item}>
            {actor.profile_path ? 
            <img 
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} 
              alt={actor.name} 
              width={200} 
              className={css.image}
                /> : <FaUser size={200} />
            }
          <p className={css.name}>{actor.name}</p>
          <p className={css.character}>Character: {actor.character} </p>
        </li>
      ))}
      </ul>    
    </div>
  );
};