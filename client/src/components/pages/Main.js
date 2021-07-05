import { NavLink, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Collections from './Collections'
import Wines from './Wines'
import WineCard from './WineCard'
import Collection from './Collection'

function Main() {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/collections' component={Collections}></Route>
            <Route path='/collections/:collectionID' component={Wines}></Route>
            <Route path='/winecard' component={WineCard}></Route>
            <Route path='/test' componenet={Collection}></Route>
        </Switch>
    )
}

export default Main