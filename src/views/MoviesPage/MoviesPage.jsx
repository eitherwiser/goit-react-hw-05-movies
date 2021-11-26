import { useSearchParams, useNavigate, useLocation} from 'react-router-dom'; 
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import MovieList from '../../components/MovieList/MovieList.jsx';
import Button from '../../components/Button/Button.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import {  searshMovies } from '../../services/themoviedb.js';



export default function MoviesPage({getMoviesLocation}) {

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
    
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const searchPage = searchParams.get("page");

  const navigate = useNavigate();
  const prevQueryRef = useRef();
  const location = useLocation();

  useEffect(() => {
    if (searchQuery && { searchQuery, searchPage } !== prevQueryRef.current) {
      setIsLoading(true);
      searshMovies(searchQuery, searchPage)
        .then(res => {
          if (!res || !res.total_results) {
            toast.error(`is no results with "${searchQuery}" .`);
            navigate(-1);
            return
          }
          if (searchQuery && Number(searchPage) === 1) {
            prevQueryRef.current = { searchQuery, searchPage };
            setTotalPages(res.total_pages)
            setMovies(res.results);
          }
          if (searchQuery && Number(searchPage) > 1) {
            prevQueryRef.current = { searchQuery, searchPage }
            setTotalPages(res.total_pages);
            setMovies(movies.concat(res.results));
          }
        })
        .catch(() => {
          toast.error(`Server not response. Please try later .`)
          setIsLoading(false);
      })
    }
  }, [searchQuery, searchPage]);


  useEffect(() => {
    console.log(location)
    getMoviesLocation(location);
  }, [location]);

  useEffect(() => {
    setIsLoading(false)
  }, [movies]);

  const pageIncrement = () => {
    setSearchParams({ query: searchQuery, page: Number(searchParams.get("page")) + 1 })
  }

  return (
    <>
    <h1 className="hidden-element">MoviesPage</h1>
      {!(!movies.length) && !isLoading && <h2>You'r looking for &nbsp;"&nbsp;<i>{searchQuery}</i> &nbsp;" ...</h2>}
      {isLoading && Number(searchPage) === 1 && <Loader />}
      <MovieList key={Date.now()} movies={movies} viewMovieInfo="viewMovieInfo"/>
      {isLoading && Number(searchPage) > 1 && <Loader />}
      {!(!movies.length) && (totalPages - Number(searchPage)) > 20 && !isLoading &&
        <Button onClick={() => pageIncrement()} > <span>Load more</span> </Button>
      }
    </>
  ) 
}

