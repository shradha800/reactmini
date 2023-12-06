import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BooksCard = props => {
  const {booksDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = booksDetails

  return (
    <Link to={`/books/${id}`} className="link-decor">
      <li className="book-cards-container">
        <img src={coverPic} alt={title} className="book-card-img" />
        <div className="books-content-container">
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
      </li>
    </Link>
  )
}

export default BooksCard
