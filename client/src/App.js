
import './App2.css';
import { Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Collections from './components/pages/Collections'
import Wines from './components/Wines'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/collections' component={Collections}></Route>
      <Route path='/collections/:collectionID' component={Wines}></Route>
    </Switch>
  )
}

export default App
