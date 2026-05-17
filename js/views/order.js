/* ──────────────────────────────────────────────────
   order confirmation view
   ────────────────────────────────────────────────── */
import { state } from '../state.js';
import { T, t } from '../i18n.js';
import { esc, fmt } from '../ui.js';
import { view404 } from './misc.js';

export function viewOrder(id) {
  const o = state.orders.find(x => x.id === id);
  if (!o) return view404();
  return `<div class="page-narrow">
    <div style="text-align:center;">
      <div style="width:72px;height:72px;margin:0 auto 24px;border-radius:50%;background:var(--jade);display:grid;place-items:center;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2"><path d="M5 12l5 5L20 7"/></svg>
      </div>
      <h2 class="title" style="margin-bottom:8px;">${t(T.order.thank)}</h2>
      <p style="color:var(--muted);margin:0 0 36px;">${t(T.order.sub)}</p>
    </div>
    <div class="form-card wide">
      <div style="display:flex;justify-content:space-between;margin-bottom:14px;font-size:13px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);">
        <span>${t(T.order.num)}</span><span style="font-family:var(--serif);font-size:22px;color:var(--ink);letter-spacing:0;text-transform:none;">${o.id}</span>
      </div>
      <div style="border-top:1px solid var(--line);padding-top:18px;">
        ${o.items.map(it => `<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px;"><span>${esc(t(it.name))} × ${it.qty}</span><span>${fmt(it.price * it.qty)}</span></div>`).join('')}
        <div style="display:flex;justify-content:space-between;padding-top:14px;margin-top:8px;border-top:1px solid var(--line);font-family:var(--serif);font-size:22px;font-weight:500;"><span>${t(T.cart.total)}</span><span style="color:var(--red);">${fmt(o.total)}</span></div>
      </div>
      <div style="margin-top:24px;font-size:14px;color:var(--ink-soft);">
        <strong style="font-family:var(--sans);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);">${t({en:'Ship to', zh:'收货地址'})}</strong><br>
        ${esc(o.ship.name)}<br>${esc(o.ship.address)}<br>${esc(o.ship.city)}, ${esc(o.ship.zip)}<br>${esc(o.ship.country)}
      </div>
    </div>
    <div style="display:flex;gap:14px;justify-content:center;margin-top:36px;flex-wrap:wrap;">
      <button class="btn btn-primary" data-go="/">${t(T.order.cont)} <span class="arrow">→</span></button>
      <button class="btn btn-outline" data-go="/account">${t({en:'View All Orders', zh:'查看全部订单'})}</button>
    </div>
  </div>`;
}
