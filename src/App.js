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
    if(movieID) {
      let url = `http://www.omdbapi.com/?${movieID}&plot=full&apikey=f9399c3a`;
      let response = await fetch(url);
      let responseJson = await response.json();
      if(responseJson) {
        setDetails(responseJson);
      }
    }
    if(movieSearch) {
      let url = `http://www.omdbapi.com/?${movieSearch}&${movieFilter}&apikey=f9399c3a`;
      let response = await fetch(url);
      let responseJson = await response.json();
      
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

  const addToWatchList = (movie)=>{
    let appendedList = [...movieWatchList, movie];
    setWatchList(appendedList);
    saveLocalWatchList(appendedList);
  }

  const saveLocalWatchList=(listSave)=>{
    localStorage.setItem('movie-finder-watchlist',JSON.stringify(listSave));
  }

  useEffect(() => {setWatchList(JSON.parse(localStorage.getItem('movie-finder-watchlist')))},[]);
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
