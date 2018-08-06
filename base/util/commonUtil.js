const filterObjectProperties = (sourceObject, filterArray) => {
  if(!filterArray || !Array.isArray(filterArray)){
    return sourceObject
  }
  const result = {}
  filterArray.forEach(propName => {
    if(sourceObject.hasOwnProperty(propName)){
      result[propName] = sourceObject[propName]
    }
  })
  return result
}

module.exports.filterObjectProperties = filterObjectProperties