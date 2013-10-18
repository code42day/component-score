module.exports = fake;

// Checks one score factor for the component
// Returns a subjective score 0 <= score <= 1 and an info object { ok, error, warning }
function fake(json, fn) {
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
