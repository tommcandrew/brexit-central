import React, { Component } from 'react'
import './Marker.scss'

class Marker extends Component {
  render () {
    const { name, price, selectCountry, selectCity, selector } = this.props
    return (
      <div>
        <div
          onClick={
            selector === 'country'
              ? () => selectCountry(name)
              : () => selectCity(name)
          }
          className='tooltip bounce'
        >
          <p
            style={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '.3rem'
            }}
          >
            {name}
          </p>
          <p>
            from <br /> {price}
          </p>
        </div>
      </div>
    )
  }
}

export default Marker
