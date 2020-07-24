const proto = {}

// proxy =>

function defineGetter(target, keys) {
  keys.forEach(key => {
    proto.__defineGetter__(key, function () {
      //  谁调用就是指代谁，这里指向 ctx
      return this[target][key]
    })
  })
}

function defineSetter(target, keys) {
  keys.forEach(key => {
    proto.__defineSetter__(key, function (value) {
      //  谁调用就是指代谁，这里指向 ctx
      console.log(this.response, key)
      this[target][key] = value
    })
  })
}

defineGetter('request', ['url', 'path', 'query'])

defineGetter('response', ['body'])
defineSetter('response', ['body'])

console.log(proto.a)


module.exports = proto