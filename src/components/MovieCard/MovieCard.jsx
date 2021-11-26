import { Link } from 'react-router-dom';

import { ReactComponent as NoImg } from '../../icons/no_img.svg'
import s from './MovieCard.module.css';


export default function MovieCard({ movie }) {

  const { id, original_title, vote_average, release_date, poster_path } = movie;
  return (
    <li className={s.item}>
      <Link to={`/movie/${id}`} className={s.Link}>
      <div className={s.card_border}>
        <div className={s.video_card}>
            {poster_path && <img className={s.item_img} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="original_title" />}
            {!poster_path && <NoImg className={s.item_img} />}
        <span className={s.rating}>{vote_average}</span>
      </div >
        <div className={s.item_info} data-tooltip={`${original_title}`}>
          <p className={s.img_title} >{original_title}</p>
          <span> Release date: {release_date ? release_date : 'Unknown'} </span>
        </div>
      </div>
      </Link>
    </li>
  )
}