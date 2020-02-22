import React from "react";
import "./FlightFinder.css";
import axios from "axios";
import Map from "../Map/Map";
import Arrows from "../Arrows/Arrows";
import ApiError from "./ApiError/ApiError";
const GMAPS_TOKEN = process.env.REACT_APP_GMAPS_TOKEN;
const RAPIDAPI_TOKEN = process.env.REACT_APP_RAPIDAPI_TOKEN;
class FlightFinder extends React.Component {
  static defaultProps = {
    englishAirports: [
      { name: "Aberdeen", code: "ABZ" },
      { name: "Belfast", code: "BFS" },
      { name: "Birmingham", code: "BHX" },
      { name: "Bristol", code: "BRS" },
      { name: "Cardiff", code: "CWL" },
      { name: "Edinburgh", code: "EDI" },
      { name: "Exeter", code: "EXT" },
      { name: "Glasgow", code: "GLA" },
      { name: "Leeds Bradford", code: "LBA" },
      { name: "Liverpool", code: "LPL" },
      { name: "London", code: "LOND" },
      { name: "Manchester", code: "MAN" },
      { name: "Newcastle", code: "NCL" },
      { name: "Southampton", code: "SOU" }
    ],
    resultsMessages: [
      "In your face, Brexit! I go to ",
      "And the prize for the most welcoming country goes to...",
      "Deep inside, you always wanted to be in ",
      "Looks like we have a winner, ",
      "Prepare your trolley, you are going to ",
      "They say it never rains in ",
      "For a life full of colors: ",
      "You will love thisCountry, and thisCountry will love you too",
      "You will always be welcome in ",
      "There is a whole lot more than fish & chips. Welcome to ",
      "They say you never get bored in "
    ],
    mapCoord: {
      center: {
        lat: 50.5,
        lng: 15
      },
      zoom: 4
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      places: [],
      countries: [],
      selectValue: "",
      selectedCountry: "",
      ref: null,
      rateExceeded: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.getQuotesAndPlaces = this.getQuotesAndPlaces.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getCheapest = this.getCheapest.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount = () => {
    this.props.updateCurrentPage("travel");
  };

  handleChange(e) {
    this.setState({ selectValue: e.target.value, selectedCountry: "" }, () => {
      this.getQuotesAndPlaces();
    });
  }

  getQuotesAndPlaces() {
    const chosenOriginPlace = this.state.selectValue;

    axios
      .get(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/UK/GBP/en-UK/${chosenOriginPlace}-sky/anywhere/anytime?X-RapidAPI-Host=skyscanner-skyscanner-flight-search-v1.p.rapidapi.com&X-RapidAPI-Key`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host":
              "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "X-RapidAPI-Key": RAPIDAPI_TOKEN
          }
        }
      )
      .then(res => {
        this.setState({ quotes: res.data.Quotes, places: res.data.Places });
        this.getResults();
      })
      .catch(e => {
        this.setState({ rateExceeded: true });
      });
  }

  getResults() {
    const quotes = this.state.quotes;
    const places = this.state.places;
    const quotesDestionationIdPrice = [];
    const quotesDestinationId = [];
    const placesIdCountryAirport = [];
    const placesId = [];
    let results = [];

    // get only direct flights which are under £100

    for (let i = 0; i < quotes.length; i++) {
      // if (quotes[i].Direct === true && quotes[i].MinPrice < 100) {
      quotesDestinationId.push(quotes[i].OutboundLeg.DestinationId);
      quotesDestionationIdPrice.push([
        quotes[i].OutboundLeg.DestinationId,
        quotes[i].MinPrice
      ]);
      // }
    }

    // add place ID, country name and airport name to separate array

    for (let i = 0; i < places.length; i++) {
      placesIdCountryAirport.push([
        places[i].PlaceId,
        places[i].CountryName,
        places[i].Name,
        places[i].SkyscannerCode
      ]);
      placesId.push(places[i].PlaceId);
    }

    if (quotesDestionationIdPrice.length < 20) {
      // filter Places respone to include only destination ids that correspond to the Quotes destination ids

      let index;
      for (let i = 0; i < quotesDestionationIdPrice.length; i++) {
        index = placesId.indexOf(quotesDestionationIdPrice[i][0]);
        if (index !== -1) {
          results.push({
            country: placesIdCountryAirport[index][1],
            airport: placesIdCountryAirport[index][2],
            price: quotesDestionationIdPrice[i][1],
            skyscannerCode: placesIdCountryAirport[index][3]
          });
        }
      }

      results = results.filter(
        r =>
          r.country.indexOf("United Kingdom") < 0 &&
          r.country.indexOf("Ireland") < 0
      );
      this.setState({ quotes: results }, this.getCountriesData);
    } else {
      this.getCheapest(
        quotesDestionationIdPrice,
        placesId,
        placesIdCountryAirport
      );
    }
  }

  getCheapest(quotesDestionationIdPrice, placesId, placesIdCountryAirport) {
    let results = [];
    const sorted = quotesDestionationIdPrice.sort(function(a, b) {
      return a[1] - b[1];
    });

    const cheapest = sorted.slice(0, 20);

    // filter Places respone to include only destination ids that correspond to the Quotes destination ids

    let index;

    for (let i = 0; i < cheapest.length; i++) {
      index = placesId.indexOf(quotesDestionationIdPrice[i][0]);
      if (index !== -1) {
        results.push({
          country: placesIdCountryAirport[index][1],
          airport: placesIdCountryAirport[index][2],
          price: cheapest[i][1],
          skyscannerCode: placesIdCountryAirport[index][3]
        });
      }
    }

    results = results.filter(
      r =>
        r.country.indexOf("United Kingdom") < 0 &&
        r.country.indexOf("Ireland") < 0
    );

    this.setState({ quotes: results }, this.getCountriesData);
  }

  getCountriesData() {
    const quotes = this.state.quotes;
    const promises = quotes.map(quote => {
      let { price, airport, skyscannerCode } = quote;

      const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${quote.country}&key=${GMAPS_TOKEN}`;
      return axios.get(baseUrl).then(res => {
        const country = res.data.results[0];

        return {
          name: country.formatted_address,
          lat: country.geometry.location.lat,
          lng: country.geometry.location.lng,
          id: country.place_id,
          minPrice: `£${price}`,
          airport: airport,
          code: skyscannerCode
        };
      });
    });

    Promise.all(promises).then(data => {
      this.setState(st => ({
        countriesData: data,
        selection: "countries"
      }));
    });
  }

  selectCountry(name) {
    const countries = this.state.countriesData;
    const selectedCountry = countries.filter(c => c.name === name)[0];
    this.setState({ selectedCountry: selectedCountry }, this.scrollToMyRef);
  }

  scrollToMyRef() {
    window.scrollTo(0, this.myRef.offsetTop);
  }

  getRandomMessage(country) {
    let messages = this.props.resultsMessages;
    let randomIndex = Math.floor(Math.random() * messages.length);
    const regex = new RegExp("thisCountry", "g");
    let message = messages[randomIndex];
    return message.match(regex)
      ? message.replace(regex, country)
      : `${message} ${country}`;
  }

  render() {
    const englishAirports = this.props.englishAirports.map(airport => (
      <option key={airport.code} value={airport.code}>
        {airport.name}
      </option>
    ));
    if (this.state.rateExceeded) {
      return <ApiError />;
    }
    return (
      <div className={"Flightfinder travel-container " + this.props.direction}>
        <Arrows
          left="news"
          right="timeline"
          updateNextPage={this.props.updateNextPage}
        />
        <div>
          <p className="Flightfinder__setup">
            Thinking about emigrating? Choose your nearest airport from the menu
            and see all flights out of here!
          </p>
          <div className="starting-selection">
            <span style={{ fontSize: "1.5rem" }}>Select an airport: </span>
            <select id="dropdown" onChange={this.handleChange}>
              <option value="Select" defaultValue>
                Select
              </option>
              {englishAirports}
            </select>
          </div>

          <Map
            coordinates={this.props.mapCoord}
            selectCountry={this.selectCountry}
            countriesData={this.state.countriesData}
          />
          <div className="cityResult" ref={ref => (this.myRef = ref)}>
            {/* {this.state.selectedCountry ? ( */}
            <>
              {/* <h4 className="result--subtitle">
                {this.getRandomMessage(this.state.selectedCountry.name)}!
              </h4> */}
              <p className="result--copy">
                Ready to go? Make your purchase on the
                <a
                  className="result--link"
                  // href={`https://www.skyscanner.net/transport/flights/${this.state.selectValue}/${this.state.selectedCountry.code}/191031/`}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span> SkyScanner </span>
                </a>
                website and say goodbye to Britain!
              </p>
            </>
            {/* ) : (
              ""
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default FlightFinder;
