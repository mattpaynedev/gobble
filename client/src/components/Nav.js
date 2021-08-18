import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Anchor, Box, DropButton, Text } from 'grommet'
import { Checkbox, Close } from 'grommet-icons'
import Menu from './Menu';

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => setMenuOpen(!menuOpen)

    const closeMenu = () => setMenuOpen(false)

    // let domNode = useClickOutside(() => {
    //     setMenuOpen(false);
    // });

    let showLinks = (<></>)

    if (menuOpen) {
        showLinks = (
            <>
                <NavLink
                    to="/"
                    exact
                    onClick={closeMenu}
                >Home</NavLink>
                <NavLink
                    to="/collections"
                    exact
                    onClick={closeMenu}
                >My Collection</NavLink>
                <NavLink
                    to="/logout"
                    exact
                    onClick={closeMenu}
                >Log Out</NavLink>
            </>
        )
    }

    return (
        <DropButton
            a11yTitle='open or close main menu'
            icon={
                menuOpen
                    ? <Close size='medium' color='brand' />
                    : <Checkbox size='medium' color='brand' />
            }
            onClick={handleClick}
            onClose={handleClick}
            dropProps={{
                round: 'small',
                border: { color: 'brand', size: 'small' },
                elevation: 'large',
                width: 'small',
            }}
            dropContent={
                < Box
                    direction='column'
                    pad='medium'

                >
                    <Anchor
                        href='/'
                        margin={{
                            vertical: 'xsmall',
                        }}
                        label={
                            <Text
                                size='medium'
                                weight='bold'
                            >Home</Text>
                        }
                    />
                    <Anchor
                        href='/collections'
                        margin={{
                            vertical: 'xsmall',
                        }}
                        label={
                            <Text
                                size='medium'
                                weight='bold'
                            >Collection</Text>
                        }
                    />
                    <Anchor
                        href='/logout'
                        margin={{
                            vertical: 'xsmall',
                        }}
                        label={
                            <Text
                                size='medium'
                                weight='bold'
                            >Log Out</Text>
                        }
                    />

                </Box >
            }
            dropAlign={{
                top: 'bottom',
                right: 'right',
            }}
        />

    )

    // return (
    //     <nav className='nav-wrapper'>
    //         <div className='nav-menu-wrapper' ref={domNode}>
    //             <div className='nav-button-wrapper'>
    //                 <button
    //                     className={menuOpen ? 'nav-menu-btn-open' : 'nav-menu-btn-closed'}
    //                     onClick={handleClick}
    //                 ></button>
    //             </div>
    //             <div

    //                 className={menuOpen ? 'nav-menu-open' : 'nav-menu-closed'}>
    //                 {showLinks}
    //             </div>
    //         </div>
    //     </nav>
    // )
}

export default Nav

// let useClickOutside = (handler) => {
//     let domNode = useRef();

//     useEffect(() => {
//         let maybeHandler = (event) => {
//             if (!domNode.current.contains(event.target)) {
//                 handler();
//             }
//         };

//         document.addEventListener("mousedown", maybeHandler);

//         return () => {
//             document.removeEventListener("mousedown", maybeHandler);
//         };
//     });

//     return domNode;
// };