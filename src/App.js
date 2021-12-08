import './App.css';
import React,{useEffect, useState} from 'react';
import MovieList from './components/MovieList';
import FilterSearcher from './components/FilterSearcher';
import MovieDetailView from './components/MovieDetailView';

function App() {
  const [movieWatchList, setWatchList] = useState([]);
  const [movieList, setMovies] = useState([]);
  const [movieSearchList, setSearchList] = useState([]);
  const [movieSearch, setSearch] = useState('');
  const [movieFilter, setFilter] = useState('');
  const [movieID, setMovieID] = useState();
  const [movieDetails, setDetails] = useState();
  const [pageNum, setPage] = useState(1);
  const [totalResults, setResults] = useState(0);
  const [yearFrom, setYearFrom] = useState(1895);
  const [yearTo, setYearTo] = useState(2022);
  const [displayWatchList, isDisplaying] = useState(false);

  const requestMovies = async () => {
    //Check for user input, list and filter
    if(movieSearch) {
      let url = `http://www.omdbapi.com/?${movieSearch}&${movieFilter}&page=${pageNum}&apikey=3e19c1bd`;
      let response = await fetch(url);
      let responseJson = await response.json();

      //Set results
      if(responseJson.Search) {
        setResults(responseJson.totalResults);
        setMovies(responseJson.Search);
        setSearchList(responseJson.Search);
        //filterDisplayList(); //spooky results may return to later
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
      if(movieWatchList && movieID) {
        setDetails(movieWatchList.filter(movie => {return movie.imdbID == movieID})[0]);
      }
    }
  }
  
  //Make sure that page data being set is valid
  const setCurrentPage=(num)=>{
    if(num > 0){
      setPage(num);
    }
  }

  //Filter list within year span
  const filterDisplayList = (list) => {
    setMovies(list.filter(movie => {return parseInt(movie.Year) >= yearFrom && parseInt(movie.Year) <= yearTo}));
  }

  //Append to current watch list and save to local
  const addToWatchList = (movie) => {
    //Check if there is anything in the watch list and append
    if(movieWatchList) {
      //Check for and ignore duplicates
      if(!isListedMovie(movieWatchList, movie)){
        let newList=[...movieWatchList, movie];
        setWatchList(newList);
        saveLocalWatchList('movie-finder-watchlist', newList);
      }
    }
    //Otherwise initialize with first movie
    else {
      let newList=[movie];
      setWatchList(newList);
      saveLocalWatchList('movie-finder-watchlist', newList);
    }
  }

  //Filter out movie selections from watchlist
  const removeFromWatchList = (movie) => {
    if(movieWatchList) {
      let newList=movieWatchList.filter(m=>m.Title!==movie.Title);
      setWatchList(newList);
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

  //Render Watchlist data from local storage and display on page load
  useEffect(() => {setWatchList(JSON.parse(localStorage.getItem('movie-finder-watchlist')))},[]);
  //Render movie search, genre filter or page change
  useEffect(() => {requestMovies()},[movieSearch, movieFilter, pageNum]);
  //Render year span filtering
  useEffect(() => {filterDisplayList(movieSearchList)},[yearFrom, yearTo]);
  //Render selected details
  useEffect(() => {requestDetails()},[movieID]);
  
  //Check if user wants to view watchlist or movie search
  if(displayWatchList) {
    return (
      //Display elements
      <>
        <FilterSearcher yearFrom={yearFrom} yearTo={yearTo} setSearch={setSearch} setFilter={setFilter} setYearFrom={setYearFrom} setYearTo={setYearTo}/>
        <div className="displayContainer">
        <MovieList watchList={movieWatchList} setMovieID={setMovieID}/>
        <MovieDetailView movieDetails={movieDetails} watchList={movieWatchList} isDisplaying={displayWatchList} isListedMovie={isListedMovie} setDisplaying={isDisplaying} removeFromList={removeFromWatchList} setWatchList={addToWatchList}/>
        </div>
      </>);
  }
  else {
      return (
        //Display elements
        <>
          <FilterSearcher yearFrom={yearFrom} yearTo={yearTo} setSearch={setSearch} setFilter={setFilter} setYearFrom={setYearFrom} setYearTo={setYearTo}/>
          <div className="displayContainer">
          <MovieList movies={movieList} results={totalResults} pageNum={pageNum} setPage={setCurrentPage} setMovieID={setMovieID}/>
          <MovieDetailView movieDetails={movieDetails} watchList={movieWatchList} isDisplaying={displayWatchList} isListedMovie={isListedMovie} setDisplaying={isDisplaying} removeFromList={removeFromWatchList} setWatchList={addToWatchList}/>
          </div>
        </>);
  }
}

export default App;