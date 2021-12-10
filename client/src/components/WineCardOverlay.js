import { Card, CardBody, Box, Image, Grid, Text, Layer, Button, CardHeader, List } from 'grommet'
import { Close, Edit, FormPreviousLink } from 'grommet-icons'
import React, { useState } from 'react'
import EditWineCard from './EditWineCard'
import { NON_VINTAGE } from '../utils'

export default function WineCardOverlay({ wine, closeFunc }) {
    const [editMode, setEditMode] = useState(false)
    const [showLocations, setShowLocations] = useState(false)

    const handleClick = (event) => {
        event.preventDefault()
        if (showLocations) {
            setShowLocations(false)
        } else {
            closeFunc()
        }
    }
    console.log(wine.producer, wine.locations)
    const renderLocations = () => {
        console.log(wine.locations)
        const locations = wine && wine.locations
            ? Object.keys(wine.locations)
            : []

        return (
            <CardBody
                pad={{
                    horizontal: "medium",
                    top: "medium",
                    bottom: "xsmall"
                }}
                justify="start"
                align="center"
            >
                <Box
                    justify="center"
                >
                    <Text weight="bold">Storage Locations for {wine.producer} - {wine.vintage}</Text>
                    < List
                        // Add ACTION in order to go to DRINK NOW
                        data={locations.map(x => `Bin: ${x}`)}
                        border={false}
                        alignSelf="center"
                        pad="xsmall"
                        paginate={{
                            size: "small",
                            width: "xsmall",
                            alignSelf: "center"
                        }}
                        step={6}
                    />
                </Box>
            </CardBody>
        )
    }

    return (
        <Layer
            onClickOutside={closeFunc}
        >
            {!editMode
                ? <Card
                    height={{ min: "medium" }}
                    width="large"
                    background="light-1"
                >
                    <CardHeader
                        justify="end"
                        margin={{
                            top: "small",
                            right: "small"
                        }}
                    >
                        <Button
                            plain
                            reverse
                            margin={{ horizontal: "small" }}
                            onClick={handleClick}
                            icon={!showLocations
                                ? <Close
                                    size="small"
                                    color="accent-1"
                                />
                                : <FormPreviousLink
                                    size="medium"
                                    color="accent-1"
                                />}
                            gap="xxsmall"
                            label={<Text
                                size="small"
                                weight="bold"
                                color="accent-1"
                            >{!showLocations ? "close" : "go back"}</Text>}
                        />
                    </CardHeader>
                    {!showLocations
                        ? <>
                            <CardBody
                                direction="row-responsive"
                                pad={{
                                    horizontal: "medium",
                                    top: "medium",
                                    bottom: "xsmall"
                                }}
                                justify="center"
                            >
                                <Box
                                    width="xsmall"
                                    height="xsmall"
                                    margin={{ vertical: "auto" }}
                                >
                                    <Image
                                        fit="contain"
                                        src="/wine-placeholder.png"
                                    />
                                </Box>
                                <Grid
                                    columns={["auto", "auto"]}
                                    alignContent="center"
                                    pad={{
                                        horizontal: "xsmall",

                                    }}
                                    gap={{ column: "small" }}
                                >
                                    <Text weight="bold">Producer: </Text>
                                    <Text>{wine.producer}</Text>
                                    <Text weight="bold">Grape: </Text>
                                    <Text>{wine.grape}</Text>
                                    <Text weight="bold">Region: </Text>
                                    <Text>{wine.region}</Text>
                                    <Text weight="bold">Vintage: </Text>
                                    <Text>{wine.vintage !== -1 ? wine.vintage : NON_VINTAGE}</Text>
                                    <Text weight="bold">Price: </Text>
                                    <Text>{wine.bottleprice}</Text>
                                    <Text weight="bold">In-Stock: </Text>
                                    <Text>{wine.numberavailable}</Text>
                                    {wine.locations && <>
                                        <Text weight="bold" >Locations: </Text>
                                        <Button
                                            plain
                                            color="brand"
                                            onClick={() => setShowLocations(true)}
                                            label={<Text
                                                size="small"
                                                weight="bold"
                                                as="u"
                                            >Show Locations</Text>}
                                        />
                                    </>
                                    }
                                </Grid>
                            </CardBody>

                            <CardBody
                                justify="end"
                            >
                                <Box
                                    alignSelf="end"
                                    justify="center"
                                    margin="medium"
                                >
                                    <Button
                                        color="dark-3"
                                        onClick={() => setEditMode(true)}
                                        size="small"
                                        icon={<Edit
                                            size="small"
                                            color="dark-3"
                                        />}
                                        gap="xsmall"
                                        label={<Text
                                            size="small"
                                            weight="bold"
                                            color="dark-3"
                                        >Edit Wine</Text>}
                                    />
                                </Box>
                            </CardBody>
                        </>
                        : <>{renderLocations()}</>
                    }
                    {/* <CardBody
                        pad="medium"
                    >
                        <Box
                            border={{
                                color: "dark-3",
                                size: "small"
                            }}
                            height="100%"
                            pad="xsmall"
                            wrap
                            overflow={{
                                vertical: "auto",
                                horizontal: "hidden"
                            }}
                        >
                            {wine.tastingnotes
                                ? <List data={wine.tastingnotes} />
                                : <Text
                                    wordBreak="break-word"
                                >Tasting notes will show up here!
                                </Text>
                            }
                        </Box>
                    </CardBody> */}
                </Card>
                : <EditWineCard wine={wine} closeFunc={closeFunc} cancelEdit={() => setEditMode(false)} />
            }
        </Layer>
    )
}