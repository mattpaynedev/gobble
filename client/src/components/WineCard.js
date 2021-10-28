import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, Image, Text } from 'grommet';
import { Add, More } from 'grommet-icons';
import React, { useState } from 'react'
import DrinkWineOverlay from './DrinkWineOverlay';
import WineCardOverlay from './WineCardOverlay';

function WineCard(props) {
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
                        <Text>{props.producer}</Text>
                        <Text weight="bold">Grape: </Text>
                        <Text>{props.grape}</Text>
                        <Text weight="bold">Region: </Text>
                        <Text>{props.region}</Text>
                        <Text weight="bold">Vintage: </Text>
                        <Text>{props.vintage}</Text>
                        <Text weight="bold">Price: </Text>
                        <Text>{props.bottleprice}</Text>
                        <Text weight="bold">In-Stock: </Text>
                        <Text>{props.numberavailable}</Text>
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
                {displayMoreInfo ? <WineCardOverlay closeFunc={toggleMoreInfo} wine={props} /> : null}
                {displayDrinkWine ? <DrinkWineOverlay closeFunc={toggleDrinkWine} wine={props} /> : null}
            </Card>
        </>
    )
}

export default WineCard
