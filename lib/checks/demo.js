var request = require('superagent');

module.exports = demo;

function demo(json, info, fn) {
  if (!json.demo) {
    info.score(0).warn('No demo page.');
    return process.nextTick(fn);
  }
  request
    .head(json.demo)
    .end(function(err, res) {
      if(err || res.error) {
        info.score(0.1).warn('Demo page does not work.');
      } else {
        info.score(1).ok('We have a valid demo page.');
      }
      fn(err);
    });
}