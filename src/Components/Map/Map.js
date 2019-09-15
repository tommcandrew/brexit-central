import React from 'react'
import './Map.css'

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    outBoundAirports: [],
    inBoundsAirports: [],
    sessionKey: null
    };
    this.createSession = this.createSession.bind(this);
    this.handleState = this.handleState.bind(this);
    this.getSessionResults = this.getSessionResults.bind(this);
  }

  componentDidMount() {
    this.createSession();
  }
  
  handleState(){
    console.log("stateHANDLE: " + this.state.sessionKey);
    if(this.state.sessionKey !== null){
    let sessionKey = this.state.sessionKey;
    const url = "http://partners.api.skyscanner.net/apiservices/pricing/uk2/v1.0/";
    sessionKey = sessionKey.replace(url, " ").trim();
    console.log(sessionKey);
    this.getSessionResults(sessionKey);
    } else {
      console.log("sessionKey is null");
    }
  }

  getSessionResults(sessionKey){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/" + sessionKey + "?pageIndex=0&pageSize=10");
    xhr.setRequestHeader("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "7950dacff7mshd54ef549a82264bp1e0133jsne29e4dd7aa24");
    
    xhr.send(data);
  }

  createSession() {
    var data = "inboundDate=2019-10-31&cabinClass=business&children=0&infants=0&country=UK&currency=GBP&locale=en-UK&originPlace=LOND-sky&destinationPlace=PARI-sky&outboundDate=2019-10-31&adults=1";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", () => {
      if (this.readyState === this.DONE) {
       console.log(this.responseText);
       this.setState({sessionKey:  xhr.getResponseHeader("location")}, this.handleState());
       console.log("state: " + this.state.sessionKey);
      }
    });

    const url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0";
    xhr.open("POST", url);
    xhr.setRequestHeader("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "7950dacff7mshd54ef549a82264bp1e0133jsne29e4dd7aa24");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  
  
    xhr.send(data);
    console.log("state: " + this.state.sessionKey);
  // const sessionKey =  this.state.sessionKey.replace(url, "");
    
   // this.getSessionResult(sessionKey);
    }

 /* getSessionResult(sessionKey) {
   
   }*/
render() {
      return (
        <div>
        <select>
            <option value="london-city">London City</option>
            <option value="london-gatwick">London Gatwick</option>
            <option value="london-heathrow">London Heathrow</option>
            <option value="london-luton">London Luton</option>
            <option value="london-stanstead">London Stanstead</option>
        </select>
        </div>
      );
    }
} 

export default Map