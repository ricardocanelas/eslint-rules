const parse = require('node-html-parser').parse
const fs = require('fs')

const getScript = url => {
  return new Promise((resolve, reject) => {
    const http = require('http'),
      https = require('https')

    let client = http

    if (url.toString().indexOf('https') === 0) {
      client = https
    }

    client
      .get(url, resp => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
          data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(data)
        })
      })
      .on('error', err => {
        reject(err)
      })
  })
}

async function getAllRules(url) {
  const str = await getScript(url)
  const html = parse(str)
  const elements = html.querySelectorAll('table tbody tr.js-navigation-item td.content a')
  const rules = elements.map(elem => {
    return elem.attributes.title.replace('.md', '')
  })
  console.log(rules)
  const data = JSON.stringify(rules)
  fs.writeFileSync('list.json', data)
}

// Example:
// getAllRules('https://github.com/eslint/eslint/tree/master/docs/rules')
// getAllRules('https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules')
// getAllRules('https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules')
// getAllRules('https://github.com/Intellicode/eslint-plugin-react-native/tree/master/docs/rules')
