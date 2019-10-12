import React from 'react'
import './Header.css'

export default function Header() {
    return (
        <a className='router-link' href='/'>
            <div className='flags-container'>
                <span className='flags brit-flag'>Bre</span>
                <span className='flags euro-flag'>xit</span>
            </div>
            Planner
      </a>
    )
}
