import React, { useState, useEffect } from 'react';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './views/HomePage/HomePage.jsx';
import MoviesPage from './views/MoviesPage/MoviesPage.jsx';
import MoviesDetailsPage from './views/MovieDetailsPage/MovieDetailsPage.jsx';
import Cast from './views/Cast/Cast.jsx';
import Reviews from './views/Reviews/Reviews.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function App() {
  //const [query, setQuery] = useState('')
  //const [page, setPage] = useState(1);
  //const [URL_Query, setURL_Query] = useSearchParams();
  //const [URL_Page, setURL_Page] = useSearchParams();

  //let navigate = useNavigate();

  //useEffect(() => {
  //  (function () {
  //    let q = URL_Query.get("query")
  //    if (q && q !== query) {
  //      setQuery(q);
  //      navigate('/MoviesPage')
  //    } return
  //  }());

  //  (function () {
  //    let p = URL_Page.get("page")
  //    if (p && p !== page) {
  //      setPage(p);
  //      navigate('/MoviesPage')
  //    } return
  //  }());

  //}, [])

  //const onSearch = searchQuery => {
  //  if (searchQuery !== query) {
  //    setQuery(searchQuery);
  //  }
  //};

  //const pageIncrement = () => {
  //  setPage(prev => prev + 1)
  //}

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {/*<Header onSearch={onSearch} setPage={setPage} />*/}
      <Header />
      <section className="main">
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route
            path="/MoviesPage"
            //element={<MoviesPage query={query} pageIncrement={() => pageIncrement()} page={page} />} />
            element={<MoviesPage />}
          />

          <Route path="/movie/:id" element={<MoviesDetailsPage />} />

          <Route path="/cast" element={<Cast />} />

          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </section>
    </>
  );
}
