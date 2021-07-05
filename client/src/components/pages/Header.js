import Nav from "./Nav";
import { Link } from 'react-router-dom'


function Header() {
    return (
        <div>
            <header>
                <h1><Link to='/'>GOBBLE</Link></h1>
                <h3>wine cellar management</h3>
            </header>
            <Nav />
        </div>
    );
}

export default Header