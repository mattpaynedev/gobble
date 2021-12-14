import React, { useState } from 'react'
import WineCard from './WineCard'
import AddWineCard from './AddWineCard'
import Filters from './Filters'
import { Box, Button, Grid, Heading, Main, Text } from 'grommet'
import { Add } from 'grommet-icons'
import { useSelector, shallowEqual } from 'react-redux'

const gridLayouts = {
    default: ['small', 'auto'],
    noFilters: ['xxsmall', 'auto']
}

export const radioOptions = {
    available: 'Available',
    allWines: 'All Wines',
    notAvailable: 'Not Available',
}

const getCollectionInfo = (collectionID) => {
    return (state) => {
        return state.collections[collectionID]
    }
}

function ShowCollection({ collection }) {
    const [showFilters, setShowFilters] = useState(true)
    const [showAddWineOverlay, setShowAddWineOverlay] = useState(false)
    const [filter, setFilter] = useState(radioOptions.allWines)
    const [search, setSearch] = useState('')

    const collectionInfo = useSelector(getCollectionInfo("6032def2900ef3a9b2b1d8f4"), shallowEqual)

    const availableLocations = collectionInfo ? Object.keys(collectionInfo.available) : []

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
                    if (search.length > 2) {
                        const lcSearch = search.toLowerCase()
                        const producer = wine.producer.toLowerCase()
                        const grape = wine.grape.toLowerCase()
                        const region = wine.region.toLowerCase()
                        const vintage = String(wine.vintage)

                        if (producer.includes(lcSearch) || grape.includes(lcSearch) || region.includes(lcSearch) || vintage.includes(lcSearch)) {
                            return true
                        }
                        return false
                    } else {
                        return true
                    }
                }).map(wine => {
                    return (
                        <WineCard
                            key={wine.id}
                            wine={wine}
                            collectionInfo={collectionInfo}
                        />
                    )
                })}
            </>
        )
    }

    return (
        <Main
            height={{ min: "100vh" }}
        >
            <Box
                align="end"
                pad={{ vertical: "xsmall" }}
            >
                <Button
                    primary
                    disabled={!availableLocations.length}
                    color="light-1"
                    size="small"
                    icon={<Add size="small" color="brand" />}
                    gap="xsmall"
                    hoverIndicator
                    onClick={(event) => {
                        event.preventDefault()
                        setShowAddWineOverlay(true)
                    }}
                    label={<Text weight="bold" size="small" color="brand">Add Wine</Text>}
                />
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
                {collection.length
                    ? <Grid
                        columns="medium"
                        gap="medium"
                        justifyContent="center"
                    >
                        {collection
                            ? <>{renderCollection()}</>
                            : null}
                    </Grid>
                    : <Box
                        align="center"
                    >
                        <Heading level={3} >Add a wine to start your collection!</Heading>
                    </Box>
                }
            </Grid>
            {showAddWineOverlay && availableLocations.length && <AddWineCard closeFunc={() => setShowAddWineOverlay(false)} availableLocations={availableLocations} collectionInfo={collectionInfo} />}
        </Main>
    )

}

export default ShowCollection
