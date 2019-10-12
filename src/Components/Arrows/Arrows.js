import React from 'react'
import './Arrows.css'

export default function Arrows(props) {
    return (
        <div className='links'>
            <span className='left-arrow' onClick={() => props.updateNextPage(props.left)}>
                &lt;&nbsp;Timeline
        </span>
            <span className='right-arrow' onClick={() => props.updateNextPage(props.right)}>
                Travel&nbsp;&gt;
        </span>
        </div>
    )
}
