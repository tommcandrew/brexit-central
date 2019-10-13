import React from 'react'
import './Header.css'

export default function Header(props) {
    return (
        <div className="header-container">
            <span className='home-link'>
                <div className='flags-container' >
                    <span className='flags brit-flag'>Bre</span>
                    <span className='flags euro-flag'>xit</span>
                </div>
                <span className="planner" onClick={() => props.updateNextPage('home')}>
                    Planner
                </span>
            </span>
        </div>
    )
}
