import React from 'react'
import './App.css'
import Container from './Components/Container/Container'
import NewsAggregator from './Components/NewsAggregator/NewsAggregator'
import FlightFinder from './Components/FlightFinder/FlightFinder'
import Timeline from './Components/Timeline/Timeline'
import { BrowserRouter, Route, Link } from 'react-router-dom'

function App () {
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <Link className='router-link' to='/'>
          <div className='flags-container'>
            <span className='flags brit-flag'>Bre</span>
            <span className='flags euro-flag'>xit</span>
          </div>
          Planner
        </Link>
        <Route exact path='/' component={Container} />
        <Route path='/news' component={NewsAggregator} />
        <Route path='/travel' component={FlightFinder} />
        <Route path='/timeline' component={Timeline} />
      </BrowserRouter>
    </div>
  )
}

export default App
