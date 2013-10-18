var component = require('component');
var Batch = require('batch');
var toFunction = require('to-function');

module.exports = score;

// Checks one score factor for the component
// Returns a subjective score 0 <= score <= 1 and an info object { ok, error, warning }
function fakeCheck(json, fn) {
  process.nextTick(function() {
    fn(null, {
      score: 0.4,
      ok: [
        'Life is good'
      ],
      warn: [
        'Froobles are not in broomps.'
      ],
      err: [
        'Thou shall not frump the obster!'
      ]
    });
  });
}

// calculate the total score
function calculateTotal(scores) {
  var sum = scores.reduce(function(s, it) {
    return s += it;
  }, 0);
  return Math.floor(sum  * 100 / scores.length);
}


function report(total, infos) {
  var symbol = {
    ok: '✓',
    err: '✖',
    warn: '~'
  };

  function write(info, type) {
    var strs = info[type];

    if (!strs) {
      return;
    }
    strs.forEach(function(s) {
      console.log('\t%s %s', symbol[type], s);
    });
  }

  console.log('Total score: %d%%', total);
  infos.forEach(function(info) {
    ['err', 'warn', 'ok'].forEach(write.bind(null, info));
  });
}


var checks = [fakeCheck];

function score(repo, fn) {
  component.info(repo, 'master', function(err, json) {
    var batch = new Batch();

    // queue all checks
    checks.forEach(function(check) {
      batch.push(check.bind(null, json));
    });

    // analyze results
    batch.end(function(err, infos) {
      var total = calculateTotal(infos.map(toFunction('score')));
      if (!err) {
        report(total, infos);
      }
      fn(err);
    });
  });
}
