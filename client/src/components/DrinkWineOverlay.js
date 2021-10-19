import { Card, CardBody, CardFooter, Box, Image, Grid, Text, Layer, Button, CardHeader, TextArea } from 'grommet'
import { Close } from 'grommet-icons'
import React, { useState } from 'react'
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
    const dispatch = useDispatch()

    const drinkWineHandler = (wineID, collectionID) => {
        setSaveStatus(status.saving)
        dispatch(drinkWine(wineID, "6032def2900ef3a9b2b1d8f4"))
        setSaveStatus(status.saved)
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
                        onClick={closeFunc}
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
                        top: "medium",
                        bottom: "xsmall"
                    }}
                    justify="center"
                >
                    {saveStatus}
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
            </Card>
        </Layer>
    )
}