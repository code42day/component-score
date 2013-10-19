module.exports = pinned;

function pinned(json, info) {
  var deps = json.dependencies || {},
    names = Object.keys(deps),
    unpinned;

  info.score(1);
  if (!names.length) {
    info.ok('all deps are pinned.');
    return;
  }

  unpinned = names.filter(function(name) {
    var version = deps[name];
    return version === 'master' || version === '*';
  });

  if (!unpinned.length) {
    info.ok('all deps are pinned.');
    return;
  }

  info.score((names.length - unpinned.length) / names.length);
  unpinned.forEach(function(name) {
    info.warn(name +  ' is unpinned.');
  });
}