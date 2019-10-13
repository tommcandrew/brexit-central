import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from '../Map/Marker/Marker'
// import axios from 'axios'
import './Map.css'

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.ref = null
  }

  createMapOptions (maps) {
    return {
      disableDoubleClickZoom: true,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }
  }

  selectCity (name) {
    this.setState(
      {
        selectedCity: name
      },
      this.scrollToMyRef
    )
  }

  render () {
    let markers = []
    if (this.props.coordinates && this.props.countriesData) {
      markers = this.props.countriesData.map(c => {
        return (
          <Marker
            key={c.id}
            lat={c.lat}
            lng={c.lng}
            name={c.name}
            price={c.minPrice}
            selectCountry={this.props.selectCountry}
            selector='country'
          />
        )
      })
    } else {
      markers = ''
    }

    const { center, zoom } = this.props.coordinates

    return (
      <div className='Map'>
        <GoogleMapReact
          options={this.createMapOptions}
          bootstrapURLKeys={{ key: 'AIzaSyBgQWwReU8XuTMbmvGgbMBkilrVnJm9dzM' }}
          center={center}
          zoom={zoom}
        >
          {markers}
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map
