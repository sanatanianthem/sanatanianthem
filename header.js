/**
 * ══════════════════════════════════════════════════════════
 * SanataniAnthem — Universal Header Component
 * Pixel-perfect copy of index.html header on every page.
 * Controlled from Admin Panel via Firebase in real-time.
 * ══════════════════════════════════════════════════════════
 */

// No Firebase needed — nav is hardcoded for reliability

const DEFAULT_NAV = [
  { emoji:'',   label:'Home',           url:'index.html',                   visible:true },
  { emoji:'🎵', label:'Anthem',         url:'sanatani-anthem-mantras.html', visible:true },
  { emoji:'🪔', label:'Puja',           url:'index.html#puja',              visible:true },
];

/* ── CSS ── */
const CSS = `
#sa-header-root { position:sticky;top:0;z-index:9999;font-family:'DM Sans',sans-serif; }
.uh-flag { height:4px;background:linear-gradient(90deg,#FF9933 0%,#FF9933 33.33%,#ffffff 33.33%,#ffffff 66.66%,#138808 66.66%,#138808 100%); }
.uh-nav { background:rgba(255,253,248,.97);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(200,150,80,.18);box-shadow:0 2px 16px rgba(255,107,0,.08); }
.uh-wrap { max-width:1440px;margin:0 auto;padding:0 20px;height:68px;display:flex;align-items:center;gap:12px; }
.uh-logo { display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;padding:4px 16px 4px 4px;border-radius:30px;transition:opacity .2s; }
.uh-logo:hover { opacity:.85; }
.uh-om { width:44px;height:44px;border-radius:50%;background:linear-gradient(145deg,#1a0800,#2d1000);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px rgba(255,153,51,.5),0 0 12px rgba(255,153,51,.25),inset 0 1px 3px rgba(255,200,100,.15);animation:uhOmRing 3s ease-in-out infinite;flex-shrink:0; }
@keyframes uhOmRing { 0%,100%{box-shadow:0 0 0 2px rgba(255,153,51,.5),0 0 12px rgba(255,153,51,.2),inset 0 1px 3px rgba(255,200,100,.15);}50%{box-shadow:0 0 0 4px rgba(255,153,51,.7),0 0 22px rgba(255,153,51,.4),inset 0 1px 3px rgba(255,200,100,.2);} }
.uh-om-text { font-size:1.4rem;background:linear-gradient(135deg,#FFE57A,#FF9933);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1; }
.uh-brand { font-family:'Raleway',sans-serif;font-weight:900;font-size:1.9rem;letter-spacing:-0.5px;line-height:1; }
.uh-brand .uh-s { color:#FF6B00; font-weight:900; }
.uh-brand .uh-a { color:#C8890A; font-weight:900; }
.uh-links { display:flex;align-items:center;gap:2px;overflow-x:auto;scrollbar-width:none;flex:1; }
.uh-links::-webkit-scrollbar { display:none; }
.uh-links a { white-space:nowrap;padding:7px 13px;border-radius:10px;text-decoration:none;color:#5C3A18;font-size:.78rem;font-weight:600;letter-spacing:.3px;transition:all .2s;display:inline-flex;align-items:center;gap:4px;min-height:36px; }
.uh-links a:hover { background:rgba(255,107,0,.08);color:#FF6B00; }
.uh-links a.uh-act { background:rgba(255,107,0,.10);color:#FF6B00;font-weight:700; }
.uh-right { display:flex;align-items:center;gap:8px;flex-shrink:0; }
.uh-lang { display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;padding:4px 8px;border-radius:30px;transition:background .2s; }
.uh-lang:hover { background:rgba(255,107,0,.06); }
.uh-lt-lbl { font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.5px;transition:color .25s; }
.uh-lt-en { color:#FF6B00; }
.uh-lt-sa { color:#A07040;font-family:'Tiro Devanagari Sanskrit',serif;font-size:.75rem; }
.uh-lang.uh-sa-on .uh-lt-en { color:#A07040; }
.uh-lang.uh-sa-on .uh-lt-sa { color:#FF6B00; }
.uh-lt-track { width:42px;height:22px;border-radius:30px;background:rgba(255,107,0,.15);border:1.5px solid rgba(255,107,0,.3);position:relative;transition:background .3s,border-color .3s;flex-shrink:0; }
.uh-lang.uh-sa-on .uh-lt-track { background:rgba(255,107,0,.25);border-color:#FF6B00; }
.uh-lt-thumb { position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#FF6B00;box-shadow:0 1px 4px rgba(255,107,0,.4);transition:transform .3s cubic-bezier(.34,1.56,.64,1); }
.uh-lang.uh-sa-on .uh-lt-thumb { transform:translateX(20px); }
.uh-ham { display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px 6px;border-radius:8px;transition:background .2s; }
.uh-ham:hover { background:rgba(255,107,0,.06); }
.uh-ham span { display:block;width:22px;height:2px;background:#FF6B00;border-radius:2px;transition:all .3s; }
.uh-ham.uh-open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
.uh-ham.uh-open span:nth-child(2) { opacity:0;transform:scaleX(0); }
.uh-ham.uh-open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
@media(max-width:960px) {
  .uh-links { display:none; }
  .uh-ham   { display:flex; }
  .uh-brand { font-size:1.6rem; }
  .uh-wrap  { height:64px; }
  .uh-links.uh-open { display:flex;flex-direction:column;gap:0;position:fixed;top:68px;left:0;right:0;bottom:0;background:rgba(255,253,248,.99);padding:12px 16px 32px;overflow-y:auto;z-index:9998;border-top:1px solid rgba(200,150,80,.15);animation:uhSlide .22s ease; }
  @keyframes uhSlide { from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);} }
  .uh-links.uh-open a { font-size:.92rem;padding:14px 16px;border-radius:12px;border-bottom:1px solid rgba(200,150,80,.1);width:100%;min-height:50px; }
  .uh-links.uh-open a:last-child { border-bottom:none; }
}
@media(max-width:768px) { .uh-wrap{padding:0 14px;} .uh-brand{font-size:1.45rem;} .uh-links.uh-open{top:64px;} }
@media(max-width:480px) { .uh-wrap{height:56px;padding:0 12px;} .uh-brand{font-size:1.25rem;letter-spacing:1px;} .uh-lt-lbl{display:none;} .uh-om{width:36px;height:36px;} .uh-om-text{font-size:1.1rem;} .uh-links.uh-open{top:56px;} }
@media(max-width:360px) { .uh-brand{font-size:1.1rem;} .uh-om{display:none;} }
`;

