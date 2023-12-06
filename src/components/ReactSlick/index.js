import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import SliderItem from '../SliderItem'

import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {topRatedBooks: [], apiStatus: apiConstantsStatus.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiConstantsStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.books
      const updatedData = fetchedData.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
        id: eachBook.id,
      }))

      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <>
        <Slider {...settings}>
          {topRatedBooks.map(eachBook => (
            <SliderItem key={eachBook.id} sliderDetails={eachBook} />
          ))}
        </Slider>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dwdaqrmdg/image/upload/v1701194241/not_found_ysnzz3.png"
        alt="failure-view"
      />
      <p className="failure-txt"> Something went wrong. Please try again </p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.getTopRatedBooks}
      >
        Try Again
      </button>
    </div>
  )

  topRatedBooksSlick = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantsStatus.success:
        return this.renderSuccessView()
      case apiConstantsStatus.inProgress:
        return this.renderLoadingView()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="slider-container">
        <h1 className="slider-heading"> Top Rated Books </h1>
        <div className="slider-items-container">
          {this.topRatedBooksSlick()}
        </div>
      </div>
    )
  }
}

export default ReactSlick
