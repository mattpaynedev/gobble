// import './Home.css'
import Header from '../Header'
import Footer from '../Footer'
import React from 'react'
import { Link } from 'react-router-dom'
import HeaderComponent from '../Header';
import { Box, Button, Heading, Main, Paragraph, Text } from 'grommet'
import FooterComponent from '../Footer';

export default function Home() {

    return (
        <Box
            background={
                {
                    color: "black",
                    position: "center center",
                    repeat: "no-repeat",
                    size: "cover",
                    image: "url(/background-compressed.jpg)"
                }}
            align="center"
        >
            <Box
                background="#18181890"
                width="100%"
            >
                <HeaderComponent />
                <Main>
                    <Box
                        width="xxlarge"
                        height={{ min: "100vh" }}
                        pad="medium"
                        alignSelf="center"
                    >
                        <Box>
                            <Box
                                align="end"
                                pad="medium"
                                style={{
                                    fontFamily: "'Josefin Slab', serif",
                                    textShadow: "5px 5px 10px #181818"
                                }}
                            >
                                <Heading level={1} margin="xsmall">I like on the table,</Heading>
                                <Heading level={1} margin="xsmall">when we're speaking,</Heading>
                                <Heading level={1} margin="xsmall">the light of a bottle</Heading>
                                <Heading level={1} margin="xsmall">of intelligent wine.</Heading>
                                <Heading level={3} margin="small">-Pablo Neruda</Heading>
                            </Box>
                        </Box>
                        <Box
                            direction="row-responsive"
                            align="center"
                            justify="between"
                            margin={{ vertical: "medium" }}
                            pad="large"
                        >
                            <Box>
                                <Paragraph margin="xsmall" weight="bold" size="xlarge">Gobble is a modern wine cellar management app.</Paragraph>
                                <Paragraph margin="xsmall" weight="bold" size="xlarge">Use it to catalog and track your collection with simple, easy-to-use tools.</Paragraph>
                            </Box>
                            <Link to='/collections'>
                                <Button
                                    color="accent-1"
                                    primary
                                    hoverIndicator
                                    label={<Text weight="bold" size="large">Get Started</Text>} />
                            </Link>
                        </Box>
                    </Box>
                </Main>
                <FooterComponent />
            </Box>
        </Box>
    );
}