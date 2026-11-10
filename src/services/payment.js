export const paymentKeys = {
  paystack: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || '',
  stripe: process.env.REACT_APP_STRIPE_PUBLIC_KEY || '',
};
export async function startPayment({ amount, currency, country, order }) {
  if (!((country === 'NG' && currency === 'NGN') || (country === 'GB' && currency === 'GBP'))) throw new Error('Unsupported checkout country.');
  const total = order.lines?.reduce((sum, line) => {
    if (!Number.isSafeInteger(line.unitMinor) || line.unitMinor <= 0 || !Number.isSafeInteger(line.quantity) || line.quantity < 1 || line.totalMinor !== line.unitMinor * line.quantity) throw new Error('Invalid order line.');
    return sum + line.totalMinor;
  }, 0);
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(total) || total !== Math.round(amount * 100) || total !== order.amountMinor || order.currency !== currency || order.country !== country) throw new Error('Invalid order total.');
  /* TODO: Replace this stub with server-backed payment initialization.
   * NGN: dynamically import @paystack/inline-js; use paymentKeys.paystack.
   * GBP: dynamically import @stripe/stripe-js; use paymentKeys.stripe.
   * Recalculate trusted catalog prices and totals on the server, create the
   * transaction/Checkout Session there, and verify payment using webhooks.
   * Never trust localStorage/client totals, expose secret keys, or mark paid
   * from a browser callback. Keys alone must not activate live charges.
   */
  let orders;
  try { orders = JSON.parse(localStorage.getItem('lucklife.orders') || '[]'); } catch { throw new Error('Unable to read saved orders. Please enable browser storage and try again.'); }
  if (!Array.isArray(orders)) throw new Error('Saved orders are unavailable.');
  const existing = orders.find(entry => entry.id === order.id);
  if (existing) return existing;
  const saved = { ...order, amount, currency, country, status: 'awaiting_payment_instructions', createdAt: new Date().toISOString() };
  try { localStorage.setItem('lucklife.orders', JSON.stringify([...orders, saved])); } catch { throw new Error('Unable to save your order. Please enable browser storage and try again.'); }
  return saved;
}
