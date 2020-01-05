export const getRulesByEslintrc = value => {
  const parse = JSON.parse(value)
  const rules = parse.rules
  return Object.keys(rules).map(key => {
    return { name: key, value: rules[key] }
  })
}

export const normalizeRules = list => {
  return list.collections.reduce((acc, collection) => {
    const urlbase = collection.base || ''
    const prefix = collection.prefix || ''
    const rules = collection.rules.map(item => {
      if (typeof item === 'string') {
        return { name: `${prefix}${item}`, url: `${urlbase}${item}.md` }
      } else if (item.hasOwnProperty('name') && item.hasOwnProperty('url')) {
        return item
      }

      return null
    })

    rules.forEach(rule => {
      if (rules) acc[rule.name] = rule
    })

    return acc
  }, {})
}

export const setURLs = (list, arr) => {
  return arr.map(item => {
    return {
      ...item,
      url: list.hasOwnProperty(item.name) ? list[item.name].url : null,
    }
  })
}
