/* ──────────────────────────────────────────────────
   home view
   ────────────────────────────────────────────────── */
import { state, addToCart, persist } from '../state.js';
import { T, t } from '../i18n.js';
import { esc, fmt, $, toast } from '../ui.js';
import { destinations } from '../data/destinations.js';
import { products } from '../data/products.js';
import { updateCartBadge } from './shell.js';

export function destCardHTML(id, classes) {
  const d = destinations[id];
  return `<a class="dest-card ${classes} reveal" data-go="/destination/${id}">
    <div class="photo" style="background-image:url('${d.hero}')"></div>
    <div class="meta">
      <div class="num">${d.num}</div>
      <h3>${esc(t(d.name))}</h3>
      <div class="region">${esc(t(d.region))}</div>
    </div>
  </a>`;
}

export function productCardHTML(id) {
  const p = products[id];
  const inCart = state.cart.some(c => c.id === id);
  return `<div class="product reveal">
    <div class="product-img" style="background-image:url('${p.img}')" data-go="/store"></div>
    <div class="product-body">
      <div class="cat">${esc(t(p.cat))}</div>
      <h4>${esc(t(p.name))}</h4>
      <p class="desc">${esc(t(p.desc))}</p>
      <div class="price">
        <span>${fmt(p.price)}</span>
        <button class="${inCart ? 'added' : ''}" data-add="${id}">${inCart ? t({en:'Added ✓', zh:'已加入 ✓'}) : t({en:'Add', zh:'加入'})}</button>
      </div>
    </div>
  </div>`;
}

