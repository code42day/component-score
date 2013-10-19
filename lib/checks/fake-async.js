module.exports = fake;

function fake(json, info, fn) {
  info.score(0.4);
  info.ok('Life is good.');
  info.warn('Froobles are not in broomps.');
  info.err('Thou shall not frump the obster!');
  process.nextTick(fn);
}
