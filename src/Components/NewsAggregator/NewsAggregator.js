import React, { Component } from 'react'
import axios from 'axios'
import './NewsAggregator.css'

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
    console.log(res.data.articles)
    this.setState({
      articles: articles
    })
  }

  render () {
    const articles = this.state.articles.map(a => {
      return (
        <li key={a.title} className='article'>
          <a href={a.url}>
            <p>{a.title}</p>
          </a>
        </li>
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
