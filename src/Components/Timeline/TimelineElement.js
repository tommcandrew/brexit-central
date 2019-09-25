import React from 'react'

export default function TimelineElement({side, mediaTag, date, text}) {

    return (

        <div key={text} className={'event-container event-container--' + side}>
            <div className="event-container__circle">
            </div>
            <div className="event-container__content">
                <div className={mediaTtype + "-container"}>
                    {mediaTag}
                </div>
                <h2 className="event-container__heading">{date}</h2>
                <p>{text}</p>
            </div>
        </div>

    )
}
