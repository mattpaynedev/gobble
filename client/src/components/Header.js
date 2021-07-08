import Nav from "./Nav";
import { Link } from 'react-router-dom'


function Header({ headerClass, navClass }) {
    return (
        <>
            <header className={headerClass}>
                <h1><Link to='/'>GOBBLE</Link></h1>

            </header>
            <Nav
                navClass={navClass}
            />
        </>
    );
}

export default Header