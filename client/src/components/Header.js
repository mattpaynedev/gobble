import Nav from "./Nav";
import { Link } from 'react-router-dom'


function Header({ headerClass, navClass }) {
    return (
        <div>
            <header className={headerClass}>
                <h1><Link to='/'>GOBBLE</Link></h1>
                <h3>wine cellar management</h3>
            </header>
            <Nav
                navClass={navClass}
            />
        </div>
    );
}

export default Header