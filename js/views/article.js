/* ──────────────────────────────────────────────────
   article view — for guide articles and static pages
   ────────────────────────────────────────────────── */
import { T, t } from '../i18n.js';
import { esc } from '../ui.js';
import { articles } from '../data/articles.js';
import { view404 } from './misc.js';

export function viewArticle(slug) {
  const a = articles[slug];
  if (!a) return view404();
  return `<div class="page-narrow article">
    <div class="crumbs">
      <a data-go="/">${t(T.brand)}</a><span>›</span>
      <a data-go="/plan">${t(T.nav.plan)}</a><span>›</span>
      ${esc(t(a.title))}
    </div>
    <h1>${esc(t(a.title))}</h1>
    ${a.by?.en ? `<div class="by">${esc(t(a.by))}</div>` : ''}
    ${a.hero ? `<div class="article-hero" style="background-image:url('${a.hero}')"></div>` : ''}
    ${a.body.map((b, i) => {
      if (b.h) return `<h2>${esc(t(b.h))}</h2>`;
      return `<p class="${i === 0 && !a.hero ? 'first' : ''}">${esc(t(b.p))}</p>`;
    }).join('')}
    <div style="margin-top:60px;padding-top:30px;border-top:1px solid var(--line);">
      <button class="btn btn-outline btn-sm" data-go="/plan">${t({en:'More guides', zh:'更多指南'})} →</button>
    </div>
  </div>`;
}
