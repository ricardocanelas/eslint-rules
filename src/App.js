import React from 'react'
import Form from './components/Form'
import List from './components/List'
import View from './components/View'
import Header from './components/Header'
import { normalizeRules, setURLs } from './helper'

const initialState = {
  view: 'intro',
  rules: [],
  myrules: [],
  currentItem: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_RULES': {
      return { ...state, rules: action.payload }
    }
    case 'SET_VIEW': {
      return { ...state, view: action.payload }
    }
    case 'SET_MY_RULES': {
      return { ...state, myrules: action.payload, view: 'details' }
    }
    case 'SET_CURRENT_ITEM': {
      return { ...state, currentItem: action.payload }
    }
    default: {
      throw new Error()
    }
  }
}

const App = () => {
  const [state, dispath] = React.useReducer(reducer, initialState)

  const handleSubmit = React.useCallback(
    values => {
      dispath({ type: 'SET_MY_RULES', payload: setURLs(state.rules, values) })
    },
    [dispath, state.rules]
  )

  const handleClickItem = React.useCallback(
    item => {
      dispath({ type: 'SET_CURRENT_ITEM', payload: item })
    },
    [dispath]
  )

  const handleGotoBack = React.useCallback(() => {
    dispath({ type: 'SET_VIEW', payload: 'intro' })
  }, [dispath])

  React.useEffect(() => {
    fetch('rules.json')
      .then(res => res.json())
      .then(data => {
        dispath({ type: 'SET_RULES', payload: normalizeRules(data) })
      })
  }, [])

  if (state.rules.length === 0) return <div style={{ color: '#e4e4e4' }}>Loading...</div>

  return (
    <>
      {state.view === 'intro' && (
        <section className="intro">
          <Form onSubmit={handleSubmit} />
        </section>
      )}
      {state.view === 'details' && (
        <section className="details">
          <Header title="Details" onGotoBack={handleGotoBack} />
          <div className="content">
            <List items={state.myrules} onClick={handleClickItem} />
            <View item={state.currentItem} />
          </div>
        </section>
      )}
    </>
  )
}

export default App
