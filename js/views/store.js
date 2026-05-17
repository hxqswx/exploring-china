/* ──────────────────────────────────────────────────
   store view (full page)
   ────────────────────────────────────────────────── */
import { state, addToCart } from '../state.js';
import { T, t } from '../i18n.js';
import { toast } from '../ui.js';
import { products } from '../data/products.js';
import { productCardHTML } from './home.js';
import { updateCartBadge } from './shell.js';

export function viewStore() {
  return `<div class="page">
    <div class="container">
      <div class="crumbs"><a data-go="/">${t(T.brand)}</a><span>›</span>${t(T.nav.store)}</div>
      <div class="section-head" style="margin-bottom:50px;">
        <h2 class="title">${state.lang === 'en' ? 'The <em>Store</em>' : '<em>精选商店</em>'}</h2>
        <p>${t({en:'Tea, porcelain, books, and prints — sourced from artisans we know personally.', zh:'茶、瓷、书籍、版画——皆来自我们熟识的手艺人。'})}</p>
      </div>
      <div class="store-grid">${Object.keys(products).map(id => productCardHTML(id)).join('')}</div>
    </div>
  </div>`;
}

export function wireStore() {
  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.add);
      updateCartBadge();
      toast(state.lang === 'zh' ? '已加入购物车' : 'Added to cart');
      btn.classList.add('added');
      btn.textContent = state.lang === 'zh' ? '已加入 ✓' : 'Added ✓';
    });
  });
}
