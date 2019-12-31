import React from 'react';
import './App.css';
import showdown from 'showdown'
import parse from 'html-react-parser';

const converter = new showdown.Converter()

function App() {
  const [data1, setData1] = React.useState(null)
  const [data2, setData2] = React.useState(null)
  const [loading1, setLoading1] = React.useState(true)
  const [loading2, setLoading2] = React.useState(true)

  React.useEffect(() => {
    fetch('rule-example.md').then(response => {
      console.log("DATA1")
      console.log(response)
      return response.text()
    }).then(data => {
      setData1(converter.makeHtml(data))
      setLoading1(false)
      console.log(converter.makeHtml(data))
    })
    fetch('https://raw.githubusercontent.com/eslint/eslint/master/docs/rules/array-bracket-newline.md').then(response => {
      console.log("DATA2")
      console.log(response)
      return response.text()
    }).then(data => {
      setData2(data)
      setLoading2(false)
      console.log(converter.makeHtml(data))
    })
  }, [])

  return <div>
    {!loading1 && (
      parse(data1)
    )}
    <hr />
    {!loading2 && (
      data2
    )}
  </div>

}

function App2() {
  const valueRef = React.useRef(null)
  const [view, setView] = React.useState('form')
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState(null)
  const [value, setValue] = React.useState(null)

  const handleClick = e => {
    setView('list')
    setValue(JSON.parse(valueRef.current.value))
  }

  React.useEffect(() => {
    fetch('rules.json').then(response => {
      console.log(response)
      return response.json()
    }).then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])

  if(loading) return <div>Loading..</div>

  return (
    <div className="App">
      {view === 'form' && (
        <div>
          <textarea ref={valueRef} defaultValue={`{
"accessor-pairs": "off"
}`} rows="10"/>
          <button onClick={handleClick}>Check</button>
        </div>
      )}

      {view === 'list' && (
        <div className="section-list">
          <div className="painel-left">
          <ul>
            {Object.keys(value).map(key => {
              const item = value[key]
              return <li key={key}>{key}</li>
            })}
            </ul>
          </div>
          <div className="painel-right">
            Here will be MD
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
