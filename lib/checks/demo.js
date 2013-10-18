var request = require('superagent');

module.exports = demo;

function demo(json, fn) {
  if (!json.demo) {
    return fn(null, {
      score: 0,
      warn: ['No demo page.']
    });
  }
  request
    .head(json.demo)
    .end(function(err, res) {
      if(err || res.error) {
        return fn(null, {
          score: 0.1,
          warn: ['Demo page does not work.']
        });
      }
      fn(null, {
        score: 1,
        ok: ['We have a valid demo page.']
      });
    });
}