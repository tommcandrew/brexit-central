import React, { Component } from 'react'
import axios from 'axios'
import './NewsAggregator.css'
import uuid from 'uuid/v4'

const TOKEN = process.env.REACT_APP_NEWSAPI_TOKEN
const TODAY = new Date()
class NewsAggregator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: []
    }
  }

  async componentDidMount () {
    const todayToISO = TODAY.toISOString()
    const sources =
      'bbc-news,daily-mail,google-news-uk,independent,mirror,reddit-r-all,the-irish-times,the-telegraph,reuters'
    const baseUrl = `https://newsapi.org/v2/everything?language=en&q=brexit&to=${todayToISO}&sources=${sources}&sortBy=publishedAt&apiKey=${TOKEN}`
    const res = await axios(baseUrl)
    const articles = res.data.articles

    this.setState({
      articles: articles.map(a => ({ ...a, id: uuid() }))
    })
  }

  timeSince (date) {
    const publishedDate = new Date(date)
    const seconds = Math.floor((TODAY - publishedDate) / 1000)
    console.log(TODAY, date, seconds)
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

  render () {
    const articles = this.state.articles.map(a => {
      const timeAgo = this.timeSince(a.publishedAt)
      return (
        <article key={uuid()} className='article'>
          <a href={a.url} target='_blank' rel='noopener noreferrer'>
            <span>{timeAgo}</span>
            <p>{a.title}</p>
          </a>
        </article>
      )
    })
    return (
      <div className='NewsAggregator'>
        <h3>The latest from the B word (no, not Boris)</h3>
        <ul className='articles-container'>{articles}</ul>
      </div>
    )
  }
}

export default NewsAggregator
