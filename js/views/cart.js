/* ──────────────────────────────────────────────────
   cart view
   ────────────────────────────────────────────────── */
import { state, cartCount, cartSubtotal, setQty, removeFromCart } from '../state.js';
import { T, t } from '../i18n.js';
import { esc, fmt, go, toast } from '../ui.js';
import { products } from '../data/products.js';
import { updateCartBadge } from './shell.js';

export function viewCart() {
  if (state.cart.length === 0) {
    return `<div class="page"><div class="container">
      <div class="empty-state">
        <h3>${t(T.empty.cart)}</h3>
        <p>${t(T.empty.cartSub)}</p>
        <button class="btn btn-primary" data-go="/store">${t({en:'Browse the Store', zh:'前往商店'})} <span class="arrow">→</span></button>
      </div>
    </div></div>`;
  }
  const subtotal = cartSubtotal();
  const shipping = subtotal > 800 ? 0 : 30;
  const tax = Math.round(subtotal * 0.06);
  const total = subtotal + shipping + tax;

  return `<div class="page"><div class="container">
    <div class="crumbs"><a data-go="/">${t(T.brand)}</a><span>›</span>${t(T.cart.title)}</div>
    <h2 class="title" style="margin-bottom:40px;">${t(T.cart.title)} <span style="font-size:.5em;color:var(--muted);font-style:normal;">${cartCount()} ${cartCount() === 1 ? t(T.cart.item) : t(T.cart.items)}</span></h2>
    <div class="cart-grid">
      <div class="cart-list">
        ${state.cart.map(it => {
          const p = products[it.id];
          return `<div class="cart-item">
            <img src="${p.img}" alt="">
            <div>
              <div class="cat">${esc(t(p.cat))}</div>
              <h4>${esc(t(p.name))}</h4>
              <div class="qty">
                <button data-qty="${it.id}" data-delta="-1">−</button>
                <span>${it.qty}</span>
                <button data-qty="${it.id}" data-delta="1">+</button>
              </div>
              <button class="remove" data-remove="${it.id}">${t({en:'Remove', zh:'移除'})}</button>
            </div>
            <div class="price">${fmt(p.price * it.qty)}</div>
          </div>`;
        }).join('')}
      </div>
      <aside class="summary">
        <h4>${t({en:'Order Summary', zh:'订单摘要'})}</h4>
        <div class="line"><span>${t(T.cart.subtotal)}</span><span>${fmt(subtotal)}</span></div>
        <div class="line"><span>${t(T.cart.shipping)}</span><span>${shipping === 0 ? t(T.cart.free) : fmt(shipping)}</span></div>
        <div class="line"><span>${t(T.cart.tax)}</span><span>${fmt(tax)}</span></div>
        <div class="total"><span>${t(T.cart.total)}</span><span>${fmt(total)}</span></div>
        <button class="btn btn-primary btn-block" style="margin-top:24px;" id="cartCheckout">${t(T.cart.checkout)} <span class="arrow">→</span></button>
        <button class="btn btn-outline btn-block btn-sm" style="margin-top:10px;" data-go="/store">${t(T.cart.continue)}</button>
      </aside>
    </div>
  </div></div>`;
}

export function wireCart() {
  document.querySelectorAll('[data-qty]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.qty;
      const current = state.cart.find(c => c.id === id)?.qty || 0;
      setQty(id, current + parseInt(btn.dataset.delta, 10));
      updateCartBadge();
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  });
  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.remove);
      updateCartBadge();
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  });
  const co = document.getElementById('cartCheckout');
  if (co) co.addEventListener('click', () => {
    if (!state.user) {
      toast(state.lang === 'zh' ? '请先登录' : 'Please sign in to continue');
      go('/signin?to=checkout');
    } else {
      go('/checkout');
    }
  });
}
