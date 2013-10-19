var component = require('component');
var Batch = require('batch');
var toFunction = require('to-function');
var report = require('./report');
var info = require('./info');
var debug = require('debug')('component-score:score');

module.exports = score;


// calculate the total score
function calculateTotal(scores) {
  var sum = scores.reduce(function(s, it) {
    return s += it;
  }, 0);
  return Math.floor(sum  * 100 / scores.length);
}


function checkFn(check, json) {
  function sync(done) {
    debug('Sync %s', check.name);
    process.nextTick(function() {
      var _info = info();
      check(json, _info);
      done(null, _info.get());
    });
  }

  function async(done) {
    var _info = info();
    debug('Async %s', check.name);
    check(json, _info, function(err) {
      done(err, _info.get());
    });
  }

  return check.length > 2 ? async : sync;
}

var checks = [
  // require('./checks/fake'),
  // require('./checks/fake-async'),
  require('./checks/demo'),
  require('./checks/pinned')
];

function score(repo, fn) {
  component.info(repo, 'master', function(err, json) {
    if (err) {
      return fn(err);
    }
    var batch = new Batch();

    debug('%d checks to queue', checks.length);
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
