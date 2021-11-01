import React, { useState } from 'react'
import WineCard from './WineCard'
import Filters from './Filters'
// import './Collection.css'
import { Box, Button, Grid, Main, Text } from 'grommet'
import { FormNext, FormPrevious } from 'grommet-icons'

const gridLayouts = {
    default: ['small', 'auto'],
    noFilters: ['xxsmall', 'auto']
}

export const radioOptions = {
    available: 'Available',
    allWines: 'All Wines',
    notAvailable: 'Not Available',
}

function ShowCollection({ collection }) {
    const [showFilters, setShowFilters] = useState(true)
    const [filter, setFilter] = useState(radioOptions.allWines)
    const [search, setSearch] = useState('')

    const toggleShowFilters = (event) => {
        event.preventDefault()
        setShowFilters(!showFilters)

    }

    //get current collection and wines

    const renderCollection = () => {
        return (
            <>
                {collection.filter(wine => {
                    switch (filter) {
                        case radioOptions.available:
                            return wine.numberavailable > 0
                        case radioOptions.notAvailable:
                            return !wine.numberavailable
                        default:
                            return true // Show All Wines
                    }
                }).filter(wine => {
                    const lcSearch = search.toLowerCase()
                    const producer = wine.producer.toLowerCase()
                    const grape = wine.grape.toLowerCase()
                    const region = wine.region.toLowerCase()
                    const vintage = String(wine.vintage)

                    if (producer.includes(lcSearch) || grape.includes(lcSearch) || region.includes(lcSearch) || vintage.includes(lcSearch)) {
                        return true
                    }
                    return false
                }).map(wine => {
                    return (
                        <WineCard
                            key={wine.id}
                            wine={wine}
                        />
                    )
                })}
            </>
        )
    }

    return (
        <Main
            height={{ min: "100vh" }}
            pad={{ vertical: "small" }}
        >
            <Box
                width="small"
            >

            </Box>
            <Grid
                columns={showFilters ? gridLayouts.default : gridLayouts.noFilters}
                gap="small"
                pad={{ horizontal: "small" }}
                justifyContent="stretch"
            >
                <Filters
                    toggleFunc={toggleShowFilters}
                    showFilters={showFilters}
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                    radioOptions={Object.values(radioOptions)}
                />
                <Grid
                    columns="medium"
                    gap="medium"
                    justifyContent="center"
                >
                    {collection
                        ? <>{renderCollection()}</>
                        : null}
                </Grid>
            </Grid>
        </Main>
    )

}

export default ShowCollection
