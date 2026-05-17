/* ──────────────────────────────────────────────────
   checkout view + order placement
   ────────────────────────────────────────────────── */
import { state, cartSubtotal, persist } from '../state.js';
import { T, t } from '../i18n.js';
import { esc, fmt, go } from '../ui.js';
import { products } from '../data/products.js';
import { updateCartBadge } from './shell.js';

export function viewCheckout() {
  if (state.cart.length === 0) { go('/cart'); return ''; }
  const subtotal = cartSubtotal();
  const shipping = subtotal > 800 ? 0 : 30;
  const tax = Math.round(subtotal * 0.06);
  const total = subtotal + shipping + tax;
  return `<div class="page"><div class="container">
    <div class="crumbs"><a data-go="/cart">${t(T.cart.title)}</a><span>›</span>${t(T.checkout.title)}</div>
    <h2 class="title" style="text-align:center;">${t(T.checkout.title)}</h2>
    <p style="text-align:center;color:var(--muted);max-width:560px;margin:0 auto 36px;font-size:14px;">${t(T.checkout.note)}</p>
    <div class="checkout-steps">
      <div class="step active"><div class="num">1</div>${t(T.checkout.ship)}</div><span class="sep">·</span>
      <div class="step active"><div class="num">2</div>${t(T.checkout.pay)}</div><span class="sep">·</span>
      <div class="step"><div class="num">3</div>${t(T.checkout.confirm)}</div>
    </div>
    <div class="checkout-grid">
      <form id="checkoutForm">
        <div class="form-card wide">
          <h2 style="font-size:24px;">${t(T.checkout.ship)}</h2>
          <div class="field-row">
            <div class="field"><label>${t({en:'Full name', zh:'姓名'})}</label><input required value="${esc(state.user?.name || '')}" name="name"/></div>
            <div class="field"><label>${t({en:'Email', zh:'邮箱'})}</label><input required type="email" value="${esc(state.user?.email || '')}" name="email"/></div>
          </div>
          <div class="field"><label>${t(T.checkout.address)}</label><input required name="address"/></div>
          <div class="field-row">
            <div class="field"><label>${t(T.checkout.city)}</label><input required name="city"/></div>
            <div class="field"><label>${t(T.checkout.zip)}</label><input required name="zip"/></div>
          </div>
          <div class="field"><label>${t(T.checkout.country)}</label>
            <select name="country">
              <option>${t({en:'China', zh:'中国'})}</option>
              <option>${t({en:'Hong Kong SAR', zh:'中国香港'})}</option>
              <option>${t({en:'Taiwan', zh:'中国台湾'})}</option>
              <option>${t({en:'Singapore', zh:'新加坡'})}</option>
              <option>${t({en:'United States', zh:'美国'})}</option>
              <option>${t({en:'United Kingdom', zh:'英国'})}</option>
              <option>${t({en:'Other', zh:'其他'})}</option>
            </select>
          </div>
        </div>
        <div class="form-card wide" style="margin-top:24px;">
          <h2 style="font-size:24px;">${t(T.checkout.pay)}</h2>
          <div class="field"><label>${t(T.checkout.card)}</label><input required pattern="[0-9 ]{13,19}" inputmode="numeric" placeholder="4242 4242 4242 4242" name="card"/></div>
          <div class="field-row">
            <div class="field"><label>${t(T.checkout.expiry)}</label><input required pattern="(0[1-9]|1[0-2])/[0-9]{2}" placeholder="12/28" name="expiry"/></div>
            <div class="field"><label>${t(T.checkout.cvc)}</label><input required pattern="[0-9]{3,4}" inputmode="numeric" placeholder="123" name="cvc"/></div>
          </div>
          <button class="btn btn-primary btn-block" style="margin-top:20px;" type="submit" id="placeBtn">${t(T.checkout.place)} · ${fmt(total)}</button>
        </div>
      </form>
      <aside class="summary">
        <h4>${t({en:'Order Summary', zh:'订单摘要'})}</h4>
        ${state.cart.map(it => {
          const p = products[it.id];
          return `<div class="line"><span>${esc(t(p.name))} × ${it.qty}</span><span>${fmt(p.price * it.qty)}</span></div>`;
        }).join('')}
        <div style="border-top:1px solid var(--line);margin:14px 0;"></div>
        <div class="line"><span>${t(T.cart.subtotal)}</span><span>${fmt(subtotal)}</span></div>
        <div class="line"><span>${t(T.cart.shipping)}</span><span>${shipping === 0 ? t(T.cart.free) : fmt(shipping)}</span></div>
        <div class="line"><span>${t(T.cart.tax)}</span><span>${fmt(tax)}</span></div>
        <div class="total"><span>${t(T.cart.total)}</span><span>${fmt(total)}</span></div>
      </aside>
    </div>
  </div></div>`;
}

export function wireCheckout() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('placeBtn');
    btn.disabled = true;
    btn.textContent = t(T.checkout.placing);

    setTimeout(() => {
      const f = form;
      const subtotal = cartSubtotal();
      const shipping = subtotal > 800 ? 0 : 30;
      const tax = Math.round(subtotal * 0.06);
      const total = subtotal + shipping + tax;
      const id = 'XC-' + Date.now().toString(36).toUpperCase().slice(-6);
      const order = {
        id,
        email: state.user.email,
        items: state.cart.map(it => ({
          id: it.id, qty: it.qty,
          name: products[it.id].name,
          price: products[it.id].price
        })),
        total,
        ship: {
          name: f.name.value, address: f.address.value, city: f.city.value,
          zip: f.zip.value, country: f.country.value
        },
        status: 'confirmed',
        date: new Date().toISOString()
      };
      state.orders.unshift(order);
      state.cart = [];
      persist();
      updateCartBadge();
      go('/order/' + id);
    }, 800);
  });
}
