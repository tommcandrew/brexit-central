import React from 'react'
import './FlightFinder.css'
import axios from 'axios'
import Map from '../Map/Map'
import {Link} from 'react-router-dom'

class FlightFinder extends React.Component {
  static defaultProps = {
    englishAirports: [
      { name: 'Aberdeen', code: 'ABZ' },
      { name: 'Belfast', code: 'BFS' },
      { name: 'Birmingham', code: 'BHX' },
      { name: 'Bristol', code: 'BRS' },
      { name: 'Cardiff', code: 'CWL' },
      { name: 'Edinburgh', code: 'EDI' },
      { name: 'Exeter', code: 'EXT' },
      { name: 'Glasgow', code: 'GLA' },
      { name: 'Leeds Bradford', code: 'LBA' },
      { name: 'Liverpool', code: 'LPL' },
      { name: 'London', code: 'LOND' },
      { name: 'Manchester', code: 'MAN' },
      { name: 'Newcastle', code: 'NCL' },
      { name: 'Southampton', code: 'SOU' }
    ],
    mapCoord: {
      center: {
        lat: 50.5,
        lng: 15
      },
      zoom: 4
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      quotes: [],
      places: [],
      countries: [],
      selectValue: '',
      selectedCountry: '',
      ref: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.getQuotesAndPlaces = this.getQuotesAndPlaces.bind(this)
    this.getResults = this.getResults.bind(this)
    this.getCheapest = this.getCheapest.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
  }

  handleChange (e) {
    this.setState({ selectValue: e.target.value }, () => {
      this.getQuotesAndPlaces()
    })
  }

  getQuotesAndPlaces () {
    const chosenOriginPlace = this.state.selectValue

    axios
      .get(
        'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/UK/GBP/en-UK/' +
          chosenOriginPlace +
          '-sky/anywhere/2019-10-31?inboundpartialdate=2019-12-01',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key':
              '7950dacff7mshd54ef549a82264bp1e0133jsne29e4dd7aa24'
          }
        }
      )
      .then(res => {
        this.setState({ quotes: res.data.Quotes, places: res.data.Places })
        this.getResults()
      })
  }

  getResults () {
    const quotes = this.state.quotes
    const places = this.state.places
    const quotesDestionationIdPrice = []
    const quotesDestinationId = []
    const placesIdCountryAirport = []
    const placesId = []
    let results = []

    // get only direct flights which are under £100

    for (let i = 0; i < quotes.length; i++) {
      if (quotes[i].Direct === true && quotes[i].MinPrice < 100) {
        quotesDestinationId.push(quotes[i].OutboundLeg.DestinationId)
        quotesDestionationIdPrice.push([
          quotes[i].OutboundLeg.DestinationId,
          quotes[i].MinPrice
        ])
      }
    }

    // add place ID, country name and airport name to separate array

    for (let i = 0; i < places.length; i++) {
      placesIdCountryAirport.push([
        places[i].PlaceId,
        places[i].CountryName,
        places[i].Name,
        places[i].SkyscannerCode
      ])
      placesId.push(places[i].PlaceId)
    }

    if (quotesDestionationIdPrice.length < 20) {
      // filter Places respone to include only destination ids that correspond to the Quotes destination ids

      let index
      // console.log(placesIdCountryAirport)
      for (let i = 0; i < quotesDestionationIdPrice.length; i++) {
        index = placesId.indexOf(quotesDestionationIdPrice[i][0])
        if (index !== -1) {
          results.push({
            country: placesIdCountryAirport[index][1],
            airport: placesIdCountryAirport[index][2],
            price: quotesDestionationIdPrice[i][1],
            skyscannerCode: placesIdCountryAirport[index][3]
          })
        }
      }

      results = results.filter(
        r =>
          r.country.indexOf('United Kingdom') < 0 &&
          r.country.indexOf('Ireland') < 0
      )
      this.setState({ quotes: results }, this.getCountriesData)
    } else {
      this.getCheapest(
        quotesDestionationIdPrice,
        placesId,
        placesIdCountryAirport
      )
    }
  }

  getCheapest (quotesDestionationIdPrice, placesId, placesIdCountryAirport) {
    let results = []
    const sorted = quotesDestionationIdPrice.sort(function (a, b) {
      return a[1] - b[1]
    })

    const cheapest = sorted.slice(0, 20)

    // filter Places respone to include only destination ids that correspond to the Quotes destination ids

    let index

    for (let i = 0; i < cheapest.length; i++) {
      index = placesId.indexOf(quotesDestionationIdPrice[i][0])
      if (index !== -1) {
        results.push({
          country: placesIdCountryAirport[index][1],
          price: cheapest[i][1]
        })
      }
    }

    results = results.filter(
      r =>
        r.country.indexOf('United Kingdom') < 0 &&
        r.country.indexOf('Ireland') < 0
    )

    this.setState({ quotes: results }, this.getCountriesData)
  }

  getCountriesData () {
    const quotes = this.state.quotes
    const promises = quotes.map(quote => {
      let { price, airport, skyscannerCode } = quote
      const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${
        quote.country
      }&key=AIzaSyBgQWwReU8XuTMbmvGgbMBkilrVnJm9dzM`
      return axios.get(baseUrl).then(res => {
        const country = res.data.results[0]
        return {
          name: country.formatted_address,
          lat: country.geometry.location.lat,
          lng: country.geometry.location.lng,
          id: country.place_id,
          minPrice: `£${price}`,
          airport: airport,
          code: skyscannerCode
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

  selectCountry (name) {
    const countries = this.state.countriesData
    const selectedCountry = countries.filter(c => c.name === name)[0]
    console.log(selectedCountry)

    this.setState({ selectedCountry: selectedCountry }, this.scrollToMyRef)
  }

  scrollToMyRef () {
    window.scrollTo(0, this.myRef.offsetTop)
  }

  render () {
    const englishAirports = this.props.englishAirports.map(airport => (
      <option key={airport.code} value={airport.code}>
        {airport.name}
      </option>
    ))
    return (
      <div>
      <div className='links'>
        <Link className='left' to="/news">&lt;&nbsp;News</Link>
        <Link className='right' to="/timeline">Timeline&nbsp;&gt;</Link>
      </div>
      <div>
        <select id='dropdown' onChange={this.handleChange}>
          <option value='Select' defaultValue>
            Select
          </option>
          {englishAirports}
        </select>
        <Map
          coordinates={this.props.mapCoord}
          selectCountry={this.selectCountry}
          countriesData={this.state.countriesData}
        />
        {this.state.selectedCountry ? (
          <div className='cityResult' ref={ref => (this.myRef = ref)}>
            <h2 style={{ textTransform: 'uppercase' }}>
              {`CONGRATULATIONS, YOU ARE READY TO START YOUR NEW LIFE IN
            ${this.state.selectedCountry.name}!`}
            </h2>
            <p>{`The cheapest price we found for this country is to ${
              this.state.selectedCountry.airport
            }`}</p>
            <p>
              finalize your brexit process on the{' '}
              <a
                href={`https://www.skyscanner.net/transport/flights/${
                  this.state.selectValue
                }/${this.state.selectedCountry.code}/191031/`}
                target='_blank'
                rel='noopener noreferrer'
              >
                SkyScanner
              </a>{' '}
              website
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
    )
  }
}

export default FlightFinder
