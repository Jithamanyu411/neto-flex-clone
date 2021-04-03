import React , { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from "react-youtube";
import movieTrailer from 'movie-trailer';

 const baseUrl ="https://image.tmdb.org/t/p/original";

function Row( {title,fetchUrl, isLargeRow}) {
   const [movies, setMovies] = useState([])
   const [trailerUrl,setTrailerUrl] = useState("");

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

  //  options for react youtube to play
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

    const handleClick = (movie) => {
      if (trailerUrl) {
        setTrailerUrl("");
      }else{
        movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          //  this will give us the ID of YT video.. v="" is the ID of any YT video
          const urlParams = new URLSearchParams(new URL(url).search);
           setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.log(error));
      }
    };
 

    return (
      <div className="row">
       <h2>{title}</h2>   

       <div className="row_posters">
       {/* this is for row wise posters */}
       {movies.map((movie) => (
         <img 
            onClick={() => handleClick(movie)}
          key = {movie.id}
          className={`row_poster ${isLargeRow && "row_posterLarge"} `}
          src ={`${baseUrl}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} 
          alt={movie.name} />
       ))} 

       </div>  
       {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />} 
      </div>
    );
  }
  
  export default Row;