import React, { useState } from 'react'
import WineCard from './WineCard'
import Filters from './Filters'
import './Collection.css'


function Collection() {
    const [showFilters, setShowFilters] = useState(false)

    const toggleShowFilters = (event) => {
        event.preventDefault()

        setShowFilters(!showFilters)
    }

    let toggleButton
    let renderFilters
    if (showFilters) {
        toggleButton = (
            <div className='filter-toggle-wrapper'>
                <button
                    className='btn-filter-close-toggle'
                    onClick={toggleShowFilters}
                >Hide Filters</button>
            </div>
        )

        renderFilters = (
            <div className='filter-wrapper'>
                <Filters />
            </div>
        )
    } else {
        toggleButton = (
            <div className='filter-toggle-wrapper'>
                <button
                    className='btn-filter-expand-toggle'
                    onClick={toggleShowFilters}
                >Show Filters</button>
            </div>
        )
    }

    //get current collection and wines


    //render wine cards based on filter criteria

    return (
        <div>
            <h2>My Collection</h2>
            {toggleButton}
            <div className='collection-container'>
                {renderFilters}
                <div className='card-wrapper'>
                    <WineCard
                        id='wine.id'
                        producer='wine.producer'
                        grape='wine.grape'
                        region='wine.region'
                        vintage='wine.vintage'
                        location='wine.location'
                        bottleprice='wine.bottleprice'
                        numberavailable='wine.numberavailable'
                    />
                </div>
                <div className='card-wrapper'>
                    <WineCard
                        id='wine.id'
                        producer='wine.producer'
                        grape='wine.grape'
                        region='wine.region'
                        vintage='wine.vintage'
                        location='wine.location'
                        bottleprice='wine.bottleprice'
                        numberavailable='wine.numberavailable'
                    />
                </div>
                <div className='card-wrapper'>
                    <WineCard
                        id='wine.id'
                        producer='wine.producer'
                        grape='wine.grape'
                        region='wine.region'
                        vintage='wine.vintage'
                        location='wine.location'
                        bottleprice='wine.bottleprice'
                        numberavailable='wine.numberavailable'
                    />
                </div>
                <div className='card-wrapper'>
                    <WineCard
                        id='wine.id'
                        producer='wine.producer'
                        grape='wine.grape'
                        region='wine.region'
                        vintage='wine.vintage'
                        location='wine.location'
                        bottleprice='wine.bottleprice'
                        numberavailable='wine.numberavailable'
                    />
                </div>
            </div>
        </div>
    )

}

export default Collection
