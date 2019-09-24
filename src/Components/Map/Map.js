import React from 'react'
import './Map.css'
import axios from 'axios';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quotes: [],
      places: [],
      selectValue: ""
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getCheapest = this.getCheapest.bind(this);
  }

  handleChange(e){
    this.setState({ selectValue: e.target.value }, () => {
      console.log("Selected: " + this.state.selectValue);
      this.getQuotes();
    });
  }

  getQuotes() {
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
      this.setState({ places: res.data.Places }, () => console.log(this.state.places));
      this.getResults();
    })
  }

  //get only the direct flights which are under £100
  getResults() {
    const quotes = this.state.quotes;
    const places = this.state.places;
    const result = [];
    let minPrice;
    let destinationID;
    let item= [];
    let placesQuotes = [];
    let final = [];

    for(let i = 0; i < quotes.length; i++){
      if(quotes[i].Direct === true && quotes[i].MinPrice < 100){
        destinationID = quotes[i].OutboundLeg.DestinationId;
        placesQuotes.push(destinationID);
        minPrice = quotes[i].MinPrice;
        item = [destinationID, minPrice];
        result.push(item);
      }
    }

    let placesId = [];
    console.log(placesQuotes);
    // map country id and name into an array
    const placesIdAndName = [];
      for(let i = 0; i < places.length; i++){
        placesIdAndName.push([places[i].PlaceId, places[i].CountryName]);
        placesId.push(places[i].PlaceId);
      }
    
    console.log(placesIdAndName);

    if(result.length < 20) {
       //filter Places respone to get rid off the duplicates:
      let current;
      for(let i = 0; i < result.length; i++){
      current = placesId.indexOf(result[i][0]);
      console.log("Current " +  current);
      if(current !== -1){
        final.push([placesIdAndName[current][1], result[i][1]]);
      }
    }
    console.log(result.length);
    console.log(final.length);
      this.setState({ quotes: final}, () => console.log("[Country, Price] " + this.state.quotes));
    } else {
      this.getCheapest(result,placesId, placesIdAndName);
    }
  }

  getCheapest(result,placesId, placesIdAndName) {
    let final = [];
    const sorted = result.sort(function(a , b) {
      return a[1] - b[1];
  });;
    const cheapest = sorted.slice(0,20);
    //filter Places respone to get rid off the duplicates:
    let current;
    for(let i = 0; i < cheapest.length; i++){
    current = placesId.indexOf(result[i][0]);
    console.log("Current " +  current);
    if(current !== -1){
      final.push([placesIdAndName[current][1], cheapest[i][1]]);
    }
  }
  console.log(cheapest.length);
  console.log(final.length);
    this.setState({ quotes: final }, () => console.log("[Country, Price] - Cheapest " + this.state.quotes));
  }

  render() {
    return(
     <select id="dropdown"  onChange={this.handleChange}>
          <option value="Select" defaultValue>Select</option>
          <option value="ABZ">Aberdeen</option>
          <option value="BFS">Belfast</option>
          <option value="BHX">Birmingham</option>
          <option value="BOH">Bournemouth</option>
          <option value="BRS">Bristol</option>
          <option value="CWL">Cardiff</option>
          <option value="DSA">Doncaster Sheffield</option>
          <option value="EDI">Edinburgh</option>
          <option value="EXT">Exeter</option>
          <option value="GLA">Glasgow</option>
          <option value="GCI">Guernsey</option>
          <option value="INV">Inverness</option>
          <option value="JER">Jersey</option>
          <option value="LBA">Leeds Bradford</option>
          <option value="LPL">Liverpool</option>
          <option value="LOND">London</option>
          <option value="MAN">Manchester</option>
          <option value="NCL">Newcastle</option>
          <option value="NWI">Norwich</option>
          <option value="SOU">Southampton</option>
      </select>
    )
  }
}

export default Map