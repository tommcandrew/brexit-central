import React from 'react'
import './MainNav.css'
import boris from '../../assets/boris-square.jpg'
import demo from '../../assets/demo-square.jpg'
import junker from '../../assets/junker-square.jpg'
import airport from '../../assets/airport-square.jpg'
import passport from '../../assets/passport-square.jpg'
import map from '../../assets/map-square.png'
import facepaint from '../../assets/facepaint-square.jpg'
import corbyn from '../../assets/corbyn-square.jpg'
import may from '../../assets/may-square.jpg'

const MainNav = (props) => (

    <div className="cards-container">
        <span onClick={() => props.updateNextPage('news')} className="card-container news-container">
            <div className="img-container">
                <img id="boris" src={boris} alt="" />
                <img id="demo" src={demo} alt="" />
                <img id="junker" src={junker} alt="" />
            </div>
            <div className="card-container__content">
                <h2>NEWS</h2>
                <p>Get the latest Brexit news.</p>
            </div>
        </span>

        <span onClick={() => props.updateNextPage('travel')} className="card-container travel-container">
            <div className="img-container">
                <img id="map" src={map} alt="" />
                <img id="airport" src={airport} alt="" />
                <img id="passport" src={passport} alt="" />
            </div>
            <div className="card-container__content">
                <h2>TRAVEL</h2>
                <p>Buy a ticket out of here!</p>
            </div>
        </span>

        <span onClick={() => props.updateNextPage('timeline')} className="card-container timeline-container">
            <div className="img-container">
                <img id="facepaint" src={facepaint} alt="" />
                <img id="corbyn" src={corbyn} alt="" />
                <img id="may" src={may} alt="" />
            </div>
            <div className="card-container__content">
                <h2>TIMELINE</h2>
                <p>Refresh your memory of Brexit history.</p>
            </div>
        </span>
    </div>

)

export default MainNav