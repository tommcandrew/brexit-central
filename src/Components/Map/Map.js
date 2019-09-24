import React from 'react'
import './Map.css'
import axios from 'axios';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      places: [],
      selectValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getQuotesAndPlaces = this.getQuotesAndPlaces.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getCheapest = this.getCheapest.bind(this);
    this.Flight = this.Flight.bind(this);
  }

  handleChange(e){
    this.setState({ selectValue: e.target.value }, () => {
      console.log("Selected: " + this.state.selectValue);
      this.getQuotesAndPlaces();
    });
  }

  getQuotesAndPlaces() {
    let chosenOriginPlace = this.state.selectValue;

    axios.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/UK/GBP/en-UK/" + chosenOriginPlace + "-sky/anywhere/2019-10-31?inboundpartialdate=2019-12-01", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "7950dacff7mshd54ef549a82264bp1e0133jsne29e4dd7aa24"
      }
    })
    .then(res => {
      this.setState({ quotes: res.data.Quotes });
      this.setState({ places: res.data.Places });
      this.getResults();
    })
  }

  Flight(country, airport, price) {
    this.country = country;
    this.airport = airport;
    this.price = price;
  }

  getResults() {
    const quotes = this.state.quotes;
    const places = this.state.places;
    const quotesDestionationIdPrice = [];
    const quotesDestinationId = [];
    const placesIdCountryAirport = [];
    const placesId = [];
    const results = [];
    
    //get only direct flights which are under £100

    for(let i = 0; i < quotes.length; i++){
      if(quotes[i].Direct === true && quotes[i].MinPrice < 100){
        quotesDestinationId.push(quotes[i].OutboundLeg.DestinationId);
        quotesDestionationIdPrice.push([quotes[i].OutboundLeg.DestinationId, quotes[i].MinPrice]);
      }
    }

    //add place ID, country name and airport name to separate array

      for(let i = 0; i < places.length; i++){
        placesIdCountryAirport.push([places[i].PlaceId, places[i].CountryName, places[i].Name]);
        placesId.push(places[i].PlaceId);
      }
    
    console.log(placesIdCountryAirport);

    if(quotesDestionationIdPrice.length < 20) {
      
       //filter Places respone to include only destination ids that correspond to the Quotes destination ids

      let index;

      for(let i = 0; i < quotesDestionationIdPrice.length; i++){
        index = placesId.indexOf(quotesDestionationIdPrice[i][0]);
        if(index !== -1){
        let flight = new this.Flight(placesIdCountryAirport[index][1], placesIdCountryAirport[index][2], quotesDestionationIdPrice[i][1]);
        results.push(flight);
      }
    }

    console.log(quotesDestionationIdPrice.length);
    console.log(results.length);

      this.setState({ quotes: results }, () => console.log("[Country, Airport, Price] " + this.state.quotes));
    } else {
      this.getCheapest(quotesDestionationIdPrice, placesId, placesIdCountryAirport);
    }
  }

  getCheapest(quotesDestionationIdPrice,placesId, placesIdCountryAirport) {
    const results = [];
    const sorted = quotesDestionationIdPrice.sort(function(a , b) {
      return a[1] - b[1];
     });;
    const cheapest = sorted.slice(0,20);
    
     //filter Places respone to include only destination ids that correspond to the Quotes destination ids

    let index;

    for(let i = 0; i < cheapest.length; i++){
    index = placesId.indexOf(quotesDestionationIdPrice[i][0]);
    if(index !== -1){
      results.push([placesIdCountryAirport[index][1], placesIdCountryAirport[index][2], cheapest[i][1]]);
    }
  }
  console.log(cheapest.length);
  console.log(results.length);
    this.setState({ quotes: results }, () => console.log("[Country, Airport, Price] - (20 Cheapest) " + this.state.quotes));
  }

  render() {
    return(
     <select id="dropdown"  onChange={this.handleChange}>
          <option value="Select" defaultValue>Select</option>
          <option value="ABZ">Aberdeen</option>
          <option value="BFS">Belfast</option>
          <option value="BHX">Birmingham</option>
          <option value="BRS">Bristol</option>
          <option value="CWL">Cardiff</option>
          <option value="EDI">Edinburgh</option>
          <option value="EXT">Exeter</option>
          <option value="GLA">Glasgow</option>
          <option value="LBA">Leeds Bradford</option>
          <option value="LPL">Liverpool</option>
          <option value="LOND">London</option>
          <option value="MAN">Manchester</option>
          <option value="NCL">Newcastle</option>
          <option value="SOU">Southampton</option>
      </select>
    )
  }
}

export default Map
