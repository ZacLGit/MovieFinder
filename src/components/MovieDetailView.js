import React from 'react';

const MovieDetailView = (props) => {
    if(props.movieDetails){  
        return(
    //HTML formatting, displaying movie details and watchlist append button call
    <div className="inspectContainer">
        <div className="detailContainer">
            <button id="btnDisplay" onClick={(event)=> event && props.setDisplaying(!props.isDisplaying)}>{props.isDisplaying ? "MOVIE SEARCH LIST" : "WATCHLIST"}</button>
            <div className="rowSpread4">
                <img className="imgExpan" onClick={()=>props.setWatchList(props.movieDetails)} src={props.movieDetails.Poster} alt="NO MOVIE IMAGE"></img>
                <div className="imgOverlay"></div>
            </div>
            <h1>{props.movieDetails.Title}</h1>
            <div>
                <h3>{props.movieDetails.Rated}  {props.movieDetails.Year} * {props.movieDetails.Genre} * {props.movieDetails.Runtime}</h3>
            </div>
            <div>
                <h3>{props.movieDetails.Actors}</h3>
            </div>
        </div>
        <div className="plotContainer">     
            <label>{props.movieDetails.Plot}</label>
        </div>
        <div className="reviewContainer">
            {props.movieDetails.Ratings.map((rating, index)=> <h3 key={index}>{props.movieDetails.Ratings[index].Source} {props.movieDetails.Ratings[index].Value}</h3>)}
        </div>
    </div>);
    }
    //If there isnt any movie details to display just format watchlight button
    return(<div><button id="btnDisplay" onClick={(event)=> event && props.setDisplaying(!props.isDisplaying)}>{props.isDisplaying ? "MOVIE SEARCH LIST" : "WATCHLIST"}</button></div>);
}

export default MovieDetailView;