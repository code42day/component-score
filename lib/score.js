var component = require('component');
var Batch = require('batch');
var toFunction = require('to-function');
var report = require('./report');
var info = require('./info');

module.exports = score;


// calculate the total score
function calculateTotal(scores) {
  var sum = scores.reduce(function(s, it) {
    return s += it;
  }, 0);
  return Math.floor(sum  * 100 / scores.length);
}


function checkFn(check, json) {
  return function(fn) {
    var _info = info();
    check(json, _info, function(err) {
      fn(err, _info.get());
    });
  };
}

var checks = [
  require('./checks/fake'),
  require('./checks/demo'),
  require('./checks/pinned')
];

function score(repo, fn) {
  component.info(repo, 'master', function(err, json) {
    if (err) {
      return fn(err);
    }
    var batch = new Batch();

    // queue all checks
    checks.forEach(function(check) {
      batch.push(checkFn(check, json));
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
