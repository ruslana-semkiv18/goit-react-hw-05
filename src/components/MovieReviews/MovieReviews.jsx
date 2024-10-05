import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { fetchMovieData } from '../../services/movie-api';
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      const fetchReviews = async () => {
          try {
              const data = await fetchMovieData(`/movie/${movieId}/reviews`);
              setReviews(data.results);
          } catch {
              toast.error("Please try again later.");
          }
      };
    fetchReviews();
  }, [movieId]);

    return (
    <div>
    <Toaster position="top-right" />
    {reviews.length > 0 ?
      <ul className={css.list}>
        {reviews.map(review => (
          <li key={review.id} className={css.item}>
            <h3 className={css.title}>Author: {review.author}</h3>
            <p className={css.text}>{review.content}</p>
          </li>
        ))}
      </ul> : <p className={css.empty}>We don`t have any reviews for this movie!</p>}
    </div>
  );
};
