import React from 'react'
import { Box, Text, Select, Button } from 'grommet'
import { Add } from 'grommet-icons'

export default function Taskbar({ allCollections, currentColl, availableLocations, selectCollectionFunc, addWineFunc }) {
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
            </Box>
            <Button
                primary
                disabled={!availableLocations.length}
                color="light-1"
                size="small"
                icon={<Add size="small" color="brand" />}
                gap="xsmall"
                hoverIndicator
                onClick={addWineFunc}
                label={<Text weight="bold" size="small" color="brand">Add Wine</Text>}
            />
        </Box>
    )
}