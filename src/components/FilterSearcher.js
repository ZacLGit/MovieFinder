import React from 'react';

const FilterSearcher = (props) => {
    return(
        <div className="gridContainer">
            <div className="rowSpread">
                <input onChange={(event)=> props.setSearch("s="+event.target.value)}
                placeholder='Search For Media...' />
            </div>
            <div className="filterContainer">
                <label>YEAR</label>
                <div>
                    <input type="range" onChange={(event)=> props.setYearFrom(event.target.value)}
                    max="2025" min="1895" value="1977" id="double-slider1"/>
                    <input type="range" onChange={(event)=> props.setYearTo(event.target.value)}
                    max="2025" min="1895" value="1992" id="double-slider2"/>
                </div>
            </div>
            <div className="filterContainer">
                <label>TYPE</label>
                <div>
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