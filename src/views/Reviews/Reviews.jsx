
import { useState, useEffect } from "react";
import { getReviews } from '../../services/themoviedb.js';
import { useParams } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader.jsx'
import { ReactComponent as NoImg } from '../../icons/no_img.svg'
import s from './Review.module.css'

export default function Reviews() {

  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews(params.movie_id)
      .then(res => { setReviews(res.results) })
      .catch(() => {
        toast.error(`Server not response. Please try later .`)
          setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    setIsLoading(false)
  }, [reviews]);

  const parseAvatar = (a) => {
    let x = "http";
    let r = a.match(x);
    return !!r
      ? r.input.split("/http").join(x)
      : `https://image.tmdb.org/t/p/w500/${a}`
  }

  return (
    <ul className={s.item_list}>
      {reviews && !isLoading &&
        reviews.map(item => 
          <li key={item.id} className={s.item}>
              <div className="s.avatar__wrapper">
              {item.author_details.avatar_path &&
                <img className={s.avatar} src={parseAvatar(item.author_details.avatar_path)} alt={item.author_details.username} />}
              {!item.author_details.avatar_path &&
                <NoImg className={s.avatar} />}
              {!!item.author_details.rating &&
                <span className={s.rating}>{item.author_details.rating}</span>}
              <span className={s.username}>{item.author_details.username}</span>
              </div>
              <div className={s.review}>
                <q className={s.review}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.content} &nbsp;</q>
              </div>
          </li>
        )
      }
      {!!reviews.length && !isLoading &&
        <h4>Sorry, is no any reviews there yet. </h4>
      }
      {isLoading && <Loader />}
    </ul>
  ) 
}


