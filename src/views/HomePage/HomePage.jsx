import { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom'; 
import MovieList from '../../components/MovieList/MovieList.jsx';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader.jsx'
import { getMoviesTopWeek } from '../../services/themoviedb.js';


export default function HomePage({ getMoviesLocation }) {

  const [moviesTopWeek, setMoviesTopWeek] = useState([]);

  const location = useLocation();

  useEffect(() => {
    moviesTopWeek.length === 0 && 
      getMoviesTopWeek().then(res => {
          if (!res) {
            toast.error('server is underfind');
            return
          }
        setMoviesTopWeek(res.results);
      });
  }, []);

  useEffect(() => {
    getMoviesLocation(location);
  }, [location]);


  return (
    <>
      <h1 className="hidden-element">HomePage</h1>
      {(!moviesTopWeek.length) && <Loader />}
      {!(!moviesTopWeek.length) && <h2>Trends movies on this week</h2>}
      <MovieList key={Date.now()} movies={moviesTopWeek} />
    </>
  ) 
}
