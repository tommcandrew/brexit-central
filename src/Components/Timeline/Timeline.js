import React from 'react'
import timelineData from './timelineData'
import './Timeline.css'
import TimelineElement from './TimelineElement'
import {Link} from 'react-router-dom'

class Timeline extends React.Component {

    componentDidMount() {

        //the following code adds classes to the elements for animation when the user scrolls down the page

        const containerDivs = document.getElementsByClassName('event-container')
        const contentDivs = document.getElementsByClassName('event-container__content')
        const circles = document.getElementsByClassName('event-container__circle')

        //the loops count from 1 so as not to include the first event on timeline (should be visible when user opens page)

        for (let i = 1; i < containerDivs.length; i++) {
            containerDivs[i].classList.add('--hidden')
        }

        window.addEventListener('scroll', () => {
            for (let i = 1; i < containerDivs.length; i++) {
                if (window.scrollY >= containerDivs[i].offsetTop - 150) {
                    containerDivs[i].classList.remove('--hidden')
                    circles[i].classList.add('--grow')
                    if (containerDivs[i].classList.contains('event-container--left')) {
                        contentDivs[i].classList.add('--slide-left')
                    } else {
                        contentDivs[i].classList.add('--slide-right')
                    }
                }
            }
        })
    }

    render() {

        let events = timelineData.map((event, index) => {
            let side
            if (index % 2 === 0) {
                side = 'left'
            } else {
                side = 'right'
            }
            let mediaTag
            if (event.media.type === 'image') {
                mediaTag = <img src={event.media.src} alt={event.media.alt}></img>
            } else {
                mediaTag = <iframe src={event.media.src} title={event.media.title} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            }
            return (
                <TimelineElement side={side} mediaTag={mediaTag} mediaType={event.media.type} date={event.date} text={event.text} />
            )
        }
        )

        return (

            <div className="page-wrapper">
                <div className='links'>
                    <Link className='left' to="/travel">&lt;&nbsp;Travel</Link>
                    <Link className='right' to="/news">News&nbsp;&gt;</Link>
                </div>
                <div className="wrapper" >
                    <h1 className="wrapper__heading">Timeline</h1>
                    {events}
                </div>
            </div>
        )

    }

}

export default Timeline