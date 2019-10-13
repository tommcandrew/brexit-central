import React, { Component } from 'react'
import './ApiError.css'
import meme from '../../../assets/you-shall-not-pass.jpg'

class ApiError extends Component {
  render () {
    return (
      <div className='ApiError'>
        <div className='error-img-container'>
          <img src={meme} alt='you shall not pass meme' />
        </div>
        <p className='ApiError__message'>
          We reached the maximun number of requests, please try again to leave
          in a few minutes.
        </p>
      </div>
    )
  }
}

export default ApiError
