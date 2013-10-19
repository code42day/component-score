var Batch = require('batch');
var component = require('component');

module.exports = outdated;

function outdated(json, info, fn) {
  var deps = json.dependencies || {},
    names = Object.keys(deps),
    pinned,
    old = [],
    batch;

  info.score(1);
  if (!names.length) {
    info.ok('all deps are current.');
    return fn();
  }

  pinned = names.filter(function(name) {
    var version = deps[name];
    return version !== 'master' || version !== '*';
  });

  if (!pinned.length) {
    info.ok('all deps are current.');
    return fn();
  }

  batch = new Batch();
  pinned.forEach(function(name) {
    batch.push(function(fn) {
      component.info(name, 'master', function(err, json) {
        if (err) {
          return fn(err);
        }
        if (json.version !== deps[name]) {
          info.warn(name + ' can be upgraded to ' + json.version + ' from ' + deps[name]);
          old.push(name);
        }
        fn();
      });
    });
  });

  batch.end(function(err) {
    if (!old.length) {
      info.ok('all deps are current.');
    } else {
      info.score((names.length - old.length) / names.length);
    }
    fn(err);
  });
}