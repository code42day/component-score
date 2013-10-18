module.exports = report;

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
