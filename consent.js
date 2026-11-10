(function () {
  var PIXEL_ID = '1875112903440305';
  var KEY = 'kliks_consent';
  var queue = window.kliksQ = window.kliksQ || [];
  var pixelLoaded = false;

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

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

  // Page-specific events wait in window.kliksQ until consent is given.
  function flush() {
    while (queue.length) fbq('track', queue.shift());
  }
  queue.push = function () {
    Array.prototype.push.apply(queue, arguments);
    if (pixelLoaded) flush();
    return queue.length;
  };

  function clearMetaCookies() {
    ['_fbp', '_fbc'].forEach(function (name) {
      var host = location.hostname.replace(/^www\./, '');
      document.cookie = name + '=; Max-Age=0; path=/';
      document.cookie = name + '=; Max-Age=0; path=/; domain=.' + host;
    });
  }

  var css =
    '#kliks-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:10000;max-width:560px;margin:0 auto;' +
    'background:#1a1828;border:1px solid rgba(100,75,255,0.25);border-radius:16px;padding:20px 22px;' +
    'box-shadow:0 12px 40px rgba(0,0,0,0.45);font-family:Satoshi,system-ui,sans-serif;color:#fff;}' +
    '#kliks-consent p{margin:0 0 16px;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.7);}' +
    '#kliks-consent strong{color:#fff;}' +
    '#kliks-consent a{color:#a89cff;}' +
    '#kliks-consent .kc-row{display:flex;gap:10px;flex-wrap:wrap;}' +
    '#kliks-consent button{flex:1 1 140px;border-radius:100px;padding:11px 18px;font:600 14px Satoshi,system-ui,sans-serif;cursor:pointer;' +
    'border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);color:#fff;}' +
    '#kliks-consent button:hover{background:rgba(255,255,255,0.12);}' +
    '#kliks-consent button:focus-visible{outline:2px solid #ff4315;outline-offset:2px;}';

  function showBanner() {
    if (document.getElementById('kliks-consent')) return;
    if (!document.getElementById('kliks-consent-style')) {
      var st = document.createElement('style');
      st.id = 'kliks-consent-style';
      st.textContent = css;
      document.head.appendChild(st);
    }
    var box = document.createElement('div');
    box.id = 'kliks-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Süti beállítások');
    box.innerHTML =
      '<p><strong>Mérhetjük a látogatásod?</strong> A Meta Pixellel nézzük meg, hogy a hirdetéseinkből hányan jutnak el hozzánk. ' +
      'Csak akkor indul el, ha elfogadod. Részletek az <a href="/adatvedelem#sutik">adatkezelési tájékoztatóban</a>.</p>' +
      '<div class="kc-row"><button type="button" data-choice="denied">Nem kérem</button>' +
      '<button type="button" data-choice="granted">Elfogadom</button></div>';
    box.addEventListener('click', function (e) {
      var choice = e.target.getAttribute && e.target.getAttribute('data-choice');
      if (!choice) return;
      var previous = getChoice();
      setChoice(choice);
      box.remove();
      if (choice === 'granted') loadPixel();
      else if (previous === 'granted') { clearMetaCookies(); location.reload(); }
    });
    document.body.appendChild(box);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!link) return;
    e.preventDefault();
    showBanner();
  });

  if (getChoice() === 'granted') loadPixel();
  else if (getChoice() !== 'denied') {
    if (document.body) showBanner();
    else document.addEventListener('DOMContentLoaded', showBanner);
  }
})();
