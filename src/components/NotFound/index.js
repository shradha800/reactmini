import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dwdaqrmdg/image/upload/v1701363673/not_found_lewkqn.png"
      alt="not found"
      className="not-found-img"
    />
    <p className="not-found-description">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="go-home-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
