import React from 'react'
import './Marker.scss'

const Marker = props => {
  const { name, price, selectCountry } = props
  return (
    <div onClick={() => selectCountry(name)} className='Marker'>
      <p className='country-name'>{name}</p>
      <p>
        from <br /> {price}
      </p>
    </div>
  )
}

export default Marker
