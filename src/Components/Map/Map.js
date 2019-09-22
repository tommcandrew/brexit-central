import React from 'react'
import './Map.css'

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quotes: [],
      selectValue: ""
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getResults = this.getResults.bind(this);
    this.sortBubble = this.sortBubble.bind(this);
  }

  getQuotes() {
    let chosenOriginPlace = this.state.selectValue;
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/UK/GBP/en-UK/" + chosenOriginPlace + "-sky/anywhere/2019-10-31?inboundpartialdate=2019-12-01", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "7950dacff7mshd54ef549a82264bp1e0133jsne29e4dd7aa24"
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotes: result.Quotes
          });
          this.getResults();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  //To get only 20 the cheapest filghts
  getResults() {
    let quotes = this.state.quotes;
    let result = [];
    let price;
    let place;
    let item = [];

    for(let i = 0; i < quotes.length; i++){
        place = "Place: " + quotes[i].OutboundLeg.DestinationId;
        price = "Price: " + quotes[i].MinPrice;
        item = [place, price];
        result.push(item);
    }
    console.log("Result: " + result);
    
    this.sortBubble(result);
  }

 //To get only the direct flights 
 /* getResults() {
    let quotes = this.state.quotes;
    let result = [];
    let price;
    let place;
    let item = [];

    for(let i = 0; i < quotes.length; i++){
      if(quotes[i].Direct === true){
        place = "Place: " + quotes[i].OutboundLeg.DestinationId;
        price = "Price: " + quotes[i].MinPrice;
        item = [place, price];
        result.push(item);
      }
    }
    console.log("Result: " + result);
    console.log(result.length);

  }*/

  handleChange(e){
    this.setState({ selectValue: e.target.value }, () => {
      console.log("selected value: " + this.state.selectValue);
     this.getQuotes();
    });
  }

  render() {
    const { error, isLoaded, quotes } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
       return <select id="dropdown"  onChange={this.handleChange}>
          <option value="Select" defaultValue>Select</option>
          <option value="LCY">London City</option>
          <option value="LGW">London Gatwick</option>
          <option value="LHR">London Heathrow</option>
          <option value="LTN">London Luton</option>
          <option value="STN">London Stanstead</option>
      </select>
    } else {
      return (
        <ul>
          {quotes.map(quote => (
            <li key={quote.QuoteId}>
              {quote.QuoteId} {quote.MinPrice}
            </li>
          ))}
        </ul>
      );
    }
  }
}








export default Map