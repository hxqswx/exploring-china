/* ──────────────────────────────────────────────────
   forum — list, thread, new-thread, replies, likes, search
   ────────────────────────────────────────────────── */
import { state, addThread, findThread, addReply, toggleLike, deleteThread, persist } from '../state.js';
import { T, t } from '../i18n.js';
import { $, $$, esc, go, toast, timeAgo, avatarHTML } from '../ui.js';
import { categories } from '../data/forum.js';
import { view404 } from './misc.js';

/* Read forum filters from query string */
function readQS(qs) {
  return {
    cat: qs.cat || 'all',
    q:   qs.q   || '',
    sort: qs.sort || 'recent'
  };
}

function catLabel(id) {
  const c = categories.find(c => c.id === id);
  return c ? t(c.label) : id;
}

/* ── FORUM INDEX ──────────────────────────────────── */
export function viewForumIndex(qs) {
  const f = readQS(qs);
  let threads = [...state.threads];

  // filter
  if (f.cat !== 'all') threads = threads.filter(th => th.category === f.cat);
  if (f.q) {
    const q = f.q.toLowerCase();
    threads = threads.filter(th =>
      th.title.toLowerCase().includes(q) ||
      th.body.toLowerCase().includes(q) ||
      th.author.toLowerCase().includes(q)
    );
  }
  // sort
  if (f.sort === 'popular') {
    threads.sort((a,b) => (b.likedBy?.length || 0) - (a.likedBy?.length || 0));
  } else if (f.sort === 'replies') {
    threads.sort((a,b) => b.replies.length - a.replies.length);
  } else {
    threads.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return `<div class="page"><div class="container">
    <div class="crumbs"><a data-go="/">${t(T.brand)}</a><span>›</span>${t(T.forum.title)}</div>
    <div class="forum-head">
      <div>
        <div class="eyebrow">${t({en:'The Community', zh:'旅行社区'})}</div>
        <h2 class="title" style="margin:0;">${state.lang === 'en' ? 'Travel <em>together</em>, even when <em>apart</em>.' : '<em>同行，纵使天涯</em>。'}</h2>
        <p style="color:var(--muted);margin:14px 0 0;max-width:60ch;">${t(T.forum.sub)}</p>
      </div>
      <button class="btn btn-primary" id="newThreadBtn">${t(T.forum.newThread)} <span class="arrow">→</span></button>
    </div>

    <div class="forum-toolbar">
      <input class="forum-search" id="forumSearch" type="search" placeholder="${t(T.forum.search)}" value="${esc(f.q)}">
      <select class="forum-select" id="forumSort">
        <option value="recent"  ${f.sort === 'recent'  ? 'selected' : ''}>${t(T.forum.sortRecent)}</option>
        <option value="popular" ${f.sort === 'popular' ? 'selected' : ''}>${t(T.forum.sortPopular)}</option>
        <option value="replies" ${f.sort === 'replies' ? 'selected' : ''}>${t(T.forum.sortReplies)}</option>
      </select>
    </div>

    <div class="cat-tabs">
      <button class="cat-tab ${f.cat === 'all' ? 'active' : ''}" data-cat="all">${t(T.forum.all)}</button>
      ${categories.map(c => `<button class="cat-tab ${f.cat === c.id ? 'active' : ''}" data-cat="${c.id}">${esc(t(c.label))}</button>`).join('')}
    </div>

    ${threads.length === 0 ? `
      <div class="empty-state">
        <h3>${t(T.empty.threads)}</h3>
        <button class="btn btn-primary" id="newThreadBtn2">${t(T.forum.newThread)}</button>
      </div>` : threads.map(threadRowHTML).join('')}
  </div></div>`;
}

function threadRowHTML(th) {
  const likes = (th.likedBy || []).length;
  const snippet = th.body.split('\n').slice(0, 2).join(' ').slice(0, 240);
  return `<div class="thread-row" data-go="/thread/${th.id}">
    <div class="body">
      <div class="cat">${esc(catLabel(th.category))}</div>
      <h3>${esc(th.title)}</h3>
      <div class="snippet">${esc(snippet)}</div>
      <div class="meta">${t(T.forum.by)} <strong>${esc(th.author)}</strong> · ${timeAgo(th.createdAt)}</div>
    </div>
    <div class="right">
      <b>${th.replies.length}</b>
      <span>${t(T.forum.replies)}</span>
      <div class="stat-row">
        <span>♥ ${likes}</span>
      </div>
    </div>
  </div>`;
}

export function wireForumIndex() {
  $('#forumSearch')?.addEventListener('input', e => {
    debounce(() => updateQS({ q: e.target.value }), 300);
  });
  $('#forumSort')?.addEventListener('change', e => updateQS({ sort: e.target.value }));
  $$('.cat-tab').forEach(b => b.addEventListener('click', () => updateQS({ cat: b.dataset.cat })));
  ['#newThreadBtn', '#newThreadBtn2'].forEach(sel => {
    const btn = $(sel);
    if (btn) btn.addEventListener('click', () => {
      if (!state.user) { toast(t(T.forum.signinToPost)); go('/signin?to=newthread'); return; }
      go('/newthread');
    });
  });
}

let _debounceT;
function debounce(fn, ms) { clearTimeout(_debounceT); _debounceT = setTimeout(fn, ms); }

function updateQS(patch) {
  const cur = new URLSearchParams(location.hash.split('?')[1] || '');
  Object.entries(patch).forEach(([k, v]) => {
    if (v === '' || v === 'all' || v === 'recent') cur.delete(k);
    else cur.set(k, v);
  });
  const qs = cur.toString();
  location.hash = '/community' + (qs ? '?' + qs : '');
}

/* ── THREAD DETAIL ────────────────────────────────── */
export function viewThread(id) {
  const th = findThread(id);
  if (!th) return view404();
  const meEmail = state.user?.email;
  const liked = (th.likedBy || []).includes(meEmail);
  const likes = (th.likedBy || []).length;

  return `<div class="page-narrow thread-detail">
    <div class="crumbs">
      <a data-go="/">${t(T.brand)}</a><span>›</span>
      <a data-go="/community">${t(T.nav.community)}</a><span>›</span>
      ${esc(catLabel(th.category))}
    </div>

    <div style="margin-bottom:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
      <span style="font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);font-weight:700;">${esc(catLabel(th.category))}</span>
    </div>
    <h1>${esc(th.title)}</h1>
    <div class="author-meta">
      ${avatarHTML(th.author)}
      <div><strong>${esc(th.author)}</strong> · ${timeAgo(th.createdAt)}</div>
      ${meEmail && meEmail === th.authorEmail ? `<button class="btn btn-outline btn-sm" id="deleteThreadBtn" style="margin-left:auto;">${t({en:'Delete', zh:'删除'})}</button>` : ''}
    </div>

    <div class="body-text">${esc(th.body)}</div>

    <div class="like-row">
      <button class="like-btn ${liked ? 'liked' : ''}" id="likeThreadBtn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span>${likes}</span> <span style="opacity:.7;">${t(T.forum.likes)}</span>
      </button>
      <span style="font-size:13px;color:var(--muted);">${th.replies.length} ${t(T.forum.replies)}</span>
    </div>

    <h3 class="replies-title">${t({en:'Replies', zh:'回复'})}</h3>
    ${th.replies.length === 0 ? `
      <p style="color:var(--muted);font-size:14px;padding:20px 0;">${t({en:'No replies yet — be the first to chime in.', zh:'尚无回复——欢迎抢沙发。'})}</p>
    ` : th.replies.map(r => replyHTML(r, th.id, meEmail)).join('')}

    ${state.user ? `
      <div class="reply-form">
        <textarea id="replyText" placeholder="${t(T.forum.yourReply)}" rows="4"></textarea>
        <div class="reply-form-actions">
          <span style="font-size:12px;color:var(--muted);">${t({en:'Posting as', zh:'发布身份：'})} <strong style="color:var(--ink);">${esc(state.user.name)}</strong></span>
          <button class="btn btn-primary btn-sm" id="postReplyBtn">${t(T.forum.postReply)} <span class="arrow">→</span></button>
        </div>
      </div>
    ` : `
      <div class="signin-prompt">
        ${t(T.forum.signinToReply)} <a data-go="/signin">${t(T.signin.btn)}</a>
      </div>
    `}

    <div style="margin-top:40px;">
      <button class="btn btn-outline btn-sm" data-go="/community">← ${t(T.forum.backToForum)}</button>
    </div>
  </div>`;
}

function replyHTML(r, threadId, meEmail) {
  const liked = (r.likedBy || []).includes(meEmail);
  const likes = (r.likedBy || []).length;
  return `<div class="reply">
    <div class="reply-head">
      ${avatarHTML(r.author)}
      <div><strong>${esc(r.author)}</strong> · ${timeAgo(r.createdAt)}</div>
    </div>
    <div class="reply-body">${esc(r.body)}</div>
    <button class="like-btn ${liked ? 'liked' : ''}" data-like-reply="${r.id}" data-thread="${threadId}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <span>${likes}</span>
    </button>
  </div>`;
}

export function wireThread(id) {
  const th = findThread(id);
  if (!th) return;

  // Thread like
  $('#likeThreadBtn')?.addEventListener('click', () => {
    if (!state.user) { toast(t(T.forum.signinToReply)); go('/signin'); return; }
    toggleLike(th.id, null, state.user.email);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  // Reply likes
  $$('[data-like-reply]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!state.user) { toast(t(T.forum.signinToReply)); go('/signin'); return; }
      toggleLike(btn.dataset.thread, btn.dataset.likeReply, state.user.email);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  });

  // Delete thread (author only)
  $('#deleteThreadBtn')?.addEventListener('click', () => {
    if (confirm(t(T.forum.confirmDelete))) {
      deleteThread(th.id);
      toast(t(T.forum.deleted));
      go('/community');
    }
  });

  // Post reply
  $('#postReplyBtn')?.addEventListener('click', () => {
    const body = $('#replyText').value.trim();
    if (!body) return;
    addReply(th.id, {
      id: 'r_' + Date.now().toString(36),
      author: state.user.name,
      authorEmail: state.user.email,
      body,
      createdAt: new Date().toISOString(),
      likedBy: []
    });
    toast(state.lang === 'zh' ? '回复已发布' : 'Reply posted');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
}

/* ── NEW THREAD ───────────────────────────────────── */
export function viewNewThread() {
  if (!state.user) { go('/signin?to=newthread'); return ''; }
  return `<div class="page-narrow">
    <div class="crumbs">
      <a data-go="/">${t(T.brand)}</a><span>›</span>
      <a data-go="/community">${t(T.nav.community)}</a><span>›</span>
      ${t(T.forum.newThread)}
    </div>
    <div class="form-card wide">
      <h2>${t(T.forum.newThread)}</h2>
      <p class="sub">${t({en:'Posting as', zh:'发布身份：'})} <strong style="color:var(--ink);">${esc(state.user.name)}</strong></p>
      <form id="newThreadForm">
        <div class="field">
          <label>${t(T.forum.category)}</label>
          <select id="ntCat">
            ${categories.map(c => `<option value="${c.id}">${esc(t(c.label))}</option>`).join('')}
          </select>
        </div>
        <div class="field"><label>${t(T.forum.threadTitle)}</label><input id="ntTitle" required maxlength="160"></div>
        <div class="field"><label>${t({en:'Body', zh:'正文'})}</label><textarea id="ntBody" required rows="10" placeholder="${t(T.forum.threadBody)}"></textarea></div>
        <div style="display:flex;gap:12px;justify-content:flex-end;">
          <button type="button" class="btn btn-outline btn-sm" data-go="/community">${t(T.forum.cancel)}</button>
          <button type="submit" class="btn btn-primary btn-sm">${t(T.forum.publish)} <span class="arrow">→</span></button>
        </div>
      </form>
    </div>
  </div>`;
}

export function wireNewThread() {
  const form = $('#newThreadForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = $('#ntTitle').value.trim();
    const body  = $('#ntBody').value.trim();
    const cat   = $('#ntCat').value;
    if (!title || !body) return;
    const thread = {
      id: 't_' + Date.now().toString(36),
      category: cat,
      title, body,
      author: state.user.name,
      authorEmail: state.user.email,
      createdAt: new Date().toISOString(),
      likedBy: [],
      replies: []
    };
    addThread(thread);
    toast(state.lang === 'zh' ? '话题已发布' : 'Thread published');
    go('/thread/' + thread.id);
  });
}
