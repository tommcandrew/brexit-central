import React, {Component} from 'react'
import axios from 'axios'
import './NewsAggregator.css'
import uuid from 'uuid/v4'
import {Link} from 'react-router-dom'

// const TOKEN = process.env.REACT_APP_NEWSAPI_TOKEN

//thomas' token
const TOKEN = 'f39d64a11f6a4049be5b960429271de9'

const TODAY = new Date()
class NewsAggregator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      slide: null
    }
  }

  async componentDidMount() {
    const todayToISO = TODAY.toISOString()
    const sources =
      'bbc-news,daily-mail,google-news-uk,independent,mirror,reddit-r-all,the-irish-times,the-telegraph,reuters'
    const baseUrl = `https://newsapi.org/v2/everything?language=en&q=brexit&to=${todayToISO}&sources=${sources}&sortBy=publishedAt&apiKey=${TOKEN}`
    const res = await axios(baseUrl)
    const articles = res.data.articles

    this.setState({
      articles: articles.map(a => ({...a, id: uuid()}))
    })
  }

  timeSince(date) {
    const publishedDate = new Date(date)
    const seconds = Math.floor((TODAY - publishedDate) / 1000)
    // console.log(TODAY, date, seconds)
    let interval = Math.floor(seconds / 86400)
    let intervalType

    if (interval >= 1) {
      intervalType = 'day'
    } else {
      interval = Math.floor(seconds / 3600)

      if (interval >= 1) {
        intervalType = 'hour'
      } else {
        interval = Math.floor(seconds / 60)
        if (interval >= 1) {
          intervalType = 'minute'
        } else {
          interval = seconds
          intervalType = 'second'
        }
      }
    }

    if (interval > 1 || interval === 0) {
      intervalType += 's'
    }

    return `${interval} ${intervalType} ago`
  }

  slide = (side) => {
    this.setState({ slide: side});
  }

  render() {
    const articles = this.state.articles.map(a => {
      const timeAgo = this.timeSince(a.publishedAt)
      return (
        <article key={uuid()} className='article'>
          <p className='time-passed'>{timeAgo}</p>
          <a href={a.url} target='_blank' rel='noopener noreferrer'>
            <p>{a.title}</p>
          </a>
        </article>
      )
    })
    return (
      <div>
      <div className='links'>
        <Link className='left'to="/timeline">&lt;&nbsp;Timeline</Link>
        <Link className='right' to="/travel">Travel&nbsp;&gt;</Link>
      </div>
      <div className='NewsAggregator'>
        <header className='NewsAggregator-title-container'>
          <h3 className='NewsAggregator-title'>The latest from the B word</h3>
          <p className='NewsAggregator-subtitle'>(no, not Boris)</p>
        </header>
        <ul className='articles-container'>{articles}</ul>
      </div>
      </div>
    )
  }
}

export default NewsAggregator