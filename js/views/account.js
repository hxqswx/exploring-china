/* ──────────────────────────────────────────────────
   account view — orders, threads, profile, signout
   ────────────────────────────────────────────────── */
import { state, persist } from '../state.js';
import { T, t } from '../i18n.js';
import { $, esc, fmt, go, toast } from '../ui.js';

export function viewAccount() {
  if (!state.user) { go('/signin'); return ''; }
  const tab = (location.hash.split('?')[1] || '').match(/tab=(\w+)/)?.[1] || 'orders';
  const myOrders = state.orders.filter(o => o.email === state.user.email);
  const myThreads = state.threads.filter(th => th.authorEmail === state.user.email);

  return `<div class="page"><div class="container">
    <div class="crumbs"><a data-go="/">${t(T.brand)}</a><span>›</span>${t(T.account.title)}</div>
    <h2 class="title" style="margin-bottom:30px;">${t(T.account.welcome)}, <em>${esc(state.user.name)}</em></h2>
    <div class="account-grid">
      <nav class="account-nav">
        <button class="${tab === 'orders' ? 'active' : ''}" data-tab="orders">${t(T.account.orders)}</button>
        <button class="${tab === 'threads' ? 'active' : ''}" data-tab="threads">${t(T.account.threads)}</button>
        <button class="${tab === 'profile' ? 'active' : ''}" data-tab="profile">${t(T.account.profile)}</button>
        <button id="signoutBtn">${t(T.account.logout)}</button>
      </nav>
      <div>
        ${tab === 'orders' ? ordersTab(myOrders) : tab === 'threads' ? threadsTab(myThreads) : profileTab()}
      </div>
    </div>
  </div></div>`;
}

function ordersTab(orders) {
  if (orders.length === 0) return `<div class="empty-state" style="padding:40px 0;text-align:left;">
    <h3 style="font-size:24px;">${t(T.empty.orders)}</h3>
    <p>${t({en:'Once you place an order it will appear here.', zh:'下单后将显示于此处。'})}</p>
    <button class="btn btn-primary" data-go="/store">${t({en:'Browse the Store', zh:'前往商店'})}</button>
  </div>`;
  return orders.map(o => `
    <div class="order-row">
      <div class="meta">
        <div class="id">${o.id}</div>
        <div class="date">${new Date(o.date).toLocaleDateString(state.lang === 'zh' ? 'zh-CN' : 'en-GB', {year:'numeric',month:'short',day:'numeric'})}</div>
        <div class="items">${o.items.map(it => esc(t(it.name)) + ' × ' + it.qty).join('  ·  ')}</div>
      </div>
      <div class="right">
        <div class="total">${fmt(o.total)}</div>
        <div class="status">${t({en:o.status, zh:'已确认'})}</div>
      </div>
    </div>`).join('');
}

function threadsTab(threads) {
  if (threads.length === 0) return `<div class="empty-state" style="padding:40px 0;text-align:left;">
    <h3 style="font-size:24px;">${t({en:"You haven't posted yet.", zh:'您尚未发布话题。'})}</h3>
    <p>${t({en:'Start a thread or join a discussion.', zh:'发起话题或加入讨论。'})}</p>
    <button class="btn btn-primary" data-go="/community">${t({en:'Browse the Forum', zh:'进入论坛'})}</button>
  </div>`;
  return threads.map(th => `
    <div class="thread-row" data-go="/thread/${th.id}">
      <div class="body">
        <div class="cat">${esc(th.category)}</div>
        <h3>${esc(th.title)}</h3>
        <div class="meta">${th.replies.length} ${t(T.forum.replies)} · ${(th.likedBy||[]).length} ${t(T.forum.likes)}</div>
      </div>
    </div>`).join('');
}

function profileTab() {
  return `<div class="form-card" style="max-width:none;margin:0;">
    <h2 style="font-size:24px;">${t(T.account.profile)}</h2>
    <div class="field"><label>${t({en:'Name', zh:'姓名'})}</label><input id="pfName" value="${esc(state.user.name)}"></div>
    <div class="field"><label>${t({en:'Email', zh:'邮箱'})}</label><input value="${esc(state.user.email)}" disabled></div>
    <button class="btn btn-primary btn-sm" id="saveProfileBtn">${t({en:'Save changes', zh:'保存更改'})}</button>
  </div>`;
}

export function wireAccount() {
  document.querySelectorAll('[data-tab]').forEach(b => {
    b.addEventListener('click', () => {
      location.hash = '/account?tab=' + b.dataset.tab;
    });
  });
  const signoutBtn = $('#signoutBtn');
  if (signoutBtn) signoutBtn.addEventListener('click', () => {
    state.user = null;
    persist();
    toast(state.lang === 'zh' ? '已退出登录' : 'Signed out');
    go('/');
  });
  const saveBtn = $('#saveProfileBtn');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const name = $('#pfName').value.trim();
    if (!name) return;
    state.user.name = name;
    state.users[state.user.email].name = name;
    persist();
    toast(state.lang === 'zh' ? '已保存' : 'Saved');
  });
}
