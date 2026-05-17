/* ──────────────────────────────────────────────────
   destination detail view
   ────────────────────────────────────────────────── */
import { T, t } from '../i18n.js';
import { esc } from '../ui.js';
import { destinations } from '../data/destinations.js';
import { destCardHTML } from './home.js';
import { view404 } from './misc.js';

export function viewDestination(slug) {
  const d = destinations[slug];
  if (!d) return view404();
  const related = (d.related || []).map(rs => destCardHTML(rs, 'span-4 tall')).join('');

  return `
  <div class="dest-hero" style="background-image:url('${d.hero}')">
    <div class="container">
      <div class="crumbs"><a data-go="/">${t(T.nav.destinations)}</a><span>›</span>${esc(t(d.name))}</div>
      <div class="num">${d.num}</div>
      <h1>${esc(t(d.name))}</h1>
      <div class="region">${esc(t(d.region))}</div>
    </div>
  </div>
  <div class="container dest-body">
    <div>
      <h2>${t({en:'Overview', zh:'综述'})}</h2>
      <p>${esc(t(d.overview))}</p>

      <h3>${t({en:'Must-see', zh:'必看'})}</h3>
      <ol class="musts">${d.musts.map((m, i) => `
        <li>
          <div class="num">${String(i+1).padStart(2,'0')}</div>
          <div><h4>${esc(t(m.title))}</h4><p>${esc(t(m.body))}</p></div>
        </li>`).join('')}
      </ol>

      <h3>${t({en:'Sample Itinerary', zh:'示范行程'})}</h3>
      <div class="itin">${d.itinerary.map(day => `
        <div class="day">
          <div class="day-title">${esc(t(day.day))}</div>
          <div class="slot"><strong>${t({en:'Morning', zh:'上午'})}</strong><span>${esc(t(day.morning))}</span></div>
          <div class="slot"><strong>${t({en:'Afternoon', zh:'下午'})}</strong><span>${esc(t(day.afternoon))}</span></div>
          <div class="slot"><strong>${t({en:'Evening', zh:'夜晚'})}</strong><span>${esc(t(day.evening))}</span></div>
        </div>`).join('')}</div>

      <h3>${t({en:'Gallery', zh:'图库'})}</h3>
      <div class="gallery">${d.gallery.map(g => `<img src="${g}" alt="" loading="lazy"/>`).join('')}</div>

      <h3>${t({en:'A Practical Tip', zh:'实用建议'})}</h3>
      <p>${esc(t(d.tips))}</p>
    </div>
    <aside>
      <div class="sidecard">
        <h4>${t({en:'At a glance', zh:'要点速览'})}</h4>
        <h5>${esc(t(d.name))}</h5>
        <dl>
          <dt>${t({en:'Region', zh:'所在地区'})}</dt><dd>${esc(t(d.region))}</dd>
          <dt>${t({en:'Best time', zh:'最佳时节'})}</dt><dd>${esc(t(d.bestTime))}</dd>
          <dt>${t({en:'Trip length', zh:'建议时长'})}</dt><dd>${esc(t(d.duration))}</dd>
          <dt>${t({en:'Difficulty', zh:'体力强度'})}</dt><dd>${esc(t(d.difficulty))}</dd>
        </dl>
        <button class="btn btn-primary btn-block btn-sm" data-go="/plan">${t({en:'Plan This Trip', zh:'规划此行'})} <span class="arrow">→</span></button>
        <button class="btn btn-outline btn-block btn-sm" style="margin-top:10px;" data-go="/store">${t({en:'Shop Souvenirs', zh:'选购纪念品'})}</button>
      </div>
    </aside>
  </div>
  <section class="related">
    <div class="container">
      <div class="section-head reveal" style="margin-bottom:0;">
        <div class="eyebrow">${t({en:'You may also like', zh:'相关推荐'})}</div>
      </div>
      <div class="dest-grid related-grid">${related}</div>
    </div>
  </section>`;
}
