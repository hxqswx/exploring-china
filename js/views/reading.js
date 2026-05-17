/* ──────────────────────────────────────────────────
   reading community — book sharing & reviews
   ────────────────────────────────────────────────── */
import { state, persist } from '../state.js';
import { t } from '../i18n.js';
import { $, $$, esc, go, toast, timeAgo, avatarHTML } from '../ui.js';

// canonical reading list (id links to products where available)
const BOOKS = [
  {
    id: 'river-town',
    productId: 'river-town',
    title: {en:'River Town', zh:'江城'},
    author: 'Peter Hessler',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80',
    about: {en:'Two years teaching English in a remote Yangtze town — the definitive foreign-written account of China\'s interior.', zh:'在长江边小城执教两年——外国人书写中国内陆最权威的著作。'}
  },
  {
    id: 'wild-swans',
    productId: 'wild-swans',
    title: {en:'Wild Swans', zh:'鸿'},
    author: 'Jung Chang',
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80',
    about: {en:'Three generations of Chinese women through the 20th century. One of the best-selling memoirs ever written.', zh:'二十世纪中国三代女性的命运。出版史上最畅销的回忆录之一。'}
  },
  {
    id: 'oracle-bones',
    productId: null,
    title: {en:'Oracle Bones', zh:'甲骨文'},
    author: 'Peter Hessler',
    img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    about: {en:'China at the millennium\'s turn — migrant workers, ancient scripts, and a journalist\'s education in complexity.', zh:'世纪之交的中国——民工、古文字与一名记者对复杂性的认识。'}
  },
  {
    id: 'silk-roads',
    productId: null,
    title: {en:'The Silk Roads', zh:'丝绸之路'},
    author: 'Peter Frankopan',
    img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80',
    about: {en:'World history retold from the perspective of the roads connecting China to the West.', zh:'以连接中国与西方的道路为视角，重新讲述世界历史。'}
  },
  {
    id: 'iron-rooster',
    productId: null,
    title: {en:'Riding the Iron Rooster', zh:'铁公鸡游记'},
    author: 'Paul Theroux',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80',
    about: {en:'London to Tokyo by train through China in 1986 — honest, uncomfortable, indispensable.', zh:'1986 年火车从伦敦到东京，途经中国——诚实、不安、不可或缺。'}
  },
  {
    id: 'beijing-field-guide',
    productId: 'beijing-field-guide',
    title: {en:'A Field Guide to Old Beijing', zh:'老北京漫步志'},
    author: 'Editorial Team',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    about: {en:'200 pages of hutong walks, tea houses, and forgotten temples — bilingual.', zh:'两百页的胡同漫步、茶馆与被遗忘的寺庙——中英双语。'}
  }
];

function starsHTML(rating, interactive = false, bookId = '') {
  return [1,2,3,4,5].map(n => `
    <span class="star ${rating >= n ? 'lit' : ''}"
          ${interactive ? `data-star="${n}" data-book="${bookId}"` : ''}
          style="cursor:${interactive ? 'pointer' : 'default'}">★</span>
  `).join('');
}

function avgRating(bookId) {
  const reviews = (state.bookReviews || []).filter(r => r.bookId === bookId);
  if (!reviews.length) return 0;
  return reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
}

