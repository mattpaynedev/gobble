import { Box, Button, Grid, Heading, Layer, RangeInput, Text, TextInput } from 'grommet'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewCollection } from '../features/collection/collectionSlice'
import { createNewCollectionLocations } from '../utils'

export default function AddNewCollectionOverlay({ closeFunc }) {

    const [collName, setCollName] = useState("")
    const [rowCount, setRowCount] = useState(1)
    const [colCount, setColCount] = useState(1)
    const [showError, setShowError] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()

    const createCollection = () => {
        if (collName.length) {
            let collInfo = {
                name: collName,
                capacity: rowCount * colCount,
                available: createNewCollectionLocations(rowCount, colCount)
            }

            console.log(collInfo)

            setSuccess(true)

            // dispatch(createNewCollection(collInfo, null))
        } else {
            setShowError(true)
        }
    }

    return (
        <Layer
            animate
            animation="slide"
            onEsc={closeFunc}
            onClickOutside={closeFunc}
            position="right"
        >
            {!success
                ? <Box
                    direction="column"
                    pad="medium"
                >
                    <Heading
                        level={3}
                        margin="none"
                        alignSelf="center"
                    >Add New Collection</Heading>
                    <Box align="end" height={{ min: "1.5em" }}>
                        {showError && <Text
                            color="status-critical"
                            size="small"
                            weight="bold"
                        >Collection must have a name!</Text>}
                    </Box>
                    <Grid
                        columns={['small', 'medium']}
                        gap="medium"
                    >

                        <Text weight="bold" size="medium">Collection Name:</Text>
                        <TextInput
                            placeholder="collection name"
                            value={collName}
                            onChange={(e) => {
                                if (showError) setShowError(false)
                                setCollName(e.target.value)
                            }}
                        />
                        <Text weight="bold" size="medium"># of Rows</Text>
                        <Box
                            direction="row"
                        >
                            <Box
                                margin={{ right: "xsmall" }}
                                width="xxsmall"
                                align='center'
                                justify='center'
                                border
                                round="xxsmall"
                            >
                                <Text weight="bold">{rowCount}</Text>
                            </Box>
                            <RangeInput
                                value={rowCount}
                                onChange={(e) => setRowCount(e.target.value)}
                                min={1}
                                max={100}
                            />
                        </Box>

                        <Text weight="bold" size="medium"># of Slots/Row:</Text>
                        <Box
                            direction="row"
                        >
                            <Box
                                margin={{ right: "xsmall" }}
                                width="xxsmall"
                                align='center'
                                justify='center'
                                border
                                round="xxsmall"
                            >
                                <Text weight="bold">{colCount}</Text>
                            </Box>
                            <RangeInput
                                value={colCount}
                                onChange={(e) => setColCount(e.target.value)}
                                min={1}
                                max={100}
                            />
                        </Box>
                    </Grid>
                    <Box
                        direction="row"
                        justify="end"
                        margin={{ top: "medium" }}
                        gap="small"
                    >
                        <Button
                            size="small"
                            primary
                            label={<Text weight="bold" size="small">
                                Save Collection
                            </Text>}
                            onClick={createCollection}
                        />
                        <Button
                            size="small"
                            color="status-critical"
                            secondary
                            label={<Text weight="bold" size="small" color="status-critical">
                                Cancel
                            </Text>}
                            onClick={closeFunc}
                        />
                    </Box>
                </Box >
                : <Box
                    direction="column"
                    pad="medium"
                    align='center'
                >
                    <Heading level={4} textAlign="center">A new collection called "{collName}" has been successfully created!</Heading>
                    <Button
                        primary
                        label={<Text weight="bold">Close</Text>}
                        onClick={closeFunc}
                    />
                </Box>
            }
        </Layer >
    )
}