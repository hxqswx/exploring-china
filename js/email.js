/* ──────────────────────────────────────────────────
   email — EmailJS wrapper with demo fallback
   ──────────────────────────────────────────────────
   To enable real email sending:
     1. Sign up at https://www.emailjs.com
     2. Add a service (Gmail / Outlook / etc.)
     3. Create a template with variables: to_email, to_name, code
     4. Paste your IDs below.
   If any field is left as the placeholder, the app falls back to
   demo mode and shows the verification code on screen.
   ────────────────────────────────────────────────── */

export const EMAILJS_CONFIG = {
  serviceID:  'service_xxxxxxx',     // ← replace with yours
  templateID: 'template_xxxxxxx',    // ← replace with yours
  publicKey:  'YOUR_PUBLIC_KEY'      // ← replace with yours
};

export function isConfigured() {
  return EMAILJS_CONFIG.serviceID && !EMAILJS_CONFIG.serviceID.includes('xxxx')
      && EMAILJS_CONFIG.templateID && !EMAILJS_CONFIG.templateID.includes('xxxx')
      && EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';
}

let emailjsInit = false;
function ensureInit() {
  if (emailjsInit) return true;
  if (typeof emailjs === 'undefined') return false; // SDK not yet loaded
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  emailjsInit = true;
  return true;
}

/**
 * Send a verification code to the given email.
 * Returns { sent: true } if a real email was dispatched,
 * or { sent: false, code } when running in demo mode (so caller can show it).
 */
export async function sendVerificationCode({ email, name, code }) {
  if (!isConfigured()) {
    // demo mode — caller shows the code
    return { sent: false, code };
  }
  if (!ensureInit()) {
    // SDK didn't load — fall back to demo
    return { sent: false, code };
  }
  try {
    await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, {
      to_email: email,
      to_name: name || email,
      code
    });
    return { sent: true };
  } catch (e) {
    console.warn('EmailJS send failed, falling back to demo code:', e);
    return { sent: false, code, error: e?.text || String(e) };
  }
}
