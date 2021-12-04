import React from 'react';

const MovieDetailView = (props) => {
    if(props.movieDetails) { 
        return(
            <>
            <h1>{props.movieDetails.Title}</h1>
            <div>
                <img className="imgExpan" onClick={()=>props.setWatchList(props.movieDetails)} src={props.movieDetails.Poster} alt="NO MOVIE IMAGE"></img>
                <div className="imgOverlay"></div>
            </div>
            <h3>Rating: {props.movieDetails.Rated}</h3>
            <h3>Year: {props.movieDetails.Year}</h3>
            <h3>Genre: {props.movieDetails.Genre}</h3>
            <h3>Run Time: {props.movieDetails.Runtime}</h3>
            <h3>Actors: {props.movieDetails.Actors}</h3>
            <h3>Plot: {props.movieDetails.Plot}</h3>
            {props.movieDetails.Ratings.map((rating, index)=> <h3 key={index}>{props.movieDetails.Ratings[index].Source} {props.movieDetails.Ratings[index].Value}</h3>)}
            </>);
        }   
    else {
        return(
            <></>
        );
    }
}

export default MovieDetailView;