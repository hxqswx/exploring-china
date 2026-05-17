/* ──────────────────────────────────────────────────
   store view (full page)
   ────────────────────────────────────────────────── */
import { state, addToCart, toggleWishlist } from '../state.js';
import { T, t } from '../i18n.js';
import { toast } from '../ui.js';
import { products } from '../data/products.js';
import { productCardHTML } from './home.js';
import { updateCartBadge } from './shell.js';

export function viewStore() {
  const subtotal = state.cart.reduce((a,it) => {
    const p = products[it.id]; return a + (p ? p.price * it.qty : 0);
  }, 0);
  const remaining = Math.max(0, 800 - subtotal);
  const pct = Math.min(100, Math.round((subtotal / 800) * 100));

  return `<div class="page">
    <div class="container">
      <div class="crumbs"><a data-go="/">${t(T.brand)}</a><span>›</span>${t(T.nav.store)}</div>
      <div class="section-head" style="margin-bottom:40px;">
        <h2 class="title">${state.lang === 'en' ? 'The <em>Store</em>' : '<em>精选商店</em>'}</h2>
        <p>${t({en:'Tea, porcelain, books, and prints — sourced from artisans we know personally.', zh:'茶、瓷、书籍、版画——皆来自我们熟识的手艺人。'})}</p>
      </div>

      ${remaining > 0
        ? `<div class="shipping-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <span>${t({en:`Add ¥${remaining} more for free shipping`, zh:`再购 ¥${remaining} 即享免运费`})}</span>
            <div class="bar-wrap"><div class="bar-fill" style="width:${pct}%"></div></div>
          </div>`
        : `<div class="shipping-banner" style="background:rgba(91,139,122,.18);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${t({en:'You\'ve unlocked free shipping! 🎉', zh:'已解锁免运费！🎉'})}</span>
          </div>`
      }

      <div class="store-filters" id="storeFilters">
        ${['all','tea','books','prints','porcelain'].map(cat =>
          `<button class="store-filter-btn ${cat === 'all' ? 'active' : ''}" data-cat="${cat}">${
            cat === 'all' ? t({en:'All', zh:'全部'}) :
            cat === 'tea' ? t({en:'Tea', zh:'茶'}) :
            cat === 'books' ? t({en:'Books', zh:'书籍'}) :
            cat === 'prints' ? t({en:'Prints', zh:'版画'}) :
            t({en:'Porcelain', zh:'瓷器'})
          }</button>`
        ).join('')}
      </div>

      <div class="store-meta">
        <span class="store-count" id="storeCount">${Object.keys(products).length} ${t({en:'items', zh:'件商品'})}</span>
      </div>

      <div class="store-grid" id="storeGrid">${Object.keys(products).map(id => productCardHTML(id)).join('')}</div>
    </div>
  </div>`;
}

export function wireStore() {
  // add-to-cart
  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.add);
      updateCartBadge();
      toast(state.lang === 'zh' ? '已加入购物车' : 'Added to cart');
      btn.classList.add('added');
      btn.textContent = state.lang === 'zh' ? '已加入 ✓' : 'Added ✓';
    });
  });

  // wishlist
  document.querySelectorAll('[data-wish]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleWishlist(btn.dataset.wish);
      btn.classList.toggle('active');
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', btn.classList.contains('active') ? 'currentColor' : 'none');
      toast(state.lang === 'zh' ? (btn.classList.contains('active') ? '已收藏' : '已取消收藏') : (btn.classList.contains('active') ? 'Saved' : 'Removed from saved'));
    });
  });

  // category filter
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      const grid = document.getElementById('storeGrid');
      const count = document.getElementById('storeCount');
      let visible = 0;
      grid.querySelectorAll('.product-wrap').forEach(card => {
        const id = card.querySelector('[data-add]')?.dataset.add || card.querySelector('[data-wish]')?.dataset.wish;
        if (!id) { card.style.display = ''; visible++; return; }
        const p = products[id];
        const catStr = (p ? t(p.cat) : '').toLowerCase();
        const show = cat === 'all' ||
          (cat === 'tea' && catStr.includes('tea')) ||
          (cat === 'books' && (catStr.includes('book') || catStr.includes('书'))) ||
          (cat === 'prints' && (catStr.includes('print') || catStr.includes('版画'))) ||
          (cat === 'porcelain' && (catStr.includes('porcelain') || catStr.includes('瓷')));
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (count) count.textContent = visible + ' ' + t({en:'items', zh:'件商品'});
    });
  });
}
