import React, { Component } from "react";
import axios from "axios";
import "./NewsAggregator.css";
import uuid from "uuid/v4";
import Arrows from "../Arrows/Arrows";

const NEWSAPI_TOKEN = process.env.REACT_APP_NEWSAPI_TOKEN;

const TODAY = new Date();
class NewsAggregator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  async componentDidMount() {
    this.props.updateCurrentPage("news");

    const todayToISO = TODAY.toISOString();
    const sources =
      "bbc-news,daily-mail,google-news-uk,independent,mirror,reddit-r-all,the-irish-times,the-telegraph,reuters";
    const baseUrl = `https://newsapi.org/v2/everything?language=en&q=brexit&to=${todayToISO}&sources=${sources}&sortBy=publishedAt&apiKey=${NEWSAPI_TOKEN}`;
    const res = await axios(baseUrl);
    const articles = res.data.articles;

    this.setState({
      articles: articles.map(a => ({ ...a, id: uuid() }))
    });
  }

  timeSince(date) {
    const publishedDate = new Date(date);
    const seconds = Math.floor((TODAY - publishedDate) / 1000);
    // console.log(TODAY, date, seconds)
    let interval = Math.floor(seconds / 86400);
    let intervalType;

    if (interval >= 1) {
      intervalType = "day";
    } else {
      interval = Math.floor(seconds / 3600);

      if (interval >= 1) {
        intervalType = "hour";
      } else {
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
          intervalType = "minute";
        } else {
          interval = seconds;
          intervalType = "second";
        }
      }
    }

    if (interval > 1 || interval === 0) {
      intervalType += "s";
    }

    return `${interval} ${intervalType} ago`;
  }

  render() {
    const articles = this.state.articles.map(a => {
      const timeAgo = this.timeSince(a.publishedAt);
      return (
        <article key={uuid()} className="article">
          <p className="time-passed">{timeAgo}</p>
          <a href={a.url} target="_blank" rel="noopener noreferrer">
            <p>{a.title}</p>
          </a>
        </article>
      );
    });
    return (
      <div className={"news-container " + this.props.direction}>
        <Arrows
          left="timeline"
          right="travel"
          updateNextPage={this.props.updateNextPage}
        />
        <div className="NewsAggregator">
          <header className="NewsAggregator-title-container">
            <h3 className="NewsAggregator-title">The Latest Brexit News:</h3>
          </header>
          <ul className="articles-container">{articles}</ul>
        </div>
      </div>
    );
  }
}

export default NewsAggregator;
