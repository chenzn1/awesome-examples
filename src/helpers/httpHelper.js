const request = require('request')
module.exports = {
  msCallback(result, resolve, reject) {
    return result.success
      ? resolve(result.data)
      : reject({ code: -2, msg: result.err_msg })
  },
  _request({ params, option = {}, dataType, timeout = 10000 }) {
    if (params) {
      for (const i in params) {
        option.url = option.url.replace('{' + i + '}', params[i])
      }
    }
    option.timeout = timeout
    return new Promise((resolve, reject) => {
      request(option, (err, response, msg) => {
        if (err) {
          reject(err)
          return
        }
        const result =
          dataType === 'json' && typeof msg === 'string' ? JSON.parse(msg) : msg
        resolve(result)
      })
    })
  },
  get(options) {
    return this._request({
      params: options.params || null,
      option: {
        url: options.url,
        method: 'GET',
        qs: options.data || null,
      },
      dataType: options.dataType || 'json',
    })
  },
  delete(options) {
    return this._request({
      option: {
        url: options.url,
        method: 'DELETE',
        form: options.data,
      },
      dataType: options.dataType || 'json',
    })
  },
  put(options) {
    return this._request({
      option: {
        url: options.url,
        method: 'PUT',
        form: options.data,
      },
      dataType: options.dataType || 'json',
    })
  },
  post({ host, url, action, params, data, dataType }) {
    return this._request({
      params,
      option: {
        url: url,
        method: 'POST',
        json: data,
      },
      dataType: dataType || 'json',
    })
  },
  postXML({ url, params, data, timeout, agentOptions }) {
    return this._request({
      params,
      option: {
        url,
        method: 'POST',
        headers: { 'Content-Type': 'text/xml' },
        body: data,
        agentOptions,
      },
      dataType: 'xml',
      timeout,
    })
  },
}
