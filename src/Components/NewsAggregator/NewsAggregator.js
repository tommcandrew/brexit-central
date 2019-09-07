import React, { Component } from 'react'
import axios from 'axios'
import './NewsAggregator.css'
import uuid from 'uuid/v4'

const TOKEN = process.env.REACT_APP_NEWSAPI_TOKEN
class NewsAggregator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: []
    }
  }

  async componentDidMount () {
    const today = new Date().toISOString()
    const baseUrl = `https://newsapi.org/v2/everything?language=en&q=brexit&to=${today}&sortBy=publishedAt&apiKey=${TOKEN}`
    const sources =
      'bbc-news,daily-mail,google-news-uk,independent,mirror,reddit-r-all,the-irish-times,the-telegraph,reuters'
    const res = await axios(baseUrl)
    const articles = res.data.articles

    this.setState({
      articles: articles.map(a => ({ ...a, id: uuid() }))
    })
  }

  render () {
    const articles = this.state.articles.map(a => {
      const time = new Date(a.publishedAt).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      return (
        <article key={uuid()} className='article'>
          <a href={a.url} target='_blank' rel='noopener noreferrer'>
            <span>{time}</span>
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
