/* ──────────────────────────────────────────────────
   shell — nav text, footer, language toggle wiring,
   cart badge, mobile burger
   ────────────────────────────────────────────────── */
import { state, cartCount } from '../state.js';
import { T, t } from '../i18n.js';
import { $, $$ } from '../ui.js';

export function renderShell() {
  $('#brandText').innerHTML = `${t(T.brand)}<small>${t(T.brandSub)}</small>`;
  $('#navLinks').innerHTML = `
    <li><a data-route="/" data-go="/">${t(T.nav.destinations)}</a></li>
    <li><a data-route="/guide/when-to-go" data-go="/guide/when-to-go">${t(T.nav.guide)}</a></li>
    <li><a data-route="/fireworks" data-go="/fireworks">${t(T.nav.fireworks)}</a></li>
    <li><a data-route="/plan" data-go="/plan">${t(T.nav.plan)}</a></li>
    <li><a data-route="/store" data-go="/store">${t(T.nav.store)}</a></li>
    <li><a data-route="/community" data-go="/community">${t(T.nav.community)}</a></li>
  `;
  $('#footer').innerHTML = footerHTML();

  $$('.lang-toggle button').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
  document.documentElement.lang = state.lang;
  document.title = state.lang === 'zh' ? '探索中国 — 深度旅行指南' : 'Exploring China — A Comprehensive Guide';
  updateCartBadge();
}

export function updateCartBadge() {
  const b = $('#cartBadge');
  const n = cartCount();
  b.style.display = n > 0 ? 'grid' : 'none';
  b.textContent = n;
}

export function footerHTML() {
  return `<div class="container">
    <div class="foot-grid">
      <div class="about">
        <div class="brand" data-go="/">
          <span class="brand-mark">探</span>
          <span class="brand-text">${t(T.brand)}<small>${t(T.brandSub)}</small></span>
        </div>
        <p style="margin-top:24px;">${t({en:'A comprehensive guide to the destinations, culture, and quiet corners of China — written for travelers who prefer to look twice.', zh:'一份关于中国目的地、文化与静谧角落的深度指南——献给愿意驻足细看的旅人。'})}</p>
      </div>
      <div>
        <h5>${t({en:'Explore', zh:'探索'})}</h5>
        <ul>
          <li><a data-go="/">${t(T.nav.destinations)}</a></li>
          <li><a data-go="/guide/when-to-go">${t(T.nav.guide)}</a></li>
          <li><a data-go="/fireworks">${t(T.nav.fireworks)}</a></li>
          <li><a data-go="/plan">${t(T.nav.plan)}</a></li>
        </ul>
      </div>
      <div>
        <h5>${t({en:'Shop & Read', zh:'商店与阅读'})}</h5>
        <ul>
          <li><a data-go="/store">${t(T.nav.store)}</a></li>
          <li><a data-go="/guide/journal">${t({en:'Journal', zh:'旅行札记'})}</a></li>
          <li><a data-go="/guide/videos">${t({en:'Videos', zh:'视频'})}</a></li>
          <li><a data-go="/community">${t({en:'Community', zh:'社区'})}</a></li>
        </ul>
      </div>
      <div>
        <h5>${t({en:'Contact', zh:'联系我们'})}</h5>
        <ul>
          <li><a href="mailto:hello@exploring-china.com">hello@exploring-china.com</a></li>
          <li>${t({en:'Mon – Fri, 9 – 18 CST', zh:'周一至周五 9:00 – 18:00'})}</li>
          <li><a data-go="/guide/contact">${t({en:'Press Inquiries', zh:'媒体合作'})}</a></li>
        </ul>
        <div class="socials" style="margin-top:18px;">
          <a aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          <a aria-label="WeChat"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 4C4.9 4 2 6.4 2 9.4c0 1.7 1 3.2 2.5 4.2L4 16l2.5-1.4c.6.2 1.3.3 2 .3.1-2.7 2.9-4.9 6.4-4.9h.6C15 7.1 12 4 8.5 4z"/></svg></a>
          <a aria-label="YouTube"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C16 4 12 4 12 4s-4 0-6.8.3c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2 8.8 2 10.4v1.2c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.6.1 6.9.2 6.9.2s4 0 6.8-.3c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.2c0-1.6-.2-3.1-.2-3.1zM10 14V8l5 3-5 3z"/></svg></a>
        </div>
      </div>
    </div>
    <div class="foot-bottom">
      <div>© 2026 ${t(T.brand)}. ${t({en:'All rights reserved.', zh:'版权所有。'})}</div>
      <div>
        <a data-go="/guide/privacy" style="margin-right:18px;">${t({en:'Privacy', zh:'隐私政策'})}</a>
        <a data-go="/guide/terms">${t({en:'Terms', zh:'使用条款'})}</a>
      </div>
    </div>
  </div>`;
}

