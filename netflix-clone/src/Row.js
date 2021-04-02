import React , { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';

 const baseUrl ="https://image.tmdb.org/t/p/original";
function Row( {title,fetchUrl, isLargeRow}) {
   const [movies, setMovies] = useState([])

  // useeffect runs on specific conditions
  useEffect(() => {
    // if [] is the 2nd parameter then it runs once when page loads and then doesn't run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies)
 

    return (
      <div className="row">
       <h2>{title}</h2>   

       <div className="row_posters">
       {/* this is for row wise posters */}
       {movies.map(movie => (
         <img 
          key = {movie.id}
          className={`row_poster ${isLargeRow && "row_posterLarge"} `}
          src ={`${baseUrl}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} 
          alt={movie.name} />
       ))} 

       </div>   
      </div>
    );
  }
  
  export default Row;