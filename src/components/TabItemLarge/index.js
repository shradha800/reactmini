import './index.css'

const TabItemLarge = props => {
  const {tabDetailsLarge, onClickFilter, isActive} = props
  const {label, value} = tabDetailsLarge

  const clickFilter = () => {
    onClickFilter(value, label)
  }

  const activeBtn = isActive ? 'active-large' : ''

  return (
    <li>
      <button
        type="button"
        onClick={clickFilter}
        className={`bookshelves-list-large-btn ${activeBtn}`}
      >
        {label}
      </button>
    </li>
  )
}

export default TabItemLarge
