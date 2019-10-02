import React from 'react'
import './MainNav.css'
import {Link} from 'react-router-dom'

const MainNav = () => (

    <div className="cards-container">
        <Link to="/news" className="card-container news-container">
            <div className="card-container__content">
                <h2>NEWS</h2>
                <p>Get the latest Brexit news.</p>
            </div>
        </Link>

        <Link to="/travel" className="card-container travel-container">
            <div className="card-container__content">
                <h2>TRAVEL</h2>
                <p>Buy a ticket out of here!</p>
            </div>
        </Link>

        <Link to="/timeline" className="card-container timeline-container">
            <div className="card-container__content">
                <h2>TIMELINE</h2>
                <p>Refresh your memory of Brexit history.</p>
            </div>
        </Link>
    </div>

)

export default MainNav