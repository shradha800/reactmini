import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookDetails: {}, apiStatus: apiConstantsStatus.initial}

  componentDidMount() {
    this.getBookDetailsList()
  }

  getBookDetailsList = async () => {
    this.setState({apiStatus: apiConstantsStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/book-hub/books/${id}`

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.book_details
      const updatedData = {
        id: fetchedData.id,
        authorName: fetchedData.author_name,
        coverPic: fetchedData.cover_pic,
        aboutBook: fetchedData.about_book,
        rating: fetchedData.rating,
        readStatus: fetchedData.read_status,
        title: fetchedData.title,
        aboutAuthor: fetchedData.about_author,
      }

      this.setState({
        bookDetails: updatedData,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {bookDetails} = this.state

    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails

    return (
      <div className="books-details-content-main-container">
        <div className="top-container">
          <div>
            <img src={coverPic} alt={title} className="books-details-img" />
          </div>
          <div className="books-details-content-container">
            <h1 className="book-title"> {title} </h1>
            <p className="book-author"> {authorName} </p>
            <div className="book-status-rating-container">
              <p className="book-rating-txt">Avg Rating</p>
              <p className="rating-icon">
                <BsFillStarFill />
              </p>
              <p className="book-rating"> {rating} </p>
            </div>
            <p className="book-status">
              Status: <span className="status-span"> {readStatus} </span>
            </p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="bottom-container">
          <h1 className="bottom-labels"> About Author </h1>
          <p className="bottom-description"> {aboutAuthor} </p>
          <h1 className="bottom-labels"> About Book </h1>
          <p className="bottom-description"> {aboutBook} </p>
        </div>
      </div>
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
        onClick={this.getBooksList}
      >
        Try Again
      </button>
    </div>
  )

  booksDetailsView = () => {
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
      <div className="books-details-container">
        <Header />
        {this.booksDetailsView()}
        <Footer />
      </div>
    )
  }
}

export default BookDetails
