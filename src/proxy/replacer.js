const regex = /{{ ([\w|.]+) }}/gi

const replaceRegex = /{{ | }}/gi

const extract = (obj) => (match) => {
  const path = match.replace(replaceRegex, '')
    .split('.')
  return { match, value: (obj[path] || '') }
}

const replaceableKeys = src => src.match(regex) || []

const repleacebleValues = (keys, obj) => keys.map(extract(obj))

const replaceableEntries = (src, obj) => repleacebleValues(replaceableKeys(src), obj)

const reducer = (acc, { match, value }) => {
  return acc.replace(match, value)
}

const replace = (str) => replaceableKeys(str).length === 0
  ? str
  : replaceableEntries(str, process.env).reduce(reducer, str)

module.exports = { replace }
