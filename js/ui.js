/* ──────────────────────────────────────────────────
   ui — small helpers used by every view
   ────────────────────────────────────────────────── */
import { state } from './state.js';
import { T } from './i18n.js';

export const $ = sel => document.querySelector(sel);
export const $$ = sel => document.querySelectorAll(sel);

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const fmt = n => '¥ ' + Number(n).toLocaleString('en-US');

export function toast(msg, ms=2400) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), ms);
}

/* navigation — set hash, router takes it from there */
export function go(path) {
  if (path && path[0] !== '#') path = '#' + path;
  if (location.hash === path) {
    // already there; trigger re-render via hashchange anyway
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    location.hash = path;
  }
}

export function goAccount() {
  go(state.user ? '/account' : '/signin');
}

/* time-ago helper (en + zh) */
export function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  const lang = state.lang;
  if (diff < 60) return lang === 'zh' ? T.forum.just.zh : T.forum.just.en;
  const m = Math.floor(diff / 60);
  if (m < 60) return m + ' ' + (lang === 'zh' ? T.forum.minAgo.zh : T.forum.minAgo.en);
  const h = Math.floor(m / 60);
  if (h < 24) return h + ' ' + (lang === 'zh' ? T.forum.hrAgo.zh : T.forum.hrAgo.en);
  const d = Math.floor(h / 24);
  return d + ' ' + (lang === 'zh' ? T.forum.dAgo.zh : T.forum.dAgo.en);
}

/* generate a 6-digit verification code */
export function gen6() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/* tiny avatar — initial on a colored circle */
export function avatarHTML(name, size = '') {
  const initial = (name || '?').trim()[0]?.toUpperCase() || '?';
  return `<div class="avatar ${size}">${esc(initial)}</div>`;
}

/* attach scroll-reveal observer to every .reveal in the current page */
export function attachReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -60px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
}
