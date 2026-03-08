/**
 * firebase-links.js
 * ─────────────────────────────────────────────────────────────
 * DROP THIS FILE in the same folder as index.html on GoDaddy.
 * Add this ONE line just before </body> in index.html:
 *
 *   <script type="module" src="firebase-links.js"></script>
 *
 * This script:
 *  1. Connects to Firebase Firestore
 *  2. Listens for real-time changes from the admin panel
 *  3. Updates nav links, footer links, and social links live
 * ─────────────────────────────────────────────────────────────
 */

import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, onSnapshot }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ── FIREBASE CONFIG ── */
const firebaseConfig = {
  apiKey:            "AIzaSyBC1yt-YE74pKCKMfukmc7_3vicM49h6vE",
  authDomain:        "sanatanianthem-652a3.firebaseapp.com",
  projectId:         "sanatanianthem-652a3",
  storageBucket:     "sanatanianthem-652a3.firebasestorage.app",
  messagingSenderId: "1031082702558",
  appId:             "1:1031082702558:web:744ffa9cfa54ff838db44f",
  measurementId:     "G-FP76DXHQRQ"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/* ── LISTEN FOR CHANGES ── */
onSnapshot(doc(db, 'siteLinks', 'main'), snap => {
  if (!snap.exists()) return;
  const data = snap.data();

  applyNavLinks(data.nav      || []);
  applyFooterCol('yatra',    data.yatra    || []);
  applyFooterCol('services', data.services || []);
  applyFooterCol('learn',    data.learn    || []);
  applySocial(data.social    || []);
  applyExternalLinks(data.external || {});
});

/* ══════════════════════════════════
   NAV LINKS
   Targets: <div class="nav-links" id="navLinks">
══════════════════════════════════ */
function applyNavLinks(items) {
  const nav = document.getElementById('navLinks');
  if (!nav) return;

  // Keep only visible items
  const visible = items.filter(x => x.visible);

  nav.innerHTML = visible.map(item => `
    <a href="${item.url}">
      ${item.emoji} ${item.label}
    </a>
  `).join('');
}

/* ══════════════════════════════════
   FOOTER COLUMNS
   Targets: <ul data-footer-col="yatra|services|learn">
   Add that data attribute to your footer <ul> elements
══════════════════════════════════ */
function applyFooterCol(colName, items) {
  const ul = document.querySelector(`[data-footer-col="${colName}"]`);
  if (!ul) return;

  const visible = items.filter(x => x.visible);
  ul.innerHTML = visible.map(item => `
    <li><a href="${item.url}">${item.label}</a></li>
  `).join('');
}

/* ══════════════════════════════════
   SOCIAL MEDIA LINKS
   Targets: <div id="socialLinks">
   Add that id to your social icons container
══════════════════════════════════ */
function applySocial(items) {
  const container = document.getElementById('socialLinks');
  if (!container) return;

  const visible = items.filter(x => x.visible && x.url);
  container.innerHTML = visible.map(item => `
    <a href="${item.url}" target="_blank" rel="noopener" title="${item.platform}">
      ${item.icon}
    </a>
  `).join('');
}

/* ══════════════════════════════════
   EXTERNAL LINKS
   Targets elements by data-ext-key attribute.
   Example: <a data-ext-key="booking-0" href="#">Book Yatra</a>
   The key format is: {sub}-{index}
══════════════════════════════════ */
function applyExternalLinks(external) {
  ['maps', 'booking', 'partners'].forEach(sub => {
    const items = (external[sub] || []).filter(x => x.visible);
    items.forEach((item, i) => {
      const el = document.querySelector(`[data-ext-key="${sub}-${i}"]`);
      if (el) {
        el.href        = item.url;
        el.textContent = item.emoji + ' ' + item.label;
      }
    });
  });
}
