var request = require('superagent');
var result = require('../result');

module.exports = demo;

function demo(json, fn) {
  if (!json.demo) {
    return result.warn(0, 'No demo page.', fn, true);
  }
  request
    .head(json.demo)
    .end(function(err, res) {
      if(err || res.error) {
        return result.warn(0.1, 'Demo page does not work.', fn);
      }
      result.ok(1, 'We have a valid demo page.', fn);
    });
}