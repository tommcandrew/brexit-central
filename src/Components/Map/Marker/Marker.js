import React from 'react'
import './Marker.scss'

const Marker = props => {
  const { name, price, selectCountry } = props
  return (
    <div className='Marker'>
      <div onClick={() => selectCountry(name)}>
        <p className='country-name'>{name}</p>
        <p>
          from <br /> {price}
        </p>
      </div>
    </div>
  )
}

export default Marker
