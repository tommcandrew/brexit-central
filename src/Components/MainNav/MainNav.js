import React from 'react'
import './MainNav.css'

const MainNav = () => (
    <div className="circle-container">
        <div id="travel" className="travel circle">
            <h1>News</h1>
        </div>
        <div className="news circle">
            <h1>Travel</h1>
        </div>
        <div className="timeline circle">
            <h1>Timeline</h1>
        </div>
        <div className="faqs circle">
            <h1>FAQs</h1>
        </div>
    </div>
)

export default MainNav
