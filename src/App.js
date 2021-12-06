import './App.css';
import React,{useEffect, useState} from 'react';
import MovieList from './components/MovieList';
import FilterSearcher from './components/FilterSearcher';
import MovieDetailView from './components/MovieDetailView';

function App() {
  const [movieWatchList, setWatchList] = useState([]);
  const [movieList, setMovies] = useState([]);
  const [movieID, setMovieID] = useState('');
  const [movieSearch, setSearch] = useState('');
  const [movieFilter, setFilter] = useState('');
  const [totalResults, setResults] = useState();
  const [movieDetails, setDetails] = useState();
  const [yearFrom, setYearFrom] = useState(1895);
  const [yearTo, setYearTo] = useState(2022);
  const [displayWatchList, isDisplaying] = useState(true);

  const requestMovies = async () => {
    //Check if movie is selected from list and call for detailed info with movieID
    if(movieID) {
      let url = `http://www.omdbapi.com/?${movieID}&plot=full&apikey=3e19c1bd`;
      let response = await fetch(url);
      let responseJson = await response.json();
      
      if(responseJson) {
        setDetails(responseJson);
      }
    }
    //Check for user input, list and filter
    if(movieSearch) {
      let url = `http://www.omdbapi.com/?${movieSearch}&${movieFilter}&apikey=3e19c1bd`;
      let response = await fetch(url);
      let responseJson = await response.json();

      //Filter and set results
      if(responseJson.Search) {
        setResults(responseJson.totalResults);
        setMovies(responseJson.Search.filter(function(movie) {return parseInt(movie.Year) >= yearFrom && parseInt(movie.Year) <= yearTo}));
      }
    }
  }

  //Append to current watch list and save to local
  const addToWatchList = (movie)=>{
    let appendedList = [];
    //Check if there is anything in the watch list and append
    if(movieWatchList) {
      //Check for and ignore duplicates
      if(!isListed(movieWatchList, movie)){
        appendedList = [...movieWatchList, movie];
        setWatchList(appendedList);
        saveLocalWatchList('movie-finder-watchlist', appendedList);
      }
    }
    //Otherwise initialize with first movie
    else {
      appendedList = [movie];
      setWatchList(appendedList);
      saveLocalWatchList('movie-finder-watchlist', appendedList);
    }
  }

  const isListed=(list,item)=>{
    let listed = false;
    list.map(element => {
      if(element.Title==item.Title){
        listed = true;
      }
    });
    return listed;
  }

  //Set JSON data to local storage
  const saveLocalWatchList=(key, listSave)=>{
    localStorage.setItem(key, JSON.stringify(listSave));
  }

  //Render Watchlist data from local storage and display on page load
  useEffect(() => {setWatchList(JSON.parse(localStorage.getItem('movie-finder-watchlist')))},[]);
  //Reder update for URL data and update display
  useEffect(() => {requestMovies()},[movieSearch, movieFilter, movieID, yearFrom, yearTo]);
  //Render current watchlist display
  useEffect(() => {},[displayWatchList])
  
  //Check if user wants to view watchlist or movie search
  if(displayWatchList) {
    return (
      //Display elements
      <>
        <FilterSearcher yearFrom={yearFrom} yearTo={yearTo} setSearch={setSearch} setFilter={setFilter} setYearFrom={setYearFrom} setYearTo={setYearTo}/>
        <div className="displayContainer">
        <MovieList watchList={movieWatchList} setMovieID={setMovieID}/>
        <MovieDetailView movieDetails={movieDetails} isDisplaying={displayWatchList} setDisplaying={isDisplaying} setWatchList={addToWatchList}/>
        </div>
      </>);
  }
  else {
      return (
        //Display elements
        <>
          <FilterSearcher yearFrom={yearFrom} yearTo={yearTo} setSearch={setSearch} setFilter={setFilter} setYearFrom={setYearFrom} setYearTo={setYearTo}/>
          <div className="displayContainer">
          <MovieList movies={movieList} results={totalResults} setMovieID={setMovieID}/>
          <MovieDetailView movieDetails={movieDetails} isDisplaying={displayWatchList} setDisplaying={isDisplaying} setWatchList={addToWatchList}/>
          </div>
        </>);
  }
}

export default App;