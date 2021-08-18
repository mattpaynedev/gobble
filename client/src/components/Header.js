import React from 'react'
import Nav from './Nav';
import { Link as RouterLink } from 'react-router-dom'

import { Anchor, Box, Button, Header, Image, Text } from 'grommet'

function HeaderComponent({ headerClass, navClass }) {
    return (
        <Header
            background='light-1'
            pad={{
                horizontal: "25px",
                vertical: "15px",
            }}
            border="bottom"
        >
            <Button
                a11yTitle='main logo'
                plain
                href='/'
                icon={
                    <Image
                        fit='cover'
                        alignSelf='center'
                        src='/logo-new.svg'
                        height='40px'
                    />
                }
            />
            <Nav />
        </Header>
    );
}

export default HeaderComponent