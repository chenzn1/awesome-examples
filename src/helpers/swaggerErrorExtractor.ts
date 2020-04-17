const errorExtractor = err => {
  const { results, code, paramName } = err

  if (results && results.errors) {
    const { code: _code, message, path } = results.errors[0]

    const [firstInPath, fullPath] = path[0]
      ? [`: ${path[0]}`, `full path: ${path}, `]
      : ['', '']

    return {
      message: `Request Body: ${message}${firstInPath}`,
      details: `${fullPath}code: ${_code}`,
    }
  } else if (code && paramName) {
    return {
      message: `Query Param: ${paramName} ${code.toLowerCase()}`,
    }
  } else {
    return {
      message: err,
    }
  }
}

export default errorExtractor
