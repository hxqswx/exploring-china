/* ──────────────────────────────────────────────────
   app — entry point
   ────────────────────────────────────────────────── */
import { $, $$ } from './ui.js';
import { state, persist } from './state.js';
import { render } from './router.js';

window.addEventListener('hashchange', render);

window.addEventListener('DOMContentLoaded', () => {
  // Lang toggle
  $$('#langToggle button').forEach(b => b.addEventListener('click', () => {
    state.lang = b.dataset.lang;
    persist();
    render();
  }));

  // Burger
  $('#burger').addEventListener('click', () => $('#navLinks').classList.toggle('open'));

  // Brand → home
  $('#brand').addEventListener('click', () => { location.hash = '/'; });

  // Cart / account icons
  $('#cartBtn').addEventListener('click', () => { location.hash = '/cart'; });
  $('#accountBtn').addEventListener('click', () => {
    location.hash = state.user ? '/account' : '/signin';
  });

  // Global click delegation for any [data-go="/path"] element
  document.body.addEventListener('click', e => {
    const el = e.target.closest('[data-go]');
    if (!el) return;
    e.preventDefault();
    location.hash = el.dataset.go;
    const links = $('#navLinks');
    if (links.classList.contains('open')) links.classList.remove('open');
  });

  // Nav scroll state
  const nav = $('#nav');
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // First render
  render();
});
