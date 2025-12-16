const KEY = "bp_cookie_consent_v1";

export function getConsent() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setConsent(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function hasAcceptedAnalytics() {
  const c = getConsent();
  return c?.analytics === true;
}

export function hasAcceptedMarketing() {
  const c = getConsent();
  return c?.marketing === true;
}
