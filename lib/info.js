module.exports = info;

function info() {
  var my = {}, self;

  function score(f) {
    my.score = f;
    return self;
  }

  function msg(type, str) {
    my[type] = my[type] || [];
    my[type].push(str);
    return self;
  }

  function get() {
    return my;
  }

  self = {
    score: score,
    get: get
  };

  ['err', 'warn', 'ok'].forEach(function(type) {
    self[type] = msg.bind(self, type);
  });

  return self;
}