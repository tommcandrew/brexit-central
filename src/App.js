import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import NewsAggregator from "./Components/NewsAggregator/NewsAggregator";
import FlightFinder from "./Components/FlightFinder/FlightFinder";
import Timeline from "./Components/Timeline/Timeline";
import { Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import history from "./history";

class App extends React.Component {
  state = {
    currentPage: "",
    newsPageDirection: "",
    travelPageDirection: "",
    timelinePageDirection: "",
    nextPage: "",
    timeout: 0
  };

  updateCurrentPage = page => {
    this.setState(() => ({ currentPage: page }));
  };

  updateNextPage = nextPage => {
    this.setState(
      () => ({ nextPage: nextPage }),
      () => this.updatePageDirections(nextPage)
    );
  };

  updatePageDirections = nextPage => {
    let newsPageDirection, travelPageDirection, timelinePageDirection, timeout;

    if (this.state.currentPage === "home") {
      newsPageDirection = undefined;
      travelPageDirection = undefined;
      timelinePageDirection = undefined;
      timeout = 0;
    }

    if (nextPage === "home") {
      newsPageDirection = undefined;
      travelPageDirection = undefined;
      timelinePageDirection = undefined;
      nextPage = "/";
      timeout = 0;
    } else if (this.state.currentPage === "news" && nextPage === "travel") {
      newsPageDirection = "left";
      travelPageDirection = "right";
      timelinePageDirection = undefined;
      timeout = 500;
    } else if (this.state.currentPage === "news" && nextPage === "timeline") {
      newsPageDirection = "right";
      travelPageDirection = undefined;
      timelinePageDirection = "left";
      timeout = 500;
    } else if (this.state.currentPage === "travel" && nextPage === "timeline") {
      newsPageDirection = undefined;
      travelPageDirection = "left";
      timelinePageDirection = "right";
      timeout = 500;
    } else if (this.state.currentPage === "travel" && nextPage === "news") {
      newsPageDirection = "left";
      travelPageDirection = "right";
      timelinePageDirection = undefined;
      timeout = 500;
    } else if (this.state.currentPage === "timeline" && nextPage === "news") {
      newsPageDirection = "right";
      travelPageDirection = undefined;
      timelinePageDirection = "left";
      timeout = 500;
    } else if (this.state.currentPage === "timeline" && nextPage === "travel") {
      newsPageDirection = undefined;
      travelPageDirection = "left";
      timelinePageDirection = "right";
      timeout = 500;
    }
    this.setState(
      () => ({
        newsPageDirection,
        travelPageDirection,
        timelinePageDirection,
        timeout
      }),
      () => history.push(nextPage)
    );
  };

  render() {
    return (
      <Router history={history}>
        <Route
          render={({ location }) => {
            return (
              <div>
                <Header updateNextPage={this.updateNextPage} />
                <div className="page-container">
                  <TransitionGroup component={null}>
                    <CSSTransition
                      timeout={this.state.timeout}
                      classNames={"page"}
                      key={location.key}
                    >
                      <Switch location={location}>
                        <Route
                          exact
                          path="/"
                          render={props => (
                            <Home
                              updateCurrentPage={this.updateCurrentPage}
                              updateNextPage={this.updateNextPage}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/news"
                          render={props => (
                            <NewsAggregator
                              updateCurrentPage={this.updateCurrentPage}
                              updateNextPage={this.updateNextPage}
                              direction={this.state.newsPageDirection}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/travel"
                          render={props => (
                            <FlightFinder
                              updateCurrentPage={this.updateCurrentPage}
                              updateNextPage={this.updateNextPage}
                              direction={this.state.travelPageDirection}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/timeline"
                          render={props => (
                            <Timeline
                              updateCurrentPage={this.updateCurrentPage}
                              updateNextPage={this.updateNextPage}
                              direction={this.state.timelinePageDirection}
                            />
                          )}
                        />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              </div>
            );
          }}
        />
      </Router>
    );
  }
}

export default App;
