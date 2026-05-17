/* ──────────────────────────────────────────────────
   misc views — plan, fireworks, 404
   ────────────────────────────────────────────────── */
import { state } from '../state.js';
import { T, t } from '../i18n.js';

export function viewPlan() {
  return `<div class="page"><div class="container">
    <div class="crumbs"><a data-go="/">${t(T.brand)}</a><span>›</span>${t(T.nav.plan)}</div>
    <div class="section-head" style="margin-bottom:60px;">
      <div class="eyebrow">${t({en:'Plan a Trip', zh:'行程规划'})}</div>
      <h2 class="title">${state.lang === 'en' ? 'From <em>first thought</em>, to <em>first step</em>.' : '<em>从灵感初现，到启程之时</em>。'}</h2>
      <p>${t({en:'Three guides — pick what you need next. Each is written for travelers who like to know why, not just what.', zh:'三份指南，按需取用。皆献给追问缘由而非仅询事实的旅人。'})}</p>
    </div>
    <div class="plan-grid">
      <div class="plan-card" data-go="/guide/when-to-go"><div class="icon">時</div><h4>${t({en:'When to Go', zh:'最佳时节'})}</h4><p>${t({en:'A month-by-month guide to weather, festivals, and crowd levels.', zh:'按月精选的天气、节庆与人流指南。'})}</p><span class="more">${t({en:'Read', zh:'阅读'})} →</span></div>
      <div class="plan-card" data-go="/guide/sample-routes"><div class="icon">路</div><h4>${t({en:'Sample Routes', zh:'行程范例'})}</h4><p>${t({en:'Six tested itineraries covering most of the country.', zh:'六条久经打磨的路线，涵盖大半个中国。'})}</p><span class="more">${t({en:'Read', zh:'阅读'})} →</span></div>
      <div class="plan-card" data-go="/guide/essential-phrases"><div class="icon">語</div><h4>${t({en:'Essential Phrases', zh:'实用短语'})}</h4><p>${t({en:'Two dozen phrases that will transform every interaction.', zh:'二十余句，让每一次对话都因此不同。'})}</p><span class="more">${t({en:'Read', zh:'阅读'})} →</span></div>
    </div>
  </div></div>`;
}

export function viewFireworks() {
  return `<div class="page" style="padding-top:78px;"><section class="fireworks" style="padding:120px 0;">
    <div class="container">
      <div class="section-head">
        <div class="eyebrow">${t({en:'Fireworks & Celebration', zh:'烟花盛景'})}</div>
        <h2 class="title">${state.lang === 'en' ? 'The <em>sky</em> as <em>canvas</em>.' : '<em>夜空为纸，烟花为墨</em>。'}</h2>
        <p>${t({en:'Fireworks were born in China more than a thousand years ago. Every spring, the cities light up in colors no painter has matched.', zh:'烟花诞生于一千多年前的中国。每逢春日，城市被点燃成画家也未曾调出的色彩。'})}</p>
      </div>
      <div class="video-frame">
        <video autoplay muted loop playsinline poster="https://images.unsplash.com/photo-1546552768-9e3a94b38a59?auto=format&fit=crop&w=1600&q=80">
          <source src="https://videos.pexels.com/video-files/34767741/14740035_640_360_30fps.mp4" type="video/mp4">
        </video>
      </div>
      <div class="fireworks-features">
        <div class="ff-item"><div class="num">01</div><h4>${t({en:'A Thousand Years of Sparks', zh:'千年火光'})}</h4><p>${t({en:'Trace fireworks from Tang-dynasty bamboo crackers to today\'s symphonic displays in Liuyang.', zh:'从唐代爆竹到今日浏阳的烟花交响乐。'})}</p></div>
        <div class="ff-item"><div class="num">02</div><h4>${t({en:'Festival Calendar', zh:'节庆日历'})}</h4><p>${t({en:'Spring Festival, Lantern Festival, Mid-Autumn — when, where, and how to witness each.', zh:'春节、元宵、中秋——何时、何地、如何亲临盛会。'})}</p></div>
        <div class="ff-item"><div class="num">03</div><h4>${t({en:'The Makers', zh:'匠人之手'})}</h4><p>${t({en:'Meet the artisans of Liuyang and Pingxiang, where every shell is still rolled by hand.', zh:'走访浏阳与萍乡的匠人，烟花至今手工卷制。'})}</p></div>
      </div>
      <div style="text-align:center;margin-top:60px;">
        <button class="btn btn-ghost" data-go="/guide/journal">${t({en:'Read more on the makers', zh:'阅读更多匠人故事'})} <span class="arrow">→</span></button>
      </div>
    </div>
  </section></div>`;
}

export function view404() {
  return `<div class="page-narrow" style="text-align:center;">
    <div class="eyebrow">404</div>
    <h2 class="title">${t({en:'Page not found.', zh:'页面不存在。'})}</h2>
    <p style="color:var(--muted);margin:0 0 30px;">${t({en:'The page you are looking for has wandered off the map.', zh:'您要找的页面似乎走失在地图之外。'})}</p>
    <button class="btn btn-primary" data-go="/">${t({en:'Back to home', zh:'返回首页'})} <span class="arrow">→</span></button>
  </div>`;
}
