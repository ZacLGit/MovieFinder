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
  const [yearFrom, setYearFrom] = useState(1977);
  const [yearTo, setYearTo] = useState(1990);

  const requestMovies = async () => {
    //Check if movie is selected from list and call for detailed info with movieID
    if(movieID) {
      let url = `http://www.omdbapi.com/?${movieID}&plot=full&apikey=f9399c3a`;
      let response = await fetch(url);
      let responseJson = await response.json();
      if(responseJson) {
        setDetails(responseJson);
      }
    }
    //Check for user input, list and filter
    if(movieSearch) {
      let url = `http://www.omdbapi.com/?${movieSearch}&${movieFilter}&apikey=f9399c3a`;
      let response = await fetch(url);
      let responseJson = await response.json();
      
      //Filter and set results
      if(responseJson.Search) {
        setResults(responseJson.totalResults);
        setMovies(responseJson.Search.filter(function(movie) {return parseInt(movie.Year) >= yearFrom && parseInt(movie.Year) <= yearTo}));
      }
      /** This code may get me in trouble(server timeouts)
      let appendedList=[];
      console.log("SEARCHING");
      for(let i = yearTo; i >= yearFrom; i--){
        let url = `http://www.omdbapi.com/?${movieSearch}&${movieFilter}&y=${i}&apikey=f9399c3a`;
        let response = await fetch(url);
        let responseJson = await response.json();
  
        if(responseJson.Search) {
          responseJson.Search.map((movie)=> appendedList=[...appendedList,movie]);
        }
      }
      if(appendedList){
        setMovies(appendedList);
      }**/
    }
  }
  //Append to current watch list and save to local
  const addToWatchList = (movie)=>{
    let appendedList = [...movieWatchList, movie];
    setWatchList(appendedList);
    saveLocalWatchList(appendedList);
  }

  const saveLocalWatchList=(listSave)=>{
    localStorage.setItem('movie-finder-watchlist',JSON.stringify(listSave));
  }
  
  //Get JSON data from local storage and display
  useEffect(() => {setWatchList(JSON.parse(localStorage.getItem('movie-finder-watchlist')))},[]);
  //Call for URL data and update display
  useEffect(() => {requestMovies()},[movieSearch, movieFilter, movieID,yearFrom,yearTo]);

  return (
    <div>
      <FilterSearcher setSearch={setSearch} setFilter={setFilter} yearFrom={yearFrom} yearTo={yearTo} setYearFrom={setYearFrom} setYearTo={setYearTo}/>
      <MovieDetailView movieDetails={movieDetails} setWatchList={addToWatchList}/>
      <MovieList movies={movieList} results={totalResults} setMovieID={setMovieID}/>
      <MovieList watchList={movieWatchList} setMovieID={setMovieID}/>
    </div>);
}

export default App;
