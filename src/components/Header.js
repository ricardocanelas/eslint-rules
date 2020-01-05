import React from 'react'

// TODO
const Header = ({ title, onGotoBack }) => {
  return (
    <header>
      <h1>{title}</h1>
      <div className="pull-right">
        <button onClick={onGotoBack} style={{ cursor: 'pointer' }}>
          go back
        </button>
      </div>
    </header>
  )
}

export default Header
