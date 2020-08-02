exports.valueForEach = function (obj, cb) {
  Object.values(obj).forEach(option => cb(option))
}