
import { useEffect, useState } from "react";
import { getCast } from '../../services/themoviedb.js';
import { useParams } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader.jsx'
import { ReactComponent as NoImg } from '../../icons/no_img.svg'
import s from './Cast.module.css'

export default function Caste() {

  const params = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCast(params.movie_id)
      .then(res => {
        setCast(res.cast)
      })
      .catch(() => {
        toast.error(`Server not response. Please try later .`)
          setIsLoading(false);
      })
  }, []);
    

  useEffect(() => {
    setIsLoading(false)
  }, [cast]);

  return (
      <ul className={s.item_list}>
        {cast && !isLoading && cast.map(item => 
            <li key={item.id} className={s.item}>
                <div className="s.avatar__wrapper">
                  {item.profile_path &&
                    <img className={s.avatar} src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt={item.name} />}
                  {!item.profile_path &&
                    <NoImg className={s.avatar} />}
                <span className={s.name}>{item.name}</span>
                <br/>
                  { item.name !== item.original_name && <span className={s.name}>({item.original_name})</span>}
                </div>
            </li>
          )
        }
      {!!cast.length && !isLoading &&
        <h4>Sorry, is no any reviews there yet. </h4>
      }
      {isLoading && <Loader />}
    </ul>
  )
}



//const [crew, setCrew] = useState([]);
//setCrew(res.crew)