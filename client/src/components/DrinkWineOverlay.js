import { Card, CardBody, CardFooter, Box, Image, Grid, Text, Layer, Button, CardHeader, TextArea, Select } from 'grommet'
import { Close } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { drinkWine } from '../features/wine/wineSlice'

const status = {
    idle: "idle",
    saving: "saving",
    saved: "saved"
}

export default function DrinkWineOverlay({ wine, closeFunc }) {
    const [inputText, setInputText] = useState("")
    const [saveStatus, setSaveStatus] = useState(status.idle)
    const [bottleIndex, setBottleIndex] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        if (saveStatus === status.saved) {
            const timer = setTimeout(() => {
                closeFunc()
                setSaveStatus(status.idle)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [saveStatus, closeFunc])

    const drinkWineHandler = (wineID, collectionID) => {
        setSaveStatus(status.saving)
        dispatch(drinkWine(wineID, "6032def2900ef3a9b2b1d8f4"))
        setSaveStatus(status.saved)
    }

    const handleClick = (event) => {
        event.preventDefault()
        closeFunc()
    }

    const renderLocations = () => {
        const locations = Object.keys(wine.locations).map(loc => {
            return <Text size="small">{loc}</Text>
        })

        return (
            < Select
                options={locations}
                value={locations[bottleIndex]}
                onChange={(event) => setBottleIndex(event.currentTarget.value)}
                size="small"
            />
        )
    }

    return (
        <Layer
            onClickOutside={closeFunc}
        >
            <Card
                height="medium"
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
                        icon={<Close
                            size="small"
                            color="accent-1"
                        />}
                        gap="xxsmall"
                        label={<Text
                            size="small"
                            weight="bold"
                            color="accent-1"
                        >{saveStatus === status.saved ? "close" : "cancel"}</Text>}
                    />
                </CardHeader>
                {saveStatus !== status.saved
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
                                <Text>{wine.vintage}</Text>
                                <Text weight="bold">Price: </Text>
                                <Text>{wine.bottleprice}</Text>
                                <Text weight="bold">In-Stock: </Text>
                                <Text>{wine.numberavailable}</Text>
                                <Text weight="bold">Select A Bottle: </Text>
                                {renderLocations()}
                            </Grid>
                        </CardBody>
                        <CardBody
                            pad="medium"
                        >
                            <TextArea
                                placeholder="Tasting notes..."
                                value={inputText}
                                onChange={(event => setInputText(event.currentTarget.value))}
                                resize={false}
                                fill
                            />
                            <Box
                                width="small"
                                alignSelf="end"
                                justify="center"
                                margin={{ top: "small" }}
                            >
                                <Button
                                    primary
                                    hoverIndicator
                                    onClick={() => drinkWineHandler(wine.id)}
                                    label={<Text
                                        size="small"
                                        weight="bold"
                                    >Save and Drink!</Text>}
                                />
                            </Box>
                        </CardBody>
                    </>
                    : <CardBody
                        direction="row-responsive"
                        pad="large"
                        justify="center"
                    >
                        <Text weight="bold">Updates saved!</Text>
                    </CardBody>
                }
            </Card>
        </Layer>
    )
}