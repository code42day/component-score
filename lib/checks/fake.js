module.exports = fake;

// Checks one score factor for the component
// Returns a subjective score 0 <= score <= 1 and an info object { ok, error, warning }
function fake(json, info, fn) {
  info.score(0.4);
  info.ok('Life is good.');
  info.warn('Froobles are not in broomps.');
  info.err('Thou shall not frump the obster!');
  process.nextTick(fn);
}
