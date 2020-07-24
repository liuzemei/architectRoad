module.exports = {
    get body() {
      return this._body
    },
    set body(body) {
      console.log(this.res.statusCode)
      this.res.statusCode = 200
      this._body = body
    }

}

