import React, { useState } from 'react'
import { Box, Text, Select, Button } from 'grommet'
import { Add } from 'grommet-icons'
import AddNewCollectionOverlay from './AddNewCollectionOverlay'

export default function Taskbar({ allCollections, currentColl, availableLocations, selectCollectionFunc, addWineFunc }) {

    const [addNewCollection, setAddNewCollection] = useState(false)

    const toggleOverlay = () => {
        setAddNewCollection(prev => !prev)
    }

    return (
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
                    onChange={selectCollectionFunc}
                />
                <Button
                    plain
                    margin={{ left: "small" }}
                    size="small"
                    onClick={toggleOverlay}
                >{({ hover }) =>
                    <Box
                        direction='row'
                        align="center"
                        gap='xsmall'
                    >
                        <Add size="small" color={hover ? "accent-1" : "light-1"} />
                        <Text weight="bold" size="small" color={hover ? "accent-1" : "light-1"}>Add Collection</Text>
                    </Box>}
                </Button>
            </Box>
            <Button
                primary
                disabled={!availableLocations.length}
                color="light-1"
                size="small"
                onClick={addWineFunc}
            >
                {({ hover }) =>
                    <Box
                        direction='row'
                        align="center"
                        gap='xsmall'
                    >
                        <Add size="small" color={hover ? "accent-1" : "brand"} />
                        <Text weight="bold" size="small" color={hover ? "accent-1" : "brand"}>Add Wine</Text>
                    </Box>}
            </Button>
            {addNewCollection &&
                <AddNewCollectionOverlay
                    closeFunc={toggleOverlay}
                />}
        </Box >
    )
}
