/**
 * ══════════════════════════════════════════════════
 * SanataniAnthem — Universal Header
 * Loads on every page. Controlled from Admin Panel.
 * ══════════════════════════════════════════════════
 * Add this ONE line to every HTML page before </body>:
 *   <script type="module" src="header.js"></script>
 * And add this where you want the header:
 *   <div id="sa-header-root"></div>
 * ══════════════════════════════════════════════════
 */

import { initializeApp }    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, onSnapshot }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyBC1yt-YE74pKCKMfukmc7_3vicM49h6vE",
  authDomain:        "sanatanianthem-652a3.firebaseapp.com",
  projectId:         "sanatanianthem-652a3",
  storageBucket:     "sanatanianthem-652a3.firebasestorage.app",
  messagingSenderId: "1031082702558",
  appId:             "1:1031082702558:web:744ffa9cfa54ff838db44f",
};

/* ── DEFAULT NAV LINKS (shown if Firebase not loaded yet) ── */
const DEFAULT_NAV = [
  { emoji:'',   label:'Home',          url:'index.html',   visible:true },
  { emoji:'🎵', label:'Anthem',        url:'#anthem',      visible:true },
  { emoji:'✈',  label:'Book Yatra',    url:'#travel',      visible:true },
  { emoji:'📚', label:'Sanskrit Sikho',url:'#sanskrit',    visible:true },
  { emoji:'⛩', label:'Pilgrimage',    url:'#pilgrimage',  visible:true },
  { emoji:'🗺', label:'Maps',          url:'#maps',        visible:true },
  { emoji:'🪔', label:'Puja',          url:'#puja',        visible:true },
  { emoji:'🎶', label:'Bhajan Club',   url:'#bhajan',      visible:true },
];

