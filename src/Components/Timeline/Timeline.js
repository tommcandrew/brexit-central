import React from 'react'
import timelineData from './timelineData'
import './Timeline.css'

class Timeline extends React.Component {

    componentDidMount() {

        const containerDivs = document.getElementsByClassName('event-container')
        const contentDivs = document.getElementsByClassName('event-container__content')
        const circles = document.getElementsByClassName('event-container__circle')

        //the loops count from 1 so as not to include the first event on timeline (it's visible when user opens page)

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

        let eventInfo = timelineData.map((event, index) => {
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
                <div key={event.text} className={'event-container event-container--' + side}>
                    <div className="event-container__circle">
                    </div>
                    <div className="event-container__content">
                        <div className={event.media.type + "-container"}>
                            {mediaTag}
                        </div>
                        <h2 className="event-container__heading">{event.date}</h2>
                        <p>{event.text}</p>
                    </div>
                </div>
            )
        }
        )

        return (

            <div className="wrapper" >
                <h1 className="wrapper__heading">Timeline</h1>
                {eventInfo}
            </div>

        )

    }

}

export default Timeline