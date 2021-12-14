import { Card, CardBody, Box, Image, Grid, Text, Layer, Button, CardHeader, Select } from 'grommet'
import { Close } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editWine } from '../features/wine/wineSlice'
import { NON_VINTAGE } from '../utils'

const status = {
    idle: "idle",
    saving: "saving",
    saved: "saved"
}

export default function DrinkWineOverlay({ wine, closeFunc }) {
    const locations = wine.locations ? Object.keys(wine.locations) : null
    // const [inputText, setInputText] = useState("")
    const [saveStatus, setSaveStatus] = useState(status.idle)
    const [bottleLocation, setBottleLocation] = useState(locations ? locations[0] : null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (saveStatus === status.saved) {
            const timer = setTimeout(() => {
                closeFunc()
                setSaveStatus(status.idle)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [saveStatus, closeFunc])

    const drinkWineHandler = () => {
        const updatedLocations = {
            ...wine.locations
        }

        delete updatedLocations[bottleLocation]
        console.log(updatedLocations)

        const changes = {
            ...wine,
            numberavailable: wine.numberavailable - 1,
            locations: updatedLocations
        }
        setSaveStatus(status.saving)
        dispatch(editWine(changes, wine.id, "6032def2900ef3a9b2b1d8f4"))
        setSaveStatus(status.saved)
    }

    const handleClick = (event) => {
        event.preventDefault()
        closeFunc()
    }

    const renderLocations = () => {
        return (
            < Select
                options={locations}
                value={bottleLocation}
                onChange={(event) => setBottleLocation(event.target.value)}
                size="medium"
                valueLabel={<Text
                    margin={{ horizontal: "xsmall" }}
                    size="medium"
                    weight="bold">{bottleLocation}</Text>}
            />
        )
    }

    return (
        <Layer
            onClickOutside={closeFunc}
        >
            <Card
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
                                <Text>{wine.vintage !== -1 ? wine.vintage : NON_VINTAGE}</Text>
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
                            justify="end"
                        >
                            {/* <TextArea
                                placeholder="Tasting notes..."
                                value={inputText}
                                onChange={(event => setInputText(event.currentTarget.value))}
                                resize={false}
                                fill
                            /> */}
                            <Box
                                width="small"
                                alignSelf="end"
                                justify="center"
                                margin={{ top: "small" }}
                            >
                                <Button
                                    primary
                                    hoverIndicator
                                    onClick={drinkWineHandler}
                                    label={<Text
                                        size="small"
                                        weight="bold"
                                    >Drink this!</Text>}
                                />
                            </Box>
                        </CardBody>
                    </>
                    : <CardBody
                        direction="row-responsive"
                        pad="large"
                        justify="center"
                    >
                        <Text weight="bold">Updates saved</Text>
                    </CardBody>
                }
            </Card>
        </Layer>
    )
}