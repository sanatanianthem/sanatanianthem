/**
 * ══════════════════════════════════════════════════════════
 * SanataniAnthem — Universal Footer Component
 * Identical footer on every page. Admin controlled via Firebase.
 * ══════════════════════════════════════════════════════════
 */

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
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

/* ── DEFAULT FOOTER DATA ── */
const DEFAULT = {
  services: [
    { label:'Book Puja',          url:'index.html#puja',     visible:true },
    { label:'Book Pandit',        url:'index.html#puja',     visible:true },
    { label:'Live Darshan',       url:'index.html#puja',     visible:true },
    { label:'Prasad Delivery',    url:'index.html#puja',     visible:true },
    { label:'Admin Panel',        url:'admin.html',          visible:true },
  ],
  learn: [
    { label:'Sanskrit Sikho',     url:'index.html#sanskrit', visible:true },
    { label:'Hanuman Chalisa',    url:'sanatani-anthem-mantras.html', visible:true },
    { label:'Sarve Bhavantu',     url:'sanatani-anthem-mantras.html', visible:true },
    { label:'Bhajan Clubbing',    url:'index.html#bhajan',   visible:true },
  ],
};

/* ── CSS ── */
const CSS = `
#sa-footer-root footer {
  background: #0D0702;
  color: rgba(255,255,255,.6);
  font-family: 'DM Sans', sans-serif;
}
.uf-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 56px 32px 28px;
}
.uf-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}
/* Brand column */
.uf-brand-name {
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: .5px;
  margin-bottom: 10px;
}
.uf-brand-name .uf-s { color: #fff; }
.uf-brand-name .uf-a { color: #fff; }
.uf-desc {
  color: rgba(255,255,255,.25);
  font-size: .8rem;
  line-height: 1.75;
  max-width: 240px;
  margin-bottom: 14px;
}
.uf-sanskrit {
  font-family: 'Tiro Devanagari Sanskrit', serif;
  font-size: 1.25rem;
  color: rgba(255,107,0,.4);
  line-height: 1.5;
}
/* Link columns */
.uf-col-h {
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,.25);
  margin-bottom: 16px;
}
.uf-col ul { list-style: none; padding: 0; margin: 0; }
.uf-col li { margin-bottom: 10px; }
.uf-col a {
  color: rgba(255,255,255,.45);
  text-decoration: none;
  font-size: .82rem;
  font-weight: 400;
  transition: color .2s;
  cursor: pointer;
  display: inline-block;
}
.uf-col a:hover { color: #F2C94C; }
/* Bottom bar */
.uf-hr { border: none; border-top: 1px solid rgba(255,255,255,.05); margin-bottom: 18px; }
.uf-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.uf-copy { font-size: .7rem; color: rgba(255,255,255,.12); }
.uf-slogan { font-size: .68rem; color: rgba(255,255,255,.1); }

/* ── MOBILE ── */
@media (max-width: 960px) {
  .uf-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
}
@media (max-width: 600px) {
  .uf-inner { padding: 40px 16px 24px; }
  .uf-grid { grid-template-columns: 1fr; gap: 24px; }
  .uf-bottom { flex-direction: column; align-items: flex-start; gap: 6px; }
  .uf-brand-name { font-size: 1.1rem; }
  .uf-desc { max-width: 100%; }
}
@media (max-width: 380px) {
  .uf-grid { gap: 20px; }
  .uf-brand-name { font-size: 1rem; }
}
`;

/* ── INJECT CSS ── */
const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

/* ── FIX URL ── */
function fixUrl(url) {
  if (!url) return '#';
  if (url.startsWith('#')) return 'index.html' + url;
  return url;
}

/* ── RENDER FOOTER ── */
function renderFooter(data) {
  const root = document.getElementById('sa-footer-root');
  if (!root) return;
  const services = (data.services || DEFAULT.services).filter(x => x.visible !== false);
  const learn    = (data.learn    || DEFAULT.learn   ).filter(x => x.visible !== false);

  const colHTML = (items) => items.map(item =>
    `<li><a href="${fixUrl(item.url)}">${item.label}</a></li>`
  ).join('');

  const year = new Date().getFullYear();

  root.innerHTML = `
  <footer>
    <div class="uf-inner">
      <div class="uf-grid">

        <!-- Brand -->
        <div>
          <div class="uf-brand-name">
            <span class="uf-s">Sanatani</span><span class="uf-a">Anthem</span>
          </div>
          <div class="uf-desc">
            Uniting all of India through Dharma, Sanskrit, Temple Travel, and the eternal Sanatani Anthem.
          </div>
          <div class="uf-sanskrit">वसुधैव कुटुम्बकम्</div>
        </div>

        
      <hr class="uf-hr">
      <div class="uf-bottom">
        <div class="uf-copy">© ${year} SanataniAnthem — All Rights Reserved 🕉 Sarve Bhavantu Sukhinah</div>
        <div class="uf-slogan">जय भारत · जय संस्कृत · जय सनातन धर्म</div>
      </div>
    </div>
  </footer>`;
}

/* ── INIT: show default instantly, then load from Firebase ── */
renderFooter(DEFAULT);

try {
  const app = initializeApp(firebaseConfig);
  const db  = getFirestore(app);
  onSnapshot(doc(db, 'siteConfig', 'main'), snap => {
    if (!snap.exists()) return;
    const d = snap.data();
    renderFooter({
      services: d.services || DEFAULT.services,
      learn:    d.learn    || DEFAULT.learn,
    });
  });
} catch(e) {
  console.warn('SA Footer: using defaults.', e);
}
