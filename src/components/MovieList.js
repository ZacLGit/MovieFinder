import React from 'react';

const MovieList = (props) => {
    if(props.movies){
        return(
    //HTML formatting, displaying total search results and building list of buttons with search movie data
    <div className="listContainer">
        <h2>{props.results} Search Results</h2>
        {props.movies.map((movie, index)=> 
        <button key={index} onClick={()=>props.setMovieID("i="+movie.imdbID)}>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt="NO MOVIE IMAGE"></img>  
        </button>)}
    </div>);
    }

    if(props.watchList){
      return(
    //HTML formatting, building list of buttons with watchlist data
    <div className="listContainer">
        <h2>Watchlist</h2>
        {props.watchList.map((movie, index)=> 
        <button key={index} onClick={()=>props.setMovieID("i="+movie.imdbID)}>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt="NO MOVIE IMAGE"></img>  
        </button>)}
    </div>);
  }
  //Otherwise blank
  return(<></>);
}
export default MovieList;