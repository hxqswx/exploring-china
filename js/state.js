/* ──────────────────────────────────────────────────
   state — central state + localStorage persistence
   ────────────────────────────────────────────────── */
import { forumSeed } from './data/forum.js';
import { products } from './data/products.js';

const KEYS = {
  LANG:'xc_lang', CART:'xc_cart', USER:'xc_user',
  USERS:'xc_users', ORDERS:'xc_orders', SUBS:'xc_subs',
  THREADS:'xc_threads', PENDING:'xc_pending_signup'
};

const load = (k, def) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }
  catch(_) { return def; }
};

export const state = {
  lang: load(KEYS.LANG, 'en'),
  cart: load(KEYS.CART, []),
  user: load(KEYS.USER, null),
  users: load(KEYS.USERS, {}),
  orders: load(KEYS.ORDERS, []),
  subs: load(KEYS.SUBS, []),
  threads: load(KEYS.THREADS, null) || seedForum(),
  pendingSignup: load(KEYS.PENDING, null)
};

function seedForum() {
  // store seed if not present
  try { localStorage.setItem(KEYS.THREADS, JSON.stringify(forumSeed)); } catch(_) {}
  return JSON.parse(JSON.stringify(forumSeed));
}

export function persist() {
  try {
    localStorage.setItem(KEYS.LANG, JSON.stringify(state.lang));
    localStorage.setItem(KEYS.CART, JSON.stringify(state.cart));
    localStorage.setItem(KEYS.USER, JSON.stringify(state.user));
    localStorage.setItem(KEYS.USERS, JSON.stringify(state.users));
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(state.orders));
    localStorage.setItem(KEYS.SUBS, JSON.stringify(state.subs));
    localStorage.setItem(KEYS.THREADS, JSON.stringify(state.threads));
    localStorage.setItem(KEYS.PENDING, JSON.stringify(state.pendingSignup));
  } catch(_) {}
}

/* simple non-cryptographic hash for demo password storage */
export function hash(s) {
  let h = 0;
  for (const ch of s) h = ((h<<5) - h + ch.charCodeAt(0)) | 0;
  return String(h);
}

/* cart */
export function cartCount() { return state.cart.reduce((a,b)=>a+b.qty, 0); }
export function cartSubtotal() { return state.cart.reduce((a,it)=> a + (products[it.id].price * it.qty), 0); }

export function addToCart(id) {
  const found = state.cart.find(c => c.id === id);
  if (found) found.qty++;
  else state.cart.push({id, qty:1});
  persist();
}

export function setQty(id, qty) {
  qty = Math.max(0, qty|0);
  state.cart = qty === 0
    ? state.cart.filter(c => c.id !== id)
    : state.cart.map(c => c.id === id ? {...c, qty} : c);
  persist();
}

export function removeFromCart(id) { setQty(id, 0); }

/* threads */
export function addThread(thread) {
  state.threads.unshift(thread);
  persist();
}

export function findThread(id) {
  return state.threads.find(t => t.id === id);
}

export function addReply(threadId, reply) {
  const thread = findThread(threadId);
  if (!thread) return;
  thread.replies.push(reply);
  persist();
}

export function toggleLike(threadId, replyId, email) {
  const thread = findThread(threadId);
  if (!thread) return;
  const target = replyId ? thread.replies.find(r => r.id === replyId) : thread;
  if (!target) return;
  target.likedBy = target.likedBy || [];
  const idx = target.likedBy.indexOf(email);
  if (idx >= 0) target.likedBy.splice(idx, 1);
  else target.likedBy.push(email);
  persist();
}

export function deleteThread(id) {
  state.threads = state.threads.filter(t => t.id !== id);
  persist();
}
