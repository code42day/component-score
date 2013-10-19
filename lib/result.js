function toAsync(fn, thisArg) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    process.nextTick(function() {
      fn.apply(thisArg, args);
    });
  };
}

function notify(type, score, msg, fn, async) {
  var info = {
    score: score
  };
  info[type] = [msg];
  if (async) {
    fn = toAsync(fn);
  }
  fn(null, info);
}

module.exports = ['err', 'warn', 'ok'].reduce(function(ex, type) {
  ex[type] = notify.bind(null, type);
  return ex;
}, {});