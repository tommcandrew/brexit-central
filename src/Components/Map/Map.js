import React from 'react'
import './Map.css'

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    selectValue: ""
    };
 
    this.handleChange = this.handleChange.bind(this);
    this.getQuotes = this.getQuotes.bind(this);
  }

  getQuotes() {
    var chosenOriginPlace = this.state.selectValue;
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/UK/GBP/en-UK/" + chosenOriginPlace + "-sky/anywhere/2019-10-31?inboundpartialdate=2019-12-01", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "7950dacff7mshd54ef549a82264bp1e0133jsne29e4dd7aa24"
      }
    })
    .then(response => {
    var myArr =  response.json();
    console.log(myArr);
    return myArr
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange(e){
    this.setState({ selectValue: e.target.value }, () => {
      console.log("selected value: " + this.state.selectValue);
     // this.createSessin();
     this.getQuotes();
    });
  }

render() {
      return (
        <div>
        <select id="dropdown"  onChange={this.handleChange}>
            <option value="Select" defaultValue>Select</option>
            <option value="LCY">London City</option>
            <option value="LGW">London Gatwick</option>
            <option value="LHR">London Heathrow</option>
            <option value="LTN">London Luton</option>
            <option value="STN">London Stanstead</option>
        </select>
        </div>
      );
    }
} 

export default Map