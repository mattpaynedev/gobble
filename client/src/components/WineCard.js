import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, Image, Text } from 'grommet';
import { Add, More } from 'grommet-icons';
import React, { useState } from 'react'
import DrinkWineOverlay from './DrinkWineOverlay';
import WineCardOverlay from './WineCardOverlay';
import { NON_VINTAGE } from '../utils'

function WineCard({ wine, collectionInfo }) {
    //useState for expanded status
    const [displayMoreInfo, setDisplayMoreInfo] = useState(false)
    const [displayDrinkWine, setDisplayDrinkWine] = useState(false)

    //handleClick
    const handleMoreInfoClick = (event) => {
        event.preventDefault();
        toggleMoreInfo()
    }

    const handleDrinkWineClick = (event) => {
        event.preventDefault();
        toggleDrinkWine()
    }

    const toggleDrinkWine = () => setDisplayDrinkWine(!displayDrinkWine)

    const toggleMoreInfo = () => setDisplayMoreInfo(!displayMoreInfo)
    //handle note input and submit

    //handle "Drink This!" button



    return (
        <>
            <Card
                height="auto"
                width="auto"
                background="light-1"
            >
                <CardHeader
                    justify="end"
                    margin={{
                        top: "small",
                        right: "small",
                    }}
                >
                    <Button
                        primary
                        disabled={!wine.numberavailable || null}
                        size="small"
                        label={<Text
                            size="small"
                            weight="bold"
                        >Drink This!</Text>}
                        onClick={handleDrinkWineClick}
                    />
                </CardHeader>
                <CardBody
                    direction="row-responsive"
                    pad={{
                        horizontal: "medium",
                        top: "medium",
                        bottom: "xsmall"
                    }}
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
                        <Text>{wine.numberavailable || 0}</Text>
                    </Grid>
                </CardBody>
                <CardFooter
                    justify="end"
                    margin={{
                        bottom: "small",
                        right: "small"
                    }}
                >
                    <Button
                        plain
                        margin={{ horizontal: "small" }}
                        onClick={handleMoreInfoClick}
                        icon={<Add
                            size="small"
                            color="accent-1"
                        />}
                        gap="xxsmall"
                        label={<Text
                            size="small"
                            weight="bold"
                            color="accent-1"
                        >more</Text>}
                    />
                </CardFooter>
                {displayMoreInfo ? <WineCardOverlay closeFunc={toggleMoreInfo} wine={wine} /> : null}
                {displayDrinkWine ? <DrinkWineOverlay closeFunc={toggleDrinkWine} wine={wine} collectionInfo={collectionInfo} /> : null}
            </Card>
        </>
    )
}

export default WineCard
