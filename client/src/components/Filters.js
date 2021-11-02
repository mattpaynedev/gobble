import { Box, Button, RadioButtonGroup, Sidebar, Stack, Text, TextInput } from 'grommet'
import React from 'react'
import './Filters.css'
import { FormPrevious, FormNext } from 'grommet-icons'

function Filters({ toggleFunc, showFilters, search, setSearch, filter, setFilter, radioOptions }) {

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        console.log(filter)
    }

    const handleSearchChange = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
    }

    const toggleShowFilters = (event) => {
        return toggleFunc(event)
    }

    let toggleButton
    if (showFilters) {
        toggleButton = (
            <Button
                primary
                size='small'
                icon={<FormPrevious size="medium" />}
                // label="Hide Filters"
                onClick={toggleShowFilters}
            ></Button>
        )


    } else {
        toggleButton = (
            <Button
                primary
                size='small'
                icon={<FormNext size="medium" />}
                // label={<Text size='small'>Show Filters</Text>}
                onClick={toggleShowFilters}
            ></Button>
        )
    }

    return (
        <Stack
            anchor="top-right"
            margin={{
                top: "20px"
            }}
        >

            {showFilters && <Sidebar
                width="small"
                background="light-1"
                round="small"
                pad={{
                    top: "medium",
                    horizontal: "small"
                }}
            >
                <Stack
                    anchor="top-left"
                    margin={{ bottom: "medium" }}
                >

                    <Box
                        border
                        pad="small"
                        round="small"
                        margin={{ top: "10px" }}
                    >
                        <Text
                            size="small"
                            weight="bold"
                        >
                            <RadioButtonGroup
                                name="filter"
                                options={radioOptions}
                                value={filter}
                                onChange={handleFilterChange}
                            />
                        </Text>
                    </Box>
                    <Box
                        background="brand"
                        pad={{
                            vertical: "none",
                            horizontal: "small"
                        }}
                        round="small"
                        margin={{
                            vertical: "-5px",
                            horizontal: "10px"
                        }}
                    >
                        <Text
                            size="medium"
                            weight="bold"
                        >Filters</Text>
                    </Box>
                </Stack>
                <Stack
                    anchor="top-left"
                    margin={{ bottom: "medium" }}
                >

                    <Box
                        border
                        pad="small"
                        round="small"
                        margin={{ top: "10px" }}
                    >
                        <Text
                            size="small"
                            weight="bold"
                            margin={{ vertical: "xsmall" }}
                        >
                            <TextInput
                                placeholder="search here..."
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </Text>
                        <Text size="small" textAlign="center">Try searching by producer, grape, region, or vintage.</Text>
                    </Box>
                    <Box
                        background="brand"
                        pad={{
                            vertical: "none",
                            horizontal: "small"
                        }}
                        round="small"
                        margin={{
                            vertical: "-5px",
                            horizontal: "10px"
                        }}
                    >
                        <Text
                            size="medium"
                            weight="bold"
                        >Search</Text>
                    </Box>
                </Stack>
            </Sidebar>}
            <Box
                margin={{
                    top: "-20px",
                }}
            >
                {toggleButton}
            </Box>
        </Stack>
    )
}

export default Filters


