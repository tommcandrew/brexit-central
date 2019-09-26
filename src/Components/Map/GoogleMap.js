import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from '../Map/Marker/Marker'
import axios from 'axios'
import './Map.css'

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      session: '',
      selection: 'countries',
      selectedCity: '',
      countriesData: [],
      cities: [],
      mapCoord: {
        center: {
          lat: 50.5,
          lng: 15
        },
        zoom: 4
      }
    }
    this.ref = null
    this.selectCountry = this.selectCountry.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }
  static defaultProps = {
    countries: ['ireland', 'italy', 'hungary', 'poland']
  }

  createMapOptions (maps) {
    return {
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      gestureHandling: 'none'
    }
  }

  getCountriesData (data) {
    const promises = data.map(c => {
      const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${c}&key=AIzaSyBgQWwReU8XuTMbmvGgbMBkilrVnJm9dzM`
      return axios.get(baseUrl).then(res => {
        const country = res.data.results[0]
        return {
          name: country.formatted_address,
          lat: country.geometry.location.lat,
          lng: country.geometry.location.lng,
          id: country.place_id,
          minPrice: '£99'
        }
      })
    })

    Promise.all(promises).then(data => {
      this.setState(st => ({
        countriesData: data,
        selection: 'countries'
      }))
    })
  }

  async selectCountry (name) {
    const countries = [...this.state.countriesData]
    const selectedCountry = countries.filter(c => c.name === name)
    const cities = ['rome', 'venice', 'milan', 'naples']
    const promises = cities.map(c => {
      const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${c}&key=AIzaSyBgQWwReU8XuTMbmvGgbMBkilrVnJm9dzM`
      return axios.get(baseUrl).then(res => {
        const city = res.data.results[0]
        return {
          result: city,
          id: city.place_id,
          lat: city.geometry.location.lat,
          lng: city.geometry.location.lng,
          name: city.address_components[0].long_name,
          minPrice: '£99'
        }
      })
    })

    Promise.all(promises).then(data => {
      this.setState({
        cities: data,
        mapCoord: {
          center: {
            lat: selectedCountry[0].lat,
            lng: selectedCountry[0].lng
          },
          zoom: 5.5
        }
      })
    })
  }

  selectCity (name) {
    this.setState(
      {
        selectedCity: name
      },
      this.scrollToMyRef
    )
  }

  handleButtonClick () {
    this.setState({
      selectedCity: '',
      mapCoord: {
        center: {
          lat: 50.5,
          lng: 15
        },
        zoom: 4
      }
    })
  }

  scrollToMyRef () {
    window.scrollTo(0, this.myRef.offsetTop)
  }

  render () {
    let markers = []
    if (this.state.mapCoord && this.state.mapCoord.zoom <= 4) {
      markers = this.state.countriesData.map(c => {
        return (
          <Marker
            key={c.id}
            lat={c.lat}
            lng={c.lng}
            name={c.name}
            price={c.minPrice}
            selectCountry={this.selectCountry}
            selector='country'
          />
        )
      })
    } else {
      markers = this.state.cities.map(c => {
        return (
          <Marker
            key={c.id}
            lat={c.lat}
            lng={c.lng}
            name={c.name}
            price={c.minPrice}
            selector='city'
            selectCity={() => this.selectCity(c.name)}
          />
        )
      })
    }

    return (
      <div style={{ width: '80vw', height: '60vh', margin: 'auto' }}>
        <GoogleMapReact
          options={this.createMapOptions}
          bootstrapURLKeys={{ key: 'AIzaSyBgQWwReU8XuTMbmvGgbMBkilrVnJm9dzM' }}
          center={this.state.mapCoord.center}
          zoom={this.state.mapCoord.zoom}
        >
          {markers}
        </GoogleMapReact>
        {this.state.mapCoord.zoom > 4 ? (
          <button class='Map__back-button' onClick={this.handleButtonClick}>
            back to countries selection
          </button>
        ) : (
          ''
        )}
        {this.state.selectedCity ? (
          <div
            className='cityResult'
            style={{ textTransform: 'uppercase' }}
            ref={ref => (this.myRef = ref)}
          >
            <h2>
              {`CONGRATULATIONS, YOU ARE READY TO START YOUR NEW LIFE IN
            ${this.state.selectedCity}!`}
            </h2>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Map
