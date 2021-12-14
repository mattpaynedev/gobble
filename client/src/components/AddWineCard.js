import React, { useState } from 'react'
import { Card, CardBody, Box, Image, Grid, Layer, Text, Button, CardHeader, TextInput, Select } from 'grommet'
import { Close } from 'grommet-icons'
import { useDispatch } from 'react-redux'
import { addWine } from '../features/wine/wineSlice'
import { generateVintages, NON_VINTAGE } from '../utils'
import { editCollection } from '../features/collection/collectionSlice'

export default function AddWineCard({ closeFunc, availableLocations, collectionInfo }) {
    const [producer, setProducer] = useState("")
    const [grape, setGrape] = useState("")
    const [region, setRegion] = useState("")
    const [vintage, setVintage] = useState(-1)
    const [bottleprice, setBottleprice] = useState(0)
    const [location, setLocation] = useState(availableLocations[0])
    const [numberavailable, setNumberavailable] = useState(1)
    const dispatch = useDispatch()

    console.log({ collectionInfo })

    const handleClick = (event) => {
        event.preventDefault()
        closeFunc()
    }

    const saveChanges = (event) => {
        event.preventDefault()

        const newWine = {
            // ...wine,
            // id: wine.id,
            producer: producer,
            vintage: vintage,
            grape: grape,
            region: region,
            bottleprice: parseFloat(bottleprice),
            locations: {
                [location]: true
            },
            numberavailable: numberavailable,
            // tastingnotes: wine.tastingnotes,
            collectionid: "6032def2900ef3a9b2b1d8f4",
        }

        const updatedAvailableLocations = {
            ...collectionInfo.available
        }

        delete updatedAvailableLocations[location]

        const updatedColl = {
            ...collectionInfo,
            available: updatedAvailableLocations
        }

        console.log({ updatedColl })

        dispatch(addWine(newWine, updatedColl, "6032def2900ef3a9b2b1d8f4"))
        dispatch(editCollection(updatedColl, null, updatedColl.id))
        closeFunc()
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
                        >cancel</Text>}
                    />
                </CardHeader>

                <CardBody
                    direction="row-responsive"
                    pad={{
                        horizontal: "medium",
                        vertical: "medium"
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
                        align="center"
                        pad={{
                            horizontal: "xsmall",

                        }}
                        gap={{ column: "small", row: "xsmall" }}
                    >
                        <Text weight="bold">Producer: </Text>
                        <TextInput
                            padding="xsmall"
                            size="medium"
                            name="producer"
                            value={producer}
                            onChange={(event) => setProducer(event.currentTarget.value)}
                        />
                        <Text weight="bold">Grape: </Text>
                        <TextInput
                            size="medium"
                            name="grape"
                            value={grape}
                            onChange={(event) => setGrape(event.currentTarget.value)}
                        />
                        <Text weight="bold">Region: </Text>
                        <TextInput
                            size="medium"
                            name="region"
                            value={region}
                            onChange={(event) => setRegion(event.currentTarget.value)}
                        />
                        <Text weight="bold">Vintage: </Text>
                        <Select
                            options={generateVintages()}
                            size="medium"
                            name="vintage"
                            value={vintage !== -1 ? vintage : NON_VINTAGE}
                            onChange={({ option }) => {
                                setVintage(option !== NON_VINTAGE ? option : -1)
                            }}
                        />
                        <Text weight="bold">Price: </Text>
                        <TextInput
                            size="medium"
                            type="number"
                            min={0.00}
                            max={100000}
                            step={0.01}
                            name="bottleprice"
                            value={bottleprice}
                            onChange={(event) => setBottleprice(event.currentTarget.value)}
                        />
                        <Text weight="bold">Location: </Text>
                        <Select
                            options={availableLocations}
                            size="medium"
                            name="location"
                            value={location}
                            onChange={({ option }) => {
                                setLocation(option)
                            }}
                        />
                    </Grid>
                </CardBody>
                <CardBody
                    pad="medium"
                >
                    <Box
                        width="small"
                        alignSelf="end"
                        justify="center"
                    >
                        <Button
                            primary
                            hoverIndicator
                            onClick={saveChanges}
                            label={<Text
                                size="small"
                                weight="bold"
                            >Save Changes</Text>}
                        />
                    </Box>
                </CardBody>
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
        </Layer>
    )
}