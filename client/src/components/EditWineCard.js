import React, { useState } from 'react'
import { Card, CardBody, CardFooter, Box, Image, Grid, Text, Layer, Button, CardHeader, TextArea, List, TextInput, Select } from 'grommet'
import { Close, Yoga } from 'grommet-icons'
import { useDispatch } from 'react-redux'
import { editWine } from '../features/wine/wineSlice'

const generateVintages = () => {
    const currYear = new Date().getFullYear()
    let year = currYear + 1
    const vintages = []
    while (year >= currYear - 75) {
        vintages.push(year)
        year--
    }
    // console.log(vintages)
    return vintages
}


export default function EditWineCard({ wine, closeFunc, cancelEdit }) {
    const [producer, setProducer] = useState(wine.producer)
    const [grape, setGrape] = useState(wine.grape)
    const [region, setRegion] = useState(wine.region)
    const [vintage, setVintage] = useState(wine.vintage)
    const [bottleprice, setBottleprice] = useState(wine.bottleprice)
    const dispatch = useDispatch()

    const handleClick = (event) => {
        event.preventDefault()
        cancelEdit()
    }

    const saveChanges = (event) => {
        event.preventDefault()

        const changes = {
            id: wine.id,
            producer: producer,
            vintage: vintage,
            grape: grape,
            region: region,
            bottleprice: bottleprice,
            locations: {
                A3: true,
                A4: true,
                A5: true,
                B3: true,
                B4: true,
                B5: true,
                C3: true,
                C4: true,
                C5: true
            },
            numberavailable: wine.numberavailable,
            // tastingnotes: wine.tastingnotes,
            collectionid: "6032def2900ef3a9b2b1d8f4",
        }

        dispatch(editWine(changes, wine.id, "6032def2900ef3a9b2b1d8f4"))
        cancelEdit()
    }

    return (
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
                        value={vintage}
                        onChange={({ option }) => setVintage(option)}
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
                    <Text weight="bold">In-Stock: </Text>
                    <Text>{wine.numberavailable}</Text>
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
    )
}