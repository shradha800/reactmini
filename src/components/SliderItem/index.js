import {Link} from 'react-router-dom'

import './index.css'

const SliderItem = props => {
  const {sliderDetails} = props

  const {id, title, coverPic, authorName} = sliderDetails

  return (
    <Link to={`/books/${id}`} className="link-decor">
      <div className="slider-items-container">
        <img src={coverPic} alt={title} />
        <h1 className="slider-item-title"> {title} </h1>
        <p className="slider-item-name"> {authorName} </p>
      </div>
    </Link>
  )
}

export default SliderItem
