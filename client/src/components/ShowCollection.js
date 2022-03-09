import React, { useState } from 'react'
import WineCard from './WineCard'
import AddWineCard from './AddWineCard'
import Filters from './Filters'
import { Box, Button, Grid, Heading, Main, Select, Text } from 'grommet'
import { Add } from 'grommet-icons'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchSingleCollection } from '../features/wine/wineSlice'

const gridLayouts = {
    default: ['small', 'auto'],
    noFilters: ['xxsmall', 'auto']
}

export const radioOptions = {
    available: 'Available',
    allWines: 'All Wines',
    notAvailable: 'Not Available',
}

const getColl = (state) => {
    return Object.values(state.wine);
}

function ShowCollection({ collID, changeCollFunc, allCollections }) {
    const [showFilters, setShowFilters] = useState(true)
    const [showAddWineOverlay, setShowAddWineOverlay] = useState(false)
    const [filter, setFilter] = useState(radioOptions.allWines)
    const [search, setSearch] = useState('')
    const [currentColl, setCurrentColl] = useState(null)
    const [availableLocations, setAvailableLocations] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (collID.length) {
            setCurrentColl(...allCollections.filter(c => c.id === collID))
        }
    }, [allCollections, collID])

    useEffect(() => {
        if (collID.length) {
            dispatch(fetchSingleCollection(collID))
        }
    }, [dispatch, collID])

    useEffect(() => {
        if (currentColl) {
            setAvailableLocations(Object.keys(currentColl.available))
        }
    }, [currentColl])

    // const availableLocations = currentColl ? Object.keys(currentColl.available) : []

    const collection = useSelector(getColl, shallowEqual)

    const toggleShowFilters = (event) => {
        event.preventDefault()
        setShowFilters(!showFilters)

    }

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
                            collectionInfo={currentColl}
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
                justify="between"
                pad={{
                    vertical: "xsmall",
                    horizontal: "medium"
                }}
                margin={{ bottom: "small" }}
                direction='row'
                background="brand"
            >
                <Box
                    direction="row"
                    align="center"
                    color="light-1"
                    round="small"
                    pad={{
                        horizontal: "small",
                        vertical: "xxsmall"

                    }}
                >
                    <Text
                        weight="bold"
                        size="small"
                        margin={{ right: "xsmall" }}
                    >Collection: </Text>
                    <Select
                        disabled={!currentColl}
                        options={allCollections}
                        labelKey={"name"}
                        value={currentColl}
                        placeholder="No collections..."
                        size="small"
                        onChange={({ option }) => {
                            setCurrentColl(option)
                            changeCollFunc(option.id)
                        }}
                    />
                </Box>
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
            {showAddWineOverlay && availableLocations.length && <AddWineCard closeFunc={() => setShowAddWineOverlay(false)} availableLocations={availableLocations} collectionInfo={currentColl} />}
        </Main >
    )

}

export default ShowCollection
