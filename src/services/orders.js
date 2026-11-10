import { checkoutCurrency } from './currency';
export function summarize(items, country) {
  const currency = checkoutCurrency(country);
  if (!currency || !items.length) return null;
  const lines = items.map(item => {
    const unit = item[`price_${currency.toLowerCase()}`];
    if (!Number.isFinite(unit) || unit <= 0 || !Number.isSafeInteger(item.quantity) || item.quantity < 1) throw new Error('A product price or quantity is unavailable.');
    const unitMinor = Math.round(unit * 100);
    return { id: item.id, name: item.name, quantity: item.quantity, unitMinor, totalMinor: unitMinor * item.quantity };
  });
  const amountMinor = lines.reduce((sum, line) => sum + line.totalMinor, 0);
  if (!Number.isSafeInteger(amountMinor)) throw new Error('Order total is too large.');
  return { currency, country, lines, amountMinor, amount: amountMinor / 100 };
}
