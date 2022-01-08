import React from 'react';

const MovieList = (props) => {
    if(props.movies){
        return(
        //HTML formatting, displaying total search results and building list of buttons with search movie data
        <div>
            <div className="listContainer">
                <h2>{props.results} Search Results</h2>
                {props.movies.map((movie, index)=> 
                <button className="btnMovieDetails" key={index} onClick={()=>props.setMovieID(movie.imdbID)}>
                    <h1>{movie.Title}</h1>
                    <p>{movie.Year}</p>
                    <img className="imgSelectionPoster" src={movie.Poster} alt="NO MOVIE IMAGE"></img>  
                </button>)}
            </div>
            <div className="btnPageNo">
                <button onClick={()=>props.setPage(props.pageNum-1)}>\--</button>
                <button onClick={()=>props.setPage(props.pageNum+1)}>--/</button>
            </div>
        </div>);
    }

    if(props.watchList){
    return(
    //HTML formatting, building list of buttons with watchlist data
    <div className="listContainer">
        <h2>Watchlist</h2>
        {props.watchList.map((movie, index)=> 
        <button className="btnMovieDetails" key={index} onClick={()=>props.setMovieID(movie.imdbID)}>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
            <img className="imgSelectionPoster" src={movie.Poster} alt="NO MOVIE IMAGE"></img>  
        </button>)}
    </div>);
  }
  //Otherwise blank
  return(<></>);
}
export default MovieList;