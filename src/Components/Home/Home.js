import React from "react";
import Countdown from "../Countdown/Countdown";
import MainNav from "../MainNav/MainNav";
import "./Home.css";

class Home extends React.Component {
  componentDidMount = () => {
    this.props.updateCurrentPage("home");
  };

  render() {
    return (
      <div className="home-container">
        <Countdown />
        <MainNav updateNextPage={this.props.updateNextPage} />
      </div>
    );
  }
}

export default Home;
