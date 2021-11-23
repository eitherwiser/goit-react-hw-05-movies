import { useState } from 'react';
import {NavLink, useNavigate, createSearchParams} from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify';
import Button from '../../components/Button/Button.jsx'
import { ReactComponent as Logo } from '../../icons/logo.svg'

import s from './Header.module.css'

export default function Header() {
  //export default function Header({onSearch, setPage}) {
  const [query, setQuery] = useState('');
  
  const navigate =  useNavigate();

const onChange= (e) => setQuery(e.target.value)
  
const onSubmit = (e) => {
    if(query.trim() === '') {
      toast.error('Type your query!');
      setQuery('');
      e.preventDefault();
      return
    };
    e.preventDefault();
    setQuery('')
    navigate({ pathname: '/MoviesPage', search: `?${createSearchParams({query: `${query}`, page: '1'})}`});
  }

  
  return (
    <header className={s.Searchbar}>
      <div className={s.wrapper}>
      <div className={s.navbar}>
        <NavLink to='/' className={({ isActive })  => s.NavLink + (isActive ? (" " + s.NavLinkActive) : '')}>Home</NavLink>
        <NavLink to='/MoviesPage' className={({ isActive })  => s.NavLink + (isActive ? (" " + s.NavLinkActive) : '')} >Movies</NavLink>
      </div>

      <form
        className={s.SearchForm}
        onKeyDown={
          (e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); 
              onSubmit(e);
            }
          }}
      >
        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          onChange={onChange}
          value={query}
        />
        <Button onClick={onSubmit}>
            <FaSearch color="#321e28" />
        </Button>
      </form>

      <a href="https://www.themoviedb.org/">
        <Logo className={s.Logo} />
      </a>
    </div>
    </header>
  )
}
