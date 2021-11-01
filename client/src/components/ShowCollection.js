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

    console.log({ filter })

    const toggleShowFilters = (event) => {
        event.preventDefault()
        setShowFilters(!showFilters)

    }

    //get current collection and wines


    //render wine cards based on filter criteria

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
                }).map(wine => {
                    return (
                        <WineCard
                            key={wine.id}
                            wine={wine}
                            id={wine.id}
                            producer={wine.producer}
                            grape={wine.grape}
                            region={wine.region}
                            vintage={wine.vintage}
                            locations={wine.locations}
                            bottleprice={wine.bottleprice}
                            numberavailable={wine.numberavailable}
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
                    {/* <WineCard
                        id='wine.id'
                        producer='wine.producer'
                        grape='wine.grape'
                        region='wine.region'
                        vintage='wine.vintage'
                        location='wine.location'
                        bottleprice='wine.bottleprice'
                        numberavailable='wine.numberavailable'
                    /> */}


                    {/* <WineCard
                        id='wine.id'
                        producer='wine.producer'
                        grape='wine.grape'
                        region='wine.region'
                        vintage='wine.vintage'
                        location='wine.location'
                        bottleprice='wine.bottleprice'
                        numberavailable='wine.numberavailable'
                    /> */}


                    {/* <WineCard
                        id='wine.id'
                        producer='wine.producer'
                        grape='wine.grape'
                        region='wine.region'
                        vintage='wine.vintage'
                        location='wine.location'
                        bottleprice='wine.bottleprice'
                        numberavailable='wine.numberavailable'
                    /> */}


                    {/* <WineCard
                        id='wine.id'
                        producer='wine.producer'
                        grape='wine.grape'
                        region='wine.region'
                        vintage='wine.vintage'
                        location='wine.location'
                        bottleprice='wine.bottleprice'
                        numberavailable='wine.numberavailable'
                    /> */}

                </Grid>
            </Grid>
        </Main>
    )

}

export default ShowCollection
