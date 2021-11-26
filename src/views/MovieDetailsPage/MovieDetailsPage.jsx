import React, { useState, useEffect, Suspense } from 'react';
import { useParams, NavLink, useNavigate, Routes, Route,} from 'react-router-dom'; 
import { getMovie } from '../../services/themoviedb.js';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader.jsx'


import { ReactComponent as NoImg } from '../../icons/no_img.svg'
import s from './MovieDetailPage.module.css'


const Cast = React.lazy(() => import('../Cast/Cast.jsx'))
const Reviews = React.lazy(() => import('../Reviews/Reviews.jsx'))


export default function MovieDetailPage({moviesLocation}) {

  const [movieInfo, setMovieInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieInfo) {
      getMovie(params.movie_id)
        .then(res => {setMovieInfo(res, setIsLoading(false))})
      .catch(() => {
        toast.error(`Server not response. Please try later .`)
          setIsLoading(false);
      })
    }
},[params.movie_id])


  const onClickGoBack = () => {
    navigate(moviesLocation)
  }

  return (
    <>
      <h1 className="hidden-element">MovieDetailPage</h1>
      {!!movieInfo && !isLoading &&
        <div className={s.movie__wrapper}>
          <div className={s.movieNav}>
            <span onClick={onClickGoBack} className={s.goBack}> Go back </span>
            {!!movieInfo.homepage && <a href={movieInfo.homepage} className={s.goMovieSite} target="_blank" rel="noreferrer" > Visit movie homepage</a>}
          </div>
          <div className={s.movie_info__wrapper}>
            {movieInfo.poster_path && <img className={s.movie_poster} src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} alt={movieInfo.title} />}
            {!movieInfo.poster_path && <NoImg className={s.no_movie_poster} />}
            <div className={s.movie_info}>
              <h2>{movieInfo.title}</h2>
              <h4>{movieInfo.tagline}</h4>

              <p className={s.movie_overview}>&nbsp;&nbsp;{movieInfo.overview}</p>
              <hr/>
              <p>Genre: &nbsp;{movieInfo.genres.map(item => <span className={s.genre} key={item.id}>&nbsp;{item.name};&nbsp;</span>)}</p>
              <p>Release: &nbsp;{movieInfo.release_date}</p>
              <p>Popularity: {movieInfo.popularity}&nbsp; | &nbsp; Vote average: {movieInfo.vote_average}</p>
              <div className={s.advanced_movie_info}>
                <NavLink to='cast' className={({ isActive })  => s.NavLink + (isActive ? (" " + s.NavLinkActive) : '')}>Cast</NavLink>
                <NavLink to='reviews' className={({ isActive })  => s.NavLink + (isActive ? (" " + s.NavLinkActive) : '')} >Reviews</NavLink>
              </div> 
            </div>
          </div>
          <hr />
          <Routes>
            <Route path="Cast" element={
              <Suspense fallback={<>...</>}>
                <Cast/>
              </Suspense>} >
            </Route>
            <Route path="Reviews" element={
              <Suspense fallback={<>...</>}>
                <Reviews/>
              </Suspense>} >
            </Route>
          </Routes>
        </div>
      }
      {isLoading && <Loader />
      }
    </>
  ) 
}






  //const { homepage, poster_path, title, tagline, overview, genres, release_date, vote_average, popularity} = movieInfo;

  //  const onClickGoBack = () => {
  //  console.log(navigationType)
  //  if (navigationType === 'POP') {
  //    navigate('/')
  //    return
  //  }
  //  navigate(-1)
  //}