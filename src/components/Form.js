import React from 'react'
import { getRulesByEslintrc } from '../helper'

const validate = () => {
  // TODO
  return true
}

const initialValue = `{
  "extends": ["react-app", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "comma-dangle": [2, "always-multiline"],
    "comma-dangle": [2, "always-multiline"],
    "function-paren-newline": 0,
    "generator-star-spacing": 0,
    "import/prefer-default-export": 0,
    "new-cap": 0,
    "no-case-declarations": 0,
    "no-class-assign": 1,
    "no-console": 0,
    "no-continue": 0,
    "no-param-reassign": [2, { "props": false }],
    "no-underscore-dangle": 0,
    "no-unused-vars": ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }],
    "object-curly-newline": 0,
    "object-curly-spacing": [1, "always"],
    "quotes": [2, "single", { "allowTemplateLiterals": true }],
    "require-atomic-updates": "off"
  }
}`

const Form = ({ onSubmit }) => {
  const [error, setError] = React.useState(null)
  const fieldRef = React.useRef(null)
  const handleSubmit = e => {
    e.preventDefault()
    const value = fieldRef.current.value
    if (validate(value)) {
      onSubmit(getRulesByEslintrc(value))
    } else {
      setError('something happened')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">Copy and past your .eslintrc file</div>
      <div className="form-group textarea">
        <textarea ref={fieldRef} defaultValue={initialValue} />
      </div>
      <button type="submit">Submit</button>
      {error && 'TODO'}
    </form>
  )
}

export default Form