/* ── INJECT CSS ── */
const style = document.createElement('style');
style.textContent = CSS;
document.head.insertBefore(style, document.head.firstChild);

/* ── HELPERS ── */
function fixUrl(url) {
  if (!url) return 'index.html';
  if (url.startsWith('#')) return 'index.html' + url;
  return url;
}
function currentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

/* ── RENDER HEADER ── */
function renderHeader(navItems) {
  const root = document.getElementById('sa-header-root');
  if (!root) return;
  const page    = currentPage();
  const visible = (navItems || DEFAULT_NAV).filter(x => x.visible !== false);

  const links = visible.map(item => {
    const href   = fixUrl(item.url);
    const emoji  = item.emoji ? `<span>${item.emoji}</span> ` : '';
    const active = href === page || (href.includes(page) && page !== 'index.html');
    return `<a href="${href}"${active?' class="uh-act"':''}>${emoji}${item.label||''}</a>`;
  }).join('');

  root.innerHTML = `
    <div class="uh-flag"></div>
    <div class="uh-nav">
      <div class="uh-wrap">
        <a href="index.html" class="uh-logo">
          <div class="uh-om"><span class="uh-om-text">🕉</span></div>
          <span class="uh-brand"><span class="uh-s">Sanatani</span><span class="uh-a">Anthem</span></span>
        </a>
        <div class="uh-links" id="uhLinks">${links}</div>
        <div class="uh-right">
          <div class="uh-lang" id="uhLang" title="Toggle English / Sanskrit" onclick="uhToggleLang()">
            <span class="uh-lt-lbl uh-lt-en">English</span>
            <div class="uh-lt-track"><div class="uh-lt-thumb"></div></div>
            <span class="uh-lt-lbl uh-lt-sa">संस्कृत</span>
          </div>
          <button class="uh-ham" id="uhHam" aria-label="Menu" onclick="uhToggleNav()">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>`;

  // Restore saved lang
  if (localStorage.getItem('sa-lang') === 'sa') {
    document.getElementById('uhLang')?.classList.add('uh-sa-on');
  }

  // Close drawer on link click
  root.querySelectorAll('.uh-links a').forEach(a => a.addEventListener('click', uhCloseNav));
}

/* ── NAV TOGGLE ── */
function uhCloseNav() {
  document.getElementById('uhLinks')?.classList.remove('uh-open');
  document.getElementById('uhHam')?.classList.remove('uh-open');
  document.body.style.overflow = '';
}
window.uhToggleNav = function() {
  const links = document.getElementById('uhLinks');
  const ham   = document.getElementById('uhHam');
  if (!links) return;
  const open = links.classList.toggle('uh-open');
  ham?.classList.toggle('uh-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
document.addEventListener('click', e => {
  const root = document.getElementById('sa-header-root');
  if (root && !root.contains(e.target)) uhCloseNav();
});

/* ── LANGUAGE TOGGLE ── */
window.uhToggleLang = function() {
  const el    = document.getElementById('uhLang');
  if (!el) return;
  const isSa  = el.classList.toggle('uh-sa-on');
  localStorage.setItem('sa-lang', isSa ? 'sa' : 'en');
  // Sync with page's own language system
  if (typeof setLang === 'function') { setLang(isSa ? 'sa' : 'en'); return; }
  document.querySelectorAll('.lang-en').forEach(x => x.style.display = isSa ? 'none' : '');
  document.querySelectorAll('.lang-sa').forEach(x => x.style.display = isSa ? ''     : 'none');
};

/* ── INIT: render immediately, no Firebase override ── */
renderHeader(DEFAULT_NAV);
