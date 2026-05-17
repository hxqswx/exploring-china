/* ──────────────────────────────────────────────────
   auth — sign in, sign up, email verification
   ────────────────────────────────────────────────── */
import { state, persist, hash } from '../state.js';
import { T, t } from '../i18n.js';
import { $, esc, go, gen6, toast } from '../ui.js';
import { sendVerificationCode, isConfigured } from '../email.js';

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/* ── SIGN IN ─────────────────────────────────────── */
export function viewSignin(qs) {
  return `<div class="page-narrow">
    <div class="form-card">
      <h2>${t(T.signin.title)}</h2>
      <p class="sub">${t(T.signin.sub)}</p>
      <form id="signinForm" data-to="${esc(qs.to || '')}">
        <div class="field"><label>${t(T.signin.email)}</label><input type="email" id="siEmail" required></div>
        <div class="field"><label>${t(T.signin.password)}</label><input type="password" id="siPass" required></div>
        <div class="form-msg error" id="siMsg" style="display:none;"></div>
        <button class="btn btn-primary btn-block" type="submit">${t(T.signin.btn)}</button>
      </form>
      <div class="form-foot">${t(T.signin.new)} <a data-go="/signup">${t(T.signin.create)}</a></div>
    </div>
  </div>`;
}

export function wireSignin() {
  const form = $('#signinForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = $('#siEmail').value.trim().toLowerCase();
    const pass = $('#siPass').value;
    const u = state.users[email];
    const msg = $('#siMsg');
    if (!u || u.passwordHash !== hash(pass)) {
      msg.style.display = 'block';
      msg.textContent = t(T.signin.wrong);
      return;
    }
    if (!u.verified) {
      // re-send code and bounce them into verify
      const code = gen6();
      state.pendingSignup = {
        email, name: u.name, passwordHash: u.passwordHash,
        code, codeExpires: Date.now() + CODE_TTL_MS
      };
      persist();
      const res = await sendVerificationCode({ email, name: u.name, code });
      msg.style.display = 'block';
      msg.textContent = t(T.signin.notVerified);
      setTimeout(() => go('/verify?demo=' + (res.sent ? '0' : '1')), 700);
      return;
    }
    state.user = { email, name: u.name };
    persist();
    toast(state.lang === 'zh' ? '欢迎回来！' : 'Welcome back!');
    const to = form.dataset.to;
    go(to === 'checkout' ? '/checkout' : '/account');
  });
}

/* ── SIGN UP — STEP 1 (collect details, send code) ── */
export function viewSignup() {
  return `<div class="page-narrow">
    <div class="form-card">
      <h2>${t(T.signup.title)}</h2>
      <p class="sub">${t(T.signup.sub)}</p>
      <form id="signupForm">
        <div class="field"><label>${t(T.signup.name)}</label><input id="suName" required></div>
        <div class="field"><label>${t(T.signup.email)}</label><input id="suEmail" type="email" required></div>
        <div class="field"><label>${t(T.signup.password)}</label><input id="suPass" type="password" minlength="8" required></div>
        <div class="form-msg error" id="suMsg" style="display:none;"></div>
        <button class="btn btn-primary btn-block" type="submit" id="suBtn">${t(T.signup.btn)}</button>
      </form>
      <div class="form-foot">${t(T.signup.have)} <a data-go="/signin">${t(T.signup.signin)}</a></div>
    </div>
  </div>`;
}

export function wireSignup() {
  const form = $('#signupForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = $('#suName').value.trim();
    const email = $('#suEmail').value.trim().toLowerCase();
    const pass = $('#suPass').value;
    const msg = $('#suMsg');
    const btn = $('#suBtn');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.style.display = 'block'; msg.className = 'form-msg error';
      msg.textContent = t(T.signup.badEmail);
      return;
    }
    if (pass.length < 8) {
      msg.style.display = 'block'; msg.className = 'form-msg error';
      msg.textContent = t(T.signup.short);
      return;
    }
    if (state.users[email] && state.users[email].verified) {
      msg.style.display = 'block'; msg.className = 'form-msg error';
      msg.textContent = t(T.signup.exists);
      return;
    }

    btn.disabled = true;
    btn.textContent = t(T.signup.sending);

    const code = gen6();
    state.pendingSignup = {
      email, name,
      passwordHash: hash(pass),
      code,
      codeExpires: Date.now() + CODE_TTL_MS
    };
    persist();

    const res = await sendVerificationCode({ email, name, code });
    btn.disabled = false;
    btn.textContent = t(T.signup.btn);
    // Route to verify; flag demo mode via querystring so verify view can show banner
    go('/verify?demo=' + (res.sent ? '0' : '1'));
  });
}

/* ── VERIFY EMAIL ─────────────────────────────────── */
export function viewVerify(qs) {
  const p = state.pendingSignup;
  if (!p) { go('/signup'); return ''; }
  const demoMode = qs.demo === '1' || !isConfigured();
  return `<div class="page-narrow">
    <div class="form-card">
      <h2>${t(T.verify.title)}</h2>
      <p class="sub">${t(T.verify.sub)} <strong>${esc(p.email)}</strong>.</p>

      ${demoMode ? `<div class="form-msg info" style="display:block;margin-bottom:20px;">
        <div style="margin-bottom:6px;">${t(T.verify.demoBanner)}</div>
        <div style="font-family:var(--serif);font-size:32px;letter-spacing:.4em;color:var(--ink);font-weight:500;">${esc(p.code)}</div>
      </div>` : ''}

      <form id="verifyForm">
        <div class="field">
          <label>${t(T.verify.code)}</label>
          <input id="vCode" class="code-input" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required autocomplete="one-time-code"/>
        </div>
        <div class="form-msg error" id="vMsg" style="display:none;"></div>
        <button class="btn btn-primary btn-block" type="submit">${t(T.verify.btn)}</button>
      </form>
      <div class="form-foot"><a id="vResend">${t(T.verify.resend)}</a></div>
    </div>
  </div>`;
}

export function wireVerify() {
  const form = $('#verifyForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const code = $('#vCode').value.trim();
    const p = state.pendingSignup;
    const msg = $('#vMsg');
    if (!p) { go('/signup'); return; }
    if (Date.now() > p.codeExpires) {
      msg.style.display = 'block';
      msg.textContent = t(T.verify.expired);
      // auto-resend
      resend();
      return;
    }
    if (code !== p.code) {
      msg.style.display = 'block';
      msg.textContent = t(T.verify.wrong);
      return;
    }
    // success — activate account
    state.users[p.email] = {
      name: p.name,
      passwordHash: p.passwordHash,
      verified: true,
      createdAt: new Date().toISOString()
    };
    state.user = { email: p.email, name: p.name };
    state.pendingSignup = null;
    persist();
    toast(t(T.verify.success));
    go('/account');
  });

  $('#vResend').addEventListener('click', () => resend());

  async function resend() {
    if (!state.pendingSignup) return;
    const code = gen6();
    state.pendingSignup.code = code;
    state.pendingSignup.codeExpires = Date.now() + CODE_TTL_MS;
    persist();
    const res = await sendVerificationCode({
      email: state.pendingSignup.email,
      name: state.pendingSignup.name,
      code
    });
    toast(t(T.verify.sent));
    // re-render to refresh demo banner with the new code
    setTimeout(() => {
      go('/verify?demo=' + (res.sent ? '0' : '1'));
    }, 400);
  }
}
