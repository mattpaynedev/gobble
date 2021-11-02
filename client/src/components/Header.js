import React from 'react'
import Nav from './Nav';
// import { useLocation } from 'react-router-dom'

import { Button, Header, Image } from 'grommet'

function HeaderComponent({ headerClass, navClass }) {
    // const location = useLocation()
    // console.log(location)
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