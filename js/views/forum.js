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
  const rawBody = th.richText
    ? (new DOMParser().parseFromString(th.body, 'text/html').body.textContent || '')
    : th.body;
  const snippet = rawBody.split('\n').slice(0, 2).join(' ').slice(0, 240);
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

    <div class="body-text${th.richText ? ' rich-text' : ''}">${th.richText ? th.body : esc(th.body)}</div>

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
function rteToolbarHTML() {
  return `<div class="rte-toolbar" id="rteToolbar">
    <button type="button" class="rte-btn" data-cmd="bold"        title="Bold"><strong>B</strong></button>
    <button type="button" class="rte-btn" data-cmd="italic"      title="Italic"><em>I</em></button>
    <button type="button" class="rte-btn" data-cmd="underline"   title="Underline"><span style="text-decoration:underline">U</span></button>
    <span class="rte-sep"></span>
    <button type="button" class="rte-btn" data-cmd="insertUnorderedList" title="Bullet list">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>
    </button>
    <button type="button" class="rte-btn" data-cmd="insertOrderedList" title="Numbered list">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="2" y="8" fill="currentColor" stroke="none" font-size="7">1</text><text x="2" y="14" fill="currentColor" stroke="none" font-size="7">2</text><text x="2" y="20" fill="currentColor" stroke="none" font-size="7">3</text></svg>
    </button>
    <button type="button" class="rte-btn" data-cmd="blockquote"  title="Block quote">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
    </button>
    <span class="rte-sep"></span>
    <button type="button" class="rte-btn" id="rteLinkBtn" title="Add link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    </button>
    <button type="button" class="rte-btn" id="rteImgBtn" title="Upload image">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    </button>
    <input type="file" id="rteImgInput" accept="image/*" style="display:none">
    <span class="rte-sep"></span>
    <span class="rte-hint">${t({en:'Select text then click a style', zh:'选中文字后点击样式'})}</span>
  </div>`;
}

// ── image compression ──────────────────────────────────────────────────────
function compressImage(file, maxDim = 900, quality = 0.72) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width: w, height: h } = img;
      if (w > h) { if (w > maxDim) { h = Math.round(h / w * maxDim); w = maxDim; } }
      else       { if (h > maxDim) { w = Math.round(w / h * maxDim); h = maxDim; } }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = url;
  });
}

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
        <div class="field">
          <label>${t({en:'Body', zh:'正文'})}</label>
          ${rteToolbarHTML()}
          <div id="ntBody" class="rte-editor" contenteditable="true"
               data-placeholder="${t(T.forum.threadBody)}"></div>
        </div>
        <div class="img-preview-area" id="imgPreviewArea"></div>
        <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:8px;">
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

  const editor = $('#ntBody');
  const imgInput = $('#rteImgInput');

  // ── toolbar commands ──
  $$('.rte-btn[data-cmd]').forEach(btn => {
    btn.addEventListener('mousedown', e => {
      e.preventDefault(); // keep focus in editor
      const cmd = btn.dataset.cmd;
      if (cmd === 'blockquote') {
        document.execCommand('formatBlock', false, 'blockquote');
      } else {
        document.execCommand(cmd, false, null);
      }
      editor.focus();
    });
  });

  // ── link ──
  $('#rteLinkBtn')?.addEventListener('mousedown', e => {
    e.preventDefault();
    const url = prompt(t({en:'Enter URL:', zh:'请输入链接地址：'}));
    if (url) {
      document.execCommand('createLink', false, url);
      // open in new tab
      editor.querySelectorAll('a:not([target])').forEach(a => a.target = '_blank');
    }
    editor.focus();
  });

  // ── image upload ──
  $('#rteImgBtn')?.addEventListener('click', () => imgInput?.click());

  imgInput?.addEventListener('change', async () => {
    const file = imgInput.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast(t({en:'Image must be under 5 MB', zh:'图片需小于 5 MB'}));
      return;
    }
    const dataUrl = await compressImage(file, 900, 0.72);
    // insert at cursor in editor
    editor.focus();
    document.execCommand('insertHTML', false,
      `<img src="${dataUrl}" class="rte-img" alt="image">`);
    imgInput.value = '';
  });

  // placeholder behaviour
  editor.addEventListener('focus',  () => editor.classList.add('focused'));
  editor.addEventListener('blur',   () => editor.classList.remove('focused'));

  // form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = $('#ntTitle').value.trim();
    const body  = editor.innerHTML.trim();
    const cat   = $('#ntCat').value;
    if (!title || !body || body === '<br>') {
      toast(t({en:'Please fill in title and body.', zh:'请填写标题和正文。'}));
      return;
    }
    const thread = {
      id: 't_' + Date.now().toString(36),
      category: cat,
      title, body,
      richText: true,
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
