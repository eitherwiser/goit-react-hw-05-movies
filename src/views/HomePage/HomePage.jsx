import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { toast } from 'react-toastify';
import { getMoviesTopWeek } from '../../services/themoviedbjs.js';


export default function HomePage({ viewMovieInfo, movieId }) {

  const [moviesTopWeek, setMoviesTopWeek] = useState([]);


  useEffect(() => {
    moviesTopWeek.length === 0 && 
      getMoviesTopWeek().then(res => {
          if (!res) {
            toast.error('server is underfind');
            return
          }
        setMoviesTopWeek(res.results);
      });
  });


  return (
    <>
      <h1 className="hidden-element">HomePage</h1>
      <h2>Trends movies on this week</h2>
      <MovieList key={Date.now()} movies={moviesTopWeek} viewInfo={viewMovieInfo}/>
    </>
  ) 
}
