import { Link } from 'react-router-dom';
import s from './MovieCard.module.css';
import { ReactComponent as NoImg } from '../../icons/no_img.svg'

export default function MovieCard({ movie, viewMovieInfo}) {
  
  const { id, original_title, vote_average, release_date, popularity, poster_path } = movie;
  

  return (
    <li  onClick={viewMovieInfo} className={s.item}>
      <Link to={`/movie/${id}`} className={s.Link}>
      <div className={s.card_border}>
        <div className={s.video_card}>
            {poster_path && <img className={s.item_img} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="original_title" />}
            {!poster_path && <NoImg className={s.item_img} />}
        <span className={s.rating}>{vote_average}</span>
      </div>
      <span className={s.img_title}>{original_title}</span>
      <div className={s.item_info}>
        Release date: {release_date ? release_date : 'Unknown'} 
      </div>
      </div>
      </Link>
    </li>
  )
}