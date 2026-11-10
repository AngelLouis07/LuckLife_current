import { useEffect, useRef, useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { currencyCodes } from '../services/currency';
import './Checkout.css';
const names = new Intl.DisplayNames(['en'], { type: 'currency' });
export default function CurrencySwitcher() {
  const { currency, rates, chooseCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const root = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    const close = event => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  const options = currencyCodes.filter(code => rates[code] && `${code} ${names.of(code)}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="currency-switcher" ref={root} onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); toggle.current.focus(); } }}>
    <button ref={toggle} aria-expanded={open} aria-controls="currency-options" onClick={() => { setOpen(!open); setSearch(''); }}>{currency} ▾</button>
    {open && <div className="currency-popover" id="currency-options">
      <label>Browsing currency<input autoFocus type="search" placeholder="Search code or name" value={search} onChange={e => setSearch(e.target.value)} /></label>
      <div className="currency-options">{options.map(code => <button key={code} aria-pressed={currency === code} onClick={() => { chooseCurrency(code); setOpen(false); toggle.current.focus(); }}>{code} · {names.of(code)}</button>)}{!options.length && <p>No available currencies</p>}</div>
      <small>Estimates only. Checkout is charged in NGN or GBP.</small>
    </div>}
  </div>;
}
