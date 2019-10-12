import React from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import NewsAggregator from './Components/NewsAggregator/NewsAggregator'
import FlightFinder from './Components/FlightFinder/FlightFinder'
import Timeline from './Components/Timeline/Timeline'
import {BrowserRouter, Route} from 'react-router-dom'

function App() {
  return (
    <div className='app-wrapper'>
      <Header />
      <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route path='/news' component={NewsAggregator} />
        <Route path='/travel' component={FlightFinder} />
        <Route path='/timeline' component={Timeline} />
      </BrowserRouter>
    </div>
  )
}

export default App