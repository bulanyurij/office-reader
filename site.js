(function () {
  var root = document.documentElement;
  function setLang(lang, save) {
    root.dataset.lang = lang;
    root.lang = lang;
    var t = root.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === lang));
    });
    if (save) try { localStorage.setItem('office-reader-lang', lang); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('office-reader-lang'); } catch (e) {}
  // #uk / #en links win over a saved choice; then the browser language.
  var hash = location.hash;
  var browser = (navigator.language || '').toLowerCase().indexOf('uk') === 0 ? 'uk' : 'en';
  setLang(hash === '#uk' ? 'uk' : hash === '#en' ? 'en' : (saved || browser), false);
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.set, true); });
  });
})();
