/* ──────────────────────────────────────────────────
   router — hash-based, view function table
   ────────────────────────────────────────────────── */
import { $, $$, attachReveal } from './ui.js';
import { renderShell } from './views/shell.js';
import { viewHome, wireHome } from './views/home.js';
import { viewDestination } from './views/destination.js';
import { viewStore, wireStore } from './views/store.js';
import { viewCart, wireCart } from './views/cart.js';
import { viewCheckout, wireCheckout } from './views/checkout.js';
import { viewOrder } from './views/order.js';
import { viewSignin, wireSignin, viewSignup, wireSignup, viewVerify, wireVerify } from './views/auth.js';
import { viewAccount, wireAccount } from './views/account.js';
import { viewForumIndex, wireForumIndex, viewThread, wireThread, viewNewThread, wireNewThread } from './views/forum.js';
import { viewArticle } from './views/article.js';
import { viewPlan, viewFireworks, view404 } from './views/misc.js';
import { viewReading, wireReading } from './views/reading.js';

function parseRoute() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, query] = raw.split('?');
  const qs = {};
  if (query) {
    new URLSearchParams(query).forEach((v, k) => { qs[k] = v; });
  }
  return { path, qs };
}

export function render() {
  renderShell();
  const { path, qs } = parseRoute();
  const app = $('#app');
  let html = '';
  let wire = null;

  if (path === '/' || path === '') {
    html = viewHome();
    wire = wireHome;
  } else if (path.startsWith('/destination/')) {
    html = viewDestination(path.split('/')[2]);
  } else if (path === '/store') {
    html = viewStore();
    wire = wireStore;
  } else if (path === '/cart') {
    html = viewCart();
    wire = wireCart;
  } else if (path === '/checkout') {
    html = viewCheckout();
    wire = wireCheckout;
  } else if (path.startsWith('/order/')) {
    html = viewOrder(path.split('/')[2]);
  } else if (path === '/signin') {
    html = viewSignin(qs);
    wire = wireSignin;
  } else if (path === '/signup') {
    html = viewSignup();
    wire = wireSignup;
  } else if (path === '/verify') {
    html = viewVerify(qs);
    wire = wireVerify;
  } else if (path === '/account') {
    html = viewAccount();
    wire = wireAccount;
  } else if (path === '/community') {
    html = viewForumIndex(qs);
    wire = wireForumIndex;
  } else if (path.startsWith('/thread/')) {
    const id = path.split('/')[2];
    html = viewThread(id);
    wire = () => wireThread(id);
  } else if (path === '/newthread') {
    html = viewNewThread();
    wire = wireNewThread;
  } else if (path.startsWith('/guide/')) {
    html = viewArticle(path.split('/')[2]);
  } else if (path === '/plan') {
    html = viewPlan();
  } else if (path === '/reading') {
    html = viewReading();
    wire = wireReading;
  } else if (path === '/fireworks') {
    html = viewFireworks();
  } else {
    html = view404();
  }

  app.innerHTML = html;
  if (wire) wire();

  window.scrollTo({ top: 0, behavior: 'instant' });
  attachReveal();

  // active nav
  const activeRoot = '/' + (path.split('/')[1] || '');
  $$('.nav-links a[data-route]').forEach(a => {
    const root = '/' + a.dataset.route.split('/')[1];
    a.classList.toggle('active', root === activeRoot && activeRoot !== '/');
  });
}
