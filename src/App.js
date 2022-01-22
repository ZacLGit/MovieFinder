import './App.css';
import React,{useEffect, useState} from 'react';
import MovieList from './components/MovieList';
import FilterSearcher from './components/FilterSearcher';
import MovieDetailView from './components/MovieDetailView';

function App() {
  const [movieWatchListDisplay, setWatchListDisplay] = useState([]);
  const [movieListDisplay, setMovieListDisplay] = useState([]);
  const [movieSearchList, setSearchList] = useState([]);
  const [query, setQuery] = useState("");
  const [movieSearchFilter, setSearchFilter] = useState("");
  const [movieTypeFilter, setTypeFilter] = useState("");
  const [pageNumFilter, setPageFilter] = useState(1);
  const [yearFrom, setYearFrom] = useState(1895);
  const [yearTo, setYearTo] = useState(2022);
  const [totalResults, setResults] = useState(0);
  const [displayWatchList, isDisplaying] = useState(false);
  const [movieID, setMovieID] = useState();
  const [movieDetails, setDetails] = useState();

  const requestMovies = async () => {
    //Check for user input, list and filter
    if(movieSearchFilter) {
      let url = `http://www.omdbapi.com/?${movieSearchFilter}&${movieTypeFilter}&page=${pageNumFilter}&apikey=3e19c1bd`;
      let response = await fetch(url);
      let responseJson = await response.json();

      //Set results
      if(responseJson.Search) {
        setResults(responseJson.totalResults);
        setMovieListDisplay(responseJson.Search);
        setSearchList(responseJson.Search);
        filterDisplayList(responseJson.Search);
      }
    }
  }

  const requestDetails = async () => {
    if(!displayWatchList) {
      //Check if movie is selected from search list and call for detailed info with movieID
      if(movieID) {
        let url = `http://www.omdbapi.com/?i=${movieID}&plot=full&apikey=3e19c1bd`;
        let response = await fetch(url);
        let responseJson = await response.json();
        
        if(responseJson) {
          setDetails(responseJson);
        }
      }
    }
    //Otherwise get movie from watchlist
    else {
      if(movieWatchListDisplay && movieID) {
        setDetails(movieWatchListDisplay.filter(movie => {return movie.imdbID == movieID})[0]);
      }
    }
  }
  
  //Make sure that page data being set is valid
  const setCurrentPage=(num)=>{
    if(num > 0){
      setPageFilter(num);
    }
  }

  //Filter list within year span
  const filterDisplayList = (list) => {
    setMovieListDisplay(list.filter(movie => {return parseInt(movie.Year) >= yearFrom && parseInt(movie.Year) <= yearTo}));
  }

  //Append to current watch list and save to local
  const addToWatchList = (movie) => {
    //Check if there is anything in the watch list and append
    if(movieWatchListDisplay) {
      //Check for and ignore duplicates
      if(!isListedMovie(movieWatchListDisplay, movie)){
        let newList=[...movieWatchListDisplay, movie];
        setWatchListDisplay(newList);
        saveLocalWatchList('movie-finder-watchlist', newList);
      }
    }
    //Otherwise initialize with first movie
    else {
      let newList=[movie];
      setWatchListDisplay(newList);
      saveLocalWatchList('movie-finder-watchlist', newList);
    }
  }

  //Filter out movie selections from watchlist
  const removeFromWatchList = (movie) => {
    if(movieWatchListDisplay) {
      let newList=movieWatchListDisplay.filter(m=>m.imdbID!==movie.imdbID);
      setWatchListDisplay(newList);
      saveLocalWatchList('movie-finder-watchlist', newList);
    }
  }

  //Check list for given item
  const isListedMovie=(list,item)=>{
    let listed = false;
    if(list){
      list.map(element => {
        if(element.imdbID==item.imdbID){
          listed = true;
        }
      });
    }
    return listed;
  }

  //Set JSON data to local storage
  const saveLocalWatchList=(key, listSave)=>{
    localStorage.setItem(key, JSON.stringify(listSave));
  }

  //Gather Watchlist data from local storage on page load
  useEffect(() => {setWatchListDisplay(JSON.parse(localStorage.getItem('movie-finder-watchlist')))},[]);
  //Debounce search box query
  useEffect(() => {let timeOutId = setTimeout(() => setSearchFilter(query), 600); setPageFilter(1);
    return () => clearTimeout(timeOutId);},[query]);
  //Render movie search, genre filter or page change
  useEffect(() => {requestMovies()},[movieSearchFilter, movieTypeFilter, pageNumFilter]);
  //Render year span filtering
  useEffect(() => {filterDisplayList(movieSearchList)},[yearFrom, yearTo]);
  //Render selected details
  useEffect(() => {requestDetails()},[movieID]);
  
  //Check if user wants to view watchlist or movie search
  if(displayWatchList) {
    return (
      //Display elements
      <>
        <FilterSearcher yearFrom={yearFrom} yearTo={yearTo} setQuery={setQuery} setFilter={setTypeFilter} setYearFrom={setYearFrom} setYearTo={setYearTo}/>
        <div className="displayContainer">
        <MovieList watchList={movieWatchListDisplay} setMovieID={setMovieID}/>
        <MovieDetailView movieDetails={movieDetails} watchList={movieWatchListDisplay} isDisplaying={displayWatchList} isListedMovie={isListedMovie} setDisplaying={isDisplaying} removeFromList={removeFromWatchList} setWatchList={addToWatchList}/>
        </div>
      </>);
  }
  else {
      return (
        //Display elements
        <>
          <FilterSearcher yearFrom={yearFrom} yearTo={yearTo} setQuery={setQuery} setFilter={setTypeFilter} setYearFrom={setYearFrom} setYearTo={setYearTo}/>
          <div className="displayContainer">
          <MovieList movies={movieListDisplay} results={totalResults} pageNum={pageNumFilter} setPageNum={setCurrentPage} setMovieID={setMovieID}/>
          <MovieDetailView movieDetails={movieDetails} watchList={movieWatchListDisplay} isDisplaying={displayWatchList} isListedMovie={isListedMovie} setDisplaying={isDisplaying} removeFromList={removeFromWatchList} setWatchList={addToWatchList}/>
          </div>
        </>);
  }
}

export default App;