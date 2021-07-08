import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function Nav({ navClass }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => setMenuOpen(!menuOpen)

    const closeMenu = () => setMenuOpen(false)

    let domNode = useClickOutside(() => {
        setMenuOpen(false);
    });

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
        <nav className='nav-wrapper'>
            <div className='nav-menu-wrapper' ref={domNode}>
                <div className='nav-button-wrapper'>
                    <button
                        className={menuOpen ? 'nav-menu-btn-open' : 'nav-menu-btn-closed'}
                        onClick={handleClick}
                    ></button>
                </div>
                <div

                    className={menuOpen ? 'nav-menu-open' : 'nav-menu-closed'}>
                    {showLinks}
                </div>
            </div>
        </nav>
    )
}

export default Nav

let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        let maybeHandler = (event) => {
            if (!domNode.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });

    return domNode;
};