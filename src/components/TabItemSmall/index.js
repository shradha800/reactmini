import './index.css'

const TabItemSmall = props => {
  const {tabDetails, isActive, onClickFilter} = props
  const {label, value} = tabDetails

  const activeBtn = isActive ? 'active-btn' : ''

  const clickFilter = () => {
    onClickFilter(value)
  }

  return (
    <li className="bookshelves-list-small-items">
      <button
        type="button"
        className={`bookshelves-list-small-btn ${activeBtn}`}
        onClick={clickFilter}
      >
        {label}
      </button>
    </li>
  )
}

export default TabItemSmall
