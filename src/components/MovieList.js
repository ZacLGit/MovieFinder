import React from 'react';

const MovieList = (props) => {
    if(props.movies){
        return(<>
            <h2>{props.results} Results</h2>
            {props.movies.map((movie, index)=> 
            <button key={index} onClick={()=>props.setMovieID("i="+movie.imdbID)}>
                <h1>{movie.Title}</h1>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt="NO MOVIE IMAGE"></img>  
            </button>)}
        </>);
    }

    if(props.watchList){
      return(<>
          {props.watchList.map((movie, index)=> 
          <button key={index} onClick={()=>props.setMovieID("i="+movie.imdbID)}>
              <h1>{movie.Title}</h1>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt="NO MOVIE IMAGE"></img>  
          </button>)}
      </>);
  }
  return(<></>);
}
export default MovieList;