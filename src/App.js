import React from 'react'
import './App.css'

import Container from './Components/Container/Container'
// import NewsAggregator from './Components/NewsAggregator/NewsAggregator'
// import Map from './Components/Map/Map'
// import Timeline from './Components/Timeline/Timeline'
import {BrowserRouter, Route, Link} from 'react-router-dom'

function App() {
  return (

    <div>

      <BrowserRouter>
        <h1 className="container__title"><Link className="router-link" to="/" id="main-title">Brexit Planner</Link></h1>
        <Route exact path='/' component={Container} />
        {/* <Route path='/news' component={NewsAggregator}></Route>
        <Route path='/travel' component={Map}></Route>
        <Route path='/timeline' component={Timeline}></Route> */}

      </BrowserRouter>

    </div>

  )
}

export default App