export const RATE_KEY = 'lucklife.rates';
export const CHOICE_KEY = 'lucklife.currency';
export const readStored = (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
export const saveStored = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Browsing still works without storage. */ } };
export const checkoutCurrency = country => country === 'NG' ? 'NGN' : ['GB', 'UK'].includes(country) ? 'GBP' : null;
export const currencyCodes = Intl.supportedValuesOf ? Intl.supportedValuesOf('currency') : ['USD', 'NGN', 'GBP'];
const validRates = rates => Object.fromEntries(Object.entries(rates || {}).filter(([code, rate]) => currencyCodes.includes(code) && Number.isFinite(rate) && rate > 0));
export const cachedRates = () => ({ ...validRates(readStored(RATE_KEY)?.rates), USD: 1 });
async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  } finally { clearTimeout(timer); }
}
let ratesRequest;
export function getRates() {
  if (!ratesRequest) ratesRequest = (async () => {
    try {
      // One provider, one refresh per page load, also deduplicated in React StrictMode.
      const rows = await fetchJson('https://api.frankfurter.dev/v2/rates?base=USD');
      if (!Array.isArray(rows)) throw new Error('Invalid rates');
      const rates = validRates(Object.fromEntries(rows.filter(row => row.base === 'USD').map(row => [row.quote, row.rate])));
      if (!Object.keys(rates).length) throw new Error('Empty rates');
      rates.USD = 1;
      saveStored(RATE_KEY, { timestamp: Date.now(), rates });
      return rates;
    } catch { return cachedRates(); }
  })();
  return ratesRequest;
}
let countryRequest;
export function detectCountry() {
  if (!countryRequest) countryRequest = fetchJson('https://ipapi.co/json/')
    .then(data => !data.error && /^[A-Z]{2}$/.test(data.country_code) ? data.country_code : null)
    .catch(() => null);
  return countryRequest;
}
