/* Site behaviour. You normally don't need to edit this file:
   all text, photos, schedule and events live in content.js. */
(() => {
const S = window.SITE;
if (!S) { console.error("content.js did not load"); return; }
const WHATSAPP_NUMBER = String(S.whatsapp).replace(/\D/g, "");
const WA_DEFAULT_TEXT = S.whatsappGreeting;
const IMAGES = S.photos || {};
const HIGHLIGHTS = S.highlights, TUTORS = S.tutors, PROGRAMMES = S.programmes, STATS = S.stats;
const EVENTS = S.events, TESTIMONIALS = S.testimonials, SCHEDULE = S.schedule || [];
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () => innerWidth <= 768;
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.4.3-.4v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';
const waLink = (text = WA_DEFAULT_TEXT) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function media(slot, alt, opts = {}) {
  const src = IMAGES[slot];
  if (src) return `<img class="media" src="${esc(src)}" alt="${esc(alt)}" ${opts.eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
  return `<div class="ph ${opts.v || ""} ${opts.big ? "big" : ""}" role="img" aria-label="${esc(alt)} (photo placeholder)"><span>${esc(slot)}</span></div>`;
}
$$("[data-slot]").forEach(el => {
  el.innerHTML = media(el.dataset.slot, el.dataset.alt || "", { v: el.dataset.v, big: el.dataset.big, eager: el.dataset.eager });
});
$$("[data-wa]").forEach(a => { a.href = waLink(); a.innerHTML = WA_ICON + "<span>WhatsApp Us</span>"; });
$$("[data-wa-plain]").forEach(a => { a.href = waLink(); });
$("#waFloat").innerHTML = WA_ICON;

/* ---------- Centre details from content.js ---------- */
$$("[data-brand]").forEach(el => el.textContent = S.shortName);
$$("[data-fullname]").forEach(el => el.textContent = S.fullName);
$$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
$$("[data-email]").forEach(a => { a.href = "mailto:" + S.email; a.textContent = S.email; });
$$("[data-email-link]").forEach(a => { a.href = "mailto:" + S.email; });
$(".email-alt a").href = "mailto:" + S.email; $(".email-alt a").textContent = S.email;
$$("[data-phone]").forEach(el => el.textContent = S.phoneDisplay);
$$("[data-address]").forEach(el => el.textContent = S.address);
$$("[data-hours]").forEach(el => el.textContent = S.hours);
$$("[data-social]").forEach(a => {
  const url = (S.social || {})[a.dataset.social];
  if (url) a.href = url; else a.remove();
});
if (S.logo) $$(".mark-wrap").forEach(m => { m.innerHTML = `<img class="logo-img" src="${esc(S.logo)}" alt="">`; });
if (S.logo && S.logoReplacesName) $$("[data-brand]").forEach(el => el.classList.add("sr-only"));
$(".students-num").textContent = S.heroCard.number;
$(".students-cap").textContent = S.heroCard.caption;
$("#ratio b").textContent = S.trustBadge.number;
$("#ratio small").textContent = S.trustBadge.caption;
$("#badgeCard h3").textContent = S.trustCard.title;
$("#badgeCard p").textContent = S.trustCard.text;
$("#hero-title").textContent = S.heroTitle;
$("#tagline").dataset.lines = S.heroTagline.join("|");
$("#spacesBody").textContent = S.spacesText;
const rooms = $$(".room");
(S.rooms || []).forEach((r, i) => { if (!rooms[i]) return; $("b", rooms[i]).textContent = r.name; $("small", rooms[i]).textContent = r.text; });

/* ---------- Adaptive rem scale-up above 1920 ---------- */
function scaleRoot() {
  const FONT_BASE = 16, BASE_W = 1920, COEF = 0.6666;
  const reduction = ((BASE_W - innerWidth) / BASE_W) * 100 * COEF;
  const size = FONT_BASE - (FONT_BASE * reduction) / 100;
  if (size > FONT_BASE) document.documentElement.style.fontSize = size + "px";
  else document.documentElement.style.removeProperty("font-size");
}
scaleRoot();

/* ---------- Spring engine (tension/friction, mass 1) ---------- */
const active = new Set();
function spring(apply, cfg, init = 0) {
  const s = { x: init, v: 0, t: init, cfg, apply, at: 0 };
  s.to = (t, delay = 0) => { s.t = t; s.at = performance.now() + delay; active.add(s); };
  s.set = x => { s.x = s.t = x; s.v = 0; active.delete(s); apply(x); };
  apply(init);
  return s;
}
let last = performance.now();
function step(now) {
  const dt = Math.min(0.064, (now - last) / 1000); last = now;
  for (const s of active) {
    if (now < s.at) continue;
    if (reduced) { s.x = s.t; s.v = 0; s.apply(s.x); active.delete(s); continue; }
    const n = Math.max(1, Math.ceil(dt * 240)), h = dt / n;
    for (let i = 0; i < n; i++) { const a = -s.cfg.tension * (s.x - s.t) - s.cfg.friction * s.v; s.v += a * h; s.x += s.v * h; }
    if (Math.abs(s.x - s.t) < 0.0005 && Math.abs(s.v) < 0.0005) { s.x = s.t; s.v = 0; active.delete(s); }
    s.apply(s.x);
  }
}
const lerp = (a, b, p) => a + (b - a) * p;
function propsApplier(el, from, to) {
  return p => {
    const g = k => (from[k] ?? to[k] ?? (k === "scale" ? 1 : k === "opacity" ? 1 : 0));
    const h = k => (to[k] ?? from[k] ?? (k === "scale" ? 1 : k === "opacity" ? 1 : 0));
    const o = lerp(g("opacity"), h("opacity"), p);
    const x = lerp(g("x"), h("x"), p), y = lerp(g("y"), h("y"), p);
    const sc = lerp(g("scale"), h("scale"), p), r = lerp(g("rotate"), h("rotate"), p);
    if ("opacity" in from || "opacity" in to) el.style.opacity = Math.max(0, Math.min(1, o));
    el.style.transform = `translate3d(${x}px,${y}px,0) scale(${sc}) rotate(${r}deg)`;
  };
}
function anim(el, from, to, cfg, init = 0) { return spring(propsApplier(el, from, to), cfg, init); }

/* ---------- In-view + hover helpers ---------- */
const ioQueue = new Map();
let revealOn = false;
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting && revealOn) { const f = ioQueue.get(e.target); if (f) { f(); ioQueue.delete(e.target); io.unobserve(e.target); } } });
}, { threshold: 0.15 });
function onView(el, fn) { ioQueue.set(el, fn); io.observe(el); }
function inview(el, from, to, cfg, delay = 0) {
  const s = anim(el, from, to, cfg, 0);
  onView(el, () => s.to(1, delay));
  return s;
}
function hover(trigger, el, from, to, cfg) {
  const s = anim(el, from, to, cfg, 0);
  trigger.addEventListener("pointerenter", () => { if (!isMobile()) s.to(1); });
  trigger.addEventListener("pointerleave", () => s.to(0));
  return s;
}

/* ---------- Text reveal builders ---------- */
function splitWords(el, { stagger = 140, duration = 1100, delay = 0 } = {}) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="clip"><span style="--d:${duration}ms;--dl:${delay + i * stagger}ms">${esc(w)}</span></span>`).join(" ");
}
function stackLines(el, { stagger = 120, duration = 950, delay = 0 } = {}) {
  const lines = el.dataset.lines.split("|");
  el.setAttribute("aria-label", lines.join(" "));
  el.innerHTML = lines.map((l, i) => `<span class="clip" aria-hidden="true"><span style="--d:${duration}ms;--dl:${delay + i * stagger}ms">${esc(l)}</span></span>`).join("");
}
function fadeWords(el, { stagger = 28, delay = 250 } = {}) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="fw" style="--dl:${delay + i * stagger}ms">${esc(w)}</span>`).join(" ");
}

/* ---------- Build lists ---------- */
$("#progList").innerHTML = PROGRAMMES.map((p, i) => `
  <li><button class="prog-row" data-level="${esc(p.level)}" aria-label="${esc(p.name)}: book a free trial class">
    <span class="prog-idx">${String(i + 1).padStart(2, "0")}</span>
    <span class="prog-main"><span class="prog-name">${esc(p.name)}</span><span class="prog-desc">${esc(p.desc)}</span></span>
    <span class="prog-arrow"><span class="arr" style="display:grid">${ARROW}</span></span>
  </button></li>`).join("");
$("#statList").innerHTML = STATS.map(s => `
  <div class="stat"><dt class="sr-only">${esc(s.label)}</dt><dd><span class="stat-val">${esc(s.value)}</span><span class="stat-label">${esc(s.label)}</span></dd></div>`).join("");
$("#evList").innerHTML = EVENTS.map(e => `
  <li><article class="ev-card"><div class="ev-img">${media(e.slot, e.title)}</div>
    <div class="ev-body"><span class="ev-date">${esc(e.date)}</span><h3 class="ev-title">${esc(e.title)}</h3>
    <p class="ev-sum">${esc(e.summary)}</p><a class="ev-more" href="#events">Read more →</a></div></article></li>`).join("");
$("#tList").innerHTML = TESTIMONIALS.map(t => `
  <li><figure class="t-card"><div><span class="t-q" aria-hidden="true">“</span><blockquote>${esc(t.quote)}</blockquote></div>
    <figcaption><b>${esc(t.name)}</b><small>${esc(t.role)}</small></figcaption></figure></li>`).join("");

if (!TESTIMONIALS.some(t => t.quote.includes("["))) $(".placeholder-note").remove();

/* ---------- Class schedule ---------- */
const schedDays = $("#schedDays"), schedBody = $("#schedBody");
$("#schedNote").textContent = S.scheduleNote || "";
function showDay(i) {
  $$("button", schedDays).forEach((b, j) => b.setAttribute("aria-selected", i === j ? "true" : "false"));
  const day = SCHEDULE[i];
  schedBody.innerHTML = day && day.classes.length
    ? day.classes.map(c => `<tr><td>${esc(c.time)}</td><td><span class="lvl">${esc(c.level)}</span></td><td>${esc(c.subject)}</td><td>${esc(c.tutor || "")}</td></tr>`).join("")
    : `<tr><td colspan="4" class="sched-empty">No classes on this day.</td></tr>`;
}
schedDays.innerHTML = SCHEDULE.map((d, i) => `<button role="tab" type="button">${esc(d.day)}</button>`).join("");
$$("button", schedDays).forEach((b, i) => b.addEventListener("click", () => showDay(i)));
if (SCHEDULE.length) showDay(0); else $("#schedule").hidden = true;

/* ---------- Text setups ---------- */
const heroTitle = $("#hero-title");
splitWords(heroTitle, { stagger: 140, duration: 1100 });
stackLines($("#tagline"), { delay: 350, stagger: 110, duration: 900 });
$$(".stack").forEach(el => { if (el.id !== "tagline" && el.id !== "modal-title") stackLines(el, { stagger: el.id === "spaces-title" ? 120 : 120 }); });
stackLines($("#modal-title"), { stagger: 90, duration: 800 });
fadeWords($("#spacesBody"));
$$(".h-sec.stack, #ctaBig").forEach(el => onView(el, () => el.classList.add("is-in")));
onView($("#spacesBody"), () => $("#spacesBody").classList.add("is-in"));

/* Fit hero title: one line on desktop, one word per line on phones */
function fitTitle() {
  const wrap = heroTitle.parentElement;
  const cs = getComputedStyle(wrap);
  const avail = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  heroTitle.style.fontSize = "100px";
  let w;
  if (innerWidth <= 640) w = Math.max(...$$(".clip", heroTitle).map(c => c.getBoundingClientRect().width));
  else w = heroTitle.scrollWidth;
  heroTitle.style.fontSize = Math.floor(100 * avail / w * 0.99) + "px";
}
fitTitle();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);

/* ---------- Hero highlights carousel ---------- */
const hlStage = $("#hlStage"), hlDots = $("#hlDots");
let hlIndex = 0, hlTimer = null;
const hlCard = (h) => `<div class="hl-img">${media(h.slot, h.title)}</div>
  <div class="hl-text"><span class="hl-brand">${esc(h.label)}</span><span class="hl-title">${esc(h.title)}</span>
  <button class="hl-cta" data-open-modal data-level="${esc(h.level)}">${esc(h.cta)} →</button></div>`;
function dotsFor(container, n, onPick, label) {
  container.innerHTML = Array.from({ length: n }, (_, i) => `<button aria-label="${label} ${i + 1}"><i></i></button>`).join("");
  $$("button", container).forEach((b, i) => b.addEventListener("click", () => onPick(i)));
  return i => $$("button", container).forEach((b, j) => b.setAttribute("aria-current", i === j ? "true" : "false"));
}
const setHlDots = dotsFor(hlDots, HIGHLIGHTS.length, i => { showHl(i); restartHl(); }, "Highlight");
let hlCurrentEl = null;
function showHl(i, first = false) {
  hlIndex = (i + HIGHLIGHTS.length) % HIGHLIGHTS.length;
  setHlDots(hlIndex);
  const incoming = document.createElement("div");
  incoming.className = "hl-card";
  incoming.innerHTML = hlCard(HIGHLIGHTS[hlIndex]);
  if (hlCurrentEl && !first) {
    const out = hlCurrentEl; out.classList.add("out");
    const so = anim(out, { opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: 16, scale: 0.96 }, { tension: 210, friction: 24 }, 0);
    so.to(1); setTimeout(() => out.remove(), 700);
    hlStage.appendChild(incoming);
    anim(incoming, { opacity: 0, y: 16, scale: 0.96 }, { opacity: 1, y: 0, scale: 1 }, { tension: 210, friction: 24 }, 0).to(1);
  } else hlStage.appendChild(incoming);
  hlCurrentEl = incoming;
}
function restartHl() { clearInterval(hlTimer); hlTimer = setInterval(() => showHl(hlIndex + 1), 3800); }
showHl(0, true);

/* ---------- Hero entrance (gated by loader) ---------- */
const hlEnter = anim($("#highlights"), { opacity: 0, y: 28 }, { opacity: 1, y: 0 }, { tension: 200, friction: 26 }, 0);
const stEnter = anim($("#studentsCard"), { opacity: 0, y: 28 }, { opacity: 1, y: 0 }, { tension: 200, friction: 26 }, 0);
const waFloat = $("#waFloat");
const waEnter = anim(waFloat, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1 }, { tension: 220, friction: 20 }, 0);
waFloat.addEventListener("pointerenter", () => { if (!isMobile()) waFloat.style.scale = "1.08"; });
waFloat.addEventListener("pointerleave", () => { waFloat.style.scale = ""; });
waFloat.style.transition = "scale .25s";

/* ---------- Trust carousel ---------- */
let tIndex = 0;
const gws = $$(".gw");
gws.forEach(g => g.innerHTML = `<span class="clip"><span style="--d:700ms"></span></span>`);
const ghostTitle = $("#trust-title");
const tutorPhoto = $("#tutorPhoto");
const photoFade = anim(tutorPhoto, { opacity: 0 }, { opacity: 1 }, { tension: 260, friction: 26 }, 1);
const setTDots = dotsFor($("#tDots"), TUTORS.length, i => showTutor(i), "Tutor");
let trustSeen = false;
function showTutor(i, first = false) {
  tIndex = (i + TUTORS.length) % TUTORS.length;
  const t = TUTORS[tIndex];
  setTDots(tIndex);
  ghostTitle.classList.remove("is-in");
  gws.forEach((g, k) => { g.querySelector(".clip>span").textContent = t.words[k]; });
  ghostTitle.setAttribute("aria-label", t.words.join(" "));
  void ghostTitle.offsetWidth;
  if (trustSeen) requestAnimationFrame(() => ghostTitle.classList.add("is-in"));
  tutorPhoto.innerHTML = media(t.slot, `${t.name}, ${t.role}`, { v: tIndex === 1 ? "v2" : tIndex === 2 ? "v3" : "" });
  $("#tutorName").textContent = t.name;
  $("#tutorRole").textContent = t.role;
  if (!first) { photoFade.set(0); photoFade.to(1); }
}
showTutor(0, true);
onView(ghostTitle, () => { trustSeen = true; ghostTitle.classList.add("is-in"); });
$("#tPrev").addEventListener("click", () => showTutor(tIndex - 1));
$("#tNext").addEventListener("click", () => showTutor(tIndex + 1));
$$(".arrow-btn").forEach(b => hover(b, $("svg", b), { scale: 1 }, { scale: 1.15 }, { tension: 320, friction: 18 }));

inview($("#ratio"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, { tension: 220, friction: 22 });
inview($("#badgeCard"), { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { tension: 200, friction: 26 }, 120);
inview($("#tutorCard"), { opacity: 0, y: 60, scale: 0.92 }, { opacity: 1, y: 0, scale: 1 }, { tension: 170, friction: 26 });

/* ---------- Section reveals ---------- */
$$("#progList li").forEach((li, i) => {
  inview(li, { opacity: 0, y: 26 }, { opacity: 1, y: 0 }, { tension: 190, friction: 26 }, i * 90);
  const row = $(".prog-row", li), arr = $(".arr", li), svg = $("svg", arr);
  const s = spring(p => { arr.style.transform = `translateX(${p * 8}px)`; svg.style.opacity = 0.55 + 0.45 * p; }, { tension: 300, friction: 20 }, 0);
  row.addEventListener("pointerenter", () => { if (!isMobile()) s.to(1); });
  row.addEventListener("pointerleave", () => s.to(0));
  row.addEventListener("click", () => openModal(row.dataset.level));
});
inview($("#spaceIcon"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1 }, { tension: 240, friction: 20 });
$$(".room").forEach((r, i) => {
  inview(r, { opacity: 0, y: 48 }, { opacity: 1, y: 0 }, { tension: 180, friction: 26 }, i * 140);
  hover(r, $(".room-img", r), { scale: 1 }, { scale: 1.03 }, { tension: 300, friction: 22 });
});
$$(".stat").forEach((s, i) => inview(s, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, { tension: 180, friction: 24 }, i * 110));
$$("#evList li").forEach((li, i) => {
  inview(li, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, { tension: 180, friction: 26 }, i * 120);
  hover(li, $(".ev-card", li), { y: 0 }, { y: -8 }, { tension: 300, friction: 22 });
});
$$("#tList li").forEach((li, i) => {
  inview(li, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, { tension: 180, friction: 26 }, i * 120);
  hover(li, $(".t-card", li), { y: 0 }, { y: -8 }, { tension: 300, friction: 22 });
});
inview($("#ctaBtns"), { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { tension: 200, friction: 24 }, 150);
$$(".pill").forEach(p => { const svg = $(":scope > svg:last-child", p); if (svg && !p.matches("[data-wa]")) hover(p, svg, { x: 0 }, { x: 5 }, { tension: 320, friction: 20 }); });
$$(".x-btn").forEach(b => hover(b, $(".xi", b), { rotate: 0 }, { rotate: 90 }, { tension: 300, friction: 18 }));

/* ---------- Parallax ---------- */
const heroSec = $(".hero"), heroPlate = $("#heroPlate"), trustSec = $(".trust");
const GW_PAIRS = [[-3, 3], [3, -3], [-2, 4], [4, -3]];
function progress(el) {
  const r = el.getBoundingClientRect(), vh = innerHeight;
  return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
}
function parallax() {
  if (reduced) return;
  heroPlate.style.transform = `translateY(${lerp(0, 12, progress(heroSec))}%)`;
  const p = progress(trustSec);
  gws.forEach((g, i) => { g.style.transform = `translateX(${lerp(GW_PAIRS[i][0], GW_PAIRS[i][1], p)}%)`; });
}

/* ---------- Lenis + scroll lock ---------- */
let lenis = null;
try { if (window.Lenis) lenis = new window.Lenis({ smoothWheel: true }); } catch (e) { lenis = null; }
let locks = 0;
function lock() { locks++; document.documentElement.classList.add("locked"); lenis && lenis.stop(); }
function unlock() { locks = Math.max(0, locks - 1); if (!locks) { document.documentElement.classList.remove("locked"); lenis && lenis.start(); } }
function scrollToHash(hash) {
  const el = hash === "#top" ? document.body : document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(hash === "#top" ? 0 : el, { duration: 1.2 });
  else (hash === "#top" ? window.scrollTo({ top: 0, behavior: "smooth" }) : el.scrollIntoView({ behavior: "smooth" }));
}
document.addEventListener("click", e => {
  const a = e.target.closest("a[data-scroll]");
  if (a) { e.preventDefault(); scrollToHash(a.getAttribute("href")); }
  const o = e.target.closest("[data-open-modal]");
  if (o) { e.preventDefault(); openModal(o.dataset.level); }
});
function raf(t) { lenis && lenis.raf(t); step(t); parallax(); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
window.scrollTo(0, 0);
addEventListener("resize", () => { scaleRoot(); fitTitle(); });

/* ---------- Menu ---------- */
const menu = $("#menu"), menuBd = $("#menuBd"), menuPanel = $("#menuPanel"), burger = $("#burger");
const menuBdS = anim(menuBd, { opacity: 0 }, { opacity: 1 }, { tension: 260, friction: 30 }, 0);
const menuPS = anim(menuPanel, { opacity: 0, y: -24 }, { opacity: 1, y: 0 }, { tension: 220, friction: 28 }, 0);
const menuLinks = $$("#menuNav a").map(a => anim(a, { opacity: 0, y: 28 }, { opacity: 1, y: 0 }, { tension: 200, friction: 26 }, 0));
let menuOpen = false;
function openMenu() {
  if (menuOpen) return; menuOpen = true; lock();
  menu.classList.add("open"); menu.removeAttribute("inert"); menu.setAttribute("aria-hidden", "false");
  burger.setAttribute("aria-expanded", "true"); waFloat.classList.add("hide");
  menuBdS.to(1); menuPS.to(1); menuLinks.forEach((s, i) => { s.set(0); s.to(1, 120 + i * 70); });
  setTimeout(() => $("#menuClose").focus(), 50);
}
function closeMenu(restoreFocus = true) {
  if (!menuOpen) return; menuOpen = false;
  menu.classList.remove("open"); menu.setAttribute("inert", ""); menu.setAttribute("aria-hidden", "true");
  burger.setAttribute("aria-expanded", "false"); if (!modalOpen) waFloat.classList.remove("hide");
  menuBdS.to(0); menuPS.to(0); menuLinks.forEach(s => s.to(0));
  unlock(); if (restoreFocus) burger.focus();
}
burger.addEventListener("click", openMenu);
$("#menuClose").addEventListener("click", () => closeMenu());
menuBd.addEventListener("click", () => closeMenu());
$$("#menuNav a").forEach(a => a.addEventListener("click", e => { e.preventDefault(); closeMenu(false); setTimeout(() => scrollToHash(a.getAttribute("href")), 60); }));
$("#menuTrial").addEventListener("click", () => { closeMenu(false); openModal(); });

/* ---------- Modal ---------- */
const modal = $("#modal"), modalBd = $("#modalBd"), modalPanel = $("#modalPanel"), form = $("#form"), success = $("#success");
const modalBdS = anim(modalBd, { opacity: 0 }, { opacity: 1 }, { tension: 240, friction: 30 }, 0);
const modalPS = anim(modalPanel, { opacity: 0, y: 28, scale: 0.96 }, { opacity: 1, y: 0, scale: 1 }, { tension: 240, friction: 26 }, 0);
const modalTitle = $("#modal-title");
let modalOpen = false, lastFocus = null, resetTimer = null;
function openModal(level) {
  if (modalOpen) return; modalOpen = true; lastFocus = document.activeElement; lock();
  clearTimeout(resetTimer);
  if (level) $("#in-level").value = level;
  modal.classList.add("open"); modal.removeAttribute("inert"); modal.setAttribute("aria-hidden", "false");
  waFloat.classList.add("hide");
  modalBdS.to(1); modalPS.to(1);
  modalTitle.classList.remove("is-in"); void modalTitle.offsetWidth; requestAnimationFrame(() => modalTitle.classList.add("is-in"));
  setTimeout(() => $("#in-name").focus(), 120);
}
function closeModal() {
  if (!modalOpen) return; modalOpen = false;
  modal.classList.remove("open"); modal.setAttribute("inert", ""); modal.setAttribute("aria-hidden", "true");
  if (!menuOpen) waFloat.classList.remove("hide");
  modalBdS.to(0); modalPS.to(0); unlock();
  if (lastFocus && lastFocus.focus) lastFocus.focus();
  resetTimer = setTimeout(() => { form.reset(); form.hidden = false; success.hidden = true; $$(".field", form).forEach(f => f.classList.remove("invalid")); }, 350);
}
$("#modalClose").addEventListener("click", closeModal);
modalBd.addEventListener("click", closeModal);
$("#successDone").addEventListener("click", closeModal);
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#in-name").value.trim(), phone = $("#in-phone").value.trim();
  const level = $("#in-level").value, msg = $("#in-msg").value.trim();
  $("#f-name").classList.toggle("invalid", !name);
  $("#f-phone").classList.toggle("invalid", !phone);
  if (!name) { $("#in-name").focus(); return; }
  if (!phone) { $("#in-phone").focus(); return; }
  const text = `Hi, I'm ${name}. I'd like a free trial class for my child (${level}).${msg ? " " + msg : ""} My number: ${phone}`;
  $("#successWa").href = waLink(text);
  $("#successText").textContent = `Thanks, ${name.split(/\s+/)[0] || "there"}. Tap Open WhatsApp to send your message, and our team will reply to arrange the trial class.`;
  form.hidden = true; success.hidden = false;
  setTimeout(() => $("#successWa").focus(), 50);
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { if (modalOpen) closeModal(); else if (menuOpen) closeMenu(); } });

/* ---------- Loader ---------- */
const MIN_VISIBLE_MS = reduced ? 200 : 1400, MAX_VISIBLE_MS = 2600, EXIT_MS = reduced ? 1 : 850;
const loader = $("#loader");
lock();
anim($("#loaderBrand"), { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { tension: 200, friction: 22 }, 0).to(1);
requestAnimationFrame(() => requestAnimationFrame(() => $("#loaderFill").classList.add("go")));
let started = false;
function startCountdown() { if (started) return; started = true; setTimeout(ready, MIN_VISIBLE_MS); }
if (document.readyState === "complete") startCountdown(); else addEventListener("load", startCountdown);
setTimeout(startCountdown, MAX_VISIBLE_MS);
function ready() {
  heroTitle.classList.add("is-in");
  $("#tagline").classList.add("is-in");
  hlEnter.to(1, 650); stEnter.to(1, 780); waEnter.to(1, 900);
  setTimeout(() => waFloat.style.pointerEvents = "auto", 900);
  restartHl();
  unlock();
  loader.classList.add("exit");
  setTimeout(() => loader.remove(), EXIT_MS);
  revealOn = true;
  // trigger anything already in view
  ioQueue.forEach((fn, el) => { io.unobserve(el); io.observe(el); });
}
})();
