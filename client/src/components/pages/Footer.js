import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>Powered by <Link to='https://golang.org/'>&nbsp;Go&nbsp;</Link> and <Link to='https://reactjs.org/'>&nbsp;React&nbsp;</Link> - Copyright {new Date().getFullYear()}</footer>
    )
}

export default Footer