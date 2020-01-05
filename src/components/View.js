import React from 'react'
import showdown from 'showdown'
import parse from 'html-react-parser'

const converter = new showdown.Converter()

const initialState = {
  loading: false,
  content: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CONTENT': {
      return { ...state, loading: true, content: '' }
    }
    case 'SET_CONTENT': {
      return { ...state, loading: false, content: action.payload }
    }
    default: {
      throw new Error()
    }
  }
}

// TODO
const View = ({ item }) => {
  const [state, dispath] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    if (item.hasOwnProperty('url')) {
      dispath({ type: 'FETCH_CONTENT' })
      fetch(item.url)
        .then(res => res.text())
        .then(data => {
          dispath({ type: 'SET_CONTENT', payload: converter.makeHtml(data) })
        })
    }
  }, [item])

  if (item && !item.hasOwnProperty('name')) return 'Choose one'

  return (
    <div className="view-container">
      <h1 className="title">rule: {item.name}</h1>
      <div className="md">{parse(state.content)}</div>
    </div>
  )
}

export default View
