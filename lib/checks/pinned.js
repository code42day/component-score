var result = require('../result');

module.exports = pinned;

function pinned(json, fn) {
  var deps = json.dependencies || {},
    names = Object.keys(deps),
    unpinned,
    score;

  if (!names.length) {
    return result.ok(1, 'all deps are pinned.', fn, true);
  }

  unpinned = names.filter(function(name) {
    var version = deps[name];
    return version === 'master' || version === '*';
  });

  if (!unpinned.length) {
    return result.ok(1, 'all deps are pinned.', fn, true);
  }

  score = (names.length - unpinned.length) / names.length;
  fn(null, {
    score: score,
    warn: unpinned.map(function(name) {
      return name + ' is unpinned.';
    })
  });
}