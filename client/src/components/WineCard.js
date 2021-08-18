import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, Image, Text } from 'grommet';
import { Add, More } from 'grommet-icons';
import React, { useState } from 'react'
import WineCardOverlay from './WineCardOverlay';

function WineCard(props) {
    //useState for expanded status
    const [displayMoreInfo, setDisplayMoreInfo] = useState(false)
    const [displayDrinkWine, setDisplayDrinkWine] = useState(false)

    //handleClick
    const handleMoreInfoClick = (event) => {
        event.preventDefault();
        setDisplayMoreInfo(!displayMoreInfo)
    }

    const handleDrinkWineClick = (event) => {
        event.preventDefault();
        setDisplayDrinkWine(!displayDrinkWine)
    }
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
                {displayMoreInfo ? <WineCardOverlay closeFunc={handleMoreInfoClick} wine={props} /> : null}
            </Card>
        </>
    )
}
// need to add pop up on click

export default WineCard


{/* <div className='card-item'>
                <div className='card-item-top-section'>
                    <div className='card-item-img-wrapper'>
                        <img
                            className='card-item-img'
                            alt={props.producer}
                            src='/wine-placeholder.png'
                        />
                    </div>
                    <table className='card-item-table'>
                        <tbody>
                            <tr>
                                <td className='card-item-category-text'>Producer: </td>
                                <td className='card-item-data-text'>{props.producer}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Grape: </td>
                                <td className='card-item-data-text'>{props.grape}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Region: </td>
                                <td className='card-item-data-text'>{props.region}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Vintage: </td>
                                <td className='card-item-data-text'>{props.vintage}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Location: </td>
                                <td className='card-item-data-text'>{props.location}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Price Paid: </td>
                                <td className='card-item-data-text'>{props.bottleprice} per bottle</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'># Available: </td>
                                <td className='card-item-data-text'>{props.numberavailable}</td>
                            </tr>
                        </tbody>
                    </table>
                    {displayAll &&
                        <div className='card-item-textarea-wrapper'>
                            <textarea className='card-item-wine-notes' placeholder="What do you think? Insert tasting notes here..."></textarea>
                            <button
                                className='btn-card-submit-notes'
                            >Save Notes</button>
                        </div>
                    }
                </div>
                <div className='card-item-bottom-section'>
                    <button className='btn-card-drink-wine'>Drink This!</button>
                    <button
                        className={!displayAll ? 'btn-card-expand-toggle' : 'btn-card-close-toggle'}
                        onClick={handleExpandClick}
                    >{!displayAll ? "Expand" : "Close"}</button>
                </div>
            </div> */}