function reviewsForBook(bookId) {
  return (state.bookReviews || []).filter(r => r.bookId === bookId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function reviewHTML(r) {
  return `<div class="book-review">
    <div class="book-review-head">
      ${avatarHTML(r.author)}
      <div>
        <strong>${esc(r.author)}</strong>
        <div class="stars-row">${starsHTML(r.rating)}</div>
      </div>
      <span class="rev-time">${timeAgo(r.createdAt)}</span>
    </div>
    <div class="book-review-body">${esc(r.text)}</div>
  </div>`;
}

export function viewReading() {
  return `<div class="page">
    <div class="container">
      <div class="crumbs"><a data-go="/">Exploring China</a><span>›</span>${t({en:'Reading', zh:'书单'})}</div>
      <div class="section-head" style="margin-bottom:60px;">
        <div class="eyebrow">${t({en:'Reading While You Travel', zh:'旅途书单'})}</div>
        <h2 class="title">${t({en:'Books our editors <em>love</em>.', zh:'编辑最爱的<em>旅途书籍</em>。'})}</h2>
        <p>${t({en:'Read one. Share what you thought. Hear what others discovered.', zh:'选一本读。分享你的感受。听听他人的发现。'})}</p>
      </div>

      ${BOOKS.map(book => {
        const reviews = reviewsForBook(book.id);
        const avg = avgRating(book.id);
        const myReview = state.user ? reviews.find(r => r.authorEmail === state.user.email) : null;

        return `<div class="reading-book-card" id="book-${book.id}">
          <div class="reading-book-header">
            <div class="reading-book-cover" style="background-image:url('${book.img}')"></div>
            <div class="reading-book-info">
              <div class="book-cat">${t({en:'Reading List', zh:'推荐书目'})}</div>
              <h3>${esc(t(book.title))}</h3>
              <div class="book-author-line">— ${esc(book.author)}</div>
              <p>${esc(t(book.about))}</p>
              <div class="reading-book-meta">
                <div class="stars-display">
                  ${avg > 0
                    ? `${starsHTML(Math.round(avg))} <span class="avg-num">${avg.toFixed(1)}</span> <span class="rev-count">(${reviews.length} ${t({en:'reviews', zh:'条评价'})})</span>`
                    : `<span style="color:var(--muted);font-size:13px;">${t({en:'No reviews yet', zh:'暂无评价'})}</span>`
                  }
                </div>
                ${book.productId ? `<button class="btn btn-outline btn-sm" data-go="/store">${t({en:'Buy in Store', zh:'前往商店购买'})}</button>` : ''}
              </div>
            </div>
          </div>

          ${reviews.length > 0 ? `<div class="reviews-list">${reviews.slice(0,5).map(reviewHTML).join('')}</div>` : ''}

          ${state.user && !myReview ? `
            <div class="write-review-area" id="review-area-${book.id}">
              <div class="write-review-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                ${t({en:'Share your thoughts', zh:'分享你的读后感'})}
              </div>
              <div class="stars-interactive" data-book="${book.id}">
                ${t({en:'Your rating:', zh:'你的评分：'})}
                ${starsHTML(0, true, book.id)}
              </div>
              <textarea class="review-textarea" id="review-text-${book.id}"
                placeholder="${t({en:'What did you find in this book? What surprised you? Would you bring it on a train through China?', zh:'这本书带给你什么？有什么出乎意料？你会带着它坐上穿越中国的火车吗？'})}"></textarea>
              <div style="display:flex;justify-content:flex-end;margin-top:10px;">
                <button class="btn btn-primary btn-sm submit-review-btn" data-book="${book.id}">
                  ${t({en:'Post review', zh:'发布评价'})} <span class="arrow">→</span>
                </button>
              </div>
            </div>
          ` : state.user && myReview ? `
            <div class="my-review-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              ${t({en:'You reviewed this book.', zh:'你已评价过这本书。'})}
            </div>
          ` : `
            <div class="signin-prompt">
              ${t({en:'Sign in to share your review.', zh:'登录后即可分享读后感。'})}
              <a data-go="/signin">${t({en:'Sign in', zh:'登录'})}</a>
            </div>
          `}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

export function wireReading() {
  // rating star selection (with hover preview)
  const selectedRatings = {};

  $$('.stars-interactive').forEach(container => {
    const bookId = container.dataset.book;
    const stars = container.querySelectorAll('.star[data-star]');

    // hover preview
    stars.forEach((star, i) => {
      star.addEventListener('mouseover', () => {
        stars.forEach((s, j) => s.classList.toggle('lit', j <= i));
      });
    });

    // reset preview on mouse leave (restore to selected or 0)
    container.addEventListener('mouseleave', () => {
      const val = selectedRatings[bookId] || 0;
      stars.forEach((s, j) => s.classList.toggle('lit', j < val));
    });

    // click to select
    stars.forEach((star, i) => {
      star.addEventListener('click', () => {
        selectedRatings[bookId] = parseInt(star.dataset.star, 10);
        stars.forEach((s, j) => s.classList.toggle('lit', j <= i));
      });
    });
  });

  // submit review
  $$('.submit-review-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bookId = btn.dataset.book;
      const rating = selectedRatings[bookId] || 0;
      const text = $(`#review-text-${bookId}`)?.value.trim() || '';
      if (!rating) {
        toast(t({en:'Please select a star rating.', zh:'请先选择星级评分。'}));
        return;
      }
      if (!text) {
        toast(t({en:'Please write a short review.', zh:'请写几句评价。'}));
        return;
      }
      if (!state.bookReviews) state.bookReviews = [];
      state.bookReviews.push({
        id: 'rv_' + Date.now().toString(36),
        bookId,
        author: state.user.name,
        authorEmail: state.user.email,
        rating,
        text,
        createdAt: new Date().toISOString()
      });
      persist();
      toast(t({en:'Review posted — thank you!', zh:'评价已发布，谢谢！'}));
      // re-render the page
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  });
}
