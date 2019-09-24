import React from 'react'
import './MainNav.css'
import {Link} from 'react-router-dom'

const MainNav = () => (
    <div className="nav-container">
        <Link to="/news" className="nav-item nav-item__travel">
            <h1 className="nav-item__title">News</h1>
        </Link>
        <Link to="/travel" className="nav-item nav-item__news">
            <h1 className="nav-item__title">Travel</h1>
        </Link>
        <Link to="/timeline" className="nav-item nav-item__timeline">
            <h1 className="nav-item__title">Timeline</h1>
        </Link>
    </div>
)

export default MainNav