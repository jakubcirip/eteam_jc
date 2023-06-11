!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = t || self).uuidv4 = e());
})(this, function () {
  'use strict';
  var t =
      ('undefined' != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      ('undefined' != typeof msCrypto &&
        'function' == typeof msCrypto.getRandomValues &&
        msCrypto.getRandomValues.bind(msCrypto)),
    e = new Uint8Array(16);
  function n() {
    if (!t)
      throw new Error(
        'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported',
      );
    return t(e);
  }
  for (var o = [], r = 0; r < 256; ++r)
    o.push((r + 256).toString(16).substr(1));
  return function (t, e, r) {
    'string' == typeof t &&
      ((e = 'binary' === t ? new Uint8Array(16) : null), (t = null));
    var u = (t = t || {}).random || (t.rng || n)();
    if (((u[6] = (15 & u[6]) | 64), (u[8] = (63 & u[8]) | 128), e)) {
      for (var i = r || 0, d = 0; d < 16; ++d) e[i + d] = u[d];
      return e;
    }
    return (function (t, e) {
      var n = e || 0,
        r = o;
      return (
        r[t[n + 0]] +
        r[t[n + 1]] +
        r[t[n + 2]] +
        r[t[n + 3]] +
        '-' +
        r[t[n + 4]] +
        r[t[n + 5]] +
        '-' +
        r[t[n + 6]] +
        r[t[n + 7]] +
        '-' +
        r[t[n + 8]] +
        r[t[n + 9]] +
        '-' +
        r[t[n + 10]] +
        r[t[n + 11]] +
        r[t[n + 12]] +
        r[t[n + 13]] +
        r[t[n + 14]] +
        r[t[n + 15]]
      ).toLowerCase();
    })(u);
  };
});
