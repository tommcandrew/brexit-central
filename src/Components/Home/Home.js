import React from 'react'
import Header from '../Header/Header'
import Countdown from '../Countdown/Countdown'
import MainNav from '../MainNav/MainNav'
import './Home.css'

class Home extends React.Component {

    componentDidMount = () => {
        this.props.updateCurrentPage('home')
    }

    render() {

        return (

            <div className='home-container'>

                <Header updateCurrentPage={this.props.updateCurrentPage} />
                <Countdown />
                <MainNav />

            </div>

        )

    }

}

export default Home