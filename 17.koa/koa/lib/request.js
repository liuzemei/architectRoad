const url = require('url')

module.exports = {
  get url() { // Object.defineProperty
    return this.req.url
  },
  get query() {
    let { query } = url.parse(this.req.url, true)
    return query
  },
  get path() {
    let { pathname } = url.parse(this.req.url, true)
    return pathname
  }
}

