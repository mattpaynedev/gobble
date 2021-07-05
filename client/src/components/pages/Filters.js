import React, { useState } from 'react'
import './Filters.css'

function Filters() {
    const [filter, setFilter] = useState('allWines')
    const [search, setSearch] = useState('')


    //Insert handleFilterChange function
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleSearchChange = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
    }

    return (
        <>
            <div className='filter-radio-wrapper'>
                <label className='filter-radio-header'>Filters</label>
                <form className='filter-radio-form'>
                    <div className='filter-radio-buttons'>
                        <input
                            type='radio'
                            value='available'
                            id='available'
                            onChange={handleFilterChange}
                            checked={(filter === 'available')}
                        /> Available
                    </div>
                    <div className='filter-radio-buttons'>
                        <input
                            type='radio'
                            value='allWines'
                            id='allWines'
                            onChange={handleFilterChange}
                            checked={(filter === 'allWines')}
                        /> All Wines
                    </div>
                    <div className='filter-radio-buttons'>
                        <input
                            type='radio'
                            value='notAvailable'
                            id='notAvailable'
                            onChange={handleFilterChange}
                            checked={(filter === 'notAvailable')}
                        /> Not Available
                    </div>
                </form>
            </div>
            <div className='filter-search-wrapper'>
                <legend>Search</legend>
                <div className='filter-search-form' onChange={handleSearchChange}>
                    <div className='filter-search-box'>
                        <input
                            type='textbox'
                            placeholder='Enter search term...'
                        />
                        <p>Try searching for a producer, grape, region, or vintage.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filters


