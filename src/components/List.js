import React from 'react'

// TODO
const List = ({ items, onClick }) => {
  const handleClick = item => () => {
    onClick(item)
  }

  return (
    <div className="list-container">
      <ul>
        {items.map((item, index) => {
          const hasUrl = item.url ? true : false
          return (
            <li key={index} onClick={handleClick(item)}>
              <button type="button" disabled={!hasUrl}>
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default List
