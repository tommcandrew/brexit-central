import React from 'react'
import './MainNav.css'

const MainNav = () => (
    <div className="nav-container">
        <div id="travel" className="nav-item nav-item__travel">
            <h1 className="nav-item__title">News</h1>
        </div>
        <div className="nav-item nav-item__news">
            <h1 className="nav-item__title">Travel</h1>
        </div>
        <div className="nav-item nav-item__timeline">
            <h1 className="nav-item__title">Timeline</h1>
        </div>
    </div>
)

export default MainNav
