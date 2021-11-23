import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import MovieList from '../../components/MovieList/MovieList.jsx';
import Button from '../../components/Button/Button.jsx'
import {  searshMovies } from '../../services/themoviedbjs.js';




export default function MoviesPage() {
//export default function MoviesPage({ query, page, pageIncrement}) {

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  //const [query, setQuery] = useState('');
  //const [page, setPage] = useState(1);
    
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const searchPage = searchParams.get("page");

  const navigate = useNavigate();
  const prevQueryRef = useRef();


  useEffect(() => { 
    console.log({ searchQuery, searchPage })
    console.log(prevQueryRef.current)
    if (searchQuery && { searchQuery, searchPage } !== prevQueryRef.current) {
      searshMovies(searchQuery, searchPage)
        .then(res => {
          if (!res || !res.total_results) {
          toast.error(`is no results with "${searchQuery}" .`);
          navigate(-1);
          return
          }
          if (searchQuery && Number(searchPage) === 1) {
            prevQueryRef.current = { searchQuery, searchPage };
            setMovies(res.results);
            setTotalPages(res.total_pages)
          }
          if (searchQuery && Number(searchPage) > 1) {
            prevQueryRef.current = {searchQuery, searchPage}
            setMovies(movies.concat(res.results));
            setTotalPages(res.total_pages);
          }
      })
    }
  }, [searchQuery, searchPage])


  //useEffect(() => {

  //      if (query !== '' && query !== prevQueryRef.current) {
  //      searshMovies(query, page).then(res => {
  //      if (!res || !res.total_results) {
  //        toast.error(`is no results with ${query}`);
  //        navigate(-1, setQuery(prevQueryRef.current));
  //        return
  //      }
  //      else if (Number(page) === 1 && query) {
  //        setMovies(res.results);
  //        setTotalPages(res.total_pages)
  //      }
  //      else if (Number(page) > 1) {
  //        setMovies(movies.concat(res.results));
  //        setTotalPages(res.total_pages);
  //      }
  //    })
  //  }
  //}, [query, page] )


  const pageIncrement = () => {
    setSearchParams({ query: searchQuery, page: Number(searchParams.get("page")) + 1 })
  }

  return (
    <>
    <h1 className="hidden-element">MoviesPage</h1>
    <h2>Trends movies on this week</h2>
      <MovieList key={Date.now()} movies={movies} viewMovieInfo="viewMovieInfo" />
      <Button onClick={() => pageIncrement()} > <span>Load more</span> </Button>
    </>
  ) 
}






  //useEffect(() => {

  //  console.log(searchParams.get("query"));
  //  console.log(searchParams.get("page"))

  //  (function () {
  //    let q = searchParams.get("query")
  //    if (q && q !== query) {
  //      prevQueryRef.current = query; 
  //      setQuery(q);
  //    } return
  //  }());

  //  (function () {
  //    let p = searchParams.get("page")
  //    if (p && p !== page && prevQueryRef.current) {
  //      setPage(p);
  //    } return
  //  }());

  //});




  //useEffect(() => {
        //if (query !== '' && query !== prevQueryRef.current) {
        //searshMovies(query, page).then(res => {
        //if (!res || !res.total_results) {
        //  toast.error(`is no results with ${query}`);
        //  navigate(-1, setQuery(prevQueryRef.current));
        //  return
        //}
        //else if (Number(page) === 1 && query) {
        //  setMovies(res.results);
        //  setTotalPages(res.total_pages)
        //}
        //else if (Number(page) > 1) {
        //  setMovies(movies.concat(res.results));
        //  setTotalPages(res.total_pages);
        //}
      //})
    //}
  //}, )



      //if (query !== '') {
    //  searshMovies(query, page).then(res => {
    //    if (!res || res.results === []) {
    //      toast.error(`is no results with ${query}`);
    //      return
    //    }
    //    else if (Number(page) === 1 && query) {
    //      setMovies(res.results);
    //      setTotalPages(res.total_pages)
    //    }
    //    else if (Number(page) > 1) {
    //      setMovies(movies.concat(res.results));
    //      setTotalPages(res.total_pages);
    //    }
    //  })
    //}