/* ── INJECT CSS ── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@900&family=DM+Sans:wght@400;600;700&family=Tiro+Devanagari+Sanskrit&display=swap');

  #sa-header-root * { box-sizing:border-box; margin:0; padding:0; }
  #sa-header-root {
    position:sticky; top:0; z-index:9999;
    background:rgba(255,253,248,.97);
    backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
    border-bottom:1px solid rgba(200,150,80,.18);
    box-shadow:0 2px 16px rgba(255,107,0,.08);
    font-family:'DM Sans',sans-serif;
  }

  /* FLAG STRIPE */
  .sa-flag {
    height:4px;
    background:linear-gradient(90deg,
      #FF6B00 0%,#FF6B00 33.33%,
      #fff 33.33%,#fff 66.66%,
      #138808 66.66%,#138808 100%);
  }

  /* NAV WRAP */
  .sa-nav-wrap {
    max-width:1440px; margin:0 auto;
    padding:0 20px; height:68px;
    display:flex; align-items:center; gap:12px;
  }

  /* LOGO */
  .sa-logo {
    display:flex; align-items:center; gap:10px;
    text-decoration:none; flex-shrink:0;
    padding:4px 16px 4px 4px; border-radius:30px;
  }
  .sa-brand {
    font-family:'Raleway',sans-serif; font-weight:900;
    font-size:1.85rem; letter-spacing:2px; line-height:1;
  }
  .sa-brand .nb-s {
    color:#8B2500;
    text-shadow:0 0 8px rgba(255,255,255,1),0 0 16px rgba(255,255,255,.9),0 0 28px rgba(255,255,255,.7);
  }
  .sa-brand .nb-a {
    color:#004d00;
    text-shadow:0 0 8px rgba(255,255,255,1),0 0 16px rgba(255,255,255,.9),0 0 28px rgba(255,255,255,.7);
  }

  /* NAV LINKS */
  .sa-nav-links {
    display:flex; align-items:center; gap:2px;
    overflow-x:auto; scrollbar-width:none; flex:1;
  }
  .sa-nav-links::-webkit-scrollbar { display:none; }
  .sa-nav-links a {
    white-space:nowrap; padding:7px 13px; border-radius:10px;
    text-decoration:none; color:#5C3A18; font-size:.78rem;
    font-weight:600; letter-spacing:.3px; transition:all .2s;
    display:inline-flex; align-items:center; gap:4px;
  }
  .sa-nav-links a:hover { background:rgba(255,107,0,.08); color:#FF6B00; }
  .sa-nav-links a.sa-act { background:rgba(255,107,0,.1); color:#FF6B00; }

  /* RIGHT SIDE */
  .sa-nav-right {
    display:flex; align-items:center; gap:8px; flex-shrink:0;
  }

  /* LANGUAGE TOGGLE */
  .sa-lang {
    display:flex; align-items:center; gap:8px;
    cursor:pointer; user-select:none;
    padding:4px 8px; border-radius:30px; transition:all .2s;
  }
  .sa-lang:hover { background:rgba(255,107,0,.06); }
  .sa-lt-label {
    font-size:.72rem; font-weight:700; letter-spacing:.5px; transition:all .25s;
  }
  .sa-lt-en { color:#FF6B00; }
  .sa-lt-sa { color:#A07040; font-family:'Tiro Devanagari Sanskrit',serif; font-size:.75rem; }
  .sa-lt-track {
    width:42px; height:22px; border-radius:30px;
    background:rgba(255,107,0,.15);
    border:1.5px solid rgba(255,107,0,.3);
    position:relative; transition:background .3s,border-color .3s; flex-shrink:0;
  }
  .sa-lang.sa-on .sa-lt-track { background:rgba(255,107,0,.25); border-color:#FF6B00; }
  .sa-lt-thumb {
    position:absolute; top:2px; left:2px;
    width:14px; height:14px; border-radius:50%;
    background:#FF6B00; box-shadow:0 1px 4px rgba(255,107,0,.4);
    transition:transform .3s cubic-bezier(.34,1.56,.64,1);
  }
  .sa-lang.sa-on .sa-lt-thumb { transform:translateX(20px); }

  /* HAMBURGER */
  .sa-ham {
    display:none; flex-direction:column; gap:5px;
    background:none; border:none; cursor:pointer; padding:4px;
  }
  .sa-ham span {
    display:block; width:22px; height:2px;
    background:#FF6B00; border-radius:2px; transition:all .3s;
  }

  /* MOBILE MENU */
  @media(max-width:960px) {
    .sa-nav-links { display:none; }
    .sa-ham { display:flex; }
    .sa-nav-links.sa-open {
      display:flex; flex-direction:column; gap:2px;
      position:fixed; top:72px; left:0; right:0; bottom:0;
      background:rgba(255,253,248,.98);
      padding:16px 20px; overflow-y:auto; z-index:9998;
      border-top:1px solid rgba(200,150,80,.18);
    }
    .sa-nav-links.sa-open a {
      font-size:.92rem; padding:13px 16px;
      border-bottom:1px solid rgba(200,150,80,.1);
      border-radius:10px; width:100%;
    }
    .sa-brand { font-size:1.5rem; }
  }
  @media(max-width:600px) {
    .sa-nav-wrap { padding:0 14px; height:58px; }
    .sa-brand { font-size:1.3rem; }
    .sa-lt-label { display:none; }
  }
  @media(max-width:380px) {
    .sa-brand { font-size:1.15rem; }
  }
`;

/* ── INJECT STYLES ── */
const styleEl = document.createElement('style');
styleEl.textContent = CSS;
document.head.appendChild(styleEl);

/* ── BUILD HEADER HTML ── */
function buildHeader(navItems) {
  const root = document.getElementById('sa-header-root');
  if (!root) return;

  const visible  = navItems.filter(x => x.visible);
  const linksHTML = visible.map(item => {
    const href  = item.url || '#';
    const label = (item.emoji ? item.emoji + ' ' : '') + item.label;
    return `<a href="${href}">${label}</a>`;
  }).join('');

  root.innerHTML = `
    <div class="sa-flag"></div>
    <nav>
      <div class="sa-nav-wrap">

        <!-- LOGO -->
        <a href="index.html" class="sa-logo">
          <span class="sa-brand">
            <span class="nb-s">Sanatani</span><span class="nb-a">Anthem</span>
          </span>
        </a>

        <!-- NAV LINKS -->
        <div class="sa-nav-links" id="saNavLinks">
          ${linksHTML}
        </div>

        <!-- RIGHT -->
        <div class="sa-nav-right">
          <!-- Language toggle -->
          <div class="sa-lang" id="saLang" onclick="saToggleLang()" title="Toggle English / Sanskrit">
            <span class="sa-lt-label sa-lt-en">English</span>
            <div class="sa-lt-track"><div class="sa-lt-thumb" id="saLtThumb"></div></div>
            <span class="sa-lt-label sa-lt-sa">संस्कृत</span>
          </div>
          <!-- Hamburger -->
          <button class="sa-ham" id="saHam" onclick="saToggleNav()">
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </nav>
  `;

  markActiveLink();
}

/* ── MARK ACTIVE LINK ── */
function markActiveLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const hash = window.location.hash;
  document.querySelectorAll('.sa-nav-links a').forEach(a => {
    a.classList.remove('sa-act');
    const href = a.getAttribute('href');
    if (href === page || (hash && href === hash) || (page === '' && href === 'index.html')) {
      a.classList.add('sa-act');
    }
  });
}

/* ── TOGGLE NAV (mobile) ── */
window.saToggleNav = function() {
  const nav = document.getElementById('saNavLinks');
  const ham = document.getElementById('saHam');
  if (!nav) return;
  nav.classList.toggle('sa-open');
  const open = nav.classList.contains('sa-open');
  ham.style.opacity = open ? '.7' : '1';
  document.body.style.overflow = open ? 'hidden' : '';
};

/* Close mobile menu when a link is clicked */
document.addEventListener('click', e => {
  const nav = document.getElementById('saNavLinks');
  if (!nav) return;
  if (e.target.closest('.sa-nav-links a')) {
    nav.classList.remove('sa-open');
    document.body.style.overflow = '';
  }
});

/* ── LANGUAGE TOGGLE ── */
let saLangOn = false;
window.saToggleLang = function() {
  saLangOn = !saLangOn;
  const btn = document.getElementById('saLang');
  if (btn) btn.classList.toggle('sa-on', saLangOn);
  // Trigger existing page language toggle if available
  if (typeof toggleSanskrit === 'function') toggleSanskrit();
  localStorage.setItem('sa-lang', saLangOn ? 'sa' : 'en');
};
// Restore saved language pref
if (localStorage.getItem('sa-lang') === 'sa') {
  saLangOn = true;
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('saLang');
    if (btn) btn.classList.add('sa-on');
  });
}

/* ── FIREBASE REAL-TIME UPDATE ── */
try {
  const app = initializeApp(firebaseConfig);
  const db  = getFirestore(app);

  // Show default header immediately
  buildHeader(DEFAULT_NAV);

  // Then update from Firebase
  onSnapshot(doc(db, 'siteConfig', 'main'), snap => {
    if (!snap.exists()) return;
    const data = snap.data();
    const nav  = data.nav || DEFAULT_NAV;
    buildHeader(nav);
  });

} catch(e) {
  // Fallback: just show default
  buildHeader(DEFAULT_NAV);
}
