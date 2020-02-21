import React from "react";
import "./Countdown.css";

class Countdown extends React.Component {
  state = {
    brexitDays: "",
    brexitHours: "",
    brexitMins: "",
    brexitSecs: ""
  };

  componentDidMount = () => {
    let now = new Date();
    let brexit = new Date(2019, 12, 31, 23);
    let msNow = now.getTime();
    let msBrexit = brexit.getTime();
    let msTillBrexit = msBrexit - msNow;

    if (msBrexit < msNow) {
      this.setState({
        brexitDays: 0,
        brexitHours: 0,
        brexitMins: 0,
        brexitSecs: 0
      });
      return;
    }

    this.timer = setInterval(() => {
      //get days left
      let msInDay = 1000 * 60 * 60 * 24;
      let daysTillBrexit = Math.floor(msTillBrexit / msInDay);
      if (daysTillBrexit < 10) {
        daysTillBrexit = "0" + daysTillBrexit.toString();
      }

      //get hours left
      let msRemaining1 = msTillBrexit - msInDay * daysTillBrexit;
      let msInHour = 1000 * 60 * 60;
      let hoursTillBrexit = Math.floor(msRemaining1 / msInHour);
      if (hoursTillBrexit < 10) {
        hoursTillBrexit = "0" + hoursTillBrexit.toString();
      }

      //get mins left
      let msRemaining2 = msRemaining1 - msInHour * hoursTillBrexit;
      let msInMinute = 1000 * 60;
      let minsTillBrexit = Math.floor(msRemaining2 / msInMinute);
      if (minsTillBrexit < 10) {
        minsTillBrexit = "0" + minsTillBrexit.toString();
      }

      //get secs left
      let msRemaining3 = msRemaining2 - msInMinute * minsTillBrexit;
      let msInSec = 1000;
      let secsTillBrexit = Math.floor(msRemaining3 / msInSec);
      if (secsTillBrexit < 10) {
        secsTillBrexit = "0" + secsTillBrexit.toString();
      }

      this.setState({
        brexitDays: daysTillBrexit,
        brexitHours: hoursTillBrexit,
        brexitMins: minsTillBrexit,
        brexitSecs: secsTillBrexit
      });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  render() {
    return (
      <div id="countdown-container">
        <div id="countdown-display">
          <div id="days" className="clock-section">
            {this.state.brexitDays}
          </div>
          <div id="hours" className="clock-section">
            {this.state.brexitHours}
          </div>
          <div id="mins" className="clock-section">
            {this.state.brexitMins}
          </div>
          <div id="secs" className="clock-section">
            {this.state.brexitSecs}
          </div>
          <div id="days-label" className="label">
            DAYS
          </div>
          <div id="hours-label" className="label">
            HOURS
          </div>
          <div id="mins-label" className="label">
            MINS
          </div>
          <div id="secs-label" className="label">
            SECS
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
