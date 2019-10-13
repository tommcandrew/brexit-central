import React from 'react'
import './Timeline.css'

export default function TimelineElement({side, mediaType, mediaTag, date, text}) {

    return (

        <div key={text} className={'event-container event-container--' + side}>
            <div className="event-container__circle">
            </div>
            <div className="event-container__content">
                <div className={mediaType + "-container"}>
                    {mediaTag}
                </div>
                <h2 className="event-container__heading">{date}</h2>
                <p className="event-container__para">{text}</p>
            </div>
        </div>

    )
}
