import React from 'react';

const MovieDetailView = (props) => {
    if(props.movieDetails){  
        return(
    //HTML formatting, displaying movie details, display watchlist button and watchlist append button call
    <div className="inspectContainer">
        <div className="detailContainer">
            <button id="btnDisplay" onClick={()=>props.setDisplaying(!props.isDisplaying)}>{props.isDisplaying ? "MOVIE SEARCH LIST" : "WATCHLIST"}</button>
            <div className="rowSpread4">
                <img className="imgExpan" onClick={()=>props.isListedMovie(props.watchList, props.movieDetails) ? props.removeFromList(props.movieDetails) : props.setWatchList(props.movieDetails)} 
                    src={props.movieDetails.Poster} alt="NO MOVIE IMAGE"></img>
                <div className="imgOverlay"></div>
            </div>
            <h1>{props.movieDetails.Title}</h1>
            <div>
                <h3>{props.movieDetails.Rated} {props.movieDetails.Year} * {props.movieDetails.Genre} * {props.movieDetails.Runtime}</h3>
            </div>
            <div>
                <h3>{props.movieDetails.Actors}</h3>
            </div>
        </div>
        <div className="plotContainer">     
            <label>{props.movieDetails.Plot}</label>
        </div>
        <div className="reviewContainer">
            {props.movieDetails.Ratings.map((rating, index)=> 
            <div className="ratingLayout" key={index}>
                <div>{props.movieDetails.Ratings[index].Value}</div>
                <div>{props.movieDetails.Ratings[index].Source}</div>
            </div>)}
        </div>
    </div>);
    }
    //If there isnt any movie details to display just format watchlight button
    return(<div><button id="btnDisplay" onClick={(event)=> event && props.setDisplaying(!props.isDisplaying)}>{props.isDisplaying ? "MOVIE SEARCH LIST" : "WATCHLIST"}</button></div>);
}

export default MovieDetailView;