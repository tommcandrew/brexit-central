import React from 'react'
import './Arrows.css'

export default function Arrows(props) {
    return (
        <div className='links'>
            <span className='left-arrow' onClick={() => props.updateNextPage(props.left)}>
                &lt;&nbsp;{props.left.charAt(0).toUpperCase() + props.left.substr(1)}
            </span>
            <span className='right-arrow' onClick={() => props.updateNextPage(props.right)}>
                {props.right.charAt(0).toUpperCase() + props.right.substr(1)}&nbsp;&gt;
        </span>
        </div>
    )
}
