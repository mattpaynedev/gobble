import { NavLink } from 'react-router-dom'


function Nav() {
    return (
        <nav>
            <NavLink to="/" activeClassName="activeNav" exact>Home</NavLink>
            <NavLink to="/collections" activeClassName="activeNav" exact>My Collection</NavLink>
            <NavLink to="/logout" activeClassName="activeNav" exact>Log Out</NavLink>
        </nav>
    )
}

export default Nav