import MovieCard from '../MovieCard/MovieCard.jsx'
import s from './MovieList.module.css'


export default function MovieList({ movies}) {


  return (
      <ul className={s.movie_list}>
        {
        movies.map(item => (<MovieCard key={item.id} movie={item} />)) 
        }
      </ul>
  )
}