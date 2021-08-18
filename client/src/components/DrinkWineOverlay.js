import { Card, CardBody, CardFooter, Box, Image, Grid, Text, Layer, Button, CardHeader, TextArea } from 'grommet'
import { Close } from 'grommet-icons'
import React, { useState } from 'react'

export default function WineCardOverlay(props) {
    const [inputText, setInputText] = useState("")

    // TO BE UPDATED FOR DRINK WINE

    return (
        <Layer
            onClickOutside={props.closeFunc}
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
                        onClick={props.closeFunc}
                        icon={<Close
                            size="small"
                            color="accent-1"
                        />}
                        gap="xxsmall"
                        label={<Text
                            size="small"
                            weight="bold"
                            color="accent-1"
                        >close</Text>}
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
                        <Text>{props.wine.producer}</Text>
                        <Text weight="bold">Grape: </Text>
                        <Text>{props.wine.grape}</Text>
                        <Text weight="bold">Region: </Text>
                        <Text>{props.wine.region}</Text>
                        <Text weight="bold">Vintage: </Text>
                        <Text>{props.wine.vintage}</Text>
                        <Text weight="bold">Price: </Text>
                        <Text>{props.wine.bottleprice}</Text>
                        <Text weight="bold">In-Stock: </Text>
                        <Text>{props.wine.numberavailable}</Text>
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
                    <Button
                        secondary
                        margin="small"
                        gap="xxsmall"
                        label={<Text
                            size="small"
                            weight="bold"
                            color="accent-1"
                        >Save Notes</Text>}
                    />
                </CardBody>
            </Card>
        </Layer>
    )
}