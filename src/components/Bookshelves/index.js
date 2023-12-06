import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import TabItemSmall from '../TabItemSmall'
import TabItemLarge from '../TabItemLarge'
import BooksCard from '../BooksCard'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    searchInput: '',
    activeTabValue: bookshelvesList[0].value,
    activeTabLabel: bookshelvesList[0].label,
    booksList: [],
    apiStatus: apiConstantsStatus.initial,
  }

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({apiStatus: apiConstantsStatus.inProgress})

    const {searchInput, activeTabValue} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTabValue}&search=${searchInput}`

    const response = await fetch(url, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.books

      const updatedData = fetchedData.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))

      this.setState({
        booksList: updatedData,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  onClickFilter = (value, label) => {
    this.setState(
      {activeTabValue: value, activeTabLabel: label},
      this.getBooksList,
    )
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value}, this.getBooksList)
  }

  renderNoResult = () => {
    const {searchInput} = this.state

    return (
      <div className="no-result">
        <img
          src="https://res.cloudinary.com/dwdaqrmdg/image/upload/v1701349681/No_view_dscvzw.png"
          alt="no books"
          className="no-result-img"
        />
        <h1 className="no-result-heading">
          Your search for {searchInput} did not find any matches.
        </h1>
      </div>
    )
  }

  renderSuccessView = () => {
    const {booksList} = this.state

    if (booksList.length === 0) {
      return this.renderNoResult()
    }

    return (
      <ul className="books-list">
        {booksList.map(eachBook => (
          <BooksCard key={eachBook.id} booksDetails={eachBook} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
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

  bookshelvesBooks = () => {
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
    const {activeTabValue, activeTabLabel, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="bookshelves-main-container">
          <div className="search-input-container">
            <input
              type="search"
              className="bookshelves-input-element"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeInput}
            />
            <button
              type="button"
              className="search-icon-container"
              onClick={this.getBooksList}
              testid="searchButton"
            >
              <BsSearch />
            </button>
          </div>
          <div className="mobile-approach">
            <h1 className="bookshelves-heading"> Bookshelves </h1>
            <ul className="bookshelves-list-small">
              {bookshelvesList.map(eachItem => (
                <TabItemSmall
                  key={eachItem.id}
                  tabDetails={eachItem}
                  isActive={eachItem.value === activeTabValue}
                  onClickFilter={this.onClickFilter}
                />
              ))}
            </ul>
            {this.bookshelvesBooks()}
          </div>
          <div className="laptop-approach">
            <div className="side-bar-container">
              <h1 className="bookshelves-heading"> Bookshelves </h1>
              <ul className="side-bar">
                {bookshelvesList.map(eachItem => (
                  <TabItemLarge
                    key={eachItem.id}
                    tabDetailsLarge={eachItem}
                    isActive={eachItem.value === activeTabValue}
                    onClickFilter={this.onClickFilter}
                  />
                ))}
              </ul>
            </div>
            <div>
              <h1 className="book-filter-label"> {activeTabLabel} Books </h1>
              {this.bookshelvesBooks()}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
