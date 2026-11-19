(function () {
  var PIXEL_ID = '1875112903440305';
  var GA_ID = 'G-5PNEDQDX07';
  var KEY = 'kliks_consent_v2';
  var LEGACY_KEY = 'kliks_consent';
  var queue = window.kliksQ = window.kliksQ || [];
  var pixelLoaded = false;
  var gaLoaded = false;

  // Consent Mode v2: everything denied until the visitor chooses. gtag.js itself
  // is only loaded after statistics consent, so nothing reaches Google before that.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'denied'
  });

  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function getChoice() {
    try { var v = JSON.parse(read(KEY)); return v && typeof v === 'object' ? v : null; } catch (e) { return null; }
  }
  function setChoice(c) {
    try { localStorage.setItem(KEY, JSON.stringify({ analytics: !!c.analytics, marketing: !!c.marketing })); } catch (e) {}
  }

  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
    flushGa();
  }

  // GA4 events queued before this script ran (e.g. on /koszonjuk): sent once statistics
  // consent is given on this page, dropped otherwise.
  var gaQueue = window.kliksGaQ = window.kliksGaQ || [];
  function flushGa() {
    while (gaQueue.length) { var ev = gaQueue.shift(); window.kliksEvent(ev[0], ev[1]); }
  }
  gaQueue.push = function () {
    Array.prototype.push.apply(gaQueue, arguments);
    if (gaLoaded) flushGa();
    return gaQueue.length;
  };

  function loadPixel() {
    if (pixelLoaded) return;
    pixelLoaded = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    flush();
  }

  // Meta events wait in window.kliksQ until marketing consent is given.
  function flush() {
    while (queue.length) fbq('track', queue.shift());
  }
  queue.push = function () {
    Array.prototype.push.apply(queue, arguments);
    if (pixelLoaded) flush();
    return queue.length;
  };

  // GA4 events: sent only with statistics consent, otherwise dropped. Resolves once
  // Google confirms the hit (or after 1s), so a caller can wait before navigating.
  window.kliksEvent = function (name, params) {
    return new Promise(function (resolve) {
      if (!gaLoaded) { resolve(); return; }
      var done = false;
      function finish() { if (!done) { done = true; resolve(); } }
      var p = {};
      for (var k in params) p[k] = params[k];
      p.event_callback = finish;
      p.event_timeout = 1000;
      gtag('event', name, p);
      setTimeout(finish, 1200);
    });
  };

  function clearCookies(prefixes) {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!prefixes.some(function (p) { return name.indexOf(p) === 0; })) return;
      document.cookie = name + '=; Max-Age=0; path=/';
      document.cookie = name + '=; Max-Age=0; path=/; domain=.' + host;
    });
  }

  function apply(choice, previous) {
    setChoice(choice);
    var revoked = previous && ((previous.analytics && !choice.analytics) || (previous.marketing && !choice.marketing));
    if (revoked) {
      if (previous.analytics && !choice.analytics) clearCookies(['_ga']);
      if (previous.marketing && !choice.marketing) clearCookies(['_fbp', '_fbc']);
      location.reload();
      return;
    }
    if (choice.analytics) loadGA();
    if (choice.marketing) loadPixel();
  }

  var css =
    '#kliks-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:10000;max-width:600px;margin:0 auto;' +
    'background:#1a1828;border:1px solid rgba(100,75,255,0.25);border-radius:16px;padding:20px 22px;' +
    'box-shadow:0 12px 40px rgba(0,0,0,0.45);font-family:Satoshi,system-ui,sans-serif;color:#fff;max-height:calc(100vh - 32px);overflow-y:auto;}' +
    '#kliks-consent p{margin:0 0 14px;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.7);}' +
    '#kliks-consent strong{color:#fff;}' +
    '#kliks-consent a{color:#a89cff;}' +
    '#kliks-consent label{display:flex;gap:10px;align-items:flex-start;margin:0 0 10px;font-size:14px;line-height:1.5;color:rgba(255,255,255,0.7);cursor:pointer;}' +
    '#kliks-consent input{width:18px;height:18px;margin-top:2px;flex-shrink:0;accent-color:#ff4315;}' +
    '#kliks-consent .kc-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;}' +
    '#kliks-consent button{flex:1 1 150px;border-radius:100px;padding:11px 16px;font:600 14px Satoshi,system-ui,sans-serif;cursor:pointer;' +
    'border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);color:#fff;}' +
    '#kliks-consent button:hover{background:rgba(255,255,255,0.12);}' +
    '#kliks-consent button:focus-visible,#kliks-consent input:focus-visible{outline:2px solid #ff4315;outline-offset:2px;}' +
    '@media (max-width:520px){#kliks-consent{padding:16px 16px;}#kliks-consent p,#kliks-consent label{font-size:13px;}' +
    '#kliks-consent .kc-row{flex-wrap:nowrap;gap:8px;}#kliks-consent button{flex:1 1 0;min-width:0;padding:10px 6px;font-size:13px;line-height:1.25;}}';

  function showBanner() {
    if (document.getElementById('kliks-consent')) return;
    if (!document.getElementById('kliks-consent-style')) {
      var st = document.createElement('style');
      st.id = 'kliks-consent-style';
      st.textContent = css;
      document.head.appendChild(st);
    }
    var previous = getChoice();
    // Boxes start unticked; they only reflect a saved choice when the settings are reopened.
    // `pre` is what is running now, so declining can switch off an earlier Meta consent.
    var shown = previous || { analytics: false, marketing: false };
    var pre = previous || { analytics: false, marketing: read(LEGACY_KEY) === 'granted' };
    var box = document.createElement('div');
    box.id = 'kliks-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Süti beállítások');
    box.innerHTML =
      '<p><strong>Mérhetjük a látogatásod?</strong> A weboldal működéséhez szükséges tárolás mindig be van kapcsolva. ' +
      'Mérni csak azzal tudunk, amit itt engedélyezel. Részletek az <a href="/adatvedelem#sutik">adatkezelési tájékoztatóban</a>.</p>' +
      '<label><input type="checkbox" data-cat="analytics"' + (shown.analytics ? ' checked' : '') + '>' +
      '<span><strong>Statisztika</strong> (Google Analytics): megnézzük, melyik oldalakat olvassák, és honnan érkeznek a látogatók.</span></label>' +
      '<label><input type="checkbox" data-cat="marketing"' + (shown.marketing ? ' checked' : '') + '>' +
      '<span><strong>Hirdetésmérés</strong> (Meta Pixel): megnézzük, hogy a hirdetéseinkből hányan jutnak el hozzánk.</span></label>' +
      '<div class="kc-row">' +
      '<button type="button" data-choice="none">Mindet elutasítom</button>' +
      '<button type="button" data-choice="selected">Kiválasztottak mentése</button>' +
      '<button type="button" data-choice="all">Mindet elfogadom</button></div>';
    box.addEventListener('click', function (e) {
      var kind = e.target.getAttribute && e.target.getAttribute('data-choice');
      if (!kind) return;
      var choice = kind === 'all' ? { analytics: true, marketing: true }
        : kind === 'none' ? { analytics: false, marketing: false }
        : { analytics: box.querySelector('[data-cat="analytics"]').checked, marketing: box.querySelector('[data-cat="marketing"]').checked };
      box.remove();
      apply(choice, pre);
    });
    document.body.appendChild(box);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!link) return;
    e.preventDefault();
    showBanner();
  });

  var stored = getChoice();
  if (stored) {
    if (stored.analytics) loadGA();
    if (stored.marketing) loadPixel();
  } else {
    // No answer for the new statistics category yet: ask again, but keep an
    // earlier Meta consent working in the meantime.
    if (read(LEGACY_KEY) === 'granted') loadPixel();
    if (document.body) showBanner();
    else document.addEventListener('DOMContentLoaded', showBanner);
  }
})();
