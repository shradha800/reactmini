import {Component} from 'react'

import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
import ReactSlick from '../ReactSlick'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-container-content">
            <h1 className="home-heading"> Find Your Next Favorite Books? </h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf">
              <button type="button" className="find-books-btn">
                Find Books
              </button>
            </Link>
          </div>
          <ReactSlick />
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
