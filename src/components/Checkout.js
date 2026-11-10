import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { checkoutCurrency } from '../services/currency';
import { summarize } from '../services/orders';
import { startPayment } from '../services/payment';
import Price from './Price';
import './Checkout.css';
export function CountrySelect() {
  const { country, chooseCountry } = useCurrency();
  return <label className="checkout-country">Ship to<select value={country} onChange={e => chooseCountry(e.target.value)}><option value="">Choose country</option><option value="NG">Nigeria</option><option value="GB">United Kingdom</option><option value="OTHER">Other country</option></select></label>;
}
export default function Checkout() {
  const { items, clearCart } = useCart();
  const { country } = useCurrency();
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const orderId = useRef(null);
  let summary, pricingError;
  try { summary = summarize(items, country); } catch (e) { pricingError = e.message; }
  async function submit(event) {
    event.preventDefault();
    if (lock.current || !summary) return;
    lock.current = true; setBusy(true); setError('');
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    try {
      orderId.current ||= crypto.randomUUID();
      const order = { ...summary, id: orderId.current, customer: fields };
      const result = await startPayment({ amount: summary.amount, currency: summary.currency, country, order });
      setConfirmation(result); clearCart(); window.scrollTo(0, 0);
    } catch (e) { setError(e.message); } finally { lock.current = false; setBusy(false); }
  }
  if (confirmation) return <section className="checkout-page" role="status"><h1>Order placed — we'll send payment instructions</h1><p>Order reference: {confirmation.id}</p><p>Amount due: <Price region={confirmation.country} exact={confirmation.amount} /></p><p>No payment has been taken. This order is saved in this browser only; automatic delivery of orders and payment instructions is not connected yet.</p><Link to="/products">Continue shopping</Link></section>;
  return <section className="checkout-page"><h1>Checkout</h1><CountrySelect />
    {country === 'OTHER' && <p>We currently only ship to Nigeria and the UK.</p>}
    {!country && <p>Select your delivery country to see the exact total.</p>}
    {!items.length && <p>Your cart is empty. <Link to="/products">Explore products</Link></p>}
    {pricingError && <p role="alert">{pricingError}</p>}
    {summary && checkoutCurrency(country) && <form onSubmit={submit} className="checkout-grid">
      <fieldset disabled={busy}><legend>Delivery details</legend>
        <label>Full name<input required name="name" autoComplete="name" /></label>
        <label>Email<input required type="email" name="email" autoComplete="email" /></label>
        <label>Street address<input required name="address" autoComplete="street-address" /></label>
        <label>City<input required name="city" autoComplete="address-level2" /></label>
        <label>State / county<input required name="state" autoComplete="address-level1" /></label>
        <label>Postal code<input required name="postalCode" autoComplete="postal-code" /></label>
      </fieldset>
      <div className="checkout-summary"><h2>Order summary</h2><ul>{summary.lines.map(line => <li key={line.id}><span>{line.name} × {line.quantity}</span><Price region={country} exact={line.totalMinor / 100} /></li>)}</ul>
        <p className="checkout-total">Total ({summary.currency}) <Price region={country} exact={summary.amount} /></p>
        <p>You will owe exactly this amount in {summary.currency}. Browsing currency does not change this total.</p>
        <p>No online payment is taken. Your order will be saved on this device for payment instructions.</p>
        {error && <p role="alert">{error}</p>}
        <button className="btn btn-primary" disabled={busy} type="submit">{busy ? 'Saving order…' : 'Place order'}</button>
      </div>
    </form>}
  </section>;
}
