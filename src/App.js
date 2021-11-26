import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './views/HomePage/HomePage.jsx';
import MoviesPage from './views/MoviesPage/MoviesPage.jsx';
import MoviesDetailsPage from './views/MovieDetailsPage/MovieDetailsPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function App() {
  const [moviesLocation, setMoviesLocation] = useState('/');

  const getMoviesLocation = location => {
    setMoviesLocation(location);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <section className="main">
        <Routes>
          <Route
            exact
            path="/"
            element={<HomePage getMoviesLocation={getMoviesLocation} />}
          />
          <Route
            path="/MoviesPage"
            element={<MoviesPage getMoviesLocation={getMoviesLocation} />}
          />
          <Route
            path="/movie/:movie_id/*"
            element={<MoviesDetailsPage moviesLocation={moviesLocation} />}
          />
        </Routes>
      </section>
    </>
  );
}
