import React from 'react'
import './App.css'
import Container from './Components/Container/Container'
import NewsAggregator from './Components/NewsAggregator/NewsAggregator'
import FlightFinder from './Components/FlightFinder/FlightFinder'
import Timeline from './Components/Timeline/Timeline'
import {BrowserRouter, Route, Link} from 'react-router-dom'

function App() {
  return (

    <div className="app-wrapper">

      <BrowserRouter>
        <h1 className="container__title"><Link className="router-link" to="/">Brexit Planner</Link></h1>
        <Route exact path='/' component={Container} />
        <Route path='/news' component={NewsAggregator}></Route>
        <Route path='/travel' component={FlightFinder}></Route>
        <Route path='/timeline' component={Timeline}></Route>

      </BrowserRouter>

    </div>

  )
}

export default App