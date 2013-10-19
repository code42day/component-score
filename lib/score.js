var component = require('component');
var Batch = require('batch');
var toFunction = require('to-function');
var report = require('./report');

module.exports = score;


// calculate the total score
function calculateTotal(scores) {
  var sum = scores.reduce(function(s, it) {
    return s += it;
  }, 0);
  return Math.floor(sum  * 100 / scores.length);
}


var checks = [
  require('./checks/fake'),
  require('./checks/demo')
];

function score(repo, fn) {
  component.info(repo, 'master', function(err, json) {
    if (err) {
      return fn(err);
    }
    var batch = new Batch();

    // queue all checks
    checks.forEach(function(check) {
      batch.push(check.bind(null, json));
    });

    // analyze results
    batch.end(function(err, infos) {
      if (err) {
        return fn(err);
      }
      var total = calculateTotal(infos.map(toFunction('score')));
      report(total, infos);
      fn();
    });
  });
}
