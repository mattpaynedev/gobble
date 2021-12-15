import React from 'react'
import Nav from './Nav';
import { useLocation } from 'react-router-dom'

import { Button, Header, Image } from 'grommet'

function HeaderComponent({ headerClass, navClass }) {
    const location = useLocation()
    const home = location.pathname === "/"
    return (
        <Header
            background={home ? null : 'light-1'}
            pad={{
                horizontal: "25px",
                vertical: "15px",
            }}
            border={home ? null : "bottom"}
        >
            <Button
                a11yTitle='main logo'
                plain
                href='/'
                icon={
                    <Image
                        fit='cover'
                        alignSelf='center'
                        src={home ? '/logo-new-white.svg' : '/logo-new.svg'}
                        height={home ? '60px' : '40px'}
                    />
                }
            />
            <Nav />
        </Header>
    );
}

export default HeaderComponent