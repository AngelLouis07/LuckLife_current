import { summarize } from './orders';
import { startPayment } from './payment';
import { products } from '../data/products';

beforeEach(() => localStorage.clear());
const item = { id: 'a', name: 'Example', price_usd: 10, price_ngn: 14000, price_gbp: 8.25, quantity: 3 };
test('regional totals use stored prices and integer minor units', () => {
  expect(summarize([item], 'NG').amount).toBe(42000);
  expect(summarize([item], 'GB').amount).toBe(24.75);
  expect(summarize([item], 'OTHER')).toBeNull();
  expect(summarize([], 'NG')).toBeNull();
  expect(() => summarize([{ ...item, quantity: -1 }], 'NG')).toThrow();
  expect(() => summarize([{ ...item, price_gbp: null }], 'GB')).toThrow();
  expect(products.every(p => ['price_usd', 'price_ngn', 'price_gbp'].every(key => Number.isFinite(p[key]) && p[key] > 0))).toBe(true);
});
test('stub works without keys and saves once without marking paid', async () => {
  const summary = summarize([item], 'GB');
  const order = { ...summary, id: 'test-order', customer: { email: 'a@example.com' } };
  const args = { ...summary, order };
  const result = await startPayment(args);
  expect(result.status).toBe('awaiting_payment_instructions');
  await startPayment(args);
  expect(JSON.parse(localStorage.getItem('lucklife.orders'))).toHaveLength(1);
  await expect(startPayment({ ...args, amount: 1 })).rejects.toThrow('Invalid order total');
  await expect(startPayment({ ...args, country: 'US' })).rejects.toThrow();
});
test('failed storage does not return a successful order', async () => {
  const summary = summarize([item], 'NG');
  const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota'); });
  await expect(startPayment({ ...summary, order: { ...summary, id: 'fail' } })).rejects.toThrow('Unable to save');
  spy.mockRestore();
});
test('rates fetch once and fall back to last validated cache', async () => {
  jest.resetModules();
  const currency = require('./currency');
  localStorage.setItem(currency.RATE_KEY, JSON.stringify({ timestamp: 10, rates: { USD: 1, GBP: .8, NGN: 1500, EUR: -5 } }));
  global.fetch = jest.fn().mockRejectedValue(new Error('Offline'));
  const [a, b] = await Promise.all([currency.getRates(), currency.getRates()]);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(a).toEqual({ USD: 1, GBP: .8, NGN: 1500 });
  expect(a).toEqual(b);
});
test('live rates cache timestamp and omit invalid values', async () => {
  jest.resetModules();
  const currency = require('./currency');
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [{ base: 'USD', quote: 'GBP', rate: .75 }, { base: 'USD', quote: 'NGN', rate: 1400 }, { base: 'USD', quote: 'EUR', rate: 0 }] });
  const rates = await currency.getRates();
  expect(rates.GBP).toBe(.75);
  expect(rates.EUR).toBeUndefined();
  expect(JSON.parse(localStorage.getItem(currency.RATE_KEY)).timestamp).toBeGreaterThan(0);
});
test('blocked geolocation fails silently and is deduplicated', async () => {
  jest.resetModules();
  const currency = require('./currency');
  global.fetch = jest.fn().mockRejectedValue(new Error('Blocked'));
  expect(await currency.detectCountry()).toBeNull();
  expect(await currency.detectCountry()).toBeNull();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
