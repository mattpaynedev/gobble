
// import './App2.css';
import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Collections from './components/pages/Collections'
import Wines from './components/Wines'
import { useDispatch } from 'react-redux'
import { fetchCollections } from './features/collection/collectionSlice'



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCollections())
  })


  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/collections' component={Collections}></Route>
      <Route path='/collections/:collectionID' component={Wines}></Route>
    </Switch>
  )
}

export default App
