import { Card, CardBody, CardFooter, Box, Image, Grid, Text, Layer, Button, CardHeader, TextArea, List } from 'grommet'
import { Close, Edit, Medium } from 'grommet-icons'
import React, { useState } from 'react'
import EditWineCard from './EditWineCard'

export default function WineCardOverlay({ wine, closeFunc }) {
    const [editMode, setEditMode] = useState(false)

    const handleClick = (event) => {
        event.preventDefault()
        closeFunc()
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
                        justify="end"
                    >
                        <Box
                            alignSelf="end"
                            justify="center"
                            margin="medium"
                        >
                            <Button
                                // margin={{ horizontal: "medium" }}
                                onClick={() => setEditMode(true)}
                                icon={<Edit
                                    size="medium"
                                    color="brand"
                                />}
                                gap="xsmall"
                                label={<Text
                                    size="medium"
                                    weight="bold"
                                    color="brand"
                                >Edit Wine</Text>}
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
                : <EditWineCard wine={wine} closeFunc={closeFunc} cancelEdit={() => setEditMode(false)} />
            }
        </Layer>
    )
}