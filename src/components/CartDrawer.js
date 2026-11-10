import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { summarize } from '../services/orders';
import { CountrySelect } from './Checkout';
import Price from './Price';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const { country } = useCurrency();
  let summary, pricingError;
  try { summary = summarize(items, country); } catch (e) { pricingError = e.message; }

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      <aside className="cart-drawer">
        <div className="cart-drawer__header">
          <h2>Your Cart</h2>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            <p>Your cart is empty</p>
            <button className="btn btn-primary btn-sm" onClick={() => setIsOpen(false)}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__image" />
                  <div className="cart-item__info">
                    <h4>{item.name}</h4>
                    <p className="cart-item__price">{summary ? <Price region={country} exact={summary.lines.find(line => line.id === item.id).unitMinor / 100} /> : <Price usd={item.price_usd} />}</p>
                    <div className="cart-item__qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease">−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase">+</button>
                    </div>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label="Remove">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <CountrySelect />
              {country === 'OTHER' && <p>We currently only ship to Nigeria and the UK.</p>}
              {!country && <p>Select your delivery country to see the exact charge total.</p>}
              {pricingError && <p role="alert">{pricingError}</p>}
              {summary && <><div className="cart-drawer__total">
                <span>Total ({summary.currency})</span>
                <Price region={country} exact={summary.amount} />
              </div>
              <Link to="/checkout" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
                Checkout
              </Link></>}
              <button className="cart-drawer__clear" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
