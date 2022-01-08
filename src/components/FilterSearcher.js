import React from 'react';

const FilterSearcher = (props) => {
    return(
        //HTML formatting, arrange search box and filter elements
        <div className="gridContainer">
            <div className="rowSpread2">
                <input onChange={(event)=> props.setQuery("s="+event.target.value)}
                placeholder='Search For Media...' />
            </div>
            <div className="filterContainer">
                <label>YEAR</label>
                <div className="sliderWrapper">
                    <label for="double-slider1">{props.yearFrom}</label>
                    <input type="range" onChange={(event)=> event.target.value<props.yearTo?props.setYearFrom(event.target.value):props.setYearTo(event.target.value)}
                    max="2025" min="1895" value={props.yearFrom} id="double-slider1"/>
                    <input type="range" onChange={(event)=> props.yearFrom<event.target.value?props.setYearTo(event.target.value):props.setYearFrom(event.target.value)}
                    max="2025" min="1895" value={props.yearTo} id="double-slider2"/>
                    <label for="double-slider2">{props.yearTo}</label>
                </div>
            </div>
            <div className="filterContainer">
                <label>TYPE</label>
                <div className="radioWrapper">
                    <input type="radio" name="radioFilter"  id="any" value="" onChange={(event)=> props.setFilter(event.target.value)}/>
                        <label className="radioFilter" for="any">Any</label>

                    <input type="radio" name="radioFilter" id="movie" value="type=movie" onChange={(event)=> props.setFilter(event.target.value)}/>
                        <label className="radioFilter" for="movie">Movies</label>
                
                    <input type="radio" name="radioFilter"  id="series" value="type=series" onChange={(event)=> props.setFilter(event.target.value)}/>
                        <label className="radioFilter" for="series">Series</label>
                
                    <input type="radio" name="radioFilter"  id="episode" value="type=episode" onChange={(event)=> props.setFilter(event.target.value)}/>
                        <label className="radioFilter" for="episode">Episode</label>
                </div>
            </div>
        </div>
    )
}
export default FilterSearcher;