export function viewHome() {
  return `
  <header class="hero" id="top">
    <div class="hero-bg"></div>
    <div class="container hero-inner">
      <div class="hero-eyebrow">${t({en:'A Journey Through the Middle Kingdom', zh:'穿越中华大地的旅程'})}</div>
      <h1>${state.lang === 'en' ? 'Discover the <em>beauty</em> of China.' : '探寻<em>千年之美</em>。'}</h1>
      <p class="lede">${t({en:'Curated destinations, considered itineraries, and stories that bring five thousand years of culture, mountains, and rivers to life. Begin your journey here.', zh:'精选目的地、用心规划的行程，以及让五千年文化、山川河流跃然眼前的故事。从这里，开启你的旅程。'})}</p>
      <div class="hero-cta">
        <button class="btn btn-primary" data-scroll="destinations">${t({en:'Explore Destinations', zh:'探索目的地'})} <span class="arrow">→</span></button>
        <button class="btn btn-ghost" data-go="/plan">${t({en:'Plan Your Trip', zh:'规划行程'})}</button>
      </div>
    </div>
    <div class="hero-scroll">${t({en:'Scroll', zh:'向下浏览'})}</div>
  </header>

  <section id="destinations">
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">${t({en:'Featured Destinations', zh:'精选目的地'})}</div>
        <h2 class="title">${state.lang === 'en' ? 'Where the <em>ancient</em> meets <em>endless</em>.' : '<em>古老与无垠</em>相遇之处。'}</h2>
        <p>${t({en:'Six landscapes — from imperial courtyards to karst rivers — chosen for their power to alter the traveler.', zh:'六处风景——从皇家庭院到喀斯特江河——每一处都足以改变旅人的心境。'})}</p>
      </div>
      <div class="dest-grid">
        ${destCardHTML('great-wall', 'span-8 wide')}
        ${destCardHTML('forbidden-city', 'span-4 tall')}
        ${destCardHTML('li-river', 'span-4 tall')}
        ${destCardHTML('zhangjiajie', 'span-4 tall')}
        ${destCardHTML('lijiang', 'span-4 tall')}
        ${destCardHTML('xian', 'span-8 wide')}
      </div>
    </div>
  </section>

  <section class="editorial" id="guide">
    <div class="container">
      <div class="editorial-grid">
        <div class="editorial-img reveal"></div>
        <div class="editorial-body reveal">
          <div class="eyebrow">${t({en:'The Guide', zh:'深度导览'})}</div>
          <h2 class="title">${state.lang === 'en' ? 'Travel <em>slowly</em>. See <em>deeply</em>.' : '慢行细赏，<em>目之所及，心之所至</em>。'}</h2>
          <p class="first">${t({en:'China is not a country one visits — it is a country one returns to. From the painted alleys of Pingyao to the quiet tea houses of Chengdu, every province carries its own dialect, kitchen, and rhythm of life. Our role, as your guide, is to help you arrive prepared and depart changed.', zh:'中国并非一次造访便能穷尽的国度——它是一个让人不断归来的地方。从平遥的彩绘小巷到成都的清茶馆，每一个省份都有自己的方言、菜肴与生活节奏。作为你的向导，我们希望让你启程时心中有数，归来时心有所变。'})}</p>
          <div class="pull-quote">${t({en:'"The best journeys move not across distance, but inward — toward a different way of seeing."', zh:'"最好的旅程不是越过远方，而是走向内心，去往一种不同的看见方式。"'})}</div>
          <p>${t({en:'We write itineraries grounded in local knowledge: which season the cormorant fishermen still light their lanterns, which family in Lijiang still hammers copper teapots, which hutong in Beijing serves jianbing the way it was made in the eighties.', zh:'我们的行程根植于在地的知识：漓江上鸬鹚渔夫还在哪个季节点起灯火，丽江哪户人家仍在手工敲打铜壶，北京哪条胡同的煎饼还守着八十年代的做法。'})}</p>
          <button class="btn btn-outline btn-sm" data-go="/guide/about">${t({en:'Read more about us', zh:'了解我们'})} <span class="arrow">→</span></button>
          <div class="signature">${t({en:'Our Editorial Team · Since 2019', zh:'编辑团队 · 自 2019 年'})}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="fireworks" id="fireworks">
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">${t({en:'Fireworks & Celebration', zh:'烟花盛景'})}</div>
        <h2 class="title">${state.lang === 'en' ? 'The <em>sky</em> as <em>canvas</em>.' : '<em>夜空为纸，烟花为墨</em>。'}</h2>
        <p>${t({en:'Fireworks were born in China more than a thousand years ago. Every spring, the cities light up in colors no painter has matched — and we are there to share the moment with you.', zh:'烟花诞生于一千多年前的中国。每逢春日，城市被点燃成画家也未曾调出的色彩——我们与你一同，置身其间。'})}</p>
      </div>
      <div class="video-frame reveal">
        <video autoplay muted loop playsinline poster="https://images.unsplash.com/photo-1546552768-9e3a94b38a59?auto=format&fit=crop&w=1600&q=80">
          <source src="https://videos.pexels.com/video-files/34767741/14740035_640_360_30fps.mp4" type="video/mp4">
        </video>
      </div>
      <div class="fireworks-features">
        <div class="ff-item reveal"><div class="num">01</div><h4>${t({en:'A Thousand Years of Sparks', zh:'千年火光'})}</h4><p>${t({en:'Trace fireworks from Tang-dynasty bamboo crackers to today\'s symphonic displays in Liuyang.', zh:'从唐代爆竹到今日浏阳的烟花交响乐，追溯千年火光的源流。'})}</p></div>
        <div class="ff-item reveal"><div class="num">02</div><h4>${t({en:'Festival Calendar', zh:'节庆日历'})}</h4><p>${t({en:'Spring Festival, Lantern Festival, Mid-Autumn — when, where, and how to witness each in full.', zh:'春节、元宵、中秋——何时、何地，以及如何尽情体验每一场盛会。'})}</p></div>
        <div class="ff-item reveal"><div class="num">03</div><h4>${t({en:'The Makers', zh:'匠人之手'})}</h4><p>${t({en:'Meet the artisans of Liuyang and Pingxiang, where every shell is still rolled by hand.', zh:'走访浏阳与萍乡的匠人，每一颗烟花，至今仍是手工卷制。'})}</p></div>
      </div>
    </div>
  </section>

  <section id="plan">
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">${t({en:'Plan a Trip', zh:'行程规划'})}</div>
        <h2 class="title">${state.lang === 'en' ? 'From <em>first thought</em>, to <em>first step</em>.' : '<em>从灵感初现，到启程之时</em>。'}</h2>
        <p>${t({en:'Three places to begin — whether you\'re choosing a season, mapping a route, or just learning your first words of Mandarin.', zh:'三个开始的方式——无论你是在挑选季节、规划路线，还是刚刚学会第一句中文。'})}</p>
      </div>
      <div class="plan-grid">
        <div class="plan-card reveal" data-go="/guide/when-to-go"><div class="icon">時</div><h4>${t({en:'When to Go', zh:'最佳时节'})}</h4><p>${t({en:'A month-by-month guide to weather, festivals, and crowd levels across China\'s diverse regions.', zh:'按月精选的旅行指南：天气、节庆、人流。'})}</p><span class="more">${t({en:'Read the Guide', zh:'阅读指南'})} →</span></div>
        <div class="plan-card reveal" data-go="/guide/sample-routes"><div class="icon">路</div><h4>${t({en:'Sample Routes', zh:'行程范例'})}</h4><p>${t({en:'Six tested itineraries: Classic Triangle, Silk Road, Yangtze, Karst South, Tibetan Plateau, Coastal Loop.', zh:'六条经典路线：传统三角、丝绸之路、长江流域、喀斯特之南、青藏高原、沿海环线。'})}</p><span class="more">${t({en:'View Routes', zh:'查看路线'})} →</span></div>
        <div class="plan-card reveal" data-go="/guide/essential-phrases"><div class="icon">語</div><h4>${t({en:'Essential Phrases', zh:'实用短语'})}</h4><p>${t({en:'A traveler\'s vocabulary — greetings, ordering food, asking directions — with pinyin and tones.', zh:'旅人词汇——问候、点餐、问路——附拼音与声调。'})}</p><span class="more">${t({en:'Start Learning', zh:'开始学习'})} →</span></div>
      </div>
    </div>
  </section>

  <section class="store-bg" id="store">
    <div class="container">
      <div class="section-head reveal">
        <div class="eyebrow">${t({en:'The Store', zh:'精选商店'})}</div>
        <h2 class="title">${state.lang === 'en' ? 'A <em>small collection</em>, carefully <em>chosen</em>.' : '<em>精选小品，慢工细作</em>。'}</h2>
        <p>${t({en:'Objects we have found in our travels — tea, porcelain, prints, books — all sourced from artisans we know personally.', zh:'我们在旅途中遇见的器物：茶、瓷、版画、书籍——皆来自我们熟识的手艺人。'})}</p>
      </div>
      <div class="store-grid">${Object.keys(products).map(id => productCardHTML(id)).join('')}</div>
    </div>
  </section>

  <section class="community" id="community">
    <div class="container">
      <div class="inner reveal">
        <div class="eyebrow">${t({en:'The Community', zh:'旅行社区'})}</div>
        <h2 class="title">${state.lang === 'en' ? 'Travel <em>together</em>, even when <em>apart</em>.' : '<em>同行，纵使天涯</em>。'}</h2>
        <p>${t({en:'A working forum: trip reports, route advice, photo threads. Real travelers, real questions.', zh:'真实的论坛：游记、路线建议、摄影专区。真实的旅人，真实的提问。'})}</p>
        <div style="margin-top:36px;"><button class="btn btn-primary" data-go="/community">${t({en:'Browse the Forum', zh:'进入论坛'})} <span class="arrow">→</span></button></div>
        <div class="stats">
          <div class="stat"><div class="num">${state.threads.length}</div><div class="label">${t({en:'Threads', zh:'话题'})}</div></div>
          <div class="stat"><div class="num">${state.threads.reduce((a,t)=>a + t.replies.length, 0)}</div><div class="label">${t({en:'Replies', zh:'回复'})}</div></div>
          <div class="stat"><div class="num">34</div><div class="label">${t({en:'Provinces Covered', zh:'覆盖省份'})}</div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="newsletter">
    <div class="container nl-inner reveal">
      <div>
        <h3>${state.lang === 'en' ? 'Letters from the road. <em>Once a month.</em>' : '<em>每月一封</em>，来自旅途的书信。'}</h3>
        <p>${t({en:'A single email each month — one essay, one destination, one recipe. No more, no less.', zh:'每月仅一封邮件——一篇散文、一个目的地、一份食谱。不多不少。'})}</p>
      </div>
      <form class="nl-form" id="nlForm">
        <input type="email" id="nlInput" placeholder="${t({en:'your@email.com', zh:'your@email.com'})}" required>
        <button type="submit">${t({en:'Subscribe', zh:'订阅'})}</button>
      </form>
    </div>
  </section>`;
}

/* Wire up handlers specific to the home view */
export function wireHome() {
  // Scroll to a section anchor inside home
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', () => {
      const target = document.getElementById(el.dataset.scroll);
      if (target) target.scrollIntoView({behavior:'smooth'});
    });
  });

  // Add-to-cart on product cards
  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.add);
      updateCartBadge();
      toast(state.lang === 'zh' ? '已加入购物车' : 'Added to cart');
      btn.classList.add('added');
      btn.textContent = state.lang === 'zh' ? '已加入 ✓' : 'Added ✓';
    });
  });

  // Newsletter
  const form = document.getElementById('nlForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('nlInput').value.trim();
      if (email && !state.subs.includes(email)) {
        state.subs.push(email);
        persist();
      }
      toast(state.lang === 'zh' ? '订阅成功，谢谢！' : 'Subscribed — thank you!');
      document.getElementById('nlInput').value = '';
    });
  }
}
