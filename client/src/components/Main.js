import { NavLink, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Wines from './Wines'

function Main() {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/collections' component={Collections}></Route>
            <Route path='/collections/:collectionID' component={Wines}></Route>
        </Switch>
    )
}

export default Main